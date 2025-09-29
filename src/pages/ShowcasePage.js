// src/pages/ShowcasePage.js
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const portfolioItems = [
    { id: 1, category: 'servizi', fullImage: '/images/service-pulizia.png', thumb: '/images/pulizia-small.jpg', title: 'Clean Service Srl', desc: 'Servizi Professionali' },
    { id: 2, category: 'benessere', fullImage: '/images/barbiere.png', thumb: '/images/barbiere-small.jpg', title: 'La Barberia Stilosa', desc: 'Benessere e Cura della Persona' },
    { id: 3, category: 'artigianato', fullImage: '/images/legno-passione.png', thumb: '/images/legno-small.jpg', title: 'Legno & Passione', desc: 'Artigianato' },
    { id: 4, category: 'benessere', fullImage: '/images/palestra.png', thumb: '/images/palestra-small.jpg', title: 'Palestra PowerFit', desc: 'Benessere e Fitness' },
    { id: 5, category: 'ristorazione', fullImage: '/images/ristorante.png', thumb: '/images/ristorante-small.jpg', title: 'Ristorante La Brace', desc: 'Ristorazione' },
    { id: 6, category: 'design', fullImage: '/images/design-interni.png', thumb: '/images/studiodesign-small.jpg', title: 'Studio Design Interni', desc: 'Design e Arredamento' }
];

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, delay } 
  })
};

const ShowcasePage = () => {
    const [filter, setFilter] = useState('all');
    const [selectedId, setSelectedId] = useState(null);

    const filteredItems = filter === 'all' 
        ? portfolioItems 
        : portfolioItems.filter(item => item.category === filter);

    const selectedItem = selectedId ? portfolioItems.find(item => item.id === selectedId) : null;

    return (
        <>
            <Helmet>
                <title>Portfolio | AxiomWeb</title>
                <meta name="description" content="Esplora una selezione dei nostri migliori lavori..." />
            </Helmet>

            <header className="page-header">
                <div className="container">
                    <motion.h1 initial="hidden" animate="visible" variants={textVariant}>I Nostri Lavori</motion.h1>
                    <motion.p initial="hidden" animate="visible" variants={textVariant} custom={0.2} className="page-subtitle">
                        Una selezione di progetti che dimostrano il nostro approccio strategico e la nostra passione per il design. Ogni sito è una soluzione, non solo un'estetica.
                    </motion.p>
                </div>
            </header>

            <section className="portfolio-section">
                <div className="container">
                    <motion.div 
                        className="filter-buttons"
                        initial="hidden"
                        animate="visible"
                        variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
                    >
                        {['all', 'ristorazione', 'benessere', 'artigianato', 'design', 'servizi'].map(cat => (
                           <motion.button 
                                key={cat}
                                className={`filter-btn ${filter === cat ? 'active' : ''}`} 
                                onClick={() => setFilter(cat)}
                                variants={textVariant}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </motion.button>
                        ))}
                    </motion.div>

                    <motion.div className="portfolio-grid">
                        {filteredItems.map(item => (
                            <motion.div
                                key={item.id}
                                className="portfolio-card"
                                layoutId={`card-container-${item.id}`} // This is the key for the magic
                                onClick={() => setSelectedId(item.id)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <img src={item.thumb} alt={`Progetto per ${item.title}`} />
                                <div className="card-overlay">
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                    <span className="view-case-study">Visualizza Progetto</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            
            {/* This component handles animating the expanded card in and out */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div 
                        className="expanded-card-overlay"
                        onClick={() => setSelectedId(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="expanded-card-content"
                            layoutId={`card-container-${selectedItem.id}`} // Matching layoutId
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the card
                        >
                            <motion.img src={selectedItem.fullImage} alt={selectedItem.title} />
                            <motion.div className="expanded-card-text">
                                <h3>{selectedItem.title}</h3>
                                <p>{selectedItem.desc}</p>
                            </motion.div>
                            <motion.button 
                                className="expanded-card-close-btn" 
                                onClick={() => setSelectedId(null)}
                            >
                                ×
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section id="cta" className="cta-section">
                <div className="container">
                    <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={textVariant}>
                        Il Tuo Progetto Potrebbe Essere il Prossimo
                    </motion.h2>
                    <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={textVariant} custom={0.2} className="section-intro">
                        Sei pronto a trasformare la tua idea in un caso di successo? Parliamone insieme.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', delay: 0.4 }}>
                        <Link to="/contact" className="btn btn-primary">Richiedi la Tua Proposta Gratuita</Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default ShowcasePage;