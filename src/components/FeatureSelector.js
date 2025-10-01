import React from 'react';
import { motion } from 'framer-motion';

const FeatureSelector = ({ selectedFeatures, budget, timeline, onFeaturesChange, onBudgetChange, onTimelineChange }) => {
  const features = [
    {
      id: 'contact-form',
      name: 'Modulo di Contatto',
      description: 'Form per ricevere messaggi dai clienti',
      icon: 'bx bxs-message',
      category: 'Comunicazione',
      essential: true
    },
    {
      id: 'whatsapp',
      name: 'Chat WhatsApp',
      description: 'Pulsante per chat diretta su WhatsApp',
      icon: 'bx bxl-whatsapp',
      category: 'Comunicazione',
      essential: false
    },
    {
      id: 'gallery',
      name: 'Galleria Immagini',
      description: 'Mostra foto dei tuoi lavori o prodotti',
      icon: 'bx bxs-image',
      category: 'Contenuti',
      essential: false
    },
    {
      id: 'video',
      name: 'Video Integrati',
      description: 'Incorpora video YouTube o Vimeo',
      icon: 'bx bxs-video',
      category: 'Contenuti',
      essential: false
    },
    {
      id: 'maps',
      name: 'Mappa Interattiva',
      description: 'Google Maps con la tua posizione',
      icon: 'bx bxs-map',
      category: 'Localizzazione',
      essential: false
    },
    {
      id: 'booking',
      name: 'Sistema Prenotazioni',
      description: 'Calendario per appuntamenti online',
      icon: 'bx bxs-calendar',
      category: 'Prenotazioni',
      essential: false
    },
    {
      id: 'ecommerce-basic',
      name: 'Shop Online Base',
      description: 'Vendita prodotti con carrello',
      icon: 'bx bxs-cart',
      category: 'E-commerce',
      essential: false
    },
    {
      id: 'ecommerce-advanced',
      name: 'Shop Online Avanzato',
      description: 'Gestione magazzino, coupon, spedizioni',
      icon: 'bx bxs-store',
      category: 'E-commerce',
      essential: false
    },
    {
      id: 'blog',
      name: 'Blog/Notizie',
      description: 'Sezione per articoli e aggiornamenti',
      icon: 'bx bxs-edit',
      category: 'Contenuti',
      essential: false
    },
    {
      id: 'multilanguage',
      name: 'Multilingua',
      description: 'Sito in più lingue',
      icon: 'bx bxs-globe',
      category: 'Internazionalizzazione',
      essential: false
    },
    {
      id: 'seo',
      name: 'Ottimizzazione SEO',
      description: 'Ottimizzato per Google',
      icon: 'bx bxs-search',
      category: 'Marketing',
      essential: true
    },
    {
      id: 'analytics',
      name: 'Google Analytics',
      description: 'Statistiche visitatori',
      icon: 'bx bxs-bar-chart-alt-2',
      category: 'Analytics',
      essential: false
    },
    {
      id: 'social-feeds',
      name: 'Feed Social Media',
      description: 'Mostra post da Instagram/Facebook',
      icon: 'bx bxl-instagram',
      category: 'Social Media',
      essential: false
    },
    {
      id: 'newsletter',
      name: 'Newsletter',
      description: 'Raccolta email per mailing list',
      icon: 'bx bxs-envelope',
      category: 'Marketing',
      essential: false
    },
    {
      id: 'reviews',
      name: 'Recensioni',
      description: 'Sezione per testimonianze clienti',
      icon: 'bx bxs-star',
      category: 'Credibilità',
      essential: false
    },
    {
      id: 'live-chat',
      name: 'Chat Live',
      description: 'Assistenza clienti in tempo reale',
      icon: 'bx bxs-chat',
      category: 'Supporto',
      essential: false
    }
  ];

  const budgetOptions = [
    { id: 'budget-small', label: '€500 - €1.500', value: 'small', description: 'Sito semplice e funzionale' },
    { id: 'budget-medium', label: '€1.500 - €3.000', value: 'medium', description: 'Sito con funzionalità avanzate' },
    { id: 'budget-large', label: '€3.000 - €5.000', value: 'large', description: 'Sito complesso e personalizzato' },
    { id: 'budget-enterprise', label: '€5.000+', value: 'enterprise', description: 'Progetto enterprise' }
  ];

  const timelineOptions = [
    { id: 'urgent', label: '1-2 settimane', value: 'urgent', description: 'Progetto urgente' },
    { id: 'normal', label: '3-4 settimane', value: 'normal', description: 'Tempistica standard' },
    { id: 'relaxed', label: '1-2 mesi', value: 'relaxed', description: 'Senza fretta' },
    { id: 'flexible', label: 'Flessibile', value: 'flexible', description: 'Quando possibile' }
  ];

  const categories = [...new Set(features.map(f => f.category))];

  const toggleFeature = (featureId) => {
    const newFeatures = selectedFeatures.includes(featureId)
      ? selectedFeatures.filter(id => id !== featureId)
      : [...selectedFeatures, featureId];
    onFeaturesChange(newFeatures);
  };

  // Auto-select essential features
  React.useEffect(() => {
    const essentialFeatureIds = ['contact-form', 'seo'];
    const missingEssentials = essentialFeatureIds.filter(id => !selectedFeatures.includes(id));
    if (missingEssentials.length > 0) {
      onFeaturesChange([...selectedFeatures, ...missingEssentials]);
    }
  }, [selectedFeatures, onFeaturesChange]);

  return (
    <div className="feature-selector">
      <div className="selector-header">
        <h3>Quali funzionalità ti servono?</h3>
        <p>Seleziona le funzioni che vuoi nel tuo sito web</p>
      </div>

      {/* Essential Features */}
      <div className="essential-features-section">
        <h4 className="section-title essential">🔥 Funzionalità Essenziali (Incluse)</h4>
        <div className="features-grid essential-grid">
          {features.filter(f => f.essential).map((feature) => (
            <motion.div
              key={feature.id}
              className="feature-card essential selected"
              whileHover={{ scale: 1.01 }}
            >
              <div className="feature-icon essential">
                <i className={feature.icon}></i>
              </div>
              <div className="feature-info">
                <h5>{feature.name}</h5>
                <p>{feature.description}</p>
              </div>
              <div className="feature-checkbox">
                <i className="bx bx-check"></i>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Optional Features by Category */}
      <div className="optional-features-section">
        <h4 className="section-title">⚡ Funzionalità Aggiuntive</h4>
        {categories.filter(cat => features.some(f => f.category === cat && !f.essential)).map((category) => {
          const categoryFeatures = features.filter(f => f.category === category && !f.essential);
          if (categoryFeatures.length === 0) return null;
          
          return (
            <div key={category} className="feature-category">
              <h5 className="category-subtitle">{category}</h5>
              <div className="features-grid">
                {categoryFeatures.map((feature) => (
                  <motion.div
                    key={feature.id}
                    className={`feature-card ${selectedFeatures.includes(feature.id) ? 'selected' : ''}`}
                    onClick={() => toggleFeature(feature.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="feature-icon">
                      <i className={feature.icon}></i>
                    </div>
                    <div className="feature-info">
                      <h5>{feature.name}</h5>
                      <p>{feature.description}</p>
                    </div>
                    <div className="feature-checkbox">
                      {selectedFeatures.includes(feature.id) && <i className="bx bx-check"></i>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Budget Selection */}
      <div className="budget-section">
        <h4>Qual è il tuo budget indicativo?</h4>
        <div className="budget-grid">
          {budgetOptions.map((option) => (
            <div
              key={option.id}
              className={`budget-card ${budget === option.value ? 'selected' : ''}`}
              onClick={() => onBudgetChange(option.value)}
            >
              <h5>{option.label}</h5>
              <p>{option.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Selection */}
      <div className="timeline-section">
        <h4>Quando ti servirebbe il sito?</h4>
        <div className="timeline-grid">
          {timelineOptions.map((option) => (
            <div
              key={option.id}
              className={`timeline-card ${timeline === option.value ? 'selected' : ''}`}
              onClick={() => onTimelineChange(option.value)}
            >
              <h5>{option.label}</h5>
              <p>{option.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSelector;