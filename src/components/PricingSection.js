import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './PricingSection.css';

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState('packages');

  const pricingPackages = [
    {
      id: 'basic',
      name: 'Presenza Web',
      subtitle: 'Perfetto per iniziare',
      price: '150',
      priceNote: 'a partire da',
      description: 'Ideale per piccole attività che vogliono essere trovate online',
      features: [
        'Sito web responsive (1 pagina)',
        'Design moderno e professionale',
        'Ottimizzazione per mobile',
        'Modulo contatti funzionante',
        'Integrazione Google Maps',
        'Ottimizzazione SEO base'
      ],
      notIncluded: [
        'Hosting e dominio (ti aiutiamo a scegliere)',
        'Contenuti (o supporto nella creazione)'
      ],
      bestFor: 'Ristoranti, barbieri, piccoli negozi',
      deliveryTime: '1-2 settimane',
      icon: 'bx-globe',
      popular: false
    },
    {
      id: 'business',
      name: 'Soluzione Business',
      subtitle: 'La scelta più popolare',
      price: '450',
      priceNote: 'a partire da',
      description: 'Per attività che vogliono crescere e ottenere più clienti',
      features: [
        'Sito web multi-pagina (fino a 5 pagine)',
        'Sistema di prenotazioni online',
        'Integrazione social media',
        'Galleria foto/prodotti',
        'SEO avanzato per Google',
        'Analytics e statistiche',
        'Moduli contatto avanzati',
        '2 revisioni incluse'
      ],
      notIncluded: [
        'Hosting premium consigliato (€8-15/mese)',
        'Manutenzione continua (opzionale)'
      ],
      bestFor: 'Palestre, studi professionali, servizi',
      deliveryTime: '2-4 settimane',
      icon: 'bx-briefcase',
      popular: true
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Completo',
      subtitle: 'Vendi online',
      price: '850',
      priceNote: 'a partire da',
      description: 'Soluzione completa per vendere prodotti o servizi online',
      features: [
        'Negozio online completo',
        'Sistema pagamenti sicuro',
        'Gestione inventario',
        'Area clienti riservata',
        'Sistema ordini e fatturazione',
        'Integrazione spedizioni',
        'Ottimizzazione conversioni',
        'Training per gestire il negozio',
        '3 revisioni incluse'
      ],
      notIncluded: [
        'Commissioni pagamenti (2.9% + €0.25/transazione)',
        'Hosting e-commerce (€15-25/mese)'
      ],
      bestFor: 'Negozi, artigiani, produttori',
      deliveryTime: '4-6 settimane',
      icon: 'bx-cart',
      popular: false
    },
    {
      id: 'custom',
      name: 'Soluzione Su Misura',
      subtitle: 'Per esigenze specifiche',
      price: 'Preventivo',
      priceNote: 'personalizzato',
      description: 'Progetti complessi con funzionalità specifiche',
      features: [
        'Analisi approfondita delle necessità',
        'Sviluppo funzionalità custom',
        'Integrazione sistemi esistenti',
        'App mobile (opzionale)',
        'Automazioni avanzate',
        'Supporto dedicato',
        'Formazione completa del team',
        'Manutenzione inclusa 6 mesi'
      ],
      notIncluded: [
        'I costi variano in base alla complessità',
        'Hosting enterprise su richiesta'
      ],
      bestFor: 'Aziende strutturate, catene, franchise',
      deliveryTime: '6-12 settimane',
      icon: 'bx-cog',
      popular: false
    }
  ];

  const problemSolutions = [
    {
      problem: 'I clienti non mi trovano su Google',
      solution: 'SEO & Visibilità Locale',
      package: 'business',
      description: 'Ottimizziamo il tuo sito per apparire quando i clienti cercano i tuoi servizi',
      results: 'Più visite al sito, più telefonate, più clienti'
    },
    {
      problem: 'Voglio vendere i miei prodotti online',
      solution: 'Negozio E-commerce',
      package: 'ecommerce',
      description: 'Creiamo il tuo negozio online con pagamenti sicuri e gestione ordini',
      results: 'Vendite 24/7, clienti da tutta Italia, crescita del fatturato'
    },
    {
      problem: 'Perdo tempo a gestire gli appuntamenti',
      solution: 'Sistema Prenotazioni',
      package: 'business',
      description: 'I tuoi clienti prenotano online, tu ricevi le notifiche automaticamente',
      results: 'Meno telefonate, meno errori, più tempo per lavorare'
    },
    {
      problem: 'Il mio sito è vecchio e non funziona',
      solution: 'Rinnovo Completo',
      package: 'basic',
      description: 'Ripartiamo da zero con un design moderno e funzionalità aggiornate',
      results: 'Immagine professionale, sito veloce, clienti soddisfatti'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="pricing-section">
      <div className="container">
        <motion.div
          className="pricing-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>PREZZI TRASPARENTI</h2>
          <p className="section-intro">
            Sappiamo che hai bisogno di chiarezza sui costi. Nessuna sorpresa, nessun costo nascosto.
            Scegli la soluzione più adatta alla tua attività.
          </p>
        </motion.div>

        <div className="pricing-tabs">
          <button 
            className={`tab-button ${activeTab === 'packages' ? 'active' : ''}`}
            onClick={() => setActiveTab('packages')}
          >
            <i className='bx bx-package'></i>
            I Nostri Pacchetti
          </button>
          <button 
            className={`tab-button ${activeTab === 'solutions' ? 'active' : ''}`}
            onClick={() => setActiveTab('solutions')}
          >
            <i className='bx bx-bulb'></i>
            Trova la Tua Soluzione
          </button>
        </div>

        {activeTab === 'packages' && (
          <motion.div
            className="pricing-packages"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {pricingPackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                className={`pricing-card ${pkg.popular ? 'popular' : ''}`}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {pkg.popular && <div className="popular-badge">Più Scelto</div>}
                
                <div className="package-header">
                  <div className="package-icon">
                    <i className={`bx ${pkg.icon}`}></i>
                  </div>
                  <h3>{pkg.name}</h3>
                  <p className="package-subtitle">{pkg.subtitle}</p>
                  <div className="price-display">
                    <span className="price-note">{pkg.priceNote}</span>
                    <span className="price">
                      {pkg.price === 'Preventivo' ? pkg.price : `€${pkg.price}`}
                    </span>
                  </div>
                </div>

                <div className="package-content">
                  <p className="package-description">{pkg.description}</p>
                  
                  <div className="features-section">
                    <h4>✅ Cosa Include:</h4>
                    <ul className="features-list">
                      {pkg.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="not-included-section">
                    <h4>💡 Da Considerare:</h4>
                    <ul className="not-included-list">
                      {pkg.notIncluded.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="package-details">
                    <div className="detail-item">
                      <i className='bx bx-target-lock'></i>
                      <strong>Perfetto per:</strong> {pkg.bestFor}
                    </div>
                    <div className="detail-item timeline-item">
                      <i className='bx bx-time-five'></i>
                      <strong>Tempi di consegna:</strong> {pkg.deliveryTime}
                    </div>
                  </div>
                </div>

                <div className="package-footer">
                  <a href="#website-builder" className="package-cta">
                    Scegli Questo Pacchetto
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'solutions' && (
          <motion.div
            className="problem-solutions"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {problemSolutions.map((solution, index) => (
              <motion.div
                key={index}
                className="solution-card"
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="solution-problem">
                  <h3>"{solution.problem}"</h3>
                </div>
                <div className="solution-arrow">
                  <i className='bx bx-right-arrow-alt'></i>
                </div>
                <div className="solution-answer">
                  <h4>{solution.solution}</h4>
                  <p>{solution.description}</p>
                  <div className="solution-result">
                    <strong>Risultato:</strong> {solution.results}
                  </div>
                  <div className="recommended-package">
                    Pacchetto consigliato: <strong>{pricingPackages.find(p => p.id === solution.package)?.name}</strong>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="pricing-footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="guarantee-box">
            <i className='bx bx-shield-check'></i>
            <h3>La Nostra Garanzia</h3>
            <p>
              Se entro 30 giorni non sei soddisfatto del risultato, 
              lavoriamo insieme per migliorarlo fino a quando non sarà perfetto.
            </p>
          </div>
          
          <div className="next-steps">
            <h3>Prossimi Passi</h3>
            <div className="steps-list">
              <div className="step">
                <span className="step-number">1</span>
                <p>Compila il form per dirci le tue necessità</p>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <p>Ti chiamiamo entro 24 ore per discutere il progetto</p>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <p>Iniziamo a lavorare insieme al tuo successo</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;