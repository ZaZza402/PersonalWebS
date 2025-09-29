import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AiGuidesPage = () => {
  return (
    <>
      <Helmet>
        <title>Guide AI (In Arrivo) | AxiomWeb</title>
        <meta name="description" content="Una nuova sezione è in costruzione. Presto qui troverai guide e approfondimenti sull'intelligenza artificiale per far crescere il tuo business." />
      </Helmet>
      
      <main id="main-content">
        <section className="coming-soon-section">
          <motion.div 
            className="container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="coming-soon-icon">
              <i className='bx bx-chip'></i>
            </div>
            <h1>Pagina in Costruzione</h1>
            <p className="section-intro">Stiamo preparando qualcosa di speciale. Le nostre guide sull'intelligenza artificiale saranno presto disponibili per aiutarti a sfruttare al massimo le nuove tecnologie per il tuo business.</p>
            <Link to="/" className="btn btn-primary">Torna alla Home</Link>
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default AiGuidesPage;