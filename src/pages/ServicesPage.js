// src/pages/ServicesPage.js
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParallaxCard from '../components/ParallaxCard';
import GlowHoverCard from '../components/GlowHoverCard';

// Animation variants for staggered text reveals
const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Animation variants for each individual process step
const processStepVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Le Nostre Soluzioni | AxiomWeb</title>
        <meta name="description" content="Scopri le nostre soluzioni su misura, dalle solide fondamenta digitali ai potenti motori di crescita, per portare la tua attività al livello successivo." />
      </Helmet>

      {/* --- ANIMATED PAGE HEADER --- */}
      <header className="page-header">
        <div className="container">
          <motion.h1 initial="hidden" animate="visible" variants={textVariant}>
            Le Nostre Soluzioni Digitali
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={{ ...textVariant, visible: { ...textVariant.visible, transition: { ...textVariant.visible.transition, delay: 0.2 }}}} className="page-subtitle">
            Piani flessibili e su misura, costruiti intorno alle tue esigenze per garantire la crescita e il successo della tua attività online.
          </motion.p>
        </div>
      </header>

      {/* --- ANIMATED PARALLAX CARDS --- */}
      <section className="services-detail-section">
        <div className="container">
          <ParallaxCard imageSrc="/images/fondamenta.png" imageAlt="Illustrazione Fondamenta Digitali">
            <h2>LE FONDAMENTA DIGITALI</h2>
            <p><strong>Ideale per:</strong> piccole imprese, startup e liberi professionisti che necessitano di una presenza online professionale, elegante e che generi fiducia fin dal primo istante.</p>
            <p>Questo pacchetto è il punto di partenza essenziale. Creiamo un sito web "vetrina" che non è solo bello da vedere, ma è ottimizzato per essere veloce, sicuro e perfettamente visibile su ogni dispositivo. È il tuo biglietto da visita digitale, progettato per impressionare.</p>
            <h3>Cosa Include il Pacchetto:</h3>
            <ul className="features-list">
              <li><i className='bx bx-check-shield'></i> <strong>Sito Web Vetrina Professionale:</strong> Un design moderno e pulito che racconta la tua storia.</li>
              <li><i className='bx bx-check-shield'></i> <strong>Perfetto su Telefone, Tablet e Computer:</strong> Perfetta visualizzazione su smartphone, tablet e desktop.</li>
              <li><i className='bx bx-check-shield'></i> <strong>I Tuoi Clienti Ti Trovano su Google:</strong> Struttura e contenuti ottimizzati per essere trovati più facilmente su Google.</li>
              <li><i className='bx bx-check-shield'></i> <strong>Integrazione Contatti Rapidi:</strong> Pulsanti WhatsApp, email e social per una comunicazione immediata.</li>
              <li><i className='bx bx-check-shield'></i> <strong>Caricamento Ultra-Veloce:</strong> Un sito veloce e reattivo per una migliore esperienza dei visitatori.</li>
            </ul>
          </ParallaxCard>

          <ParallaxCard imageSrc="/images/crescita.png" imageAlt="Illustrazione Motore di Crescita" reverse={true}>
            <h2>MOTORE DI CRESCITA</h2>
            <p><strong>Ideale per:</strong> attività consolidate che vogliono superare la concorrenza, dominare la ricerca locale e trasformare il proprio sito in un vero e proprio strumento di acquisizione clienti.</p>
            <p>Andiamo oltre il design. Questo pacchetto trasforma il tuo sito in un asset strategico che lavora attivamente per te. Attraverso analisi avanzate e miglioramenti continui, creiamo un percorso che porta i visitatori di Google a diventare tuoi clienti.</p>
            <h3>Cosa Include il Pacchetto:</h3>
            <ul className="features-list">
              <li><i className='bx bx-check-double'></i> <strong>Tutto del pacchetto Fondamenta, e in più:</strong></li>
              <li><i className='bx bx-check-double'></i> <strong>Primi su Google nella Tua Zona:</strong> Configurazione mirata per Google Maps e per le ricerche nella tua area geografica.</li>
              <li><i className='bx bx-check-double'></i> <strong>Studiamo la Concorrenza per Te:</strong> Un report dettagliato per capire i punti di forza e di debolezza dei tuoi concorrenti online.</li>
              <li><i className='bx bx-check-double'></i> <strong>Strategia dei Contenuti:</strong> Revisione e miglioramento dei tuoi testi per massimizzare la visibilità sui motori di ricerca.</li>
              <li><i className='bx bx-check-double'></i> <strong>Monitoriamo Chi Visita il Tuo Sito:</strong> Per monitorare il traffico e capire il comportamento dei tuoi visitatori.</li>
            </ul>
          </ParallaxCard>
        </div>
      </section>

      {/* --- ANIMATED GLOW HOVER CARDS --- */}
      <section className="additional-services-section">
        <div className="container">
          <h2>Servizi Inclusi e Opzioni Aggiuntive</h2>
          <p className="section-intro">La nostra collaborazione è basata sulla trasparenza e sulla flessibilità. Ecco cosa offriamo sempre e come possiamo supportarti nel tempo.</p>
          <div className="services-grid">
            <GlowHoverCard direction="left">
              <i className='bx bxs-star card-icon'></i>
              <h3>Sempre Inclusi nel Progetto</h3>
              <p>Consideriamo questi elementi fondamentali per ogni progetto di successo, senza costi aggiuntivi.</p>
              <ul className="service-features">
                <li>✅ Consulenza su Logo e Brand</li>
                <li>✅ Creazione Profili Social (Google, Facebook, etc.)</li>
                <li>✅ Integrazione WhatsApp Business</li>
                <li>✅ Formazione per la Gestione dei Contenuti</li>
              </ul>
            </GlowHoverCard>
            <GlowHoverCard direction="right">
              <i className='bx bxs-cog card-icon'></i>
              <h3>Servizi di Gestione (Opzionali)</h3>
              <p>Se preferisci non occuparti degli aspetti tecnici, offriamo un servizio di gestione completo per la tua tranquillità.</p>
              <ul className="service-features">
                <li>✅ Hosting e Gestione Dominio Annuale</li>
                <li>✅ Assistenza e Modifiche su Richiesta</li>
                <li>✅ Piani di Manutenzione Personalizzati</li>
                <li>✅ Controllo Totale e Consegna dei File</li>
              </ul>
            </GlowHoverCard>
          </div>
        </div>
      </section>

      {/* --- DETAILED PROCESS TIMELINE WITH TIMELINES --- */}
      <section className="process-section">
        <div className="container">
          <h2>Il Nostro Processo Passo per Passo</h2>
          <p className="section-intro">
            Lavoriamo in modo strutturato per garantirti risultati di qualità nei tempi stabiliti. 
            Ecco esattamente cosa aspettarti dal momento del primo contatto alla consegna finale.
          </p>
          <motion.div 
            className="process-timeline"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div className="process-step" variants={processStepVariant}>
              <div className="process-icon"><i className='bx bx-conversation'></i></div>
              <div className="process-content">
                <h3>1. Scoperta e Strategia</h3>
                <div className="process-timeline-badge">📅 1-2 giorni</div>
                <p>Analizziamo insieme la tua attività, i tuoi obiettivi e il mercato di riferimento. Definiamo la strategia digitale più efficace per raggiungere i tuoi clienti ideali.</p>
                <div className="process-deliverable">
                  <strong>Cosa ricevi:</strong> Strategia personalizzata • Analisi competitor • Piano del progetto
                </div>
              </div>
            </motion.div>
            
            <motion.div className="process-step" variants={processStepVariant}>
              <div className="process-icon"><i className='bx bx-palette'></i></div>
              <div className="process-content">
                <h3>2. Design e Prototipo</h3>
                <div className="process-timeline-badge">📅 3-5 giorni</div>
                <p>Creiamo il design del tuo sito basandoci sui tuoi gusti e sui bisogni dei tuoi clienti. Ti mostriamo esattamente come apparirà prima di iniziare la costruzione.</p>
                <div className="process-deliverable">
                  <strong>Cosa ricevi:</strong> Design personalizzato • Prototipo interattivo • 1 revisione inclusa
                </div>
              </div>
            </motion.div>
            
            <motion.div className="process-step" variants={processStepVariant}>
              <div className="process-icon"><i className='bx bx-code-block'></i></div>
              <div className="process-content">
                <h3>3. Sviluppo e Costruzione</h3>
                <div className="process-timeline-badge">📅 1-3 settimane</div>
                <p>Trasformiamo il design in un sito web funzionante. Ti teniamo aggiornato sui progressi e implementiamo tutte le funzionalità concordate.</p>
                <div className="process-deliverable">
                  <strong>Cosa ricevi:</strong> Sito completo • Test su tutti i dispositivi • Configurazione hosting
                </div>
              </div>
            </motion.div>
            
            <motion.div className="process-step" variants={processStepVariant}>
              <div className="process-icon"><i className='bx bx-rocket'></i></div>
              <div className="process-content">
                <h3>4. Lancio e Formazione</h3>
                <div className="process-timeline-badge">📅 1-2 giorni</div>
                <p>Mettiamo online il tuo sito e ti insegniamo come gestirlo autonomamente. Ti forniamo tutti gli accessi e le guide necessarie.</p>
                <div className="process-deliverable">
                  <strong>Cosa ricevi:</strong> Sito online • Formazione personalizzata • Supporto 30 giorni
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="process-guarantee">
            <div className="guarantee-content">
              <i className='bx bx-shield-check'></i>
              <div>
                <h4>Garanzia di Tempistiche</h4>
                <p>Rispettiamo sempre i tempi concordati. Se dovessimo superare i tempi per causa nostra, ricevi un bonus extra sul progetto.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ANIMATED FINAL CTA --- */}
      <section id="cta" className="cta-section">
        <div className="container">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            Hai un Progetto in Mente?
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="section-intro">
            Non vediamo l'ora di ascoltare le tue idee. Contattaci per una chiacchierata senza impegno e scopri come possiamo aiutarti a crescere.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', delay: 0.4 }}>
            <Link to="/contact" className="btn btn-primary">Richiedi la Tua Proposta Gratuita</Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;