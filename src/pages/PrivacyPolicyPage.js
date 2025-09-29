import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | AxiomWeb</title>
        <meta name="description" content="La nostra politica sulla privacy descrive come AxiomWeb raccoglie, utilizza e protegge i tuoi dati personali in conformità con il GDPR." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {/* Page Header */}
      <header className="page-header">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p className="page-subtitle">La tua privacy è importante per noi. Qui spieghiamo come trattiamo i tuoi dati.</p>
        </div>
      </header>

      {/* Article Section for Policy Content */}
      <section className="article-section">
        <div className="container article-container">
          <p><em>Ultimo aggiornamento: 27 Luglio 2025</em></p>
          <p>Benvenuto nella Privacy Policy di AxiomWeb. Questa informativa ha lo scopo di descrivere in modo trasparente e comprensibile come raccogliamo, utilizziamo e proteggiamo i dati personali degli utenti che visitano il nostro sito web, in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR - Regolamento UE 2016/679).</p>

          <h2>1. Titolare del Trattamento</h2>
          <p>Il Titolare del Trattamento dei dati è AxiomWeb, contattabile ai seguenti recapiti:</p>
          <ul>
            <li><strong>Email:</strong> axiomwebz@gmail.com</li>
            <li><strong>Indirizzo:</strong> Non applicabile</li>
          </ul>

          <h2>2. Quali Dati Raccogliamo e Perché</h2>
          <p>Raccogliamo diverse tipologie di dati per finalità specifiche:</p>

          <h3>A. Dati di Navigazione</h3>
          <p>I sistemi informatici e le procedure software preposte al funzionamento di questo sito acquisiscono, nel corso del loro normale esercizio, alcuni dati personali la cui trasmissione è implicita nell'uso dei protocolli di comunicazione di Internet. Si tratta di informazioni che non sono raccolte per essere associate a interessati identificati, ma che per loro stessa natura potrebbero, attraverso elaborazioni ed associazioni con dati detenuti da terzi, permettere di identificare gli utenti (es. indirizzi IP, tipo di browser, orario della visita).</p>
          <ul>
            <li><strong>Finalità:</strong> Garantire il corretto funzionamento del sito e ricavare informazioni statistiche anonime sull'uso del sito per migliorarlo.</li>
            <li><strong>Base Giuridica:</strong> Legittimo interesse del Titolare a garantire la sicurezza e il funzionamento del sito.</li>
          </ul>

          <h3>B. Dati Forniti Volontariamente dall'Utente</h3>
          <p>Questi sono i dati che ci fornisci direttamente quando utilizzi il nostro modulo di contatto.</p>
          <ul>
            <li><strong>Dati raccolti:</strong> Nome, indirizzo email e il contenuto del tuo messaggio.</li>
            <li><strong>Finalità:</strong> Rispondere alle tue richieste di informazioni, fornire un preventivo o avviare una conversazione relativa ai nostri servizi.</li>
            <li><strong>Base Giuridica:</strong> Esecuzione di misure precontrattuali adottate su tua richiesta.</li>
          </ul>
          <p>Per la gestione dei moduli di contatto, utilizziamo il servizio <strong>Formspree</strong>. Quando invii un modulo, i tuoi dati vengono elaborati da Formspree per essere inoltrati alla nostra casella email. Per maggiori dettagli, puoi consultare la <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy di Formspree</a>.</p>
          
          <h3>C. Cookie e Tecnologie di Terze Parti</h3>
          <p>Utilizziamo i cookie per migliorare la tua esperienza di navigazione e per analizzare il traffico sul nostro sito. Un cookie è un piccolo file di testo che viene memorizzato sul tuo dispositivo. Utilizziamo cookie tecnici (essenziali) e cookie di analisi/marketing (non essenziali).</p>
          <p>I cookie non essenziali vengono installati solo dopo aver ottenuto il tuo esplicito consenso tramite il banner presente sul sito. Puoi rifiutare questi cookie senza che ciò comprometta la funzionalità principale del sito.</p>
          
          <h4>Google Analytics</h4>
          <ul>
            <li><strong>Finalità:</strong> Raccogliamo dati statistici aggregati e anonimi su come gli utenti navigano il sito (pagine visitate, durata della visita, provenienza geografica). Questo ci aiuta a capire cosa funziona e come possiamo migliorare. Il tuo indirizzo IP viene anonimizzato.</li>
            <li><strong>Base Giuridica:</strong> Il tuo consenso esplicito.</li>
            <li>Per maggiori informazioni: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy di Google</a>.</li>
          </ul>

          <h4>Facebook (Meta) Page Plugin</h4>
          <ul>
            <li><strong>Finalità:</strong> Mostrare i contenuti della nostra pagina Facebook direttamente sul nostro sito. L'interazione con questo plugin può comportare l'installazione di cookie da parte di Meta Platforms, Inc. per finalità di tracciamento e marketing.</li>
            <li><strong>Base Giuridica:</strong> Il tuo consenso esplicito.</li>
            <li>Per maggiori informazioni: <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Informativa sulla Privacy di Meta</a>.</li>
          </ul>

          <h2>3. Modalità di Trattamento e Periodo di Conservazione</h2>
          <p>Il trattamento dei dati avviene mediante strumenti informatici e telematici con logiche strettamente correlate alle finalità stesse e, comunque, in modo da garantire la sicurezza e la riservatezza dei dati. Conserviamo i dati per il tempo strettamente necessario a conseguire gli scopi per cui sono stati raccolti:</p>
          <ul>
            <li>I dati inviati tramite modulo di contatto vengono conservati per il tempo necessario a gestire la richiesta e per eventuali obblighi di legge (es. per finalità amministrative e contabili).</li>
            <li>I dati raccolti tramite Google Analytics vengono conservati per un periodo di 26 mesi.</li>
          </ul>

          <h2>4. Diritti dell'Interessato</h2>
          <p>In qualità di interessato, hai il diritto di:</p>
          <ul>
            <li><strong>Accesso:</strong> Chiedere conferma che sia o meno in corso un trattamento di dati che ti riguardano e ottenere l'accesso ai dati.</li>
            <li><strong>Rettifica e Cancellazione:</strong> Chiedere la rettifica dei dati inesatti o la loro cancellazione (diritto all'oblio).</li>
            <li><strong>Limitazione di Trattamento:</strong> Chiedere la limitazione del trattamento quando ricorrono determinate condizioni.</li>
            <li><strong>Portabilità dei Dati:</strong> Ricevere in un formato strutturato, di uso comune e leggibile da dispositivo automatico, i dati personali che ci hai fornito.</li>
            <li><strong>Opposizione:</strong> Opporti in qualsiasi momento al trattamento dei tuoi dati per finalità di marketing o basato su un nostro legittimo interesse.</li>
            <li><strong>Revoca del Consenso:</strong> Revocare il consenso precedentemente prestato in qualsiasi momento, senza pregiudicare la liceità del trattamento basata sul consenso prima della revoca.</li>
            <li><strong>Reclamo:</strong> Proporre reclamo all'Autorità di controllo (Garante per la Protezione dei Dati Personali).</li>
          </ul>
          <p>Per esercitare i tuoi diritti, puoi contattarci all'indirizzo email: <strong>axiomwebz@gmail.com</strong>.</p>
          
          <h2>5. Trasferimento dei Dati all'Estero</h2>
          <p>Alcuni dei servizi di terze parti che utilizziamo (Google, Formspree, Meta) hanno sede negli Stati Uniti. Il trasferimento dei dati verso questi fornitori è regolato da clausole contrattuali standard approvate dalla Commissione Europea o da altre adeguate garanzie previste dal GDPR, assicurando un livello di protezione dei dati adeguato.</p>

          <h2>6. Modifiche a questa Privacy Policy</h2>
          <p>Ci riserviamo il diritto di aggiornare questa informativa sulla privacy in qualsiasi momento. Qualsiasi modifica sarà pubblicata su questa pagina e, se sostanziale, ti verrà notificata. Ti invitiamo a consultare regolarmente questa sezione per rimanere aggiornato.</p>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;