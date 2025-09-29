// src/pages/ContactPage.js
import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import MagneticChannelCard from '../components/MagneticChannelCard';
import AnimatedTimeline from '../components/AnimatedTimeline';

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
  const form = useRef();
  const [formState, setFormState] = useState('idle'); // 'idle', 'sending', 'success', 'error'
  const [formMessage, setFormMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setFormState('sending');

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          setFormState('success');
          setFormMessage('Messaggio inviato con successo! Ti risponderemo al più presto.');
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          setFormState('error');
          setFormMessage('Oops! C\'è stato un errore. Assicurati che tutti i campi siano compilati e riprova.');
        }
      );
  };

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
          <motion.div className="channels-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} transition={{ staggerChildren: 0.2 }}>
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
      
      <section className="contact-form-section">
        <div className="container">
          <h2>Oppure, Lascia un Messaggio</h2>
          {/* --- THIS IS THE CORRECTED FORM TAG --- */}
          <motion.form 
            ref={form}
            onSubmit={sendEmail}
            // The old "action" and "method" attributes for Formspree have been removed.
            className="contact-form"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.15 }}
          >
            <motion.div className="form-group" variants={fadeUp}>
              <label htmlFor="name">Il Tuo Nome</label>
              <input type="text" id="name" name="name" required />
            </motion.div>
            <motion.div className="form-group" variants={fadeUp}>
              <label htmlFor="email">La Tua Email</label>
              <input type="email" id="email" name="email" required />
            </motion.div>
            <motion.div className="form-group" variants={fadeUp}>
              <label htmlFor="message">Il Tuo Messaggio</label>
              <textarea id="message" name="message" rows="6" required></textarea>
            </motion.div>
            <motion.div variants={fadeUp}>
                <motion.button 
                  type="submit" 
                  className="btn btn-primary" 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  disabled={formState === 'sending'}
                >
                  {formState === 'sending' ? 'Inviando...' : 'Invia il Messaggio'}
                </motion.button>
            </motion.div>

            {formMessage && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: '1.5rem',
                  color: formState === 'success' ? 'var(--accent-coral)' : '#ff5050',
                  fontWeight: 'bold',
                }}
              >
                {formMessage}
              </motion.p>
            )}
          </motion.form>
        </div>
      </section>

      <section className="what-to-expect-section">
        <div className="container">
          <h2>Cosa Aspettarsi Dopo</h2>
          <AnimatedTimeline items={timelineItems} />
        </div>
      </section>
    </>
  );
};

export default ContactPage;