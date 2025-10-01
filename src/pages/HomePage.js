// src/pages/HomePage.js
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import TiltableCard from '../components/TiltableCard';
import ProcessTimeline from '../components/ProcessTimeline';
import ContactButton from '../components/ContactButton';
import ModernBackground from '../components/ModernBackground';
import ParticleField from '../components/ParticleField';
import TestimonialsSection from '../components/TestimonialsSection';
import PricingSection from '../components/PricingSection';
import ResourcesShowcase from '../components/ResourcesShowcase';
import '../components/BusinessImpactHero.css';

const buttonsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>AxiomWeb | Il Motore della Tua Crescita</title>
        <meta name="description" content="AxiomWeb non realizza semplici siti web, ma veri e propri motori per acquisire clienti. Siamo specializzati nella creazione di esperienze digitali di grande impatto visivo e ad alte prestazioni." />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "AxiomWeb",
            "image": "https://www.axiomweb.eu/images/aw_logo.webp",
            "url": "https://www.axiomweb.eu/",
            "telephone": "+390694428189",
            "email": "axiomwebz@gmail.com"
          }
        `}</script>
      </Helmet>

      <section id="home" className="business-impact-hero">
        {/* Sophisticated animated background */}
        <div className="hero-background">
          <ModernBackground />
          <ParticleField />
          <div className="hero-gradient-overlay"></div>
        </div>
        
        <div className="hero-container">
          {/* Main Value Proposition */}
          <div className="hero-main-section">
            <motion.div 
              className="hero-value-proposition"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="hero-pricing-anchor">
                <motion.span 
                  className="price-tag"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  Da €150
                </motion.span>
                <motion.div 
                  className="arrow-transform"
                  initial={{ scale: 0, x: -20 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  →
                </motion.div>
                <motion.span 
                  className="result-text"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  PIÙ CLIENTI OGNI MESE
                </motion.span>
              </div>
              
              <motion.h1 
                className="hero-main-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                SITI WEB CHE <span className="highlight-gradient">PORTANO CLIENTI</span>
                <br />
                NON SOLO VISITE
              </motion.h1>
              
              <motion.p 
                className="hero-promise"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                Il tuo investimento più intelligente: trasformiamo la tua presenza online 
                in un <strong>motore di acquisizione clienti</strong> che lavora 24/7 per te.
              </motion.p>
            </motion.div>

            {/* Interactive Preview Section */}
            <motion.div 
              className="hero-interactive-preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <div className="preview-cards">
                <motion.div 
                  className="preview-card"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="card-icon">📱</div>
                  <h4>Presenza Professionale</h4>
                  <p>Clienti ti trovano su Google</p>
                  <div className="card-timeline">2-3 settimane</div>
                </motion.div>
                
                <motion.div 
                  className="preview-card"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="card-icon">🎯</div>
                  <h4>Sistema Prenotazioni</h4>
                  <p>Appuntamenti automatici</p>
                  <div className="card-timeline">3-4 settimane</div>
                </motion.div>
                
                <motion.div 
                  className="preview-card"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="card-icon">🛒</div>
                  <h4>E-commerce Completo</h4>
                  <p>Vendite online 24/7</p>
                  <div className="card-timeline">4-6 settimane</div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div 
            className="hero-trust-indicators"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <div className="trust-badges">
              <div className="trust-badge">
                <i className="bx bx-shield-check"></i>
                <span>Garanzia Tempi</span>
              </div>
              <div className="trust-badge">
                <i className="bx bx-money"></i>
                <span>Prezzi Trasparenti</span>
              </div>
              <div className="trust-badge">
                <i className="bx bx-map-pin"></i>
                <span>20+ Aziende Locali</span>
              </div>
            </div>
          </motion.div>

          {/* Dual CTAs */}
          <motion.div 
            className="hero-cta-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
          >
            <div className="cta-buttons">
              <motion.button 
                className="cta-primary"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 188, 212, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('website-builder')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Scopri il Tuo Prezzo</span>
                <small>Configuratore 2 min</small>
              </motion.button>
              
              <motion.a 
                href="#testimonials"
                className="cta-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Vedi Risultati Reali</span>
                <small>Testimonianze clienti</small>
              </motion.a>
            </div>
          </motion.div>

          {/* Before/After Results */}
          <motion.div 
            className="hero-results-proof"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.3 }}
          >
            <div className="results-container">
              <div className="result-item">
                <div className="before-after">
                  <span className="before">PRIMA: 0 clienti online</span>
                  <span className="after">DOPO: +15 clienti/mese</span>
                </div>
                <div className="business-type">Ristorante • €150</div>
              </div>
              
              <div className="result-item">
                <div className="before-after">
                  <span className="before">PRIMA: Solo passaparola</span>
                  <span className="after">DOPO: Prenotazioni automatiche</span>
                </div>
                <div className="business-type">Barbiere • €450</div>
              </div>
              
              <div className="result-item">
                <div className="before-after">
                  <span className="before">PRIMA: Vendite locali</span>
                  <span className="after">DOPO: Vendite in tutta Italia</span>
                </div>
                <div className="business-type">Artigiano • €850</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- REST OF THE PAGE --- */}
      <section id="services" className="services-section">
        <div className="container">
            <h2>LE NOSTRE SOLUZIONI</h2>
            <p className="section-intro">Ogni attività è unica. Per questo offriamo due pacchetti principali pensati come una solida base di partenza, che personalizzeremo insieme per creare la soluzione perfetta per la tua crescita.</p>
            <div className="services-grid">
                <TiltableCard linkTo="/services">
                    <i className='bx bxs-layer card-icon'></i>
                    <h3>LE FONDAMENTA DIGITALI</h3>
                    <p>Realizziamo siti web ultra-veloci e di grande impatto visivo, che costituiscono le solide fondamenta della tua presenza digitale. È qui che la storia del tuo brand prende vita.</p>
                    <ul className="service-features">
                        <li>✅ Sito Web che Colpisce al Primo Sguardo</li>
                        <li>✅ Perfetto su Telefono, Tablet e Computer</li>
                        <li>✅ I Tuoi Clienti Ti Trovano su Google</li>
                        <li>✅ Contatti Diretti WhatsApp & Email</li>
                    </ul>
                </TiltableCard>
                <TiltableCard linkTo="/services">
                    <i className='bx bxs-rocket card-icon'></i>
                    <h3>MOTORE DI CRESCITA</h3>
                    <p>Un ottimo sito web è solo l'inizio. Lo trasformiamo in una macchina che ti porta nuovi clienti ogni giorno, facendoti trovare facilmente su Google e convincendo i visitatori a contattarti.</p>
                    <ul className="service-features">
                        <li>✅ Tutto il pacchetto FONDAMENTA, IN PIÙ:</li>
                        <li>✅ Primi su Google nella Tua Zona</li>
                        <li>✅ Studiamo la Concorrenza per Te</li>
                        <li>✅ Strategie per Attrarre Più Clienti</li>
                    </ul>
                </TiltableCard>
            </div>
        </div>
      </section>
      
      <ResourcesShowcase />
      
      <section id="pricing" className="pricing-section">
                <PricingSection />
        </section>
      
      <section id="testimonials" className="testimonials-section">
                <TestimonialsSection />
        </section>
        
        <ProcessTimeline variant="compact" />

        <section id="contact" className="contact-section">
            <div className="container">
                <h2>SEI PRONTO A PARTIRE?</h2>
                <p className="contact-subtitle">Il tuo nuovo motore di crescita è a una sola conversazione di distanza. Richiedi una proposta gratuita e senza impegno per scoprire tutto il potenziale della tua attività.</p>
                <motion.div 
                  className="contact-buttons"
                  variants={buttonsContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.8 }}
                >
                    <ContactButton 
                      href="https://wa.me/390694428189" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      iconClass="bx bxl-whatsapp"
                      text="Chatta su WhatsApp"
                    />
                    <ContactButton 
                      href="mailto:axiomwebz@gmail.com"
                      iconClass="bx bxs-paper-plane"
                      text="Invia un'Email"
                    />
                    <ContactButton 
                      href="http://m.me/AxiomWeb" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      iconClass="bx bxl-messenger"
                      text="Scrivici su Messenger"
                    />
                </motion.div>
            </div>
        </section>
    </>
  );
};

export default HomePage;