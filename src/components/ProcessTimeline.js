import React from 'react';
import { motion } from 'framer-motion';
import './ProcessTimeline.css';
import { useSmoothAnimation, staggerContainer, staggerItem } from '../hooks/useSmoothAnimation';

const ProcessTimeline = ({ variant = 'default' }) => {
  const { ref: timelineRef, controls } = useSmoothAnimation(staggerContainer);

  // Different process configurations based on variant
  const processConfigs = {
    default: {
      title: "Come Lavoriamo Insieme",
      subtitle: "Un processo collaudato per risultati garantiti",
      steps: [
        {
          icon: 'bx-conversation',
          title: '1. Scoperta',
          timeline: '1-2 giorni',
          description: 'Analizziamo la tua attività e definiamo insieme gli obiettivi.',
          deliverable: 'Strategia personalizzata'
        },
        {
          icon: 'bx-palette',
          title: '2. Design',
          timeline: '3-5 giorni', 
          description: 'Creiamo il design perfetto per i tuoi clienti.',
          deliverable: 'Prototipo interattivo'
        },
        {
          icon: 'bx-code-block',
          title: '3. Sviluppo',
          timeline: '1-3 settimane',
          description: 'Trasformiamo il design in un sito funzionante.',
          deliverable: 'Sito completo e testato'
        },
        {
          icon: 'bx-rocket',
          title: '4. Lancio',
          timeline: '1-2 giorni',
          description: 'Mettiamo tutto online e ti formiamo.',
          deliverable: 'Supporto 30 giorni'
        }
      ]
    },
    detailed: {
      title: "Il Nostro Processo Passo per Passo",
      subtitle: "Lavoriamo in modo strutturato per garantirti risultati di qualità nei tempi stabiliti.",
      steps: [
        {
          icon: 'bx-conversation',
          title: '1. Scoperta e Strategia',
          timeline: '1-2 giorni',
          description: 'Analizziamo insieme la tua attività, i tuoi obiettivi e il mercato di riferimento. Definiamo la strategia digitale più efficace per raggiungere i tuoi clienti ideali.',
          deliverable: 'Strategia personalizzata • Analisi competitor • Piano del progetto'
        },
        {
          icon: 'bx-palette',
          title: '2. Design e Prototipo',
          timeline: '3-5 giorni',
          description: 'Creiamo il design del tuo sito basandoci sui tuoi gusti e sui bisogni dei tuoi clienti. Ti mostriamo esattamente come apparirà prima di iniziare la costruzione.',
          deliverable: 'Design personalizzato • Prototipo interattivo • 1 revisione inclusa'
        },
        {
          icon: 'bx-code-block',
          title: '3. Sviluppo e Costruzione',
          timeline: '1-3 settimane',
          description: 'Trasformiamo il design in un sito web funzionante. Ti teniamo aggiornato sui progressi e implementiamo tutte le funzionalità concordate.',
          deliverable: 'Sito completo • Test su tutti i dispositivi • Configurazione hosting'
        },
        {
          icon: 'bx-rocket',
          title: '4. Lancio e Formazione',
          timeline: '1-2 giorni',
          description: 'Mettiamo online il tuo sito e ti insegniamo come gestirlo autonomamente. Ti forniamo tutti gli accessi e le guide necessarie.',
          deliverable: 'Sito online • Formazione personalizzata • Supporto 30 giorni'
        }
      ]
    },
    compact: {
      title: "In 4 Semplici Passaggi",
      subtitle: "Dal primo contatto al tuo sito online",
      steps: [
        {
          icon: 'bx-chat',
          title: 'Parliamo',
          timeline: '24h',
          description: 'Ci racconti la tua idea',
          deliverable: 'Proposta gratuita'
        },
        {
          icon: 'bx-pencil',
          title: 'Progettiamo',
          timeline: '2-3 giorni',
          description: 'Creiamo il tuo design',
          deliverable: 'Anteprima visiva'
        },
        {
          icon: 'bx-cog',
          title: 'Realizziamo',
          timeline: '1-2 settimane',
          description: 'Costruiamo il sito',
          deliverable: 'Aggiornamenti costanti'
        },
        {
          icon: 'bx-check-circle',
          title: 'Consegniamo',
          timeline: '1 giorno',
          description: 'Il tuo sito è online',
          deliverable: 'Tutto sotto controllo'
        }
      ]
    }
  };

  const config = processConfigs[variant] || processConfigs.default;

  return (
    <section className={`process-timeline-section ${variant}`}>
      <div className="container">
        <div className="section-header">
          <h2>{config.title}</h2>
          <p className="section-intro">{config.subtitle}</p>
        </div>
        
        <motion.div 
          ref={timelineRef}
          className={`process-timeline process-${variant} animate-in-view`}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
        >
          {config.steps.map((step, index) => (
            <motion.div 
              key={index}
              className="process-step"
              variants={staggerItem}
            >
              <div className="process-icon">
                <i className={`bx ${step.icon}`}></i>
              </div>
              <div className="process-content">
                <h3>{step.title}</h3>
                <div className="process-timeline-badge">📅 {step.timeline}</div>
                <p>{step.description}</p>
                <div className="process-deliverable">
                  <strong>Cosa ricevi:</strong> {step.deliverable}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {variant === 'detailed' && (
          <div className="process-guarantee">
            <div className="guarantee-content">
              <i className='bx bx-shield-check'></i>
              <div>
                <h4>Garanzia di Tempistiche</h4>
                <p>Rispettiamo sempre i tempi concordati. Se dovessimo superare i tempi per causa nostra, ricevi un bonus extra sul progetto.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProcessTimeline;