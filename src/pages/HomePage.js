// src/pages/HomePage.js
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import TiltableCard from '../components/TiltableCard';
import ProcessCard from '../components/ProcessCard';
import ContactButton from '../components/ContactButton';
import GlitchSubheadline from '../components/GlitchSubheadline';
import WordShuffle from '../components/WordShuffle';
import ModernBackground from '../components/ModernBackground';
import PortfolioShowcase from '../components/PortfolioShowcase';

const buttonsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const HomePage = () => {
  const subheadlineText = "Affianchiamo le aziende del territorio per trasformare un semplice sito in un potente strumento che attira e converte clienti da Google - e non solo.";

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

      <section id="home" className="hero">
        {/* Modern animated background */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, backgroundColor: 'var(--bg-primary)' }}>
          <ModernBackground />
        </div>
        
        <div className="hero-layout-wrapper">
          <div className="hero-main-content">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              IL TUO SITO PUÒ ESSERE
              <span className="hero-highlight"> DI PIÙ</span>
              <br />
              <span className="hero-secondary-text">MERITA UN</span>{" "}
              <WordShuffle 
                words={["SUCCESSO.", "IMPATTO.", "RISULTATO."]}
                className="typed-text"
                duration={2000}
              />
            </motion.h1>
            <div className="hero-bottom-content">
              <GlitchSubheadline text={subheadlineText} />
            </div>
          </div>          <motion.div 
            className="hero-scroll-down-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.5 }}
          >
            <a href="#services" className="btn btn-primary">SCOPRI COME</a>
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
                        <li>✅ Sito Web Vetrina di Grande Impatto</li>
                        <li>✅ Design Responsive e Mobile-First</li>
                        <li>✅ SEO On-Page di Base</li>
                        <li>✅ Integrazione WhatsApp & Email</li>
                    </ul>
                </TiltableCard>
                <TiltableCard linkTo="/services">
                    <i className='bx bxs-rocket card-icon'></i>
                    <h3>MOTORE DI CRESCITA</h3>
                    <p>Un ottimo sito web è solo l'inizio. Lo trasformiamo in una macchina genera-contatti attraverso SEO, strategia dei contenuti e ottimizzazione delle conversioni, per alimentare la crescita della tua attività.</p>
                    <ul className="service-features">
                        <li>✅ Tutto il pacchetto FONDAMENTA, IN PIÙ:</li>
                        <li>✅ SEO Locale Avanzato & Schema</li>
                        <li>✅ Analisi dei Competitor con IA</li>
                        <li>✅ Raccomandazioni sui Contenuti Strategici</li>
                    </ul>
                </TiltableCard>
            </div>
        </div>
      </section>
      
      <section id="showcase" className="showcase-section">
            <div className="container">
                <PortfolioShowcase />
            </div>
        </section>
        
        <section id="advantage" className="advantage-section">
            <div className="container">
                <h2>IL NOSTRO PROCESSO IN 3 FASI VERSO IL SUCCESSO</h2>
                <div className="advantage-grid">
                    <ProcessCard index={0}>
                        <i className='bx bx-search-alt'></i>
                        <h3>SCOPERTA E STRATEGIA</h3>
                        <p>Partiamo da un'analisi approfondita della tua attività, del tuo pubblico di riferimento e dei tuoi obiettivi. Utilizziamo strumenti moderni per analizzare il mercato e identificare le migliori opportunità di crescita.</p>
                    </ProcessCard>
                    <ProcessCard index={1}>
                        <i className='bx bx-code-alt'></i>
                        <h3>DESIGN E SVILUPPO</h3>
                        <p>Successivamente, realizziamo un sito web ad alte prestazioni con un unico obiettivo: convertire i visitatori in clienti. Non si tratta solo di design, ma di un vero e proprio asset strategico per la tua attività.</p>
                    </ProcessCard>
                    <ProcessCard index={2}>
                        <i className='bx bxs-analyse'></i>
                        <h3>LANCIO E CRESCITA</h3>
                        <p>La nostra collaborazione non termina con il lancio. Forniamo dati e analisi per monitorare i progressi e possiamo affiancarti con strategie SEO e di contenuto continuative, per garantirti risultati concreti e duraturi.</p>
                    </ProcessCard>
                </div>
            </div>
        </section>

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