import React from 'react';
import { motion } from 'framer-motion';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Davide Lombardini",
      role: "Proprietario",
      company: "Clean Service Srl",
      rating: 4.5,
      text: "Il sito che abbiamo fatto con loro ha cambiato tutto. Prima dovevamo gestire le prenotazioni a mano, ora arrivano da sole. I clienti dicono che è molto più facile prenotare online.",
      result: "Più prenotazioni",
      icon: "bx-cleaning"
    },
    {
      id: 2,
      name: "Luca Bartolomei",
      role: "Titolare",
      company: "Barbiere da Luca",
      rating: 5,
      text: "Ottimo lavoro! I miei clienti ora prenotano online e non devo più stare sempre al telefono. Il sistema è semplice da usare anche per me che non sono molto pratico.",
      result: "Meno stress",
      icon: "bx-cut"
    },
    {
      id: 3,
      name: "Francesca Morettini",
      role: "Istruttrice",
      company: "Palestra FitWell",
      rating: 4.5,
      text: "Abbiamo fatto un'app per la nostra palestra e i soci la usano sempre. Possono prenotare i corsi e vedere i loro progressi. Siamo molto contenti del risultato.",
      result: "Soci soddisfatti",
      icon: "bx-dumbbell"
    },
    {
      id: 4,
      name: "Stefano Benedetti",
      role: "Titolare",
      company: "Pizzeria La Brace",
      rating: 5,
      text: "Con il delivery online abbiamo risolto un sacco di problemi. Gli ordini arrivano direttamente e noi dobbiamo solo cucinare. Molto più organizzati di prima.",
      result: "Più ordini",
      icon: "bx-food-menu"
    },
    {
      id: 5,
      name: "Claudia Pagliarini",
      role: "Avvocato",
      company: "Studio Legale Pagliarini",
      rating: 4.5,
      text: "Il sito è venuto molto professionale. I clienti mi hanno fatto i complimenti e ho notato che arrivano più richieste rispetto a prima.",
      result: "Più clienti",
      icon: "bx-briefcase"
    },
    {
      id: 6,
      name: "Alessandro Giuliani",
      role: "Titolare",
      company: "Autofficina Giuliani",
      rating: 4,
      text: "Sono soddisfatto del lavoro. Il sito funziona bene e i clienti riescono a trovarci più facilmente su Google. Buon rapporto qualità prezzo.",
      result: "Più visibilità",
      icon: "bx-wrench"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => {
      const isFullStar = index < Math.floor(rating);
      const isHalfStar = index === Math.floor(rating) && rating % 1 !== 0;
      
      if (isFullStar) {
        return <i key={index} className="bx bxs-star filled"></i>;
      } else if (isHalfStar) {
        return <i key={index} className="bx bxs-star-half filled"></i>;
      } else {
        return <i key={index} className="bx bx-star"></i>;
      }
    });
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>TESTIMONIANZE CLIENTI</h2>
          <p className="section-intro">
            Quello che dicono i nostri clienti è la migliore garanzia della qualità del nostro lavoro.
            Ogni progetto è una storia di successo condivisa.
          </p>
        </motion.div>

        <motion.div
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              <div className="testimonial-header">
                <div className="client-info">
                  <div className="client-avatar">
                    <i className={`bx ${testimonial.icon}`}></i>
                  </div>
                  <div className="client-details">
                    <h4 className="client-name">{testimonial.name}</h4>
                    <p className="client-role">{testimonial.role}</p>
                    <p className="client-company">{testimonial.company}</p>
                  </div>
                </div>
                <div className="rating">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              
              <div className="testimonial-content">
                <blockquote>
                  "{testimonial.text}"
                </blockquote>
              </div>
              
              <div className="testimonial-footer">
                <div className="result-badge">
                  <i className='bx bx-trending-up'></i>
                  <span>{testimonial.result}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="testimonials-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>Vuoi essere il prossimo caso di successo?</p>
          <a href="/contact#website-builder" className="cta-button">
            <span>Inizia il Tuo Progetto</span>
            <i className='bx bx-right-arrow-alt'></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;