import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  BrainCircuit,
  Rocket,
  ChevronRight,
  Terminal,
  Smartphone,
  Cpu,
  MessageSquare,
  ArrowUpRight,
  Instagram,
  Linkedin,
  Youtube,
  Link as LinkIcon,
  Target,
  Zap,
  CheckCircle2,
  Monitor,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckSquare,
  Search,
  Calendar,
  Mail,
  Play
} from 'lucide-react';

// --- ÍCONES CUSTOMIZADOS ---
const TiktokIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const KwaiIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 6H2C.9 6 0 6.9 0 8v8c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 9H8v-2h8v2zm3.5-3H5.5V9H19.5v3z" />
    <path d="M9.5 13.5l5-3 5 3-5-3z" fill="none" />
    <path d="M14.5 10.5l-5 3v-6l5 3z" />
  </svg>
);

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
    { name: "Instagram", url: "https://www.instagram.com/glauco.digital?igsh=MWZsMm5ocnY3Yjlucw%3D%3D&utm_source=qr", icon: Instagram, color: "hover:text-pink-500" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/glauco-martins-73034b96?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", icon: Linkedin, color: "hover:text-blue-500" },
    { name: "YouTube", url: "https://youtube.com/@coproducaoinfinita?si=jgYrOz7-TAQ5nTD8", icon: Youtube, color: "hover:text-red-500" },
    { name: "TikTok", url: "https://www.tiktok.com/@glaucodigital?_r=1&_t=ZS-92qPL7Z74sC", icon: TiktokIcon, color: "hover:text-cyan-400" },
    { name: "Kwai", url: "https://k.kwai.com/u/@Articulador/zwjWCvDm", icon: KwaiIcon, color: "hover:text-orange-500" }
  ],
  services: [
    { id: "dev", category: "BUILD", title: "Fábrica de Software", desc: "Desenvolvimento de ativos digitais blindados. Engenharia de software de elite.", icon: "Code2", color: "text-teal-400" },
    { id: "app", category: "MOBILE", title: "Apps Nativos", desc: "iOS e Android. Sua ideia publicada nas lojas.", icon: "Smartphone", color: "text-teal-300" },
    { id: "mkt", category: "SPRINT", title: "Marketing & IA", desc: "Conteúdo gerado por IA com curadoria humana.", icon: "BrainCircuit", color: "text-emerald-400" },
    { id: "consult", category: "STRATEGY", title: "Consultoria Tech", desc: "Transformação Digital.", icon: "Terminal", color: "text-cyan-400" },
    { id: "ads", category: "GROWTH", title: "Tráfego Pago", desc: "Gestão de performance.", icon: "Rocket", color: "text-teal-500" }
  ],
  stack: ["REACT", "PYTHON", "AWS", "NODE.JS", "OPENAI", "FLUTTER", "NEXT.JS", "FIREBASE"]
};

const SCANNER_QUESTIONS = [
  { id: 1, type: 'text', title: "Vamos começar.", subtitle: "Para criar seu diagnóstico, qual seu nome e o do seu negócio?", field: "name", placeholder: "Ex: João / Minha Empresa" },
  {
    id: 2, type: 'multiselect', title: "O que você busca?", subtitle: "Selecione tudo que faz sentido (Pode marcar vários).", field: "services", options: [
      { label: "Gestão Redes Sociais", icon: CheckCircle2 }, { label: "Tráfego Pago (Ads)", icon: Rocket },
      { label: "Site / Landing Page", icon: Monitor }, { label: "App / Sistema", icon: Smartphone }, { label: "Consultoria", icon: BrainCircuit }
    ]
  },
  {
    id: 3, type: 'multiselect', title: "Objetivos Principais", subtitle: "Onde você quer chegar?", field: "goals", options: [
      { label: "Vender Mais", icon: Target }, { label: "Automatizar Processos", icon: Zap },
      { label: "Posicionamento", icon: CheckCircle2 }, { label: "Lançar Nova Ideia", icon: Rocket }
    ]
  },
  {
    id: 4, type: 'select', title: "Estágio Atual", subtitle: "Em que momento o negócio está?", field: "stage", options: [
      { label: "Apenas uma Ideia", icon: BrainCircuit }, { label: "Já faturo, quero escalar", icon: Rocket }, { label: "Consolidado", icon: Target }
    ]
  },
  {
    id: 5, type: 'select', title: "Prazo Ideal", subtitle: "Qual a urgência?", field: "timeline", options: [
      { label: "Ontem (Urgente)", icon: Zap }, { label: "Em 30 dias", icon: Clock }, { label: "Planejamento Futuro", icon: BrainCircuit }
    ]
  },
  { id: 6, type: 'contact', title: "Gerando Diagnóstico...", subtitle: "Qual seu WhatsApp para receber o plano?", field: "phone", placeholder: "Ex: 61 99999-9999" }
];

const BLOG_POSTS = [
  { id: 1, title: "O Fim dos Apps Tradicionais? A Era da IA Generativa", excerpt: "Como a IA está reescrevendo o código e permitindo softwares em tempo real.", category: "Inteligência Artificial", date: "12 Out, 2023", readTime: "5 min", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800", featured: true },
  { id: 2, title: "Marketing 5.0: Hiperpersonalização em Escala", excerpt: "Esqueça a segmentação demográfica. Venda para o indivíduo.", category: "Marketing", date: "10 Out, 2023", readTime: "4 min", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Python vs Node.js: Backend em 2024?", excerpt: "Análise técnica de performance e escalabilidade.", category: "Dev & Tech", date: "08 Out, 2023", readTime: "8 min", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Automação com WhatsApp API", excerpt: "Integrando ChatGPT ao atendimento 24/7.", category: "Automação", date: "05 Out, 2023", readTime: "6 min", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800" }
];

const ARTICLE_DATA = {
  title: "O Fim dos Apps Tradicionais? A Era da IA Generativa",
  subtitle: "Como a inteligência artificial está reescrevendo o código e permitindo que softwares sejam criados em tempo real.",
  category: "Inteligência Artificial",
  date: "12 Out, 2023",
  readTime: "5 min",
  author: "Glauco Martins",
  mainImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
  youtubeId: "Sqa8Zo2XWc4"
};

// --- COMPONENTES VISUAIS ---

const IconMap = ({ name, className }) => {
  const icons = {
    Code2: <Code2 className={className} />,
    BrainCircuit: <BrainCircuit className={className} />,
    Rocket: <Rocket className={className} />,
    Terminal: <Terminal className={className} />,
    Smartphone: <Smartphone className={className} />,
    Cpu: <Cpu className={className} />,
    MessageSquare: <MessageSquare className={className} />
  };
  return icons[name] || <Cpu className={className} />;
};

const BackgroundGrid = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-[#060B15]"></div>
    <div className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage: 'linear-gradient(#2DD4BF 0.5px, transparent 0.5px), linear-gradient(90deg, #2DD4BF 0.5px, transparent 0.5px)',
        backgroundSize: '35px 35px'
      }}>
    </div>
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] mix-blend-screen"></div>
  </div>
);


const Header = ({ navigate }) => {
  const openWhatsapp = () => window.open(`https://wa.me/${SITE_DATA.whatsapp}`, '_blank');

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#060B15]/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-1 font-bold text-lg tracking-tighter cursor-pointer" onClick={() => navigate('home')} translate="no">
          <span className="text-white">GLAUCO</span>
          <span className="text-teal-400">.DIGITAL</span>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate('blog')} className="text-xs font-mono text-slate-400 hover:text-white transition-colors tracking-widest uppercase">
              BLOG / INSIGHTS
            </button>
          </div>
          <button
            onClick={openWhatsapp}
            className="group relative px-4 py-2 text-xs font-mono font-bold tracking-widest transition-all"
          >
            <div className="absolute inset-0 border border-teal-500/30 rounded-lg group-hover:border-teal-500/60 transition-colors"></div>
            <div className="relative flex items-center gap-2 text-teal-400">
              <MessageSquare className="w-3.5 h-3.5" />
              FALAR AGORA
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

const TechTicker = ({ stack }) => (
  <div className="w-full overflow-hidden bg-slate-900/40 border-y border-white/5 py-4">
    <motion.div
      className="flex whitespace-nowrap gap-16"
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
    >
      {[...stack, ...stack, ...stack].map((tech, i) => (
        <span key={i} className="text-slate-600 font-mono text-[10px] font-bold tracking-[0.2em] flex items-center gap-3">
          <div className="w-1 h-1 bg-teal-500 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.5)]"></div>
          {tech}
        </span>
      ))}
    </motion.div>
  </div>
);

// --- VIEWS ---

const HomeView = ({ navigate }) => {
  const openWhatsapp = () => window.open(`https://wa.me/${SITE_DATA.whatsapp}`, '_blank');

  return (
    <main className="relative z-10 pt-40 px-6 max-w-6xl mx-auto pb-32">
      {/* HERO SECTION */}
      <section className="mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-400 text-[10px] font-mono mb-8 tracking-widest">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            DISPONÍVEL PARA PROJETOS
          </div>

          <h1 className="text-[clamp(1.8rem,10vw,5rem)] md:text-[clamp(3.5rem,7vw,8rem)] font-extrabold tracking-tighter text-white mb-8 leading-[0.9] break-words w-full" translate="no">
            {SITE_DATA.hero.title}<span className="text-teal-400">{SITE_DATA.hero.suffix}</span>
          </h1>

          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold tracking-[0.15em] text-slate-400 mb-2">
              {SITE_DATA.hero.subtitle}
            </h2>
            <p className="text-teal-500/70 text-lg font-medium tracking-wide">{SITE_DATA.hero.tagline}</p>
          </div>

          <div className="flex flex-wrap gap-4 mb-20">
            <button
              onClick={() => navigate('scanner')}
              className="group relative px-8 py-4 bg-teal-500 text-slate-900 font-bold text-sm tracking-widest rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(45,212,191,0.2)]"
            >
              <div className="relative z-10 flex items-center gap-2">
                INICIAR PROJETO
                <Rocket className="w-4 h-4" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>

            <button onClick={() => navigate('blog')} className="px-8 py-4 border border-white/10 text-white font-bold text-sm tracking-widest rounded-xl hover:bg-white/5 transition-all">
              VER INSIGHTS
            </button>
          </div>

          {/* Stats Grid */}
          <div className="flex flex-wrap gap-x-12 gap-y-6 max-w-2xl border-t border-white/5 pt-10">
            {SITE_DATA.stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* BENTO GRID MENU */}
      <section>
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.3em] whitespace-nowrap">
            // SERVIÇOS & CONEXÕES
          </h2>
          <div className="h-px bg-white/5 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SITE_DATA.services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} onClick={() => navigate('scanner')} />
          ))}

          <SocialCard />
        </div>
      </section>
    </main>
  );
};

const ScannerView = ({ navigate }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [multiSelect, setMultiSelect] = useState([]);
  const [diagnosis, setDiagnosis] = useState(null);

  const handleNext = (val) => {
    const q = SCANNER_QUESTIONS[step];
    const newAnswers = { ...answers, [q.field]: val };
    setAnswers(newAnswers);
    setInputValue("");
    setMultiSelect([]);

    if (step < SCANNER_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate logic
      const services = newAnswers.services || [];
      let res = { type: "Projeto Digital", price: "R$ 5k - 15k", time: "30 Dias", complexity: "Média" };
      if (services.includes("App / Sistema")) { res = { type: "Desenvolvimento High-End", price: "R$ 15k a R$ 40k+", time: "2 a 4 Meses", complexity: "Alta" }; }
      else if (services.includes("Site / Landing Page") && !services.includes("App / Sistema")) { res = { type: "Web & Presença", price: "R$ 3k a R$ 8k", time: "15 a 30 Dias", complexity: "Média" }; }
      else if ((services.includes("Tráfego Pago (Ads)") || services.includes("Gestão Redes Sociais")) && services.length === 1) { res = { type: "Growth Recorrente", price: "R$ 2k a R$ 5k / mês", time: "Contínuo", complexity: "Growth" }; }

      setDiagnosis(res);
      setIsCalculating(true);
      setTimeout(() => { setIsCalculating(false); setShowResult(true); }, 2500);
    }
  };

  const toggleMulti = (label) => {
    if (multiSelect.includes(label)) setMultiSelect(multiSelect.filter(i => i !== label));
    else setMultiSelect([...multiSelect, label]);
  };

  const sendWhatsapp = () => {
    const text = `Olá Glauco! Fiz o diagnóstico.\n*Nome:* ${answers.name}\n*Interesse:* ${Array.isArray(answers.services) ? answers.services.join(', ') : ''}\n*Perfil:* ${diagnosis.type}\nEstimativa: ${diagnosis.price}`;
    window.open(`https://wa.me/${SITE_DATA.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (showResult && diagnosis) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#060B15] relative overflow-hidden z-20">
        <div className="max-w-md w-full bg-[#0B1120]/80 backdrop-blur-xl border border-teal-500/30 rounded-3xl p-8 relative z-10 shadow-[0_0_40px_rgba(45,212,191,0.1)]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/10 mb-4 border border-teal-500/50 text-teal-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Diagnóstico Concluído</h2>
            <p className="text-slate-400 text-sm">Perfil: <span className="text-teal-400 font-bold">{diagnosis.type}</span></p>
          </div>
          <div className="space-y-4 mb-8">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 flex justify-between">
              <span className="text-slate-400">Complexidade</span>
              <span className="text-white font-bold">{diagnosis.complexity}</span>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 flex justify-between">
              <span className="text-slate-400">Tempo Estimado</span>
              <span className="text-white font-bold">{diagnosis.time}</span>
            </div>
            <div className="bg-teal-900/20 p-6 rounded-xl border border-teal-500/30 text-center">
              <span className="text-slate-400 text-xs uppercase tracking-widest text-[10px]">Investimento Sugerido</span>
              <div className="text-2xl font-bold text-white mt-2">{diagnosis.price}</div>
            </div>
          </div>
          <button onClick={sendWhatsapp} className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg shadow-teal-500/20">
            <MessageSquare className="w-5 h-5" /> RECEBER PLANO TÉCNICO
          </button>
          <button onClick={() => navigate('home')} className="w-full mt-4 text-slate-500 text-sm hover:text-white transition-colors">Voltar ao Início</button>
        </div>
      </div>
    );
  }

  if (isCalculating) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#060B15] p-6 z-20 relative">
      <div className="w-24 h-24 border-4 border-slate-800 border-t-teal-500 rounded-full animate-spin mb-8"></div>
      <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">Analisando Perfil...</h2>
      <div className="font-mono text-teal-400 text-sm">Cruzando dados...</div>
    </div>
  );

  const q = SCANNER_QUESTIONS[step];
  const progress = ((step + 1) / SCANNER_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#060B15] text-slate-200 font-sans flex flex-col relative z-20 overflow-hidden">
      <div className="w-full h-1 bg-slate-900 fixed top-0 left-0 z-50">
        <div className="h-full bg-teal-500 shadow-[0_0_10px_#2DD4BF] transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="p-6 flex justify-between items-center z-10">
        <div className="text-[10px] font-mono font-bold text-teal-500/50 tracking-widest uppercase">ETAPA {step + 1}/{SCANNER_QUESTIONS.length}</div>
        <button onClick={() => navigate('home')} className="text-slate-500 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors">CANCELAR</button>
      </div>
      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full p-6 z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tighter">{q.title}</h1>
        <p className="text-lg md:text-xl text-slate-400 mb-10 font-medium">{q.subtitle}</p>

        {(q.type === 'text' || q.type === 'contact') && (
          <div className="space-y-4">
            <input
              type={q.type === 'contact' ? 'tel' : 'text'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={q.placeholder}
              className="w-full bg-[#0B1120]/50 border border-white/5 rounded-2xl p-6 text-xl text-white focus:outline-none focus:border-teal-500/50 transition-all font-medium"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && inputValue && handleNext(inputValue)}
            />
            <button
              onClick={() => inputValue && handleNext(inputValue)}
              disabled={!inputValue}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all tracking-widest text-sm ${inputValue ? 'bg-teal-500 text-slate-900 hover:bg-teal-400' : 'bg-slate-900 text-slate-600 cursor-not-allowed'}`}
            >
              {q.type === 'contact' ? 'VER RESULTADO' : 'PRÓXIMO'} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
        {q.type === 'multiselect' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {q.options.map((opt, idx) => {
                const isSel = multiSelect.includes(opt.label);
                const Icon = opt.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => toggleMulti(opt.label)}
                    className={`text-left p-6 border rounded-2xl transition-all flex items-center gap-4 ${isSel ? 'bg-teal-500/10 border-teal-500/50' : 'bg-[#0B1120]/50 border-white/5 hover:border-teal-500/20'}`}
                  >
                    <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${isSel ? 'bg-teal-500 border-teal-500 text-slate-900' : 'border-slate-700 text-transparent'}`}>
                      <CheckSquare className="w-4 h-4" />
                    </div>
                    <span className={`text-lg font-bold tracking-tight ${isSel ? 'text-white' : 'text-slate-400'}`}>{opt.label}</span>
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => handleNext(multiSelect)}
              disabled={multiSelect.length === 0}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all tracking-widest text-sm ${multiSelect.length > 0 ? 'bg-teal-500 text-slate-900 hover:bg-teal-400' : 'bg-slate-900 text-slate-600 cursor-not-allowed'}`}
            >
              CONTINUAR <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
        {q.type === 'select' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {q.options.map((opt, idx) => {
              const Icon = opt.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleNext(opt.label)}
                  className="group text-left p-6 bg-[#0B1120]/50 border border-white/5 rounded-2xl hover:border-teal-500/30 hover:bg-slate-900/50 transition-all flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors text-slate-600 group-hover:text-teal-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-bold text-slate-400 group-hover:text-white tracking-tight">{opt.label}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const BlogView = ({ navigate }) => {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = BLOG_POSTS.filter(p => (filter === "Todos" || p.category === filter) && p.title.toLowerCase().includes(search.toLowerCase()));
  const featured = BLOG_POSTS.find(p => p.featured);
  const list = filtered.filter(p => !p.featured || filter !== "Todos" || search);

  return (
    <div className="min-h-screen bg-[#060B15] pb-20 relative z-20">
      <main className="pt-40 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tighter">Insights <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">&</span> Tendências</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">Mergulho profundo em Marketing Digital, IA e Dev.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-white/5 pb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {["Todos", "Inteligência Artificial", "Marketing", "Dev & Tech", "Automação"].map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-[10px] font-mono font-bold tracking-widest transition-all uppercase border ${filter === cat ? 'bg-teal-500 text-slate-900 border-teal-500' : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'}`}>{cat}</button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input type="text" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-[#0B1120]/50 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500/50 transition-all font-medium" />
          </div>
        </div>

        {filter === "Todos" && !search && featured && (
          <div onClick={() => navigate('article')} className="relative group overflow-hidden rounded-3xl border border-white/5 bg-[#0B1120]/50 hover:border-teal-500/20 transition-all duration-500 mb-12 cursor-pointer shadow-lg hover:shadow-teal-500/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-teal-500/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center relative">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded border border-teal-500/20 bg-teal-500/5 text-teal-400 text-[10px] font-mono tracking-widest uppercase">{featured.category}</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tighter group-hover:text-teal-40 transition-colors uppercase italic">{featured.title}</h2>
                <p className="text-slate-400 mb-8 leading-relaxed font-medium">{featured.excerpt}</p>
                <div className="flex items-center gap-2 text-teal-400 font-bold text-xs tracking-widest group-hover:translate-x-2 transition-transform uppercase">LER ARTIGO <ArrowRight className="w-4 h-4" /></div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map(post => (
            <div key={post.id} onClick={() => navigate('article')} className="group relative bg-[#0B1120]/50 border border-white/5 rounded-2xl overflow-hidden hover:border-teal-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full shadow-md">
              <div className="h-48 overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-[10px] text-slate-500 mb-4 flex items-center gap-3 font-mono tracking-widest uppercase">
                  <span>{post.date}</span>
                  <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-4 leading-tight group-hover:text-teal-400 transition-colors tracking-tight">{post.title}</h3>
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-teal-500/80 text-[10px] font-mono tracking-widest group-hover:text-teal-400 uppercase font-bold">
                  <span>LER AGORA</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const ArticleView = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-[#060B15] selection:bg-teal-500/30 relative z-20">
      <main className="pt-40 px-6 max-w-3xl mx-auto pb-24">
        <header className="mb-12">
          <button onClick={() => navigate('blog')} className="text-slate-500 hover:text-white flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest transition-colors mb-10 uppercase">
            <ArrowLeft className="w-4 h-4" /> VOLTAR AO BLOG
          </button>
          <div className="flex items-center gap-4 text-[10px] font-mono mb-6 tracking-widest font-bold uppercase">
            <span className="text-teal-400 bg-teal-500/10 px-3 py-1 rounded border border-teal-500/20">{ARTICLE_DATA.category}</span>
            <span className="text-slate-500 flex items-center gap-1"><Calendar className="w-4 h-4" /> {ARTICLE_DATA.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tighter uppercase italic">{ARTICLE_DATA.title}</h1>
          <p className="text-xl text-slate-400 leading-relaxed font-medium">{ARTICLE_DATA.subtitle}</p>
        </header>

        <div className="mb-12 rounded-2xl overflow-hidden border border-white/5 shadow-2xl relative group">
          <div className="absolute inset-0 bg-teal-500/5 mix-blend-overlay z-10"></div>
          <img src={ARTICLE_DATA.mainImage} alt="Capa" className="w-full h-auto object-cover" />
        </div>

        <div className="prose-luxury text-slate-300 font-medium">
          <p className="text-lg mb-8 leading-relaxed">Estamos vivendo uma mudança de paradigma comparável ao surgimento da internet. Até ontem, desenvolver um aplicativo exigia meses de codificação. <strong className="text-teal-400">Hoje, a IA Generativa mudou as regras do jogo.</strong></p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 tracking-tight">A Nova Velocidade do Mercado</h2>
          <p className="mb-8 leading-relaxed">Ferramentas como o GPT-4 e Copilot não estão apenas "ajudando" programadores; elas estão escrevendo sistemas inteiros.</p>

          <blockquote className="border-l-4 border-teal-500 bg-teal-500/5 p-8 rounded-r-2xl my-12 italic text-xl text-slate-200">
            "O maior risco para o seu negócio hoje não é a concorrência tradicional, é a velocidade com que uma IA pode replicar e melhorar seu modelo."
          </blockquote>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 tracking-tight">Veja na Prática</h2>
          <p className="mb-8 leading-relaxed">Neste vídeo, analiso como agentes autônomos substituem interfaces complexas.</p>

          <div className="my-12 relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-slate-900 aspect-video w-full">
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${ARTICLE_DATA.youtubeId}`} title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6 tracking-tight">O Que Isso Significa?</h2>
          <p className="mb-8 leading-relaxed">A barreira de entrada técnica desmoronou. Agora, a vantagem competitiva é a <strong className="text-teal-400">estratégia de implementação</strong>.</p>
          <ul className="list-disc pl-6 space-y-4 mb-8">
            <li>Automação de atendimento que realmente funciona.</li>
            <li>Criação de conteúdo personalizado em escala.</li>
          </ul>
        </div>

        <div className="mt-20 relative overflow-hidden rounded-3xl bg-[#0B1120] border border-teal-500/20 p-8 md:p-12 text-center shadow-[0_0_50px_rgba(45,212,191,0.05)]">
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/10 mb-6 text-teal-400 border border-teal-500/50"><Zap className="w-8 h-8" /></div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tighter uppercase italic">Quer aplicar isso no seu negócio?</h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto font-medium">Descubra exatamente o que sua empresa precisa para escalar. Faça um diagnóstico gratuito.</p>
            <button onClick={() => navigate('scanner')} className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold px-8 py-4 rounded-xl text-sm tracking-widest transition-all hover:scale-105 shadow-lg shadow-teal-500/20 uppercase">FAZER DIAGNÓSTICO GRATUITO</button>
          </div>
        </div>
      </main>

      {/* FOOTER ARTIGO */}
      <footer className="border-t border-white/5 bg-[#060B15] py-16 text-center">
        <div className="flex justify-center gap-8 mb-8">
          {SITE_DATA.socials.map((social, idx) => {
            const Icon = social.icon;
            return <a key={idx} href={social.url} target="_blank" className="text-slate-500 hover:text-teal-400 transition-all hover:scale-110"><Icon className="w-6 h-6" /></a>
          })}
        </div>
        <div className="text-slate-700 text-[10px] font-mono font-bold tracking-widest uppercase">© 2026 GLAUCO.DIGITAL / TODOS OS DIREITOS RESERVADOS</div>
      </footer>
    </div>
  );
};

// --- APP PRINCIPAL ---

export default function App() {
  const [view, setView] = useState('home'); // home, scanner, blog, article
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navigate = (newView) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsapp = () => window.open(`https://wa.me/${SITE_DATA.whatsapp}`, '_blank');

  return (
    <div className="min-h-screen bg-[#060B15] text-slate-200 selection:bg-teal-500/30 font-sans overflow-x-hidden">
      <BackgroundGrid />
      <Header navigate={navigate} />

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {view === 'home' && <HomeView navigate={navigate} />}
          {view === 'scanner' && <ScannerView navigate={navigate} />}
          {view === 'blog' && <BlogView navigate={navigate} />}
          {view === 'article' && <ArticleView navigate={navigate} />}
        </motion.div>
      </AnimatePresence>

      <TechTicker stack={SITE_DATA.stack} />

      {/* Botão Flutuante WhatsApp (Apenas na Home e Blog) */}
      {(view === 'home' || view === 'blog') && (
        <motion.button
          onClick={openWhatsapp}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 bg-[#2DD4BF] text-slate-900 rounded-full p-4 shadow-[0_10px_30px_rgba(45,212,191,0.3)] flex items-center justify-center transition-all hover:shadow-[0_15px_40px_rgba(45,212,191,0.4)]"
        >
          <MessageSquare className="w-6 h-6 fill-current" />
        </motion.button>
      )}
    </div>
  );
}

const ServiceCard = ({ service, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="relative group overflow-hidden rounded-2xl border border-white/5 bg-[#0B1120]/50 backdrop-blur-sm p-8 cursor-pointer hover:border-teal-500/20 transition-all duration-300 flex flex-col h-full shadow-lg"
    >
      <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="w-5 h-5 text-teal-400" />
      </div>

      <div className="mb-6">
        <div className="inline-block px-2 py-0.5 rounded border border-teal-500/10 bg-teal-500/5 text-teal-400 text-[9px] font-mono tracking-widest uppercase mb-6">
          {service.category}
        </div>
        <IconMap name={service.icon} className={`w-10 h-10 mb-6 ${service.color}`} />
      </div>

      <h3 className="font-bold text-white mb-3 text-2xl tracking-tight">
        {service.title}
      </h3>

      <p className="text-slate-400 text-sm leading-relaxed font-medium">
        {service.desc}
      </p>

      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-teal-500/0 to-teal-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
};

const SocialCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.5 }}
    whileHover={{ y: -5 }}
    className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#0B1120]/50 backdrop-blur-sm p-8 group hover:border-teal-500/20 transition-all shadow-lg"
  >
    <div className="mb-6">
      <div className="inline-block px-2 py-0.5 rounded border border-teal-500/10 bg-teal-500/5 text-teal-400 text-[9px] font-mono tracking-widest uppercase mb-6">
        SOCIAL
      </div>
      <h3 className="font-bold text-white mb-6 text-2xl tracking-tight">Conecte-se</h3>
    </div>

    <div className="grid grid-cols-3 gap-3">
      {SITE_DATA.socials.map((social, idx) => (
        <a
          key={idx}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-4 rounded-xl bg-white/[0.02] border border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.05] hover:border-teal-500/20 transition-all duration-300"
          title={social.name}
        >
          <social.icon className="w-6 h-6" />
        </a>
      ))}
      <div className="flex items-center justify-center p-4 rounded-xl bg-white/[0.02] border border-white/5 text-teal-400">
        <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
          <ChevronRight className="w-3.5 h-3.5 mt-0.5 ml-0.5" />
        </div>
      </div>
    </div>
  </motion.div>
);
