import { useEffect, useState } from 'react';
import { ArrowRight, Brain, Database, Cpu, Users, ChevronDown, ArrowUp } from 'lucide-react';
import { SplineScene } from '@/components/ui/spline';
import { Spotlight } from '@/components/ui/spotlight';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { BlurIn } from '@/components/ui/blur-in';

export default function TestTemplate() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const videoSection = document.querySelector('section.relative:has(video)');
      if (videoSection) {
        const videoSectionTop = videoSection.getBoundingClientRect().top;
        setShowScrollTop(videoSectionTop <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-black/[0.96]">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#f5af15"
        />

        <div className="w-full h-screen flex flex-col lg:flex-row pt-20 lg:pt-0">
          <div className={`flex-1 p-6 md:p-16 relative z-10 flex flex-col justify-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6 bg-gradient-to-r from-white via-[#f5af15] to-[#f5af15] bg-clip-text text-transparent">
              为工业世界里泛机器人构型
              <br />
              提供智能全栈系统的Agent Infrastructure
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-gray-300 mb-3 md:mb-8 leading-relaxed max-w-2xl">
              工业数字底座RoBIM | 工业级算法引擎 RoBIM | 海量训练数据集
            </p>
            <div className="flex flex-row gap-2 sm:gap-3">
              <button
                onClick={() => scrollToSection('advantages')}
                className="group px-3 py-2 md:px-6 md:py-3 bg-gradient-to-r from-[#f5af15] to-[#f5af15] rounded-full font-semibold flex items-center justify-center space-x-1 md:space-x-2 hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#f5af15]/50 text-xs md:text-sm whitespace-nowrap"
              >
                <span>探索优势</span>
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-3 py-2 md:px-6 md:py-3 border-2 border-[#f5af15] rounded-full font-semibold hover:bg-[#f5af15]/10 transition-colors duration-300 text-xs md:text-sm whitespace-nowrap"
              >
                寻求合作
              </button>
            </div>
          </div>

          <div className="flex-1 relative min-h-[500px] sm:min-h-[600px] lg:min-h-screen">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20"
        >
          <ChevronDown className="w-8 h-8 [color:#f5af15]" />
        </button>
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
                title: '海量训练数据集',
                description: '基于多年钢结构加工实践，积累了TB级真实工业场景数据，涵盖各类加工工艺、异常情况和优化案例，为算法训练提供坚实基础。'
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: '工业级算法引擎',
                description: '自主研发的工艺规划、路径优化、质量检测等核心算法，已在一线生产中验证多年，具备高可靠性和实用性。'
              },
              {
                icon: <Cpu className="w-8 h-8" />,
                title: '端到端解决方案',
                description: '从感知识别、决策规划到执行控制的全栈算法体系，可快速集成到人形机器人系统中，大幅缩短研发周期。'
              }
            ].map((advantage, idx) => (
              <div key={idx} className="relative min-h-[280px]">
                <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-700 p-2 md:p-3">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-black p-6 shadow-sm md:p-6">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                      <div className="w-fit rounded-lg border-[0.75px] border-slate-700 bg-slate-900 p-3">
                        <div className="[color:#f5af15]">{advantage.icon}</div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white">
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

      <section className="relative">
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              src="https://stytqdpivnhmeozqdujr.supabase.co/storage/v1/object/public/videos/1771670117258-5dlcfk.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>

          <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-16 text-left">
            <Database className="w-12 h-12 md:w-16 md:h-16 [color:#f5af15] mb-4 animate-pulse" />
            <BlurIn
              word="海量训练数据集"
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-[#f5af15] to-white bg-clip-text text-transparent text-left"
              duration={1.2}
              as="h2"
            />
            <BlurIn
              word="基于多年钢结构加工实践，积累了TB级真实工业场景数据，涵盖各类加工工艺、异常情况和优化案例，为算法训练提供坚实基础。"
              className="text-base md:text-xl text-gray-200 leading-relaxed max-w-3xl font-normal text-left"
              duration={1.5}
              as="p"
            />
          </div>
        </div>

        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              src="https://stytqdpivnhmeozqdujr.supabase.co/storage/v1/object/public/videos/1771670184577-jmkcv.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>

          <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-16 text-left">
            <Brain className="w-12 h-12 md:w-16 md:h-16 [color:#f5af15] mb-4 animate-pulse" />
            <BlurIn
              word="工业级算法引擎"
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-[#f5af15] to-white bg-clip-text text-transparent text-left"
              duration={1.2}
              as="h2"
            />
            <BlurIn
              word="自主研发的工艺规划、路径优化、质量检测等核心算法，已在一线生产中验证多年，具备高可靠性和实用性。"
              className="text-base md:text-xl text-gray-200 leading-relaxed max-w-3xl font-normal text-left"
              duration={1.5}
              as="p"
            />
          </div>
        </div>

        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              src="https://stytqdpivnhmeozqdujr.supabase.co/storage/v1/object/public/videos/1771670238889-la8gna.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>

          <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-16 text-left">
            <Cpu className="w-12 h-12 md:w-16 md:h-16 [color:#f5af15] mb-4 animate-pulse" />
            <BlurIn
              word="端到端解决方案"
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-[#f5af15] to-white bg-clip-text text-transparent text-left"
              duration={1.2}
              as="h2"
            />
            <BlurIn
              word="从感知识别、决策规划到执行控制的全栈算法体系，可快速集成到人形机器人系统中，大幅缩短研发周期。"
              className="text-base md:text-xl text-gray-200 leading-relaxed max-w-3xl font-normal text-left"
              duration={1.5}
              as="p"
            />
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
                大界（RoboticPlus.AI）是一家专注于工业智能算法的软件公司，深耕钢结构加工领域多年。我们将一线工艺经验转化为先进的算法引擎，为人形机器人产业提供核心软件支持。
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                凭借多年积累的海量工业数据集和实战经验，我们为人形机器人厂商提供从感知到执行的全栈算法解决方案，助力机器人在工业场景中实现真正的智能化作业。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '10+', label: '年行业经验' },
                { number: '1000+', label: 'TB训练数据' },
                { number: '50+', label: '算法模型' },
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
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">开启合作之旅</h2>
            <p className="text-xl text-gray-300 mb-4">
              让我们携手推动人形机器人产业的智能化升级
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#f5af15] to-[#f5af15] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: '技术合作',
                items: [
                  '算法授权与定制开发',
                  '训练数据集共享与标注服务',
                  '联合研发与技术支持',
                  '工业场景落地验证'
                ]
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: '投资合作',
                items: [
                  '战略投资与股权合作',
                  '产业链深度整合',
                  '联合实验室建设',
                  '人才与资源共享'
                ]
              },
              {
                icon: <Cpu className="w-8 h-8" />,
                title: '联系我们',
                contact: [
                  { label: '商务合作', value: 'business@roboticplus.ai' },
                  { label: '投资咨询', value: 'invest@roboticplus.ai' },
                  { label: '技术支持', value: 'tech@roboticplus.ai' },
                  { label: '公司地址', value: '中国 · 上海' }
                ]
              }
            ].map((cooperation, idx) => (
              <div key={idx} className="relative min-h-[320px]">
                <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-slate-700 p-2 md:p-3">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-black p-6 shadow-sm md:p-6">
                    <div className="relative flex flex-1 flex-col gap-4">
                      <div className="w-fit rounded-lg border-[0.75px] border-slate-700 bg-slate-900 p-3">
                        <div className="[color:#f5af15]">{cooperation.icon}</div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-white">
                          {cooperation.title}
                        </h3>
                        {cooperation.items && (
                          <ul className="space-y-2">
                            {cooperation.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start space-x-2 text-sm text-gray-300">
                                <span className="[color:#f5af15] mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {cooperation.contact && (
                          <div className="space-y-3">
                            {cooperation.contact.map((contact, contactIdx) => (
                              <div key={contactIdx}>
                                <h4 className="text-sm font-semibold [color:#f5af15] mb-1">{contact.label}</h4>
                                <p className="text-sm text-gray-300">{contact.value}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
        <ArrowUp className="w-6 h-6 text-black" />
      </button>
    </div>
  );
}
