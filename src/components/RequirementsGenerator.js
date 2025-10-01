import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RequirementsGenerator = ({ selections, onClose }) => {
  const [copied, setCopied] = useState(false);

  const websiteTypeLabels = {
    business: 'Sito Aziendale',
    ecommerce: 'E-commerce',
    portfolio: 'Portfolio',
    restaurant: 'Ristorante',
    blog: 'Blog/Magazine',
    professional: 'Sito Professionale'
  };

  const structureLabels = {
    simple: 'Struttura Semplice',
    advanced: 'Struttura Avanzata',
    catalog: 'Catalogo Prodotti',
    gallery: 'Galleria Progetti',
    menu: 'Menu e Prenotazioni',
    articles: 'Articoli e Categorie',
    services: 'Servizi Professionali'
  };

  const featureLabels = {
    'contact-form': 'Modulo di Contatto',
    'whatsapp': 'Chat WhatsApp',
    'gallery': 'Galleria Immagini',
    'video': 'Video Integrati',
    'maps': 'Mappa Interattiva',
    'booking': 'Sistema Prenotazioni',
    'ecommerce-basic': 'Shop Online Base',
    'ecommerce-advanced': 'Shop Online Avanzato',
    'blog': 'Blog/Notizie',
    'multilanguage': 'Multilingua',
    'seo': 'Ottimizzazione SEO',
    'analytics': 'Google Analytics',
    'social-feeds': 'Feed Social Media',
    'newsletter': 'Newsletter',
    'reviews': 'Recensioni',
    'live-chat': 'Chat Live'
  };

  const budgetLabels = {
    small: '€500 - €1.500',
    medium: '€1.500 - €3.000',
    large: '€3.000 - €5.000',
    enterprise: '€5.000+'
  };

  const timelineLabels = {
    urgent: '1-2 settimane',
    normal: '3-4 settimane',
    relaxed: '1-2 mesi',
    flexible: 'Flessibile'
  };

  const generateRequirementsText = () => {
    let text = `🌐 RICHIESTA NUOVO SITO WEB\n\n`;
    
    text += `📋 TIPO DI SITO:\n`;
    text += `${websiteTypeLabels[selections.websiteType] || 'Non specificato'}\n\n`;
    
    if (selections.structure) {
      text += `🏗️ STRUTTURA:\n`;
      text += `${structureLabels[selections.structure]}\n\n`;
    }
    
    if (selections.features && selections.features.length > 0) {
      text += `⚙️ FUNZIONALITÀ RICHIESTE:\n`;
      selections.features.forEach(feature => {
        text += `• ${featureLabels[feature] || feature}\n`;
      });
      text += `\n`;
    }
    
    if (selections.budget) {
      text += `💰 BUDGET INDICATIVO:\n`;
      text += `${budgetLabels[selections.budget]}\n\n`;
    }
    
    if (selections.timeline) {
      text += `📅 TEMPISTICHE:\n`;
      text += `${timelineLabels[selections.timeline]}\n\n`;
    }
    
    if (selections.description && selections.description.trim()) {
      text += `📝 DESCRIZIONE PROGETTO:\n`;
      text += `${selections.description.trim()}\n\n`;
    }
    
    text += `---\n`;
    text += `✨ Questa richiesta è stata generata tramite il configuratore di AxiomWeb\n`;
    text += `📧 Email: info@axiomweb.eu\n`;
    text += `📱 WhatsApp: +39 069 442 8189\n`;
    text += `🌐 Website: www.axiomweb.eu`;
    
    return text;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateRequirementsText());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(generateRequirementsText());
    const whatsappUrl = `https://wa.me/393694428189?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  const openEmail = () => {
    const subject = encodeURIComponent('Richiesta Nuovo Sito Web');
    const body = encodeURIComponent(generateRequirementsText());
    const emailUrl = `mailto:info@axiomweb.eu?subject=${subject}&body=${body}`;
    window.open(emailUrl);
  };

  return (
    <motion.div 
      className="requirements-generator"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="generator-header">
        <div className="success-icon">
          <i className="bx bx-check-circle"></i>
        </div>
        <h3>Il tuo progetto è pronto!</h3>
        <p>Abbiamo preparato un riassunto dettagliato delle tue esigenze</p>
      </div>

      <div className="requirements-preview">
        <h4>Anteprima della richiesta:</h4>
        <div className="preview-content">
          <pre>{generateRequirementsText()}</pre>
        </div>
      </div>

      <div className="action-buttons">
        <motion.button
          className="btn-copy"
          onClick={copyToClipboard}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className={`bx ${copied ? 'bx-check' : 'bx-copy'}`}></i>
          {copied ? 'Copiato!' : 'Copia Testo'}
        </motion.button>

        <motion.button
          className="btn-whatsapp"
          onClick={openWhatsApp}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="bx bxl-whatsapp"></i>
          Invia su WhatsApp
        </motion.button>

        <motion.button
          className="btn-email"
          onClick={openEmail}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="bx bx-envelope"></i>
          Invia Email
        </motion.button>
      </div>

      <div className="next-steps">
        <h4>💡 Prossimi passi:</h4>
        <div className="steps-list">
          <div className="step">
            <span className="step-number">1</span>
            <p><strong>Invia la richiesta</strong> tramite WhatsApp o email usando i pulsanti qui sopra</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <p><strong>Ti risponderemo entro 24 ore</strong> con una proposta personalizzata</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <p><strong>Creeremo una demo</strong> del tuo sito per farti vedere come sarà</p>
          </div>
        </div>
      </div>

      <div className="generator-footer">
        <button className="btn-close" onClick={onClose}>
          <i className="bx bx-x"></i>
          Chiudi
        </button>
      </div>
    </motion.div>
  );
};

export default RequirementsGenerator;