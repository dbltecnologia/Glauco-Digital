import { useState, useEffect } from 'react'
import './App.css'
import './firebase'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleWhatsAppRedirect = (e) => {
    e.preventDefault()
    const text = `Olá Glauco! Me chamo ${form.name} (${form.email}).\n\nAssunto: ${form.subject}\n\nMensagem: ${form.message}`
    const encodedText = encodeURIComponent(text)
    window.open(`https://wa.me/5161998620705?text=${encodedText}`, '_blank')
  }

  const inputStyle = {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    padding: '1rem',
    borderRadius: '12px',
    outline: 'none',
    fontSize: '1rem',
    transition: 'border-color 0.2s',
  }

  return (
    <div className="app">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">GLAUCO DIGITAL</div>
        <div className="nav-links">
          <a href="#services">Serviços</a>
          <a href="#portfolio">Portfólio</a>
          <a href="#about">Sobre</a>
          <a href="#contact">Contato</a>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="hero-profile-img" style={{ marginBottom: '2rem' }}>
              <img src="/images/glauco-hero.jpg" alt="Glauco" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)', boxShadow: '0 0 30px rgba(0, 212, 189, 0.3)' }} />
            </div>
            <span className="hero-tag" style={{ background: 'rgba(0, 212, 189, 0.1)', border: '1px solid rgba(0, 212, 189, 0.2)', color: 'var(--primary)' }}>Sistemas & Crescimento</span>
            <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', lineHeight: '0.9', marginBottom: '2rem' }}>Engenharia de <span className="gradient-text">Resultados</span></h1>
            <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>Desenvolvimento de alta performance e marketing orientado a dados para escalar sua empresa.</p>
            <div className="cta-group">
              <a href="#contact" className="btn-primary" style={{ background: 'var(--primary)', color: '#000', borderRadius: '100px', padding: '1.2rem 2.5rem' }}>Iniciar Projeto</a>
            </div>
          </div>
        </section>

        <section id="services" className="section-padding container">
          <div style={{ marginBottom: '4rem' }}>
            <span className="hero-tag" style={{ background: 'rgba(0, 212, 189, 0.1)', border: '1px solid rgba(0, 212, 189, 0.2)', color: 'var(--primary)', marginBottom: '1rem' }}>Expertise</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'left' }}>Soluções de <span className="gradient-text">Nova Geração</span></h2>
          </div>
          <div className="bento-grid">
            <div className="bento-card large">
              <div className="icon-box">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              </div>
              <div>
                <h3>Desenvolvimento de Software</h3>
                <p>Criamos sistemas sob medida, desde MVPs até plataformas complexas, utilizando tecnologias modernas como React, Node.js e Python para garantir escalabilidade e performance extrema.</p>
              </div>
            </div>
            <div className="bento-card medium">
              <div className="icon-box">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
              </div>
              <div>
                <h3>Growth & Tráfego Pago</h3>
                <p>Estratégias avançadas de aquisição em Meta e Google Ads, focadas em ROI positivo e escala previsível de faturamento.</p>
              </div>
            </div>
            <div className="bento-card medium">
              <div className="icon-box">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <div>
                <h3>Automação com IA</h3>
                <p>Implementamos agentes inteligentes e automações de processos para reduzir custos operacionais e aumentar a produtividade do seu time.</p>
              </div>
            </div>
            <div className="bento-card medium full-width-mobile">
              <div className="icon-box">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div>
                <h3>Consultoria Elite</h3>
                <p>Mentoria estratégica para estruturação de departamentos comerciais e tecnológicos em busca de M&A ou saída.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="authority-strip">
          <div className="container">
            <p>TECNOLOGIAS DE PONTA</p>
            <div className="logos-grid">
              <span>React</span>
              <span>Python</span>
              <span>Node.js</span>
              <span>Google Ads</span>
              <span>Meta Ads</span>
              <span>TensorFlow</span>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section-padding container">
          <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>Casos de <span className="gradient-text">Sucesso</span></h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>Projetos reais com resultados auditados e crescimento sustentável.</p>

          <div className="portfolio-grid">
            {[
              {
                title: 'E-commerce de Moda',
                results: '+350% ROI em 6 meses',
                desc: 'Escalamos o faturamento mensal de R$ 50k para R$ 220k através de Meta Ads e recuperação de carrinho.',
                tag: 'Tráfego Pago'
              },
              {
                title: 'SaaS Educacional',
                results: '-45% no CAC',
                desc: 'Otimização completa do funil de vendas e implementação de SEO focado em intenção de compra.',
                tag: 'SEO & CRO'
              },
              {
                title: 'Imobiliária de Luxo',
                results: '+120 Leads/mês',
                desc: 'Campanhas de Google Ads segmentadas por geolocalização e landing pages de alta conversão.',
                tag: 'Performance'
              }
            ].map((item, idx) => (
              <div key={idx} className="portfolio-card">
                <div className="portfolio-tag">{item.tag}</div>
                <h3>{item.title}</h3>
                <div className="portfolio-results">{item.results}</div>
                <p>{item.desc}</p>
                <a href="#" className="portfolio-link">Ver case completo &rarr;</a>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="section-padding container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="about-content">
            <div className="about-text">
              <span className="hero-tag">Sobre Mim</span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Focado em <span className="gradient-text">Resultados Tangíveis</span></h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.8' }}>
                Com mais de 5 anos no mercado digital, ajudo empresas a escalarem suas operações através de estratégias de marketing baseadas em dados. Minha abordagem une criatividade e análise técnica para encontrar as melhores oportunidades de crescimento.
              </p>
              <div className="about-stats" style={{ display: 'flex', gap: '2rem' }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' }}>+10M</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Gerenciados</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' }}>+50</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Clientes Satisfeitos</div>
                </div>
              </div>
            </div>
            <div className="about-image" style={{ background: 'var(--surface)', height: '400px', borderRadius: '24px', position: 'relative', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, var(--primary) 0%, var(--accent) 100%)', opacity: 0.2 }}></div>
              <div style={{ position: 'absolute', inset: '40px', border: '2px dashed var(--border)', borderRadius: '16px' }}></div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-padding container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Vamos <span className="gradient-text">Conversar?</span></h2>
            <p style={{ color: 'var(--text-secondary)' }}>Pronto para levar seu negócio ao próximo nível? Entre em contato hoje mesmo.</p>
          </div>

          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form className="contact-form" onSubmit={handleWhatsAppRedirect}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Nome"
                  style={inputStyle}
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  style={inputStyle}
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <input
                type="text"
                placeholder="Assunto"
                style={{ ...inputStyle, width: '100%', marginBottom: '1rem' }}
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
              <textarea
                placeholder="Sua Mensagem"
                style={{ ...inputStyle, width: '100%', marginBottom: '2rem', height: '150px', resize: 'none' }}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              ></textarea>
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1.25rem' }}>Enviar Mensagem</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="section-padding container" style={{ borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>&copy; 2026 Glauco Digital. Todos os direitos reservados.</p>
      </footer>
      <a
        href="https://wa.me/5161998620705"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contato via WhatsApp"
      >
        <img src="/images/whatsapp-icon.png" alt="WhatsApp" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </a>
    </div>
  )
}

export default App
