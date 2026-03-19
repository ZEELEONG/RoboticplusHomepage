import { useEffect, useState } from 'react';
import { ArrowRight, Brain, Database, Cpu, Users, ChevronDown, Scissors, Settings, Zap, Box, PackageSearch, Sparkles, ScanSearch, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';
import { Spotlight } from '@/components/ui/spotlight';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { BlurIn } from '@/components/ui/blur-in';
import { SequenceScroll } from '@/components/ui/sequence-scroll-animation';
import { Map, MapMarker, MarkerContent, MapControls } from '@/components/ui/map';

export default function RoboticPlusHomepageCn() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const videoSection = document.getElementById('video-section');
      if (videoSection) {
        const videoSectionTop = videoSection.getBoundingClientRect().top;
        setShowScrollTop(videoSectionTop <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <section id="home" className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#f5af15"
        />

        <SequenceScroll
          titleComponent={
            <div className="relative z-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-[#f5af15] to-[#f5af15] bg-clip-text text-transparent">
                <div>致力于构建工业世界的</div>
                <div>智能机器人系统</div>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
                高端装备 | 数据底座 | 跨行业 | 工艺泛化
              </p>
              <div className="flex flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={() => scrollToSection('video-section')}
                  className="group px-4 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-[#f5af15] to-[#f5af15] rounded-full font-semibold flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#f5af15]/50 text-sm md:text-sm whitespace-nowrap"
                >
                  <span>了解更多</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection('cooperation')}
                  className="px-4 py-2.5 md:px-6 md:py-3 border-2 border-[#f5af15] rounded-full font-semibold hover:bg-[#f5af15]/10 transition-colors duration-300 text-sm md:text-sm whitespace-nowrap backdrop-blur-sm"
                >
                  寻求合作
                </button>
              </div>
            </div>
          }
          frameCount={120}
          frameBasePath={`${import.meta.env.BASE_URL}hero imgae animated3`}
          frameStart={3000}
        />
      </section>

      <section id="video-section" className="relative">
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              key={isMobile ? 'mobile-robim' : 'desktop-robim'}
              src={isMobile
                ? "https://stytqdpivnhmeozqdujr.supabase.co/storage/v1/object/public/videos/1773823112313-413d5.mp4"
                : "https://stytqdpivnhmeozqdujr.supabase.co/storage/v1/object/public/videos/1773215598880-xgkon.mp4"
              }
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 min-w-full min-h-full opacity-100"
              style={{ objectFit: 'cover', objectPosition: 'top left' }}
            />
          </div>

          <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-16 text-left">
            <div className="relative inline-block">
              <div className="absolute inset-0 -inset-x-8 -inset-y-6 bg-gradient-to-br from-black/80 via-black/70 to-black/80 rounded-3xl blur-2xl" />
              <div className="relative">
                <Database className="w-12 h-12 md:w-16 md:h-16 [color:#f5af15] mb-4 animate-pulse" />
                <BlurIn
                  word="RoBIM数字底座，让具身智能在工业场景真正落地"
                  className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-[#f5af15] to-white bg-clip-text text-transparent text-left"
                  duration={1.2}
                  as="h2"
                />
                <BlurIn
                  word="仿真即生产，模块化微服务架构，百万+原生高精度工业数据驱动，群脑智能协作，手眼脑毫米级精度。"
                  className="text-base md:text-xl text-gray-200 leading-relaxed max-w-3xl font-normal text-left"
                  duration={1.5}
                  as="p"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              key={isMobile ? 'mobile-fullstack' : 'desktop-fullstack'}
              src={isMobile ? `${import.meta.env.BASE_URL}HD_mobile_v2.png` : `${import.meta.env.BASE_URL}solutions.png`}
              alt="Solutions Background"
              className="absolute left-0 top-0 w-full min-h-full opacity-100"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>

          <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-16 text-left">
            <div className="relative inline-block">
              <div className="absolute inset-0 -inset-x-8 -inset-y-6 bg-gradient-to-br from-black/80 via-black/70 to-black/80 rounded-3xl blur-2xl" />
              <div className="relative">
                <Settings className="w-12 h-12 md:w-16 md:h-16 [color:#f5af15] mb-4 animate-pulse" />
                <BlurIn
                  word='全栈高端智能机器人装备，赋能大规模定制化行业'
                  className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-[#f5af15] to-white bg-clip-text text-transparent text-left"
                  duration={1.2}
                  as="h2"
                />
                <BlurIn
                  word="面向船舶、海工、重工、电力、建筑等大规模定制化行业，以RoBIM系统为通用大脑，形成了切割、焊接、打磨、装配等工艺全覆盖的机器人柔性制造产品，服务全球300+标杆客户。"
                  className="text-base md:text-xl text-gray-200 leading-relaxed max-w-3xl font-normal text-left"
                  duration={1.5}
                  as="p"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process-modules" className="relative min-h-screen flex items-center py-24 px-6 bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            src="https://stytqdpivnhmeozqdujr.supabase.co/storage/v1/object/public/videos/1773803906198-b49k3b.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="px-6 md:px-16 text-left">
              <div className="relative inline-block">
                <div className="absolute inset-0 -inset-x-8 -inset-y-6 bg-gradient-to-br from-black/80 via-black/70 to-black/80 rounded-3xl blur-2xl" />
                <div className="relative">
                  <Cpu className="w-12 h-12 md:w-16 md:h-16 [color:#f5af15] mb-4 animate-pulse" />
                  <BlurIn
                    word="工艺模块"
                    className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-[#f5af15] to-white bg-clip-text text-transparent text-left"
                    duration={1.2}
                    as="h2"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
            <div className="relative min-h-[120px]">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-700 p-2 md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-xl border-[0.75px] bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-4 shadow-sm">
                  <div className="flex flex-row items-center gap-3 mb-2">
                    <PackageSearch className="w-8 h-8 [color:#f5af15] flex-shrink-0" />
                    <h3 className="text-lg font-bold text-white">分拣</h3>
                  </div>
                  <p className="text-sm text-gray-400">智能识别与精准分类</p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[120px]">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-700 p-2 md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-xl border-[0.75px] bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-4 shadow-sm">
                  <div className="flex flex-row items-center gap-3 mb-2">
                    <Scissors className="w-8 h-8 [color:#f5af15] flex-shrink-0" />
                    <h3 className="text-lg font-bold text-white">切割</h3>
                  </div>
                  <p className="text-sm text-gray-400">高精度自动化切割</p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[120px]">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-700 p-2 md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-xl border-[0.75px] bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-4 shadow-sm">
                  <div className="flex flex-row items-center gap-3 mb-2">
                    <Box className="w-8 h-8 [color:#f5af15] flex-shrink-0" />
                    <h3 className="text-lg font-bold text-white">组装</h3>
                  </div>
                  <p className="text-sm text-gray-400">灵活的模块化组装</p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[120px]">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-700 p-2 md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-xl border-[0.75px] bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-4 shadow-sm">
                  <div className="flex flex-row items-center gap-3 mb-2">
                    <Zap className="w-8 h-8 [color:#f5af15] flex-shrink-0" />
                    <h3 className="text-lg font-bold text-white">焊接</h3>
                  </div>
                  <p className="text-sm text-gray-400">稳定可靠的焊接工艺</p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[120px]">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-700 p-2 md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-xl border-[0.75px] bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-4 shadow-sm">
                  <div className="flex flex-row items-center gap-3 mb-2">
                    <Sparkles className="w-8 h-8 [color:#f5af15] flex-shrink-0" />
                    <h3 className="text-lg font-bold text-white">打磨</h3>
                  </div>
                  <p className="text-sm text-gray-400">精细的表面处理</p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[120px]">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-700 p-2 md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-xl border-[0.75px] bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-4 shadow-sm">
                  <div className="flex flex-row items-center gap-3 mb-2">
                    <ScanSearch className="w-8 h-8 [color:#f5af15] flex-shrink-0" />
                    <h3 className="text-lg font-bold text-white">检测</h3>
                  </div>
                  <p className="text-sm text-gray-400">全方位质量检测</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      <section id="video-section-2" className="relative">
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              key={isMobile ? 'mobile-humanoid' : 'desktop-humanoid'}
              src={isMobile
                ? "https://stytqdpivnhmeozqdujr.supabase.co/storage/v1/object/public/videos/1773830371364-3ug3t2.mp4"
                : "https://stytqdpivnhmeozqdujr.supabase.co/storage/v1/object/public/videos/1773214655906-wnyf2c.mp4"
              }
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-100"
            />
          </div>

          <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-16 text-left">
            <div className="relative inline-block">
              <div className="absolute inset-0 -inset-x-8 -inset-y-6 bg-gradient-to-br from-black/80 via-black/70 to-black/80 rounded-3xl blur-2xl" />
              <div className="relative">
                <Brain className="w-12 h-12 md:w-16 md:h-16 [color:#f5af15] mb-4 animate-pulse" />
                <BlurIn
                  word="工匠的进化，大界发布工业人形产品"
                  className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-[#f5af15] to-white bg-clip-text text-transparent text-left"
                  duration={1.2}
                  as="h2"
                />
                <BlurIn
                  word="RoBIM支持面向工人执行生产过程的多模态的数据采集方法，包括视频、摇操、动补和UMI等，我们正在探索更加高效的将工人技艺转变为机器人生产力的方法。"
                  className="text-base md:text-xl text-gray-200 leading-relaxed max-w-3xl font-normal text-left"
                  duration={1.5}
                  as="p"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="advantages" className="relative min-h-screen flex items-center py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">核心优势</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#f5af15] to-[#f5af15] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Database className="w-8 h-8" />,
                title: '数字底座全栈自研',
                description: '几何、感知、运控、流程、工艺全栈自研，10年迭代，300+工业头部客户信赖'
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: '机器人软硬件乐高工厂',
                description: '1000+ 跨本体、跨工艺的机器人手眼脑软硬件模组，新品开发周期<三个月'
              },
              {
                icon: <Cpu className="w-8 h-8" />,
                title: '工业数据量产流水线',
                description: '模拟、仿真、生产全链路，多模态工业数据的 “精炼” 流水线'
              }
            ].map((advantage, idx) => (
              <div key={idx} className="relative min-h-[160px] md:min-h-[280px]">
                <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-700 p-2 md:p-3">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <div className="relative flex h-full flex-col md:flex-col overflow-hidden rounded-xl border-[0.75px] bg-black p-6 shadow-sm md:p-6">
                    <div className="relative flex flex-1 flex-row md:flex-col justify-start md:justify-between gap-4 md:gap-3">
                      <div className="w-fit rounded-lg border-[0.75px] border-slate-700 bg-slate-900 p-3 flex-shrink-0 flex items-center justify-center">
                        <div className="[color:#f5af15]">{advantage.icon}</div>
                      </div>
                      <div className="space-y-2 md:space-y-3 flex-1">
                        <h3 className="pt-0.5 text-lg leading-tight md:text-xl md:leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white">
                          {advantage.title}
                        </h3>
                        <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-gray-400">
                          {advantage.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">关于大界</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#f5af15] to-[#f5af15] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold [color:#f5af15]">RoboticPlus.AI</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                大界机器人，是一家在工业世界里为广泛的机器人构型提供软硬一体智能系统的科技公司，由全球最早的一批在头部CAD平台上研发数据模型驱动的自适应机器人技术的华人团队创立。
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                面向大规模定制化行业，大界在船舶、电力、建筑、工程机械等领域，通过自主研发的工业软件平台RoBIM，为全球数百家知名企业提供了值得信赖的手眼脑协同的机器人柔性制造高端装备，涵盖的工艺包括切割、焊接、打磨、装配等。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '10+', label: '年行业经验' },
                { number: '1M+', label: '多模态数据' },
                { number: '3000+', label: '小时训练' },
                { number: '100%', label: '工业场景验证' }
              ].map((stat, idx) => (
                <div key={idx} className="relative h-full min-h-[140px]">
                  <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-700 p-2">
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={2}
                    />
                    <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-xl border-[0.75px] bg-black p-6 shadow-sm">
                      <div className="text-4xl font-bold [color:#f5af15] mb-2">{stat.number}</div>
                      <div className="text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="cooperation" className="relative py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">开启合作之旅</h2>
            <p className="text-xl text-gray-300 mb-4">
              让我们携手推动人形机器人产业的智能化升级
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#f5af15] to-[#f5af15] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative h-[500px]">
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-700 p-2 md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative h-full overflow-hidden rounded-xl border-[0.75px] bg-black">
                  <Map center={[121.49277326235446,31.34221583511142]} zoom={9}>
                    <MapMarker longitude={121.49277326235446} latitude={31.34221583511142}>
                      <MarkerContent>
                        <div className="relative">
                          <div className="absolute -inset-4 bg-[#f5af15] opacity-20 rounded-full animate-ping" />
                          <div className="relative h-6 w-6 rounded-full border-3 border-white bg-[#f5af15] shadow-lg flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </MarkerContent>
                    </MapMarker>
                    <MapControls position="bottom-right" showZoom={true} />
                  </Map>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-8 py-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg border border-slate-700 bg-slate-900 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 [color:#f5af15]" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white mb-2">联系方式</h4>
                    <p className="text-gray-300 text-sm">前台电话：</p>
                    <p className="text-gray-300 text-sm">021-55080816</p>
                    <p className="text-gray-300 text-sm">商务咨询：</p>
                    <p className="text-gray-300 text-sm">+86 15901623160</p>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6 mt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg border border-slate-700 bg-slate-900 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 [color:#f5af15]" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white mb-2">商务合作</h4>
                      <p className="text-gray-300 text-sm">business@roboticplus.ai</p>
                      <h4 className="text-base font-semibold text-white mb-2">媒体对接</h4>
                      <p className="text-gray-300 text-sm">invest@roboticplus.ai</p>
                      <h4 className="text-base font-semibold text-white mb-2">人才招聘</h4>
                      <p className="text-gray-300 text-sm">tech@roboticplus.ai</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6 mt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg border border-slate-700 bg-slate-900 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 [color:#f5af15]" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white mb-1">公司地址</h4>
                      <p className="text-gray-300">公司总部：上海市宝山区逸仙路 3000 号 2 号楼 1 层</p>
                      <p className="text-gray-300">智能工厂：上海市宝山区长江西路 850 号 11 号楼</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="hidden"></section>

      <footer className="relative py-8 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-br from-[#f5af15] to-[#f5af15] rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold">RoboticPlus.AI</p>
              <p className="text-xs text-gray-500">大界</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 RoboticPlus.AI. All rights reserved.
          </p>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-[#f5af15] to-[#f5af15] rounded-full shadow-lg shadow-[#f5af15]/50 hover:scale-110 transition-all duration-300 ${
          showScrollTop
            ? 'opacity-100 translate-y-0 blur-0'
            : 'opacity-0 translate-y-4 blur-sm pointer-events-none'
        }`}
        aria-label="回到顶部"
      >
        <ArrowUp className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
