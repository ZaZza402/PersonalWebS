import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ResourcesShowcase.css';

const ResourcesShowcase = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="resources-showcase">
      <div className="container">
        <motion.div
          className="resources-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>RISORSE E CONTENUTI</h2>
          <p className="section-intro">
            Approfondisci le tue conoscenze con i nostri articoli specializzati e 
            scopri snippet di codice pronti all'uso per i tuoi progetti.
          </p>
        </motion.div>

        <motion.div
          className="resources-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Blog Card */}
          <motion.div
            className="resource-card blog-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.div className="card-content" variants={hoverVariants}>
              <div className="card-badge">BLOG</div>
              
              <div className="card-icon-wrapper">
                <i className='bx bx-book-content'></i>
              </div>
              
              <h3>Articoli e Guide</h3>
              <p className="card-description">
                Esplora articoli approfonditi su sviluppo web, SEO, design UX/UI e 
                le ultime tendenze del digitale. Contenuti pratici per far crescere 
                la tua presenza online.
              </p>
              
              <div className="card-features">
                <div className="feature-item">
                  <i className='bx bx-check'></i>
                  <span>Guide step-by-step</span>
                </div>
                <div className="feature-item">
                  <i className='bx bx-check'></i>
                  <span>Best practices</span>
                </div>
                <div className="feature-item">
                  <i className='bx bx-check'></i>
                  <span>Case studies</span>
                </div>
              </div>

              <Link to="/blog" className="card-button">
                <span>Esplora Blog</span>
                <i className='bx bx-right-arrow-alt'></i>
              </Link>
            </motion.div>

            <div className="card-glow"></div>
          </motion.div>

          {/* Snippets Card */}
          <motion.div
            className="resource-card snippets-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.div className="card-content" variants={hoverVariants}>
              <div className="card-badge">SNIPPETS</div>
              
              <div className="card-icon-wrapper">
                <i className='bx bx-code-curly'></i>
              </div>
              
              <h3>Codice Pronto all'Uso</h3>
              <p className="card-description">
                Raccolta di snippet di codice testati e ottimizzati per React, 
                JavaScript, CSS e molto altro. Copia, incolla e personalizza 
                per i tuoi progetti.
              </p>
              
              <div className="card-features">
                <div className="feature-item">
                  <i className='bx bx-check'></i>
                  <span>Codice testato</span>
                </div>
                <div className="feature-item">
                  <i className='bx bx-check'></i>
                  <span>Facile integrazione</span>
                </div>
                <div className="feature-item">
                  <i className='bx bx-check'></i>
                  <span>Sempre aggiornato</span>
                </div>
              </div>

              <Link to="/snippets" className="card-button">
                <span>Sfoglia Snippets</span>
                <i className='bx bx-right-arrow-alt'></i>
              </Link>
            </motion.div>

            <div className="card-glow"></div>
          </motion.div>
        </motion.div>

        <motion.div
          className="resources-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>Nuovi contenuti vengono aggiunti regolarmente. Torna spesso per scoprire le ultime novità!</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ResourcesShowcase;