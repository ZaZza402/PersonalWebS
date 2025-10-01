// src/pages/ContactPage.js
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import MagneticChannelCard from '../components/MagneticChannelCard';
import AnimatedTimeline from '../components/AnimatedTimeline';
import WebsiteBuilderModal from '../components/WebsiteBuilderModal';

const timelineItems = [
    { title: '1. Primo Contatto', text: 'Analizzeremo insieme la tua richiesta per capire a fondo le tue necessità e gli obiettivi del progetto.', icon: 'bx bx-message-square-dots', align: 'left' },
    { title: '2. Proposta su Misura', text: 'Riceverai una proposta dettagliata, trasparente e senza impegno, costruita specificamente per te.', icon: 'bx bx-file', align: 'right' },
    { title: '3. Inizio del Progetto', text: 'Una volta approvata la proposta, daremo il via alla creazione del tuo nuovo strumento digitale.', icon: 'bx bxs-rocket', align: 'left' }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const ContactPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const title = "Entriamo in Contatto";
  let charCounter = 0;

  return (
    <>
      <Helmet>
        <title>Contatti | AxiomWeb</title>
        <meta name="description" content="Hai un'idea o un progetto? Entriamo in contatto. Richiedi una proposta gratuita o utilizza uno dei nostri canali per iniziare una conversazione." />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contatti | AxiomWeb",
            "description": "Entra in contatto con AxiomWeb. Utilizza i nostri canali diretti come WhatsApp ed Email, o compila il modulo per richiederci una proposta gratuita.",
            "url": "https://www.axiomweb.eu/contact.html"
          }
        `}</script>
      </Helmet>

      <header className="page-header">
        <div className="container">
            <motion.h1 initial="hidden" animate="visible">
                {title.split(" ").map((word, wordIndex) => (
                    <React.Fragment key={wordIndex}>
                        <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                            {word.split("").map((char) => {
                                const currentCount = charCounter++;
                                return (
                                    <motion.span
                                        key={currentCount}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: currentCount * 0.05, duration: 0.3 }}
                                    >
                                        {char}
                                    </motion.span>
                                );
                            })}
                        </span>
                        {wordIndex < title.split(" ").length - 1 ? <span> </span> : null}
                    </React.Fragment>
                ))}
            </motion.h1>

            <motion.p initial="hidden" animate="visible" variants={{...fadeUp, visible: {...fadeUp.visible, transition: {...fadeUp.visible.transition, delay: 0.8}}}} className="page-subtitle">
                Hai un'idea o un progetto in mente? Raccontamelo. Sono qui per aiutarti a trasformarlo in un caso di successo.
            </motion.p>
        </div>
      </header>

      <section className="contact-channels-section">
        <div className="container">
          <h2>Canali Diretti</h2>
          <motion.div className="channels-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ staggerChildren: 0.2 }}>
            <motion.div variants={fadeUp}>
              <MagneticChannelCard>
                  <a href="https://wa.me/390694428189" target="_blank" rel="noopener noreferrer" className="channel-card">
                      <motion.i style={{ transform: 'translateZ(50px)' }} className='bx bxl-whatsapp'></motion.i>
                      <h3>WhatsApp</h3>
                      <p>Il modo più rapido e diretto per una conversazione immediata e per discutere le tue idee al volo.</p>
                      <span>Chatta Ora</span>
                  </a>
              </MagneticChannelCard>
            </motion.div>
            <motion.div variants={fadeUp}>
              <MagneticChannelCard>
                  <a href="mailto:axiomwebz@gmail.com" className="channel-card">
                      <motion.i style={{ transform: 'translateZ(50px)' }} className='bx bxs-paper-plane'></motion.i>
                      <h3>Email</h3>
                      <p>Perfetto per richieste dettagliate, per inviare documenti o se preferisci avere tutto per iscritto.</p>
                      <span>Invia un'Email</span>
                  </a>
              </MagneticChannelCard>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <section className="website-builder-section">
        <div className="container">
          <motion.div 
            className="builder-intro"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <div className="builder-icon">
              <i className="bx bx-palette"></i>
            </div>
            <h2>Non sai cosa ti serve?</h2>
            <p>Utilizza il nostro configuratore interattivo per scoprire esattamente che tipo di sito web fa per te. Ti guideremo passo dopo passo!</p>
            
            <motion.button 
              className="btn-website-builder"
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="bx bx-rocket"></i>
              Configura il Tuo Sito Web
            </motion.button>
            
            <div className="builder-features">
              <div className="feature">
                <i className="bx bx-check-circle"></i>
                <span>Selezione guidata del tipo di sito</span>
              </div>
              <div className="feature">
                <i className="bx bx-check-circle"></i>
                <span>Preview delle strutture disponibili</span>
              </div>
              <div className="feature">
                <i className="bx bx-check-circle"></i>
                <span>Richiesta personalizzata automatica</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="what-to-expect-section">
        <div className="container">
          <h2>Cosa Aspettarsi Dopo</h2>
          <AnimatedTimeline items={timelineItems} />
        </div>
      </section>
      
      <WebsiteBuilderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default ContactPage;