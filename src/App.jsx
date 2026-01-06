import React, { useState, useEffect } from 'react';

// --- ÍCONES SVG NATIVOS (Zero Dependências) ---
const Icons = {
  Code2: ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>,
  BrainCircuit: ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-1.4 4.5 4.5 0 0 1-3 1.4"/><path d="M12 13v5"/><path d="M9 13v5"/><path d="M15 13v5"/></svg>,
  Rocket: ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1s.25 1.13.5 1.5"/></svg>,
  Terminal: ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>,
  Smartphone: ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>,
  Cpu: ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>,
  MessageSquare: ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  ArrowUpRight: ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>,
  ChevronRight: ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>,
  Instagram: ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>,
  Linkedin: ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
  Youtube: ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>,
  Tiktok: ({ className }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>,
  Kwai: ({ className }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M22 6H2C.9 6 0 6.9 0 8v8c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 9H8v-2h8v2zm3.5-3H5.5V9H19.5v3z" /><path d="M9.5 13.5l5-3 5 3-5-3z" fill="none" /><path d="M14.5 10.5l-5 3v-6l5 3z" /></svg>
};

// --- CONFIGURAÇÃO DE DADOS ---
const SITE_DATA = {
  whatsapp: "5561998620705",
  hero: {
    title: "GLAUCO",
    suffix: ".DIGITAL",
    subtitle: "ESTRATÉGIA • IA • DESENVOLVIMENTO",
    tagline: "Do conceito ao código. Sem intermediários."
  },
  stats: [
    { label: "De Mercado", value: "12 Anos" },
    { label: "Profissional", value: "Senior" },
    { label: "Compromisso", value: "Agilidade" }
  ],
  socials: [
    { name: "Instagram", url: "https://www.instagram.com/glauco.digital?igsh=MWZsMm5ocnY3Yjlucw%3D%3D&utm_source=qr", icon: "Instagram", color: "hover:text-pink-500" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/glauco-martins-73034b96?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", icon: "Linkedin", color: "hover:text-blue-500" },
    { name: "YouTube", url: "https://youtube.com/@coproducaoinfinita?si=jgYrOz7-TAQ5nTD8", icon: "Youtube", color: "hover:text-red-500" },
    { name: "TikTok", url: "https://www.tiktok.com/@glaucodigital?_r=1&_t=ZS-92qPL7Z74sC", icon: "Tiktok", color: "hover:text-cyan-400" },
    { name: "Kwai", url: "https://k.kwai.com/u/@Articulador/zwjWCvDm", icon: "Kwai", color: "hover:text-orange-500" }
  ],
  services: [
    {
      id: "dev",
      category: "BUILD",
      title: "Fábrica de Software",
      desc: "Não construímos apenas 'sistemas'. Desenvolvemos ativos digitais blindados. Engenharia de software de elite, arquitetura robusta e escalabilidade infinita para quem joga o jogo dos grandes.",
      icon: "Code2",
      color: "text-teal-400",
      size: "large"
    },
    {
      id: "app",
      category: "MOBILE",
      title: "Apps Nativos",
      desc: "iOS e Android. Sua ideia publicada nas lojas com performance nativa.",
      icon: "Smartphone",
      color: "text-teal-300",
      size: "medium"
    },
    {
      id: "mkt",
      category: "SPRINT",
      title: "Marketing & IA",
      desc: "Conteúdo gerado por IA com curadoria humana estratégica.",
      icon: "BrainCircuit",
      color: "text-emerald-400",
      size: "medium"
    },
    {
      id: "consult",
      category: "STRATEGY",
      title: "Consultoria Tech",
      desc: "Diagnóstico e Transformação Digital.",
      icon: "Terminal",
      color: "text-cyan-400",
      size: "small"
    },
    {
      id: "ads",
      category: "GROWTH",
      title: "Tráfego Pago",
      desc: "Gestão de performance e conversão.",
      icon: "Rocket",
      color: "text-teal-500",
      size: "small"
    }
  ],
  stack: ["REACT", "PYTHON", "AWS", "NODE.JS", "OPENAI", "FLUTTER", "NEXT.JS", "FIREBASE"]
};

// --- COMPONENTES VISUAIS ---

const BackgroundGrid = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-[#0B1120]"></div>
    <div className="absolute inset-0 opacity-[0.03]" 
      style={{ 
        backgroundImage: 'linear-gradient(#2DD4BF 1px, transparent 1px), linear-gradient(90deg, #2DD4BF 1px, transparent 1px)', 
        backgroundSize: '50px 50px' 
      }}>
    </div>
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-custom"></div>
    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
  </div>
);

const SocialCard = () => (
  <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-6 col-span-1 flex flex-col justify-between hover:border-teal-500/50 transition-colors animate-fade-in" style={{ animationDelay: '0.6s' }}>
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-mono tracking-widest text-teal-500/70 border border-teal-900/50 px-2 py-1 rounded bg-teal-950/30">
          SOCIAL
        </span>
      </div>
      <h3 className="font-bold text-slate-100 mb-4 text-xl">Conecte-se</h3>
    </div>
    
    <div className="grid grid-cols-3 gap-3">
      {SITE_DATA.socials.map((social, idx) => {
        const IconComponent = Icons[social.icon];
        return (
          <a 
            key={idx}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex items-center justify-center p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 
              text-slate-400 transition-all duration-300 hover:scale-110 hover:bg-slate-800 ${social.color}
            `}
            title={social.name}
          >
            <IconComponent className="w-6 h-6" />
          </a>
        );
      })}
    </div>
  </div>
);

const ServiceCard = ({ service, index }) => {
  const IconComponent = Icons[service.icon] || Icons.Cpu;
  
  let gridClass = "col-span-1";
  if (service.size === "large") gridClass = "md:col-span-2 md:row-span-2";
  
  return (
    <div
      className={`
        relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-6 cursor-pointer
        ${gridClass}
        hover:border-teal-500/50 transition-all duration-300 flex flex-col hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(45,212,191,0.15)]
        animate-fade-in
      `}
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
        <Icons.ArrowUpRight className="w-5 h-5 text-teal-400" />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-mono tracking-widest text-teal-500/70 border border-teal-900/50 px-2 py-1 rounded bg-teal-950/30">
            {service.category}
          </span>
        </div>
        
        <IconComponent className={`w-8 h-8 mb-4 ${service.color}`} />
        
        <h3 className={`font-bold text-slate-100 mb-2 ${service.size === 'large' ? 'text-2xl' : 'text-xl'}`}>
          {service.title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed">
          {service.desc}
        </p>
      </div>

      {service.size === 'large' && (
         <div className="mt-6 flex items-center gap-2 text-teal-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
           <span>Ver escopo técnico</span>
           <Icons.ChevronRight className="w-4 h-4" />
         </div>
      )}
      
      {/* Efeito Scanline */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-400/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
    </div>
  );
};

const Header = () => {
  const openWhatsapp = () => window.open(`https://wa.me/${SITE_DATA.whatsapp}`, '_blank');
  
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0B1120]/80 backdrop-blur-lg border-b border-slate-800/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-1 font-bold text-lg tracking-tighter">
          <span className="text-slate-100">GLAUCO</span>
          <span className="text-teal-400">.DIGITAL</span>
        </div>
        <button 
          onClick={openWhatsapp}
          className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 px-4 py-2 rounded-lg text-xs font-mono border border-teal-500/30 transition-all flex items-center gap-2 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)]"
        >
          <Icons.MessageSquare className="w-3 h-3" />
          FALAR AGORA
        </button>
      </div>
    </nav>
  );
};

const TechTicker = ({ stack }) => (
  <div className="w-full overflow-hidden bg-slate-900/80 border-y border-slate-800 py-3 mt-12">
    <div className="flex whitespace-nowrap gap-12 animate-scroll">
      {[...stack, ...stack, ...stack, ...stack].map((tech, i) => (
        <span key={i} className="text-slate-500 font-mono text-sm font-bold tracking-widest flex items-center gap-2">
          <span className="w-1 h-1 bg-teal-500 rounded-full"></span>
          {tech}
        </span>
      ))}
    </div>
  </div>
);

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openWhatsapp = () => window.open(`https://wa.me/${SITE_DATA.whatsapp}`, '_blank');

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 selection:bg-teal-500/30 font-sans">
      {/* CSS PERSONALIZADO INJETADO */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse-custom {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-pulse-custom {
          animation: pulse-custom 2s ease-in-out infinite;
        }
      `}</style>

      <BackgroundGrid />
      <Header />

      <main className="relative z-10 pt-32 px-6 max-w-6xl mx-auto pb-20">
        
        {/* HERO SECTION */}
        <section className="mb-20 animate-fade-in">
          <div className="inline-block px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/5 text-teal-400 text-xs font-mono mb-6 animate-pulse-custom">
            ● DISPONÍVEL PARA NOVOS PROJETOS
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            {SITE_DATA.hero.title}<span className="text-teal-400">{SITE_DATA.hero.suffix}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed">
            {SITE_DATA.hero.subtitle}
            <br/>
            <span className="text-teal-500/80 text-lg mt-2 block">{SITE_DATA.hero.tagline}</span>
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mt-12 max-w-md border-t border-slate-800 pt-8">
            {SITE_DATA.stats.map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* BENTO GRID MENU */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest">
              // Serviços & Conexões
            </h2>
            <div className="h-px bg-slate-800 flex-1 ml-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
            {/* Cards de Serviço */}
            {SITE_DATA.services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
            
            {/* Card Social */}
            <SocialCard />
          </div>
        </section>

      </main>

      <TechTicker stack={SITE_DATA.stack} />
      
      {/* Botão Flutuante WhatsApp */}
      <button 
        onClick={openWhatsapp}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full p-4 shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
      >
        <Icons.MessageSquare className="w-6 h-6 fill-current" />
      </button>
    </div>
  );
}
