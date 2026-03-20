import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

interface SequenceScrollProps {
  titleComponent: string | React.ReactNode;
  videoSrc: string;
}

const MIN_SEEK_DELTA = 0.01;
const VIDEO_START_OFFSET = 0.12;
const VIDEO_PROGRESS_RANGE = 0.72;

export const SequenceScroll = ({
  titleComponent,
  videoSrc,
}: SequenceScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastAppliedTimeRef = useRef<number | null>(null);
  const hasInitializedFrameRef = useRef(false);
  const hasShownVideoRef = useRef(false);
  const durationRef = useRef(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const clampTime = (time: number, maxDuration: number) => {
    if (!Number.isFinite(time)) {
      return 0;
    }

    return Math.min(Math.max(time, 0), maxDuration);
  };

  const getVideoProgress = (progress: number) => {
    if (progress <= VIDEO_START_OFFSET) {
      return 0;
    }

    return clampTime(
      (progress - VIDEO_START_OFFSET) / VIDEO_PROGRESS_RANGE,
      1,
    );
  };

  const applyTargetTime = () => {
    rafIdRef.current = null;

    const video = videoRef.current;
    const maxDuration = durationRef.current;

    if (!video || maxDuration <= 0) {
      return;
    }

    const nextTime = clampTime(targetTimeRef.current, maxDuration);
    const lastAppliedTime = lastAppliedTimeRef.current;

    if (
      lastAppliedTime !== null &&
      Math.abs(lastAppliedTime - nextTime) < MIN_SEEK_DELTA
    ) {
      return;
    }

    video.currentTime = nextTime;
    lastAppliedTimeRef.current = nextTime;
    hasInitializedFrameRef.current = true;
  };

  const scheduleApplyTargetTime = () => {
    if (durationRef.current <= 0 || rafIdRef.current !== null) {
      return;
    }

    rafIdRef.current = requestAnimationFrame(applyTargetTime);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    setDuration(0);
    setIsVideoReady(false);
    durationRef.current = 0;
    targetTimeRef.current = 0;
    lastAppliedTimeRef.current = null;
    hasInitializedFrameRef.current = false;
    hasShownVideoRef.current = false;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    const video = videoRef.current;
    if (!video) return;

    const syncTargetTimeWithProgress = (progress: number) => {
      const maxDuration = durationRef.current;
      if (maxDuration <= 0) {
        return;
      }

      targetTimeRef.current = clampTime(
        getVideoProgress(progress) * maxDuration,
        maxDuration,
      );
      scheduleApplyTargetTime();
    };

    const handleLoadedMetadata = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        return;
      }

      durationRef.current = video.duration;
      setDuration(video.duration);
      syncTargetTimeWithProgress(scrollYProgress.get());
    };

    const handleLoadedData = () => {
      if (!hasInitializedFrameRef.current) {
        syncTargetTimeWithProgress(scrollYProgress.get());
      }

      if (!hasShownVideoRef.current) {
        hasShownVideoRef.current = true;
        setIsVideoReady(true);
      }
    };

    const handleError = () => {
      setIsVideoReady(false);
      setDuration(0);
      durationRef.current = 0;
      hasInitializedFrameRef.current = false;
      hasShownVideoRef.current = false;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [videoSrc, scrollYProgress]);

  useEffect(() => {
    durationRef.current = duration;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const maxDuration = durationRef.current;
      if (maxDuration <= 0) return;

      targetTimeRef.current = clampTime(
        getVideoProgress(latest) * maxDuration,
        maxDuration,
      );
      scheduleApplyTargetTime();
    });

    return () => {
      unsubscribe();

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [scrollYProgress, duration]);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover rounded-2xl"
            style={{
              display: isVideoReady ? "block" : "none",
            }}
          />
          {!isVideoReady && (
            <div className="w-full h-full flex items-center justify-center bg-slate-800">
              <div className="text-white text-lg">加载中...</div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-4 mx-auto h-[16rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
