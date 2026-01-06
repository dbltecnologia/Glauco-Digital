<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glauco.Digital | Estratégia, IA e Desenvolvimento</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- React & ReactDOM -->
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    
    <!-- Babel -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap');
        
        body { 
            font-family: 'Inter', sans-serif; 
            background-color: #0B1120; 
            margin: 0;
            padding: 0;
            color: #F1F5F9;
        }
        
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        /* Animações Globais */
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
        @keyframes spin-custom {
            to { transform: rotate(360deg); }
        }
        @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }

        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        .animate-scroll { animation: scroll 30s linear infinite; }
        .animate-pulse-custom { animation: pulse-custom 2s ease-in-out infinite; }
        .animate-spin-custom { animation: spin-custom 1s linear infinite; }
        
        .neon-glow { box-shadow: 0 0 20px rgba(45, 212, 191, 0.15); }
        
        .scanline-effect {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(to bottom, transparent 0%, rgba(45, 212, 191, 0.1) 50%, transparent 100%);
            animation: scanline 2s linear infinite;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .group:hover .scanline-effect { opacity: 1; }
        
        /* Estilos de Texto Rico (Artigo) */
        .prose-custom p { margin-bottom: 1.5rem; color: #94A3B8; font-size: 1.125rem; line-height: 1.8; }
        .prose-custom h2 { color: #F1F5F9; font-weight: 800; font-size: 1.875rem; margin-top: 3rem; margin-bottom: 1.5rem; }
        .prose-custom ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; color: #94A3B8; }
        .prose-custom li { margin-bottom: 0.5rem; }
        .prose-custom strong { color: #2DD4BF; font-weight: 600; }
        .prose-custom blockquote { 
            border-left: 4px solid #2DD4BF; 
            padding-left: 1.5rem; 
            font-style: italic; 
            color: #CBD5E1; 
            background: rgba(45, 212, 191, 0.05);
            padding: 1.5rem;
            border-radius: 0 1rem 1rem 0;
            margin: 2rem 0;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect } = React;

        // --- 1. BIBLIOTECA DE ÍCONES UNIFICADA ---
        const Icons = {
            Code2: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>,
            BrainCircuit: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-1.4 4.5 4.5 0 0 1-3 1.4"/><path d="M12 13v5"/><path d="M9 13v5"/><path d="M15 13v5"/></svg>,
            Rocket: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1s.25 1.13.5 1.5"/></svg>,
            Terminal: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>,
            Smartphone: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>,
            Cpu: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>,
            MessageSquare: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
            ArrowUpRight: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>,
            ChevronRight: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>,
            Instagram: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>,
            Linkedin: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
            Youtube: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>,
            Tiktok: (props) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>,
            Kwai: (props) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M22 6H2C.9 6 0 6.9 0 8v8c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 9H8v-2h8v2zm3.5-3H5.5V9H19.5v3z" /><path d="M9.5 13.5l5-3 5 3-5-3z" fill="none" /><path d="M14.5 10.5l-5 3v-6l5 3z" /></svg>,
            Target: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
            Zap: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
            CheckCircle2: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>,
            Monitor: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>,
            Clock: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
            ArrowRight: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
            ArrowLeft: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
            CheckSquare: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
            Search: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
            Calendar: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
            Mail: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
            Play: (props) => <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="5 3 19 12 5 21 5 3"/></svg>
        };

        // --- 2. DADOS E CONFIGURAÇÕES ---
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
                { id: "dev", category: "BUILD", title: "Fábrica de Software", desc: "Desenvolvimento de ativos digitais blindados. Engenharia de software de elite.", icon: "Code2", color: "text-teal-400", size: "large" },
                { id: "app", category: "MOBILE", title: "Apps Nativos", desc: "iOS e Android. Sua ideia publicada nas lojas.", icon: "Smartphone", color: "text-teal-300", size: "medium" },
                { id: "mkt", category: "SPRINT", title: "Marketing & IA", desc: "Conteúdo gerado por IA com curadoria humana.", icon: "BrainCircuit", color: "text-emerald-400", size: "medium" },
                { id: "consult", category: "STRATEGY", title: "Consultoria Tech", desc: "Transformação Digital.", icon: "Terminal", color: "text-cyan-400", size: "small" },
                { id: "ads", category: "GROWTH", title: "Tráfego Pago", desc: "Gestão de performance.", icon: "Rocket", color: "text-teal-500", size: "small" }
            ],
            stack: ["REACT", "PYTHON", "AWS", "NODE.JS", "OPENAI", "FLUTTER", "NEXT.JS", "FIREBASE"]
        };

        const SCANNER_QUESTIONS = [
            { id: 1, type: 'text', title: "Vamos começar.", subtitle: "Para criar seu diagnóstico, qual seu nome e o do seu negócio?", field: "name", placeholder: "Ex: João / Minha Empresa" },
            { id: 2, type: 'multiselect', title: "O que você busca?", subtitle: "Selecione tudo que faz sentido (Pode marcar vários).", field: "services", options: [
                { label: "Gestão Redes Sociais", icon: "CheckCircle2" }, { label: "Tráfego Pago (Ads)", icon: "Rocket" },
                { label: "Site / Landing Page", icon: "Monitor" }, { label: "App / Sistema", icon: "Smartphone" }, { label: "Consultoria", icon: "BrainCircuit" }
            ]},
            { id: 3, type: 'multiselect', title: "Objetivos Principais", subtitle: "Onde você quer chegar?", field: "goals", options: [
                { label: "Vender Mais", icon: "Target" }, { label: "Automatizar Processos", icon: "Zap" },
                { label: "Posicionamento", icon: "CheckCircle2" }, { label: "Lançar Nova Ideia", icon: "Rocket" }
            ]},
            { id: 4, type: 'select', title: "Estágio Atual", subtitle: "Em que momento o negócio está?", field: "stage", options: [
                { label: "Apenas uma Ideia", icon: "BrainCircuit" }, { label: "Já faturo, quero escalar", icon: "Rocket" }, { label: "Consolidado", icon: "Target" }
            ]},
            { id: 5, type: 'select', title: "Prazo Ideal", subtitle: "Qual a urgência?", field: "timeline", options: [
                { label: "Ontem (Urgente)", icon: "Zap" }, { label: "Em 30 dias", icon: "Clock" }, { label: "Planejamento Futuro", icon: "BrainCircuit" }
            ]},
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

        // --- 3. COMPONENTES VISUAIS (BACKGROUND) ---
        const BackgroundGrid = () => (
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[#0B1120]"></div>
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#2DD4BF 1px, transparent 1px), linear-gradient(90deg, #2DD4BF 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-custom"></div>
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
            </div>
        );

        // --- 4. VIEW: HOME (PORTFÓLIO) ---
        const HomeView = ({ navigate }) => {
            const openWhatsapp = () => window.open(`https://wa.me/${SITE_DATA.whatsapp}`, '_blank');
            
            return (
                <div className="relative z-10 animate-fade-in">
                    {/* Header Home */}
                    <nav className="fixed top-0 w-full z-50 bg-[#0B1120]/80 backdrop-blur-lg border-b border-slate-800/50">
                        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                            <div className="flex items-center gap-1 font-bold text-lg tracking-tighter">
                                <span className="text-slate-100">GLAUCO</span>
                                <span className="text-teal-400">.DIGITAL</span>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => navigate('blog')} className="hidden md:flex items-center text-sm font-medium text-slate-400 hover:text-teal-400 transition-colors">
                                    BLOG / INSIGHTS
                                </button>
                                <button onClick={openWhatsapp} className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 px-4 py-2 rounded-lg text-xs font-mono border border-teal-500/30 transition-all flex items-center gap-2 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)]">
                                    <Icons.MessageSquare className="w-3 h-3" /> FALAR AGORA
                                </button>
                            </div>
                        </div>
                    </nav>

                    <div className="pt-32 px-6 max-w-6xl mx-auto pb-20">
                        {/* Hero */}
                        <section className="mb-20">
                            <div className="inline-block px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/5 text-teal-400 text-xs font-mono mb-6 animate-pulse-custom">● DISPONÍVEL PARA PROJETOS</div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">{SITE_DATA.hero.title}<span className="text-teal-400">{SITE_DATA.hero.suffix}</span></h1>
                            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed">{SITE_DATA.hero.subtitle}<br/><span className="text-teal-500/80 text-lg mt-2 block">{SITE_DATA.hero.tagline}</span></p>
                            
                            <div className="mt-8 flex gap-4">
                                <button onClick={() => navigate('scanner')} className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold px-8 py-4 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:scale-105 transition-transform">
                                    INICIAR PROJETO <Icons.Rocket className="w-5 h-5"/>
                                </button>
                                <button onClick={() => navigate('blog')} className="border border-slate-700 hover:border-teal-500/50 text-slate-300 hover:text-white px-8 py-4 rounded-xl transition-all">
                                    VER INSIGHTS
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-12 max-w-md border-t border-slate-800 pt-8">
                                {SITE_DATA.stats.map((stat, i) => (
                                    <div key={i}><div className="text-2xl font-bold text-white">{stat.value}</div><div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div></div>
                                ))}
                            </div>
                        </section>

                        {/* Bento Grid */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest">// Serviços & Conexões</h2>
                                <div className="h-px bg-slate-800 flex-1 ml-4"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
                                {SITE_DATA.services.map((service, index) => {
                                    const IconComp = Icons[service.icon] || Icons.Cpu;
                                    let gridClass = service.size === "large" ? "md:col-span-2 md:row-span-2" : "col-span-1";
                                    return (
                                        <div key={index} onClick={() => navigate('scanner')} className={`relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-6 cursor-pointer ${gridClass} hover:border-teal-500/50 transition-all duration-300 flex flex-col hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(45,212,191,0.15)]`}>
                                            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity"><Icons.ArrowUpRight className="w-5 h-5 text-teal-400" /></div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-4"><span className="text-[10px] font-mono tracking-widest text-teal-500/70 border border-teal-900/50 px-2 py-1 rounded bg-teal-950/30">{service.category}</span></div>
                                                <IconComp className={`w-8 h-8 mb-4 ${service.color}`} />
                                                <h3 className={`font-bold text-slate-100 mb-2 ${service.size === 'large' ? 'text-2xl' : 'text-xl'}`}>{service.title}</h3>
                                                <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
                                            </div>
                                            {service.size === 'large' && <div className="mt-6 flex items-center gap-2 text-teal-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"><span>Orçar agora</span><Icons.ChevronRight className="w-4 h-4" /></div>}
                                            <div className="scanline-effect"></div>
                                        </div>
                                    )
                                })}
                                {/* Social Card */}
                                <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-6 col-span-1 flex flex-col justify-between hover:border-teal-500/50 transition-colors">
                                    <div><div className="flex items-center gap-2 mb-4"><span className="text-[10px] font-mono tracking-widest text-teal-500/70 border border-teal-900/50 px-2 py-1 rounded bg-teal-950/30">SOCIAL</span></div><h3 className="font-bold text-slate-100 mb-4 text-xl">Conecte-se</h3></div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {SITE_DATA.socials.map((social, idx) => {
                                            const IconComp = Icons[social.icon];
                                            return <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 transition-all hover:scale-110 hover:bg-slate-800 ${social.color}`}><IconComp className="w-6 h-6" /></a>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="w-full overflow-hidden bg-slate-900/80 border-y border-slate-800 py-3 mt-12">
                        <div className="flex whitespace-nowrap gap-12 animate-scroll">
                            {[...SITE_DATA.stack, ...SITE_DATA.stack, ...SITE_DATA.stack, ...SITE_DATA.stack].map((tech, i) => (
                                <span key={i} className="text-slate-500 font-mono text-sm font-bold tracking-widest flex items-center gap-2"><span className="w-1 h-1 bg-teal-500 rounded-full"></span>{tech}</span>
                            ))}
                        </div>
                    </div>
                </div>
            );
        };

        // --- 5. VIEW: SCANNER (DIAGNÓSTICO) ---
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
                    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0B1120] relative overflow-hidden animate-fade-in z-20">
                        <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-xl border border-teal-500/30 rounded-3xl p-8 relative z-10 neon-glow">
                            <div className="text-center mb-8"><div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/10 mb-4 border border-teal-500/50 text-teal-400"><Icons.CheckCircle2 className="w-8 h-8"/></div><h2 className="text-2xl font-bold text-white mb-2">Diagnóstico Concluído</h2><p className="text-slate-400 text-sm">Perfil: <span className="text-teal-400 font-bold">{diagnosis.type}</span></p></div>
                            <div className="space-y-4 mb-8">
                                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between"><span className="text-slate-400">Complexidade</span><span className="text-white font-bold">{diagnosis.complexity}</span></div>
                                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between"><span className="text-slate-400">Tempo Estimado</span><span className="text-white font-bold">{diagnosis.time}</span></div>
                                <div className="bg-teal-900/20 p-6 rounded-xl border border-teal-500/30 text-center"><span className="text-slate-400 text-xs uppercase tracking-widest">Investimento Sugerido</span><div className="text-2xl font-bold text-white mt-2">{diagnosis.price}</div></div>
                            </div>
                            <button onClick={sendWhatsapp} className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg shadow-teal-500/20"><Icons.MessageSquare className="w-5 h-5"/> RECEBER PLANO TÉCNICO</button>
                            <button onClick={() => navigate('home')} className="w-full mt-4 text-slate-500 text-sm hover:text-white">Voltar ao Início</button>
                        </div>
                    </div>
                );
            }

            if (isCalculating) return <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B1120] p-6 z-20 relative"><div className="w-24 h-24 border-4 border-slate-800 border-t-teal-500 rounded-full animate-spin-custom mb-8"></div><h2 className="text-2xl font-bold text-white mb-2 animate-pulse-custom">Analisando Perfil...</h2><div className="font-mono text-teal-400 text-sm">Cruzando dados...</div></div>;

            const q = SCANNER_QUESTIONS[step];
            const progress = ((step + 1) / SCANNER_QUESTIONS.length) * 100;

            return (
                <div className="min-h-screen bg-[#0B1120] text-slate-200 font-sans flex flex-col relative z-20 animate-fade-in">
                    <div className="w-full h-1 bg-slate-900 fixed top-0 left-0 z-50"><div className="h-full bg-teal-500 shadow-[0_0_10px_#2DD4BF] transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div></div>
                    <div className="p-6 flex justify-between items-center z-10">
                        <div className="text-sm font-mono text-teal-500/50">ETAPA {step + 1}/{SCANNER_QUESTIONS.length}</div>
                        <button onClick={() => navigate('home')} className="text-slate-500 hover:text-white text-sm">CANCELAR</button>
                    </div>
                    <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full p-6 z-10">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{q.title}</h1>
                        <p className="text-xl text-slate-400 mb-10">{q.subtitle}</p>
                        
                        {(q.type === 'text' || q.type === 'contact') && (
                            <div className="space-y-4">
                                <input type={q.type === 'contact' ? 'tel' : 'text'} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={q.placeholder} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-xl text-white focus:outline-none focus:border-teal-500 transition-colors" autoFocus onKeyDown={(e) => e.key === 'Enter' && inputValue && handleNext(inputValue)} />
                                <button onClick={() => inputValue && handleNext(inputValue)} disabled={!inputValue} className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${inputValue ? 'bg-teal-500 text-slate-900 hover:bg-teal-400' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>{q.type === 'contact' ? 'VER RESULTADO' : 'PRÓXIMO'} <Icons.ArrowRight className="w-5 h-5"/></button>
                            </div>
                        )}
                        {q.type === 'multiselect' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {q.options.map((opt, idx) => {
                                        const isSel = multiSelect.includes(opt.label);
                                        const Icn = Icons[opt.icon] || Icons.Cpu;
                                        return <button key={idx} onClick={() => toggleMulti(opt.label)} className={`text-left p-6 border rounded-xl transition-all flex items-center gap-4 ${isSel ? 'bg-teal-500/10 border-teal-500' : 'bg-slate-900/50 border-slate-700 hover:border-teal-500/50'}`}><div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${isSel ? 'bg-teal-500 border-teal-500 text-slate-900' : 'border-slate-600 text-transparent'}`}><Icons.CheckSquare className="w-4 h-4"/></div><span className={`text-lg font-medium ${isSel ? 'text-teal-400' : 'text-slate-200'}`}>{opt.label}</span></button>
                                    })}
                                </div>
                                <button onClick={() => handleNext(multiSelect)} disabled={multiSelect.length === 0} className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${multiSelect.length > 0 ? 'bg-teal-500 text-slate-900 hover:bg-teal-400' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>CONTINUAR <Icons.ArrowRight className="w-5 h-5"/></button>
                            </div>
                        )}
                        {q.type === 'select' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {q.options.map((opt, idx) => {
                                    const Icn = Icons[opt.icon] || Icons.Cpu;
                                    return <button key={idx} onClick={() => handleNext(opt.label)} className="group text-left p-6 bg-slate-900/50 border border-slate-700 rounded-xl hover:border-teal-500 hover:bg-slate-800 transition-all flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors text-slate-400 group-hover:text-teal-400"><Icn className="w-6 h-6"/></div><span className="text-lg font-medium text-slate-200 group-hover:text-white">{opt.label}</span></button>
                                })}
                            </div>
                        )}
                    </div>
                </div>
            );
        };

        // --- 6. VIEW: BLOG ---
        const BlogView = ({ navigate }) => {
            const [filter, setFilter] = useState("Todos");
            const [search, setSearch] = useState("");
            
            const filtered = BLOG_POSTS.filter(p => (filter === "Todos" || p.category === filter) && p.title.toLowerCase().includes(search.toLowerCase()));
            const featured = BLOG_POSTS.find(p => p.featured);
            const list = filtered.filter(p => !p.featured || filter !== "Todos" || search);

            return (
                <div className="min-h-screen bg-[#0B1120] pb-20 relative z-20 animate-fade-in">
                    <nav className="fixed top-0 w-full z-50 bg-[#0B1120]/80 backdrop-blur-lg border-b border-slate-800/50">
                        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                            <div className="flex items-center gap-1 font-bold text-lg tracking-tighter cursor-pointer" onClick={() => navigate('home')}>
                                <span className="text-slate-100">GLAUCO</span><span className="text-teal-400">.DIGITAL</span><span className="ml-2 text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">/BLOG</span>
                            </div>
                            <button onClick={() => navigate('home')} className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 px-4 py-2 rounded-lg text-xs font-mono border border-teal-500/30 transition-all">VOLTAR AO SITE</button>
                        </div>
                    </nav>

                    <main className="pt-32 px-6 max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Insights <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">&</span> Tendências</h1>
                            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Mergulho profundo em Marketing Digital, IA e Dev.</p>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-slate-800 pb-8">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {["Todos", "Inteligência Artificial", "Marketing", "Dev & Tech", "Automação"].map(cat => (
                                    <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-teal-500 text-slate-900 font-bold' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white'}`}>{cat}</button>
                                ))}
                            </div>
                            <div className="relative w-full md:w-64">
                                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                                <input type="text" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors" />
                            </div>
                        </div>

                        {filter === "Todos" && !search && featured && (
                            <div onClick={() => navigate('article')} className="relative group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 hover:border-teal-500/50 transition-all duration-500 mb-12 cursor-pointer">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                                    <div className="relative h-64 md:h-auto overflow-hidden"><div className="absolute inset-0 bg-teal-500/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500"></div><img src={featured.image} alt={featured.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"/></div>
                                    <div className="p-8 md:p-12 flex flex-col justify-center relative">
                                        <div className="flex items-center gap-2 mb-4"><span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">{featured.category}</span></div>
                                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-teal-50 transition-colors">{featured.title}</h2>
                                        <p className="text-slate-400 mb-8 leading-relaxed">{featured.excerpt}</p>
                                        <div className="flex items-center gap-2 text-teal-400 font-bold text-sm tracking-wide group-hover:translate-x-2 transition-transform">LER ARTIGO <Icons.ArrowRight className="w-4 h-4" /></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {list.map(post => (
                                <div key={post.id} onClick={() => navigate('article')} className="group relative bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden hover:border-teal-500/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full">
                                    <div className="h-48 overflow-hidden relative"><img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"/></div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="text-xs text-slate-500 mb-3 flex items-center gap-3"><span>{post.date}</span></div>
                                        <h3 className="text-lg font-bold text-slate-100 mb-3 leading-snug group-hover:text-teal-400 transition-colors">{post.title}</h3>
                                        <div className="mt-auto pt-4 border-t border-slate-800/50 flex items-center justify-between text-teal-500/80 text-xs font-mono group-hover:text-teal-400"><span>LER AGORA</span><Icons.ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                    
                    {/* Newsletter */}
                    <div className="my-20 max-w-4xl mx-auto px-6">
                         <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-8 md:p-12 text-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px]"></div>
                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 mb-6"><Icons.Mail className="w-6 h-6"/></div>
                                <h2 className="text-3xl font-bold text-white mb-4">Atualizações Tech & IA</h2>
                                <p className="text-slate-400 mb-8">Receba curadoria semanal sobre o futuro.</p>
                                <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                                    <input type="email" placeholder="seu@email.com" className="flex-1 bg-slate-950/50 border border-slate-600 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-teal-500" />
                                    <button className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2">INSCREVER <Icons.Zap className="w-4 h-4"/></button>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            );
        };

        // --- 7. VIEW: ARTICLE ---
        const ArticleView = ({ navigate }) => {
            return (
                <div className="min-h-screen bg-[#0B1120] selection:bg-teal-500/30 relative z-20 animate-fade-in">
                    <nav className="fixed top-0 w-full z-50 bg-[#0B1120]/90 backdrop-blur-lg border-b border-slate-800/50">
                        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                            <div className="flex items-center gap-1 font-bold text-lg tracking-tighter cursor-pointer" onClick={() => navigate('home')}>
                                <span className="text-slate-100">GLAUCO</span><span className="text-teal-400">.DIGITAL</span>
                            </div>
                            <button onClick={() => navigate('blog')} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"><Icons.ArrowLeft className="w-5 h-5"/> VOLTAR</button>
                        </div>
                    </nav>

                    <main className="pt-32 px-6 max-w-3xl mx-auto pb-24">
                        <header className="mb-12 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-4 text-sm font-mono mb-6">
                                <span className="text-teal-400 bg-teal-500/10 px-3 py-1 rounded border border-teal-500/20">{ARTICLE_DATA.category}</span>
                                <span className="text-slate-500 flex items-center gap-1"><Icons.Calendar className="w-4 h-4"/> {ARTICLE_DATA.date}</span>
                                <span className="text-slate-500 flex items-center gap-1"><Icons.Clock className="w-4 h-4"/> {ARTICLE_DATA.readTime}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">{ARTICLE_DATA.title}</h1>
                            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">{ARTICLE_DATA.subtitle}</p>
                        </header>

                        <div className="mb-12 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative group">
                            <div className="absolute inset-0 bg-teal-500/10 mix-blend-overlay z-10"></div>
                            <img src={ARTICLE_DATA.mainImage} alt="Capa" className="w-full h-auto object-cover"/>
                        </div>

                        <div className="prose-custom">
                            <p>Estamos vivendo uma mudança de paradigma comparável ao surgimento da internet. Até ontem, desenvolver um aplicativo exigia meses de codificação. <strong>Hoje, a IA Generativa mudou as regras do jogo.</strong></p>
                            <h2>A Nova Velocidade do Mercado</h2>
                            <p>Ferramentas como o GPT-4 e Copilot não estão apenas "ajudando" programadores; elas estão escrevendo sistemas inteiros.</p>
                            <blockquote>"O maior risco para o seu negócio hoje não é a concorrência tradicional, é a velocidade com que uma IA pode replicar e melhorar seu modelo."</blockquote>
                            <h2>Veja na Prática</h2>
                            <p>Neste vídeo, analiso como agentes autônomos substituem interfaces complexas.</p>
                            
                            <div className="my-12 relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900 aspect-video w-full">
                                <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${ARTICLE_DATA.youtubeId}`} title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
                            </div>

                            <h2>O Que Isso Significa?</h2>
                            <p>A barreira de entrada técnica desmoronou. Agora, a vantagem competitiva é a <strong>estratégia de implementação</strong>.</p>
                            <ul>
                                <li>Automação de atendimento que realmente funciona.</li>
                                <li>Criação de conteúdo personalizado em escala.</li>
                            </ul>
                        </div>

                        <div className="mt-20 relative overflow-hidden rounded-3xl bg-slate-900 border border-teal-500/30 p-8 md:p-12 text-center neon-glow">
                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/10 mb-6 text-teal-400 border border-teal-500/50"><Icons.Zap className="w-8 h-8"/></div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Quer aplicar isso no seu negócio?</h2>
                                <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">Descubra exatamente o que sua empresa precisa para escalar. Faça um diagnóstico gratuito.</p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <button onClick={() => navigate('scanner')} className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2">FAZER DIAGNÓSTICO GRATUITO</button>
                                </div>
                            </div>
                        </div>
                    </main>

                     {/* FOOTER ARTIGO */}
                    <footer className="border-t border-slate-800 bg-[#0B1120] py-12 text-center">
                        <div className="flex justify-center gap-8 mb-8">
                            {SITE_DATA.socials.map((social, idx) => {
                                const IconComp = Icons[social.icon];
                                return <a key={idx} href={social.url} target="_blank" className="text-slate-500 hover:text-teal-400 transition-all hover:scale-110"><IconComp className="w-6 h-6"/></a>
                            })}
                        </div>
                        <div className="text-slate-600 text-sm">© 2024 Glauco.Digital. Conteúdo protegido.</div>
                    </footer>
                </div>
            );
        };

        // --- 8. APP PRINCIPAL (ROUTER) ---
        function App() {
            const [view, setView] = useState('home'); // home, scanner, blog, article
            const [mounted, setMounted] = useState(false);

            useEffect(() => { setMounted(true); }, []);
            
            const navigate = (newView) => {
                setView(newView);
                window.scrollTo(0, 0);
            };

            const openWhatsapp = () => window.open(`https://wa.me/${SITE_DATA.whatsapp}`, '_blank');

            if (!mounted) return null;

            return (
                <div className="min-h-screen bg-[#0B1120] text-slate-200 font-sans">
                    <BackgroundGrid />

                    {view === 'home' && <HomeView navigate={navigate} />}
                    {view === 'scanner' && <ScannerView navigate={navigate} />}
                    {view === 'blog' && <BlogView navigate={navigate} />}
                    {view === 'article' && <ArticleView navigate={navigate} />}

                    {/* Botão Flutuante (Apenas na Home e Blog) */}
                    {(view === 'home' || view === 'blog') && (
                        <button onClick={openWhatsapp} className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full p-4 shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 animate-fade-in">
                            <Icons.MessageSquare className="w-6 h-6 fill-current" />
                        </button>
                    )}
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
