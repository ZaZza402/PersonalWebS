import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CaseStudiesPage = () => {
  return (
    <>
      <Helmet>
        <title>Casi di Successo (In Arrivo) | AxiomWeb</title>
        <meta name="description" content="Una nuova sezione è in costruzione. Presto qui troverai i racconti dettagliati dei nostri progetti e dei successi ottenuti insieme ai nostri clienti." />
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
              <i className='bx bx-edit-alt'></i>
            </div>
            <h1>Pagina in Costruzione</h1>
            <p className="section-intro">Stiamo mettendo nero su bianco i dettagli dei nostri migliori progetti. Torna presto per leggere i casi di successo e scoprire come abbiamo aiutato i nostri clienti a crescere.</p>
            <Link to="/" className="btn btn-primary">Torna alla Home</Link>
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default CaseStudiesPage;