import { Link } from "react-router";
import { ArrowRight, Building2, Users, Award, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logo from "@/assets/logo.jpeg";
import capannone from "@/assets/FotoCellCapannone.jpeg"
import { ProjectSwiper } from "./ProjectSwiper";


export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <ImageWithFallback
            src={capannone}
            alt="Costruzione in corso"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="mb-6 flex justify-center">
           <img 
              src={logo} 
              alt="Costruiamo il tuo futuro - Logo Azienda" 
              className="h-36 md:h-48 w-auto drop-shadow-xl"   // regola l'altezza come preferisci
              />
          </div>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Edilizia di qualità in Lombardia da oltre 20 anni
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/servizi"
              className="bg-accent-red hover:bg-stone-800 text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              I Nostri Servizi
              <ArrowRight className="size-5" />
            </Link>
            <Link
              to="/contatti"
              className="bg-accent-red hover:bg-stone-800 text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              Richiedi Preventivo
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section*/}
      <section className="py-16 bg-boero/15 text-stone-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-center">
            
            {progetti.map((progetto) => (
              <Link
            
                           key={progetto.id}
                           to= "/chi-siamo"
                           className="block group"
                >
                            <ProjectSwiper 
                              images={progetto.images}
                              projectTitle={progetto.title}
                            />
                          
                          </Link>
                        ))}
          </div>
        </div>
      </section>


      {/* Services Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">I Nostri Servizi</h2>
            <p className="text-gray-600 text-lg">
              Soluzioni complete per ogni esigenza edilizia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-boero/15 rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:shadow-accent-red transition-shadow">
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1630259970029-7b1e1160243e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMHNpdGV8ZW58MXx8fHwxNzczMDQyMjg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Nuove Costruzioni"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">Nuove Costruzioni</h3>
                <p className="text-gray-600 mb-4">
                  Realizziamo edifici residenziali e commerciali chiavi in mano
                </p>
                <Link
                  to="/servizi"
                  className="text-accent-red hover:text-stone-800 inline-flex items-center gap-1"
                >
                  Scopri di più
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="bg-boero/15 rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:shadow-accent-red transition-shadow">
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1763218161026-dd8bcfa832de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMHJlbm92YXRpb258ZW58MXx8fHwxNzczMDQ5MzYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Ristrutturazioni"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">Ristrutturazioni</h3>
                <p className="text-gray-600 mb-4">
                  Rinnoviamo e riqualifichiamo immobili esistenti
                </p>
                <Link
                  to="/servizi"
                  className="text-accent-red hover:text-orange-700 inline-flex items-center gap-1"
                >
                  Scopri di più
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="bg-boero/15 rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:shadow-accent-red transition-shadow">
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1704297275778-8763889fa47d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzcyOTcyNDkxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Manutenzioni"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">Impermeabilizzazioni</h3>
                <p className="text-gray-600 mb-4">
                  Servizi di impermeabilizzazione, manutenzione ordinaria e straordinaria
                </p>
                <Link
                  to="/servizi"
                  className="text-accent-red hover:text-orange-700 inline-flex items-center gap-1"
                >
                  Scopri di più
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-boero/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Perché Sceglierci</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              La nostra esperienza e professionalità al servizio dei tuoi progetti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-boero/15 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="size-8 text-accent-red" />
              </div>
              <h3 className="font-semibold text-stone-700 mb-2">Esperienza</h3>
              <p className="text-gray-600 text-sm">
                Oltre 20 anni nel settore delle costruzioni
              </p>
            </div>

            <div className="text-center">
              <div className="bg-boero/15 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="size-8 text-accent-red" />
              </div>
              <h3 className="font-semibold text-stone-700 mb-2">Team Qualificato</h3>
              <p className="text-c text-sm">
                Professionisti certificati e altamente specializzati
              </p>
            </div>

            <div className="text-center">
              <div className="bg-boero/15 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="size-8 text-accent-red" />
              </div>
              <h3 className="font-semibold text-stone-700 mb-2">Qualità</h3>
              <p className="text-gray-600 text-sm">
                Materiali certificati e lavorazioni di eccellenza
              </p>
            </div>

            <div className="text-center">
              <div className="bg-boero/15 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="size-8 text-accent-red" />
              </div>
              <h3 className="font-semibold text-stone-700 mb-2">Puntualità</h3>
              <p className="text-gray-600 text-sm">
                Rispetto dei tempi e delle scadenze concordate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white text-stone-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Hai un Progetto in Mente?</h2>
          <p className="text-xl text-stone-700 mb-8">
            Contattaci per un preventivo gratuito e senza impegno
          </p>
          <Link
            to="/contatti"
            className="bg-accent-red hover:bg-orange-700 text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            Richiedi Preventivo
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

const progetti = [
  {
    id: 1,
    title: "Ristrutturazione Villa - Monza",
    images: [
      { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a9c", alt: "Villa esterna" },
      { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea", alt: "Salotto" },
      { src: "https://images.unsplash.com/photo-1600210492493-094691112201", alt: "Cucina" },
      { src: capannone, alt: "Dettaglio" },   // immagine locale
    ]
  },
  {
    id: 2,
    title: "Capannone Industriale - Agrate",
    images: [
      { src: capannone, alt: "Esterno capannone" },
      { src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c83137", alt: "Interno" },
      { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750", alt: "Uffici" },
    ]
  },
  {
    id: 3,
    title: "Ristrutturazione Villa - Monza",
    images: [
      { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a9c", alt: "Villa esterna" },
      { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea", alt: "Salotto" },
      { src: "https://images.unsplash.com/photo-1600210492493-094691112201", alt: "Cucina" },
      { src: capannone, alt: "Dettaglio" },   // immagine locale
    ]
  },
  {
    id: 4,
    title: "Ristrutturazione Villa - Monza",
    images: [
      { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a9c", alt: "Villa esterna" },
      { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea", alt: "Salotto" },
      { src: "https://images.unsplash.com/photo-1600210492493-094691112201", alt: "Cucina" },
      { src: capannone, alt: "Dettaglio" },   // immagine locale
    ]
  },
  {
    id: 5,
    title: "Ristrutturazione Villa - Monza",
    images: [
      { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a9c", alt: "Villa esterna" },
      { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea", alt: "Salotto" },
      { src: "https://images.unsplash.com/photo-1600210492493-094691112201", alt: "Cucina" },
      { src: capannone, alt: "Dettaglio" },   // immagine locale
    ]
  },
  {
    id: 6,
    title: "Ristrutturazione Villa - Monza",
    images: [
      { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a9c", alt: "Villa esterna" },
      { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea", alt: "Salotto" },
      { src: "https://images.unsplash.com/photo-1600210492493-094691112201", alt: "Cucina" },
      { src: capannone, alt: "Dettaglio" },   // immagine locale
    ]
  },
  // aggiungi altri progetti...
];