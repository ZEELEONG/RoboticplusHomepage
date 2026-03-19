import { useEffect, useState } from 'react';
import { ArrowRight, Brain, Database, Cpu, Users, ChevronDown, Scissors, Settings, Zap, Box, PackageSearch, Sparkles, ScanSearch, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';
import { Spotlight } from '@/components/ui/spotlight';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { BlurIn } from '@/components/ui/blur-in';
import { SequenceScroll } from '@/components/ui/sequence-scroll-animation';
import { Map, MapMarker, MarkerContent, MapControls } from '@/components/ui/map';

export default function RoboticPlusHomepageEn() {
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
                <div>Connecting Cyber and Physical World of Robotics</div>
                <div></div>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
                High-End Equipment | Agent Infra |Process Generalization| Cross Industry
              </p>
              <div className="flex flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={() => scrollToSection('video-section')}
                  className="group px-4 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-[#f5af15] to-[#f5af15] rounded-full font-semibold flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#f5af15]/50 text-sm md:text-sm whitespace-nowrap"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection('cooperation')}
                  className="px-4 py-2.5 md:px-6 md:py-3 border-2 border-[#f5af15] rounded-full font-semibold hover:bg-[#f5af15]/10 transition-colors duration-300 text-sm md:text-sm whitespace-nowrap backdrop-blur-sm"
                >
                  Seek Cooperation
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
                  word="RoBIM Agent Infra, Realizing Embodied Intelligence in Industrial Scenarios"
                  className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-[#f5af15] to-white bg-clip-text text-transparent text-left"
                  duration={1.2}
                  as="h2"
                />
                <BlurIn
                  word="Integrated Simulation and Production, Modular Microservices Architecture, Driven by 1M+ High-Precision Native Industrial Data Sets, Multi-Agent Collaborative Intelligence, Millimeter-Level Precision (Hand-Eye-Brain Coordination)."
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
                <Brain className="w-12 h-12 md:w-16 md:h-16 [color:#f5af15] mb-4 animate-pulse" />
                <BlurIn
                  word='Full-Stack Advanced Robotic Equipment, Empowering Industries with Mass Customization'
                  className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-[#f5af15] to-white bg-clip-text text-transparent text-left"
                  duration={1.2}
                  as="h2"
                />
                <BlurIn
                  word="Serving mass customization sectors such as Shipbuilding, Offshore Engineering, Heavy Industry, Energy, and Construction. Powered by the RoBIM system as the ‘Universal Brain’, we offer flexible robotic manufacturing solutions covering the entire process lifecycle, including cutting, welding, grinding, and assembly."
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
                  <Settings className="w-12 h-12 md:w-16 md:h-16 [color:#f5af15] mb-4 animate-pulse" />
                  <BlurIn
                    word="Process Modules"
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
                  <div className="flex flex-col md:flex-row items-center md:gap-3 mb-2">
                    <PackageSearch className="w-8 h-8 [color:#f5af15] flex-shrink-0 mb-2 md:mb-0" />
                    <h3 className="text-lg font-bold text-white text-center md:text-left">Sorting</h3>
                  </div>
                  <p className="text-sm text-gray-400 text-center md:text-left">Intelligent Recognition and Precision Classification</p>
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
                  <div className="flex flex-col md:flex-row items-center md:gap-3 mb-2">
                    <Scissors className="w-8 h-8 [color:#f5af15] flex-shrink-0 mb-2 md:mb-0" />
                    <h3 className="text-lg font-bold text-white text-center md:text-left">Cutting</h3>
                  </div>
                  <p className="text-sm text-gray-400 text-center md:text-left">High-Precision Automated Cutting</p>
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
                  <div className="flex flex-col md:flex-row items-center md:gap-3 mb-2">
                    <Box className="w-8 h-8 [color:#f5af15] flex-shrink-0 mb-2 md:mb-0" />
                    <h3 className="text-lg font-bold text-white text-center md:text-left">Assembly</h3>
                  </div>
                  <p className="text-sm text-gray-400 text-center md:text-left">Flexible Modular Assembly</p>
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
                  <div className="flex flex-col md:flex-row items-center md:gap-3 mb-2">
                    <Zap className="w-8 h-8 [color:#f5af15] flex-shrink-0 mb-2 md:mb-0" />
                    <h3 className="text-lg font-bold text-white text-center md:text-left">Welding</h3>
                  </div>
                  <p className="text-sm text-gray-400 text-center md:text-left">Stable and Reliable Welding Process</p>
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
                  <div className="flex flex-col md:flex-row items-center md:gap-3 mb-2">
                    <Sparkles className="w-8 h-8 [color:#f5af15] flex-shrink-0 mb-2 md:mb-0" />
                    <h3 className="text-lg font-bold text-white text-center md:text-left">Grinding</h3>
                  </div>
                  <p className="text-sm text-gray-400 text-center md:text-left">Fine Surface Treatment</p>
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
                  <div className="flex flex-col md:flex-row items-center md:gap-3 mb-2">
                    <ScanSearch className="w-8 h-8 [color:#f5af15] flex-shrink-0 mb-2 md:mb-0" />
                    <h3 className="text-lg font-bold text-white text-center md:text-left">Inspection</h3>
                  </div>
                  <p className="text-sm text-gray-400 text-center md:text-left">Comprehensive Quality Testing</p>
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
                <Cpu className="w-12 h-12 md:w-16 md:h-16 [color:#f5af15] mb-4 animate-pulse" />
                <BlurIn
                  word="The Evolution of Artisan: RoboticPlus.AI Unveils Industrial Humanoid Robotics"
                  className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-[#f5af15] to-white bg-clip-text text-transparent text-left"
                  duration={1.2}
                  as="h2"
                />
                <BlurIn
                  word="RoBIM supports multimodal data collection methods from human workers during production, including video, teleoperation, motion capture, and UMI.We are pioneering more efficient pathways to transform human craftsmanship into robotic productivity."
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Core Advantages</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#f5af15] to-[#f5af15] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Database className="w-8 h-8" />,
                title: 'Proprietary Full-Stack Agent Infra',
                description: 'Self-developed across Geometry, Perception, Motion Control, Workflow, and Process—refined over 10 years and trusted by 300+ industry leaders.'
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: 'LEGO-style Robotic Hardware & Software Ecosystem',
                description: '1,000+ modular hand-eye-brain components across various platforms and processes. New product development cycle under 3 months.'
              },
              {
                icon: <Cpu className="w-8 h-8" />,
                title: 'Industrial Data Production Pipeline',
                description: 'A "refinery" pipeline for multimodal industrial data, spanning simulation, emulation, and full-link production.'
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About RoboticPlus</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#f5af15] to-[#f5af15] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold [color:#f5af15]">RoboticPlus.AI</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
              ROBOTICPLUS.AI is a technology company delivering intelligent systems for industrial manufacturing. Founded by one of the earliest Chinese teams to pioneer data-model-driven adaptive robotics on leading CAD platforms, the company specializes in high-mix, low-volume production across industries including shipbuilding, electric power, engineering machinery, and steel structures.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
              Powered by its proprietary RoBIM platform, our robotic systems perceive, plan, and adapt in real time, handling cutting, welding, grinding, and assembly with precision, flexibility, and scalability, enabling hundreds of leading companies worldwide to achieve intelligent, efficient automation.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '10+', label: 'Years | Industry Expertise' },
                { number: '1M+', label: 'Units | Multimodal Industrial Data' },
                { number: '3000+', label: 'Hours | AI Model Training' },
                { number: '100%', label: 'Proven | Field-Tested in Industrial Scenarios' }
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
                      <div className="text-2xl md:text-4xl font-bold [color:#f5af15] mb-2">{stat.number}</div>
                      <div className="text-sm md:text-base text-gray-400">{stat.label}</div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Start Your Cooperation Journey</h2>
            <p className="text-xl text-gray-300 mb-4">
              Let's work together to drive intelligent upgrading of the humanoid robot industry
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
                    <h4 className="text-base font-semibold text-white mb-2">Contact Information</h4>
                    <p className="text-gray-300 text-sm">Reception:</p>
                    <p className="text-gray-300 text-sm">021-55080816</p>
                    <p className="text-gray-300 text-sm">Business Inquiry:</p>
                    <p className="text-gray-300 text-sm">+86 15901623160</p>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6 mt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg border border-slate-700 bg-slate-900 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 [color:#f5af15]" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white mb-2">Business Cooperation</h4>
                      <p className="text-gray-300 text-sm">business@roboticplus.ai</p>
                      <h4 className="text-base font-semibold text-white mb-2">Media Contact</h4>
                      <p className="text-gray-300 text-sm">invest@roboticplus.ai</p>
                      <h4 className="text-base font-semibold text-white mb-2">Talent Recruitment</h4>
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
                      <h4 className="text-base font-semibold text-white mb-1">Company Address</h4>
                      <p className="text-gray-300">Headquarters: Floor 1, Building 2, No. 3000 Yixian Road, Baoshan District, Shanghai</p>
                      <p className="text-gray-300">Smart Factory: Building 11, No. 850 Changjiang West Road, Baoshan District, Shanghai</p>
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
              <p className="text-xs text-gray-500">RoboticPlus</p>
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
        aria-label="Back to Top"
      >
        <ArrowUp className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
