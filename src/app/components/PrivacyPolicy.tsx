import { Link } from "react-router";
import { SEO } from "./SEO";

/**
 * BOZZA Privacy Policy — GDPR art. 13.
 * I segnaposto [DA COMPLETARE] e le note [DA VALIDARE LEGALMENTE] vanno
 * compilati/verificati con un consulente privacy prima della pubblicazione.
 */
export function PrivacyPolicy() {
  const ultimoAggiornamento = "5/19/2026";

  return (
    <div className="font-logo">
      <SEO
        title="Privacy Policy"
        description="Informativa sul trattamento dei dati personali di GLG Costruzioni S.r.l. ai sensi del Regolamento (UE) 2016/679 (GDPR)."
        url="/privacy-policy"
      />

      {/* Hero */}
      <section className="bg-boero/15 text-stone-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-3">Privacy Policy</h1>
          <p className="text-stone-600">
            Informativa sul trattamento dei dati personali ai sensi degli artt. 13-14
            del Regolamento (UE) 2016/679 (&ldquo;GDPR&rdquo;).
          </p>
          <p className="text-sm text-stone-500 mt-2">
            Ultimo aggiornamento: {ultimoAggiornamento}
          </p>
        </div>
      </section>

      {/* Contenuto */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-stone-700 leading-relaxed">

          <div>
            <h2 className="text-2xl text-stone-800 mb-3">1. Titolare del trattamento</h2>
            <p>
              Il Titolare del trattamento è <strong>GLG Costruzioni S.r.l.</strong>,
              con sede in Via Oreno 25, 20863 Concorezzo (MB), Italia.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>P. IVA / C.F.: [DA COMPLETARE]</li>
              <li>Email: info@glgcostruzioni.it</li>
              <li>Email dedicata privacy: segreteriatecnica@glgcostruzioni.it</li>
              <li>Telefono: +39 039 616229</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl text-stone-800 mb-3">2. Dati personali trattati</h2>
            <p>Attraverso questo sito il Titolare può trattare le seguenti categorie di dati:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Dati del modulo contatti:</strong> nome, indirizzo email,
                numero di telefono (facoltativo), oggetto e contenuto del messaggio.
              </li>
              <li>
                <strong>Dati del Portale Clienti:</strong> nome, cognome, azienda,
                indirizzo email, credenziali di accesso, documenti caricati o
                condivisi e relativi log di accesso/download.
              </li>
              <li>
                <strong>Dati di navigazione:</strong> dati tecnici trasmessi
                automaticamente dal browser (es. indirizzo IP, log del server)
                trattati per la sicurezza e il funzionamento del servizio.
              </li>
            </ul>

            <h3 className="text-lg text-stone-800 mt-5 mb-2">Dati di navigazione</h3>
            <p>
              I sistemi informatici e le procedure software preposte al
              funzionamento di questo sito acquisiscono, nel corso del loro
              normale esercizio, alcuni dati personali la cui trasmissione è
              implicita nell&rsquo;uso dei protocolli di comunicazione di
              Internet. Si tratta di informazioni non raccolte per essere
              associate a interessati identificati, ma che per loro natura
              potrebbero, mediante elaborazioni e associazioni con dati di terzi,
              permettere di identificare gli utenti. Rientrano in questa
              categoria gli indirizzi IP o i nomi a dominio dei dispositivi
              utilizzati, gli indirizzi URI/URL delle risorse richieste,
              l&rsquo;orario della richiesta, il metodo utilizzato, la dimensione
              del file ottenuto in risposta, il codice numerico indicante lo
              stato della risposta data dal server e altri parametri relativi al
              sistema operativo e all&rsquo;ambiente informatico dell&rsquo;utente.
            </p>
            <p className="mt-2">
              Tali dati sono trattati, sulla base del legittimo interesse del
              Titolare (art. 6.1.f GDPR), al solo fine di ricavare informazioni
              statistiche anonime sull&rsquo;uso del sito, controllarne il
              corretto funzionamento e garantirne la sicurezza, e sono conservati
              per il tempo strettamente necessario (cfr. sezione 6). I medesimi
              dati potrebbero essere utilizzati per l&rsquo;accertamento di
              responsabilità in caso di reati informatici ai danni del sito o di
              terzi.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-stone-800 mb-3">3. Finalità e basi giuridiche</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Riscontro alle richieste dal modulo contatti</strong> —
                base giuridica: misure precontrattuali / legittimo interesse
                (art. 6.1.b / 6.1.f GDPR).
              </li>
              <li>
                <strong>Gestione del Portale Clienti e dei rapporti contrattuali</strong>
                {" "}— base giuridica: esecuzione di un contratto (art. 6.1.b GDPR).
              </li>
              <li>
                <strong>Sicurezza del sito e prevenzione abusi</strong> —
                base giuridica: legittimo interesse (art. 6.1.f GDPR).
              </li>
              <li>
                <strong>Adempimenti di legge</strong> (contabili, fiscali) —
                base giuridica: obbligo legale (art. 6.1.c GDPR).
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl text-stone-800 mb-3">4. Modalità del trattamento</h2>
            <p>
              I dati sono trattati con strumenti informatici, adottando misure
              tecniche e organizzative adeguate a garantirne la sicurezza,
              riservatezza e integrità, e sono accessibili solo al personale
              autorizzato e ai responsabili del trattamento di seguito indicati.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-stone-800 mb-3">5. Servizi di terze parti e responsabili del trattamento</h2>
            <p>Il sito si avvale dei seguenti fornitori, alcuni dei quali possono comportare un trasferimento di dati extra-UE con adeguate garanzie (es. Clausole Contrattuali Standard):</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Supabase</strong> — autenticazione, database e archiviazione
                documenti del Portale Clienti.
              </li>
              <li>
                <strong>Resend</strong> — invio delle email generate dal modulo
                contatti e dagli inviti al portale.
              </li>
              <li>
                <strong>Vercel</strong> — hosting e distribuzione del sito.
              </li>
              <li>
                <strong>Google Maps</strong> (Google Ireland Ltd.) — mappa
                incorporata nella pagina Contatti, <strong>caricata solo previo
                clic esplicito</strong> dell&rsquo;utente. Nessun dato viene
                inviato a Google finché l&rsquo;utente non attiva la mappa
                (cfr. sezione 9).
              </li>
            </ul>
            
          </div>

          <div>
            <h2 className="text-2xl text-stone-800 mb-3">6. Periodo di conservazione</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                Dati del modulo contatti: per il tempo necessario a evadere la
                richiesta e per 12 mesi successivi.
              </li>
              <li>
                Dati del Portale Clienti: per la durata del rapporto contrattuale
                e per i termini di legge successivi (es. obblighi fiscali, 10 anni).
              </li>
              <li>
                Log tecnici e di accesso: 12 mesi.
              </li>
            </ul>
            
          </div>

          <div>
            <h2 className="text-2xl text-stone-800 mb-3">7. Comunicazione dei dati</h2>
            <p>
              I dati non sono diffusi né ceduti a terzi per finalità di marketing.
              Possono essere comunicati a soggetti che agiscono come responsabili
              del trattamento (fornitori indicati alla sezione 5), a consulenti e
              professionisti del Titolare, e all&rsquo;Autorità Giudiziaria o di
              controllo nei casi previsti dalla legge.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-stone-800 mb-3">8. Diritti dell&rsquo;interessato</h2>
            <p>
              L&rsquo;interessato può in qualsiasi momento esercitare i diritti
              previsti dagli artt. 15-22 GDPR: accesso, rettifica, cancellazione,
              limitazione, opposizione, portabilità e revoca del consenso (ove
              applicabile), scrivendo a segreteriatecnica@glgcostruzioni.it
            </p>
            <p className="mt-2">
              L&rsquo;interessato ha inoltre il diritto di proporre reclamo al
              <strong> Garante per la protezione dei dati personali</strong>{" "}
              (www.garanteprivacy.it).
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-stone-800 mb-3">9. Cookie e tecnologie simili</h2>
            <p>
              Questo sito <strong>non utilizza cookie di profilazione,
              analitici o di marketing</strong> e non effettua alcun
              tracciamento degli utenti. Non sono presenti strumenti di
              statistica o analisi di terze parti (es. Google Analytics).
            </p>
            <p className="mt-2">
              Viene impiegato esclusivamente <strong>storage tecnico locale
              strettamente necessario</strong> al funzionamento dei servizi
              richiesti dall&rsquo;utente, in particolare il mantenimento della
              sessione di accesso al Portale Clienti. Ai sensi dell&rsquo;art.
              122 del d.lgs. 196/2003 (come modificato dal d.lgs. 101/2018) e
              delle Linee guida del Garante del 10 giugno 2021, lo storage
              tecnico non richiede il consenso preventivo dell&rsquo;utente.
            </p>
            <p className="mt-2">
              La pagina Contatti contiene una mappa di Google Maps che{" "}
              <strong>non viene caricata automaticamente</strong>:
              l&rsquo;utente visualizza un segnaposto e la mappa viene caricata{" "}
              <strong>solo a seguito di un clic esplicito</strong>. Fino a quel
              momento non viene inviato alcun dato a Google né impostato alcun
              cookie di terze parti. Qualora l&rsquo;utente scelga di attivare la
              mappa, Google potrà impostare propri cookie e trattare i relativi
              dati secondo la propria informativa
              (policies.google.com/privacy), al di fuori del controllo del
              Titolare.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-stone-800 mb-3">10. Modifiche alla presente informativa</h2>
            <p>
              Il Titolare si riserva di modificare o aggiornare la presente
              informativa, anche in conseguenza di variazioni normative. Le
              modifiche saranno pubblicate su questa pagina con indicazione della
              data di ultimo aggiornamento.
            </p>
          </div>

          <div className="pt-4 border-t border-stone-200">
            <Link
              to="/contatti"
              className="text-accent-red hover:text-stone-800 transition-colors"
            >
              ← Torna ai Contatti
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
