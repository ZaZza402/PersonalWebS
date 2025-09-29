import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { articlesAPI, getStrapiImageUrl, formatStrapiDate, calculateReadingTime } from '../services/strapiAPI';
import CodeBlock from '../components/CodeBlock';
import './ArticlePage.css';

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch from Strapi by slug
        const response = await articlesAPI.getBySlug(slug);
        
        if (response && response.data && response.data.length > 0) {
          const strapiArticle = response.data[0];
          // DEFENSIVE FIX: Check for the .attributes wrapper on the single article object.
          const attrs = strapiArticle.attributes || strapiArticle;

          const formattedArticle = {
            id: strapiArticle.id,
            title: attrs.title,
            excerpt: attrs.excerpt || '',
            content: attrs.content || '',
            category: attrs.category || 'general',
            readTime: calculateReadingTime(attrs.content || ''),
            date: formatStrapiDate(attrs.publishedAt || attrs.publishedat || attrs.createdAt),
            image: getStrapiImageUrl(attrs.featuredImage),
            author: attrs.author?.data?.attributes?.name || attrs.author || 'AxiomWeb Team',
            slug: attrs.slug,
            tags: attrs.tags || []
          };
          
          setArticle(formattedArticle);

          // Fetch related articles
          const relatedResponse = await articlesAPI.getByCategory(formattedArticle.category, 3);
          if (relatedResponse && relatedResponse.data) {
            const related = relatedResponse.data
              .filter(item => item.id !== formattedArticle.id)
              .map(item => ({
                id: item.id,
                title: item.attributes.title,
                excerpt: item.attributes.excerpt,
                slug: item.attributes.slug,
                readTime: calculateReadingTime(item.attributes.content),
                date: formatStrapiDate(item.attributes.publishedAt || item.attributes.publishedat || item.attributes.createdAt),
                image: getStrapiImageUrl(item.attributes.featuredImage)
              }));
            setRelatedArticles(related);
          }
        } else {
          // Fallback to mock data
          const mockArticles = {
            'ai-business-2024': {
              id: 1,
              title: "Come l'AI può rivoluzionare il tuo business nel 2024",
              excerpt: "Scopri le strategie più efficaci per implementare l'intelligenza artificiale nella tua azienda e ottenere risultati concreti.",
              content: `# Come l'AI può rivoluzionare il tuo business nel 2024

L'intelligenza artificiale non è più solo una tecnologia futuristica: è diventata una **necessità strategica** per le aziende che vogliono rimanere competitive nel mercato digitale odierno.

## Perché l'AI è fondamentale oggi

Nel 2024, le aziende che non integrano l'AI nei loro processi rischiano di rimanere indietro. Ecco perché:

### 1. Automazione dei Processi
L'AI può automatizzare compiti ripetitivi, liberando i tuoi dipendenti per attività più creative e strategiche.

\`\`\`python
# Esempio di automazione con AI
import openai

def automate_customer_service(query):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Sei un assistente per il servizio clienti."},
            {"role": "user", "content": query}
        ]
    )
    return response.choices[0].message.content
\`\`\`

### 2. Personalizzazione dell'Esperienza Cliente
L'AI analizza i dati comportamentali per offrire esperienze personalizzate che aumentano la soddisfazione e le conversioni.

### 3. Analisi Predittiva
Anticipa le tendenze del mercato e i comportamenti dei clienti per prendere decisioni informate.

## Strategie di Implementazione

### Step 1: Identifica le Opportunità
- Analizza i processi attuali
- Identifica i colli di bottiglia
- Valuta dove l'AI può avere il maggiore impatto

### Step 2: Inizia con Progetti Pilota
Non cercare di rivoluzionare tutto in una volta. Inizia con progetti piccoli e misurabili.

### Step 3: Forma il Tuo Team
Investi nella formazione dei tuoi dipendenti sulle tecnologie AI.

## ROI dell'AI

Le aziende che implementano correttamente l'AI vedono:
- **35% di aumento** della produttività
- **25% di riduzione** dei costi operativi
- **40% di miglioramento** nella soddisfazione del cliente

## Conclusione

L'AI non è più un'opzione, ma una necessità. Le aziende che agiscono ora avranno un vantaggio competitivo significativo nei prossimi anni.`,
              category: 'ai',
              readTime: '8 min',
              date: '15 Gen 2024',
              image: null,
              author: 'Marco Rossi',
              slug: 'ai-business-2024',
              tags: ['AI', 'Business', 'Automazione', 'ROI']
            },
            'react-18-features': {
              id: 2,
              title: "React 18: Le nuove features che cambieranno il development",
              excerpt: "Analisi approfondita delle novità di React 18 e come implementarle nei tuoi progetti per migliorare le performance.",
              content: `# React 18: Le nuove features che cambieranno il development

React 18 introduce cambiamenti rivoluzionari che trasformeranno il modo in cui sviluppiamo applicazioni web moderne.

## Concurrent Features

La caratteristica più importante di React 18 è il **Concurrent Rendering**, che permette a React di preparare più versioni dell'UI contemporaneamente.

### Automatic Batching

React 18 raggruppa automaticamente più aggiornamenti di stato in un singolo re-render per migliorare le performance.

\`\`\`javascript
// In React 18, questi aggiornamenti vengono raggruppati automaticamente
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React renderizzerà solo una volta alla fine
}
\`\`\`

### Transitions

Le Transitions permettono di marcare gli aggiornamenti come non urgenti, migliorando la responsività.

\`\`\`javascript
import { useTransition, useState } from 'react';

function SearchResults() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function handleChange(e) {
    setQuery(e.target.value);
    startTransition(() => {
      // Questo aggiornamento è non urgente
      setResults(filterResults(e.target.value));
    });
  }

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <div>Caricamento...</div>}
      <ResultsList results={results} />
    </div>
  );
}
\`\`\`

### Suspense Improvements

Suspense ora supporta meglio il caricamento lato server e ha una API più stabile.

\`\`\`javascript
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
      <AnotherLazyComponent />
    </Suspense>
  );
}
\`\`\`

## Nuovi Hooks

### useId

Genera ID unici per l'accessibilità e l'idratazione lato server.

\`\`\`javascript
import { useId } from 'react';

function PasswordField() {
  const passwordHintId = useId();
  
  return (
    <>
      <input
        type="password"
        aria-describedby={passwordHintId}
      />
      <p id={passwordHintId}>
        La password deve contenere almeno 18 caratteri
      </p>
    </>
  );
}
\`\`\`

### useDeferredValue

Permette di differire aggiornamenti non critici.

\`\`\`javascript
import { useDeferredValue, useState } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <SearchResults query={deferredQuery} />
    </div>
  );
}
\`\`\`

## Server-Side Rendering Migliorato

React 18 introduce il **Selective Hydration**, che permette di idratare parti dell'applicazione in modo incrementale.

## Migration Guide

Per migrare a React 18:

1. **Aggiorna le dipendenze**
\`\`\`bash
npm install react@18 react-dom@18
\`\`\`

2. **Usa createRoot invece di render**
\`\`\`javascript
// Prima (React 17)
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, container);

// Dopo (React 18)
import { createRoot } from 'react-dom/client';
const root = createRoot(container);
root.render(<App />);
\`\`\`

## Conclusioni

React 18 rappresenta un passo evolutivo significativo. Le nuove feature migliorano sia le performance che l'esperienza utente, rendendo le applicazioni più fluide e responsive.

Inizia a esplorare queste nuove funzionalità nei tuoi progetti per sfruttare al massimo il potenziale di React 18.`,
              category: 'web-development',
              readTime: '12 min',
              date: '10 Gen 2024',
              image: null,
              author: 'Laura Bianchi',
              slug: 'react-18-features',
              tags: ['React', 'JavaScript', 'Performance', 'SSR']
            }
          };

          const mockArticle = mockArticles[slug];
          if (mockArticle) {
            setArticle(mockArticle);
            
            // Mock related articles
            const allMockArticles = Object.values(mockArticles);
            const related = allMockArticles
              .filter(art => art.slug !== slug && art.category === mockArticle.category)
              .slice(0, 3);
            setRelatedArticles(related);
          } else {
            setError('Articolo non trovato');
          }
        }
      } catch (err) {
        // Only log non-network errors
        if (err.code !== 'ERR_NETWORK' && err.code !== 'ECONNREFUSED') {
          console.error('Error fetching article:', err);
          setError('Errore nel caricamento dell\'articolo');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const renderContent = (content) => {
    if (!content) return null;

    // Split content by code blocks
    const parts = content.split(/(```[\s\S]*?```)/);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // This is a code block
        const lines = part.split('\n');
        const language = lines[0].replace('```', '') || 'text';
        const code = lines.slice(1, -1).join('\n');
        
        return (
          <CodeBlock key={index} language={language} code={code} />
        );
      } else {
        // This is regular markdown content
        return (
          <div 
            key={index} 
            className="content-section"
            dangerouslySetInnerHTML={{ 
              __html: part
                .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                .replace(/^\* (.*$)/gim, '<li>$1</li>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n\n/g, '</p><p>')
                .replace(/^(?!<[h|l])/gim, '<p>')
                .replace(/(?<![h|i]>)$/gim, '</p>')
                .replace(/<p><\/p>/g, '')
                .replace(/<p><h/g, '<h')
                .replace(/h([1-6])><\/p>/g, 'h$1>')
                .replace(/<p><li>/g, '<ul><li>')
                .replace(/<\/li><\/p>/g, '</li></ul>')
            }}
          />
        );
      }
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className='bx bx-loader-alt bx-spin'></i>
          <p>Caricamento articolo...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="error-container">
        <div className="error-content">
          <i className='bx bx-error-circle'></i>
          <h2>Articolo non trovato</h2>
          <p>{error || 'L\'articolo richiesto non esiste o è stato rimosso.'}</p>
          <Link to="/ai-guides" className="btn btn-primary">
            <i className='bx bx-arrow-back'></i>
            Torna ai Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} | AxiomWeb</title>
        <meta name="description" content={article.excerpt} />
        <meta name="keywords" content={article.tags?.join(', ')} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        {article.image && <meta property="og:image" content={article.image} />}
      </Helmet>

      <main className="article-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <div className="container">
            <Link to="/">Home</Link>
            <i className='bx bx-chevron-right'></i>
            <Link to="/ai-guides">Blog</Link>
            <i className='bx bx-chevron-right'></i>
            <span>{article.title}</span>
          </div>
        </nav>

        {/* Article Header */}
        <header className="article-header">
          <div className="container">
            <motion.div
              className="header-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="article-meta">
                <span className="category">{article.category}</span>
                <span className="date">{article.date}</span>
                <span className="read-time">{article.readTime}</span>
              </div>
              
              <h1 className="article-title">{article.title}</h1>
              <p className="article-excerpt">{article.excerpt}</p>
              
              <div className="author-info">
                <div className="author-avatar">
                  <i className='bx bx-user'></i>
                </div>
                <div className="author-details">
                  <span className="author-name">Di {article.author}</span>
                  <span className="publish-date">Pubblicato il {article.date}</span>
                </div>
              </div>

              {article.tags && article.tags.length > 0 && (
                <div className="article-tags">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </header>

        {/* Article Image */}
        {article.image && (
          <div className="article-image">
            <div className="container">
              <img src={article.image} alt={article.title} />
            </div>
          </div>
        )}

        {/* Article Content */}
        <section className="article-content">
          <div className="container">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {renderContent(article.content)}
            </motion.article>
          </div>
        </section>

        {/* Article Footer */}
        <footer className="article-footer">
          <div className="container">
            <motion.div
              className="footer-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="share-section">
                <h3>Condividi questo articolo</h3>
                <div className="share-buttons">
                  <button className="share-btn twitter">
                    <i className='bx bxl-twitter'></i>
                    Twitter
                  </button>
                  <button className="share-btn linkedin">
                    <i className='bx bxl-linkedin'></i>
                    LinkedIn
                  </button>
                  <button className="share-btn facebook">
                    <i className='bx bxl-facebook'></i>
                    Facebook
                  </button>
                  <button className="share-btn copy">
                    <i className='bx bx-copy'></i>
                    Copia Link
                  </button>
                </div>
              </div>

              <div className="navigation-section">
                <Link to="/ai-guides" className="btn btn-outline">
                  <i className='bx bx-arrow-back'></i>
                  Tutti gli Articoli
                </Link>
              </div>
            </motion.div>
          </div>
        </footer>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="related-articles">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="section-title">Articoli Correlati</h2>
                <div className="related-grid">
                  {relatedArticles.map((relatedArticle, index) => (
                    <motion.article
                      key={relatedArticle.id}
                      className="related-card"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="card-image">
                        {relatedArticle.image ? (
                          <img src={relatedArticle.image} alt={relatedArticle.title} />
                        ) : (
                          <div className="image-placeholder">
                            <i className='bx bx-image'></i>
                          </div>
                        )}
                      </div>
                      <div className="card-content">
                        <div className="card-meta">
                          <span className="date">{relatedArticle.date}</span>
                          <span className="read-time">{relatedArticle.readTime}</span>
                        </div>
                        <h3 className="card-title">{relatedArticle.title}</h3>
                        <p className="card-excerpt">{relatedArticle.excerpt}</p>
                        <Link 
                          to={`/ai-guides/${relatedArticle.slug || relatedArticle.id}`} 
                          className="read-more"
                        >
                          Leggi di più <i className='bx bx-right-arrow-alt'></i>
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default ArticlePage;