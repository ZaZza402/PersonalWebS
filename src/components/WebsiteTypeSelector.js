import React from 'react';
import { motion } from 'framer-motion';

const WebsiteTypeSelector = ({ selectedType, selectedStructure, onTypeChange, onStructureChange }) => {
  const websiteTypes = [
    {
      id: 'business',
      name: 'Sito Aziendale',
      description: 'Presenta la tua azienda e i tuoi servizi',
      icon: 'bx bxs-business',
      color: '#4F46E5',
      structures: [
        {
          id: 'simple',
          name: 'Struttura Semplice',
          pages: ['Home', 'Chi Siamo', 'Servizi', 'Contatti'],
          svg: (
            <svg viewBox="0 0 200 120" className="structure-preview">
              <rect x="10" y="10" width="180" height="20" fill="#4F46E5" rx="2"/>
              <rect x="10" y="40" width="55" height="40" fill="#E5E7EB" rx="2"/>
              <rect x="75" y="40" width="55" height="40" fill="#E5E7EB" rx="2"/>
              <rect x="140" y="40" width="50" height="40" fill="#E5E7EB" rx="2"/>
              <rect x="10" y="90" width="180" height="20" fill="#9CA3AF" rx="2"/>
            </svg>
          )
        },
        {
          id: 'advanced',
          name: 'Struttura Avanzata',
          pages: ['Home', 'Chi Siamo', 'Servizi', 'Portfolio', 'Blog', 'Contatti'],
          svg: (
            <svg viewBox="0 0 200 120" className="structure-preview">
              <rect x="10" y="10" width="180" height="15" fill="#4F46E5" rx="2"/>
              <rect x="10" y="35" width="85" height="30" fill="#E5E7EB" rx="2"/>
              <rect x="105" y="35" width="85" height="30" fill="#E5E7EB" rx="2"/>
              <rect x="10" y="75" width="55" height="25" fill="#F3F4F6" rx="2"/>
              <rect x="75" y="75" width="55" height="25" fill="#F3F4F6" rx="2"/>
              <rect x="140" y="75" width="50" height="25" fill="#F3F4F6" rx="2"/>
              <rect x="10" y="105" width="180" height="10" fill="#9CA3AF" rx="2"/>
            </svg>
          )
        }
      ]
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      description: 'Vendi i tuoi prodotti online',
      icon: 'bx bxs-shopping-bag',
      color: '#059669',
      structures: [
        {
          id: 'catalog',
          name: 'Catalogo Prodotti',
          pages: ['Home', 'Prodotti', 'Categorie', 'Carrello', 'Account', 'Contatti'],
          svg: (
            <svg viewBox="0 0 200 120" className="structure-preview">
              <rect x="10" y="10" width="180" height="15" fill="#059669" rx="2"/>
              <rect x="10" y="35" width="40" height="35" fill="#E5E7EB" rx="2"/>
              <rect x="60" y="35" width="40" height="35" fill="#E5E7EB" rx="2"/>
              <rect x="110" y="35" width="40" height="35" fill="#E5E7EB" rx="2"/>
              <rect x="160" y="35" width="30" height="35" fill="#10B981" rx="2"/>
              <rect x="10" y="80" width="40" height="35" fill="#F3F4F6" rx="2"/>
              <rect x="60" y="80" width="40" height="35" fill="#F3F4F6" rx="2"/>
              <rect x="110" y="80" width="40" height="35" fill="#F3F4F6" rx="2"/>
              <rect x="160" y="80" width="30" height="35" fill="#F3F4F6" rx="2"/>
            </svg>
          )
        }
      ]
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      description: 'Mostra i tuoi lavori e progetti',
      icon: 'bx bxs-palette',
      color: '#DC2626',
      structures: [
        {
          id: 'gallery',
          name: 'Galleria Progetti',
          pages: ['Home', 'Portfolio', 'Su di Me', 'Contatti'],
          svg: (
            <svg viewBox="0 0 200 120" className="structure-preview">
              <rect x="10" y="10" width="180" height="15" fill="#DC2626" rx="2"/>
              <rect x="10" y="35" width="85" height="50" fill="#E5E7EB" rx="2"/>
              <rect x="105" y="35" width="85" height="50" fill="#E5E7EB" rx="2"/>
              <rect x="10" y="95" width="55" height="20" fill="#F3F4F6" rx="2"/>
              <rect x="75" y="95" width="55" height="20" fill="#F3F4F6" rx="2"/>
              <rect x="140" y="95" width="50" height="20" fill="#F3F4F6" rx="2"/>
            </svg>
          )
        }
      ]
    },
    {
      id: 'restaurant',
      name: 'Ristorante',
      description: 'Menu, prenotazioni e informazioni',
      icon: 'bx bxs-food-menu',
      color: '#D97706',
      structures: [
        {
          id: 'menu',
          name: 'Menu e Prenotazioni',
          pages: ['Home', 'Menu', 'Prenotazioni', 'Gallery', 'Contatti'],
          svg: (
            <svg viewBox="0 0 200 120" className="structure-preview">
              <rect x="10" y="10" width="180" height="15" fill="#D97706" rx="2"/>
              <rect x="10" y="35" width="60" height="40" fill="#E5E7EB" rx="2"/>
              <rect x="80" y="35" width="60" height="40" fill="#F59E0B" rx="2"/>
              <rect x="150" y="35" width="40" height="40" fill="#E5E7EB" rx="2"/>
              <rect x="10" y="85" width="180" height="25" fill="#F3F4F6" rx="2"/>
            </svg>
          )
        }
      ]
    },
    {
      id: 'blog',
      name: 'Blog/Magazine',
      description: 'Condividi contenuti e articoli',
      icon: 'bx bxs-edit',
      color: '#7C3AED',
      structures: [
        {
          id: 'articles',
          name: 'Articoli e Categorie',
          pages: ['Home', 'Articoli', 'Categorie', 'Su di Me', 'Contatti'],
          svg: (
            <svg viewBox="0 0 200 120" className="structure-preview">
              <rect x="10" y="10" width="180" height="15" fill="#7C3AED" rx="2"/>
              <rect x="10" y="35" width="120" height="45" fill="#E5E7EB" rx="2"/>
              <rect x="140" y="35" width="50" height="20" fill="#F3F4F6" rx="2"/>
              <rect x="140" y="60" width="50" height="20" fill="#F3F4F6" rx="2"/>
              <rect x="10" y="90" width="180" height="20" fill="#9CA3AF" rx="2"/>
            </svg>
          )
        }
      ]
    },
    {
      id: 'professional',
      name: 'Professionale',
      description: 'Studio medico, legale, consulenza',
      icon: 'bx bxs-user-detail',
      color: '#0891B2',
      structures: [
        {
          id: 'services',
          name: 'Servizi Professionali',
          pages: ['Home', 'Servizi', 'Team', 'Appuntamenti', 'Contatti'],
          svg: (
            <svg viewBox="0 0 200 120" className="structure-preview">
              <rect x="10" y="10" width="180" height="15" fill="#0891B2" rx="2"/>
              <rect x="10" y="35" width="55" height="35" fill="#E5E7EB" rx="2"/>
              <rect x="75" y="35" width="55" height="35" fill="#E5E7EB" rx="2"/>
              <rect x="140" y="35" width="50" height="35" fill="#06B6D4" rx="2"/>
              <rect x="10" y="80" width="180" height="30" fill="#F3F4F6" rx="2"/>
            </svg>
          )
        }
      ]
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="website-type-selector">
      <div className="selector-header">
        <h3>Che tipo di sito web ti serve?</h3>
        <p>Scegli la categoria che meglio rappresenta la tua attività</p>
      </div>

      <div className="website-types-grid">
        {websiteTypes.map((type, index) => (
          <motion.div
            key={type.id}
            className={`website-type-card ${selectedType === type.id ? 'selected' : ''}`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            onClick={() => onTypeChange(type.id)}
          >
            <div className="type-icon" style={{ backgroundColor: type.color }}>
              <i className={type.icon}></i>
            </div>
            <h4>{type.name}</h4>
            <p>{type.description}</p>
          </motion.div>
        ))}
      </div>

      {selectedType && (
        <motion.div
          className="structure-selector"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4>Scegli la struttura del tuo sito</h4>
          <div className="structures-grid">
            {websiteTypes.find(t => t.id === selectedType)?.structures.map((structure) => (
              <div
                key={structure.id}
                className={`structure-card ${selectedStructure === structure.id ? 'selected' : ''}`}
                onClick={() => onStructureChange(structure.id)}
              >
                <div className="structure-preview-container">
                  {structure.svg}
                </div>
                <div className="structure-info">
                  <h5>{structure.name}</h5>
                  <div className="pages-list">
                    {structure.pages.map((page, index) => (
                      <span key={index} className="page-tag">{page}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WebsiteTypeSelector;