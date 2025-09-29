// src/components/PortfolioShowcase.js
import React from 'react';
import { motion } from 'framer-motion';
import './PortfolioShowcase.css';

const PortfolioShowcase = () => {
  const projects = [
    {
      id: 1,
      title: "Clean Service Srl",
      category: "Servizi Professionali",
      description: "Piattaforma digitale che ha aumentato le prenotazioni del 250%",
      tech: ["React", "Node.js", "Booking System"],
      image: "/images/service-pulizia.png",
      stats: { bookings: "+250%", clients: "+180%" },
      color: "rgba(0, 198, 255, 0.8)"
    },
    {
      id: 2,
      title: "La Barberia Stilosa",
      category: "Benessere & Cura",
      description: "Sistema di prenotazioni online che ha triplicato la clientela",
      tech: ["Vue.js", "Firebase", "PWA"],
      image: "/images/barbiere.png", 
      stats: { bookings: "+300%", revenue: "+150%" },
      color: "rgba(255, 127, 80, 0.8)"
    },
    {
      id: 3,
      title: "Palestra PowerFit",
      category: "Benessere & Fitness",
      description: "App fitness che ha raggiunto 5k+ membri attivi",
      tech: ["React Native", "GraphQL", "AWS"],
      image: "/images/palestra.png",
      stats: { members: "5k+", retention: "85%" },
      color: "rgba(0, 119, 255, 0.8)"
    },
    {
      id: 4,
      title: "Ristorante La Brace",
      category: "Ristorazione",
      description: "E-commerce gastronomico con delivery che ha raddoppiato gli ordini",
      tech: ["Next.js", "Stripe", "Delivery API"],
      image: "/images/ristorante.png",
      stats: { orders: "+200%", revenue: "+180%" },
      color: "rgba(255, 127, 80, 0.6)"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="portfolio-showcase">
      <motion.div 
        className="showcase-header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3>I Nostri Ultimi Successi</h3>
        <p>Progetti che hanno trasformato il business dei nostri clienti</p>
      </motion.div>

      <motion.div 
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="project-card"
            variants={cardVariants}
            whileHover={{ 
              y: -10, 
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 }
            }}
            style={{ '--project-color': project.color }}
          >
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <span className="project-category">{project.category}</span>
              </div>
            </div>
            
            <div className="project-content">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              
              <div className="project-tech">
                {project.tech.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              <div className="project-stats">
                {Object.entries(project.stats).map(([key, value], index) => (
                  <div key={index} className="stat">
                    <span className="stat-value">{value}</span>
                    <span className="stat-label">{key}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="showcase-cta"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <p>Vuoi essere il prossimo caso di successo?</p>
        <motion.button 
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Inizia il Tuo Progetto
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PortfolioShowcase;