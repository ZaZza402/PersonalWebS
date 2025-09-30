import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articlesAPI, getStrapiImageUrl, formatStrapiDate, calculateReadingTime } from '../services/strapiAPI';
import DemoModeNotice from '../components/DemoModeNotice';
import './BlogsPage.css';

const BlogsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dynamic categories based on actual articles (like SnippetsPage)
  const categories = [
    'all',
    ...new Set(articles.map(article => article.category).filter(cat => cat && cat !== 'general'))
  ];

  const demoArticles = useMemo(() => [
    {
      id: 1,
      title: "React Server Components: La Nuova Frontiera dello Sviluppo",
      excerpt: "Scopri come i React Server Components stanno rivoluzionando il modo di sviluppare applicazioni web moderne, migliorando performance e user experience.",
      category: "Sviluppo Web",
      slug: "react-server-components-guida",
      readingTime: 7,
      author: "Marco Antonelli",
      publishedAt: "28 set 2025",
      featuredImage: null
    },
    {
      id: 2,
      title: "CSS Grid vs Flexbox: Quando Usare Cosa nel 2025",
      excerpt: "Una guida completa per scegliere tra CSS Grid e Flexbox. Analisi dettagliata dei casi d'uso, vantaggi e limitazioni di entrambe le tecnologie.",
      category: "CSS & Design",
      slug: "css-grid-vs-flexbox-2025",
      readingTime: 9,
      author: "Sofia Bianchi",
      publishedAt: "25 set 2025",
      featuredImage: null
    },
    {
      id: 3,
      title: "JavaScript ES2024: Le Nuove Funzionalità che Cambiano Tutto",
      excerpt: "Esplora le ultime funzionalità di JavaScript ES2024: temporal API, pattern matching, decorators e molto altro. Con esempi pratici e casi d'uso reali.",
      category: "JavaScript",
      slug: "javascript-es2024-novita",
      readingTime: 12,
      author: "Luca Rossi",
      publishedAt: "22 set 2025",
      featuredImage: null
    },
    {
      id: 4,
      title: "Ottimizzazione Core Web Vitals: Strategie Avanzate per il 2025",
      excerpt: "Tecniche pratiche per migliorare LCP, FID e CLS. Dalla lazy loading intelligente al code splitting ottimizzato per massimizzare le performance.",
      category: "Performance",
      slug: "core-web-vitals-ottimizzazione-2025",
      readingTime: 11,
      author: "Elena Verde",
      publishedAt: "20 set 2025",
      featuredImage: null
    },
    {
      id: 5,
      title: "TypeScript 5.3: Type Safety e Developer Experience al Top",
      excerpt: "Analisi approfondita delle nuove funzionalità di TypeScript 5.3. Import assertions, satisfies operator e miglioramenti del type checking.",
      category: "TypeScript",
      slug: "typescript-5-3-nuove-funzionalita",
      readingTime: 8,
      author: "Alessandro Neri",
      publishedAt: "18 set 2025",
      featuredImage: null
    },
    {
      id: 6,
      title: "Accessibilità Web: Oltre WCAG 2.1 - Best Practices Moderne",
      excerpt: "Guida completa per creare interfacce web accessibili. Screen readers, navigation patterns, color contrast e testing automatizzato.",
      category: "Accessibilità",
      slug: "accessibilita-web-best-practices-2025",
      readingTime: 10,
      author: "Chiara Marino",
      publishedAt: "15 set 2025",
      featuredImage: null
    },
    {
      id: 7,
      title: "Micro-Frontend Architecture: Scalabilità per Team Enterprise",
      excerpt: "Implementazione pratica di architetture micro-frontend. Module federation, deployment strategies e gestione delle dipendenze condivise.",
      category: "Architettura",
      slug: "micro-frontend-architecture-enterprise",
      readingTime: 14,
      author: "Giovanni Ferri",
      publishedAt: "12 set 2025",
      featuredImage: null
    },
    {
      id: 8,
      title: "API Design First: REST vs GraphQL vs tRPC nel 2025",
      excerpt: "Confronto dettagliato tra le principali tecnologie per API moderne. Quando scegliere REST, GraphQL o tRPC per i tuoi progetti.",
      category: "API Design",
      slug: "api-design-rest-graphql-trpc-2025",
      readingTime: 13,
      author: "Valentina Conte",
      publishedAt: "10 set 2025",
      featuredImage: null
    }
  ], []);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      
      try {
        console.log('🚀 BlogsPage: Attempting to fetch articles from Strapi...');
        const strapiArticles = await articlesAPI.getAll();
        console.log('📦 BlogsPage: Raw Strapi response:', strapiArticles);
        
        if (strapiArticles && strapiArticles.data && strapiArticles.data.length > 0) {
          console.log('Processing Strapi articles:', strapiArticles.data.length, 'items');
          
          const formattedArticles = strapiArticles.data.map(item => {
            // DEFENSIVE FIX: Check for the .attributes wrapper. If it doesn't exist, use the item itself.
            const attrs = item.attributes || item;

            // Debug all fields
            console.log('=== STRAPI ARTICLE DEBUG:', attrs.title, '===');
            console.log('Raw attrs object:', attrs);
            console.log('publishedAt (camelCase):', attrs.publishedAt);
            console.log('publishedat (lowercase):', attrs.publishedat);
            console.log('createdAt (fallback):', attrs.createdAt);
            console.log('Final date used:', attrs.publishedAt || attrs.publishedat || attrs.createdAt);
            console.log('Author field structure:', attrs.author);
            console.log('Author as relationship:', attrs.author?.data?.attributes?.name);
            console.log('Author as text field:', attrs.author);
            console.log('Category from Strapi:', attrs.category);
            console.log('=======================================');

            return {
              id: item.id,
              title: attrs.title,
              excerpt: attrs.excerpt || attrs.description || '',
              content: attrs.content || '',
              category: attrs.category || 'general',
              slug: attrs.slug,
              readingTime: calculateReadingTime(attrs.content || ''),
              author: attrs.author?.data?.attributes?.name || attrs.author || 'Team Axiom Web',
              publishedAt: formatStrapiDate(attrs.publishedAt || attrs.publishedat || attrs.createdAt),
              featuredImage: getStrapiImageUrl(attrs.featuredImage)
            };
          });

          setArticles(formattedArticles);
          setLoading(false);
          return;
        } else {
          console.log('No articles data or empty array');
        }
      } catch (err) {
        // Only log non-network errors
        if (err.code !== 'ERR_NETWORK' && err.code !== 'ECONNREFUSED') {
          console.error('Error fetching articles:', err);
          setError('Errore nel caricamento degli articoli');
        }
      }

      // Fallback to demo data
      console.log('Using demo articles data');
      setArticles(demoArticles);
      setLoading(false);
    };

    fetchArticles();
  }, [demoArticles]);

  // Filter articles by category and search term
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  if (loading) {
    return (
      <div className="blogs-page">
        <DemoModeNotice />
        <Helmet>
          <title>Blog - Axiom Web</title>
          <meta name="description" content="Articoli e insights sul mondo digitale, intelligenza artificiale e innovazione tecnologica." />
        </Helmet>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Caricamento articoli...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blogs-page">
      <DemoModeNotice />
      <Helmet>
        <title>Blog - Axiom Web</title>
        <meta name="description" content="Articoli e insights sul mondo digitale, intelligenza artificiale e innovazione tecnologica." />
      </Helmet>

      {error && (
        <div className="error-banner">
          <p>{error}</p>
        </div>
      )}

      {/* Hero Section */}
      <motion.section 
        className="blogs-hero"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          <motion.div className="hero-content" variants={itemVariants}>
            <div className="hero-badge">
              <span>📚</span>
              Tutti gli articoli
            </div>
            <h1>Il Nostro Blog</h1>
            <p>Insights, innovazioni e tendenze nel mondo digitale</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-container">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'Tutti gli articoli' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="articles-section">
        <div className="container">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Cerca negli articoli..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <motion.div 
            className="articles-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredArticles.map(article => (
              <motion.article
                key={article.id}
                className="article-card"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {article.featuredImage && (
                  <div className="article-image">
                    <img src={article.featuredImage} alt={article.title} />
                  </div>
                )}
                <div className="article-content">
                  <div className="article-meta">
                    <span className="article-category">{article.category || 'Generale'}</span>
                    <span className="article-reading-time">{article.readingTime} min</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="article-footer">
                    <div className="article-author-date">
                      <span className="author">{article.author}</span>
                      <span className="date">{article.publishedAt}</span>
                    </div>
                    <Link to={`/blog/${article.slug}`} className="read-more-btn">
                      Leggi di più
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}

            {filteredArticles.length === 0 && (
              <motion.div className="no-articles" variants={itemVariants}>
                <h3>Nessun articolo trovato</h3>
                <p>Prova a modificare i filtri di ricerca o a selezionare una categoria diversa.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;