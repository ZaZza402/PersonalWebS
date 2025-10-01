import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WebsiteTypeSelector from './WebsiteTypeSelector';
import FeatureSelector from './FeatureSelector';
import RequirementsGenerator from './RequirementsGenerator';
import './WebsiteBuilderModal.css';

const WebsiteBuilderModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState({
    websiteType: null,
    structure: null,
    features: [],
    budget: null,
    timeline: null,
    description: ''
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Lock body scroll with multiple methods for better mobile support
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';
      
      // Return function to restore scroll position
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.documentElement.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Handle keyboard events (Escape to close)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const steps = [
    { id: 1, title: 'Tipo di Sito', subtitle: 'Che tipo di sito web ti serve?' },
    { id: 2, title: 'Struttura', subtitle: 'Come vuoi organizzare il contenuto?' },
    { id: 3, title: 'Funzionalità', subtitle: 'Quali funzioni ti servono?' },
    { id: 4, title: 'Riepilogo', subtitle: 'Il tuo progetto personalizzato' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectionChange = (field, value) => {
    setSelections(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="website-builder-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          onTouchMove={(e) => e.preventDefault()}
        >
          <motion.div
            className="website-builder-modal"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="modal-header">
              <div className="step-progress">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`step ${currentStep >= step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
                  >
                    <div className="step-number">{step.id}</div>
                    <div className="step-info">
                      <h4>{step.title}</h4>
                      <p>{step.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="close-btn" onClick={onClose}>
                <i className="bx bx-x"></i>
              </button>
            </div>

            {/* Modal Content */}
            <div className="modal-content">
              {currentStep === 1 && (
                <WebsiteTypeSelector
                  selectedType={selections.websiteType}
                  selectedStructure={selections.structure}
                  onTypeChange={(type) => handleSelectionChange('websiteType', type)}
                  onStructureChange={(structure) => handleSelectionChange('structure', structure)}
                />
              )}

              {currentStep === 2 && (
                <FeatureSelector
                  selectedFeatures={selections.features}
                  budget={selections.budget}
                  timeline={selections.timeline}
                  onFeaturesChange={(features) => handleSelectionChange('features', features)}
                  onBudgetChange={(budget) => handleSelectionChange('budget', budget)}
                  onTimelineChange={(timeline) => handleSelectionChange('timeline', timeline)}
                />
              )}

              {currentStep === 3 && (
                <div className="description-step">
                  <h3>Descrivi il tuo progetto</h3>
                  <p>Aggiungi qualche dettaglio in più sul tuo business e sui tuoi obiettivi</p>
                  <textarea
                    value={selections.description}
                    onChange={(e) => handleSelectionChange('description', e.target.value)}
                    placeholder="Es: Sono un ristorante nel centro di Roma e voglio un sito che mostri il menu, permetta prenotazioni online e racconti la nostra storia..."
                    rows={5}
                  />
                </div>
              )}

              {currentStep === 4 && (
                <RequirementsGenerator
                  selections={selections}
                  onClose={onClose}
                />
              )}
            </div>

            {/* Modal Footer */}
            {currentStep < 4 && (
              <div className="modal-footer">
                <button
                  className="btn-secondary"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  Indietro
                </button>
                <button
                  className="btn-primary"
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && !selections.websiteType) ||
                    (currentStep === 2 && selections.features.length === 0)
                  }
                >
                  {currentStep === 3 ? 'Genera Richiesta' : 'Avanti'}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WebsiteBuilderModal;