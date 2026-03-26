import { Link } from "react-router";
import { ArrowRight, Building2, Users, Award, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logo from "@/assets/glgLogo.svg";
import capannone from "@/assets/FotoCellCapannone.jpeg"
import { ProjectSwiper } from "./ProjectSwiper";
import nuoveCostruzioni from "@/assets/NuoveCostruzioni.webp"
import ristrutturazioni from "@/assets/P6/2.webp"
import impermeabilizzazioni from "@/assets/impermeabilizzazioni.webp"

const imagesP1 = import.meta.glob('@/assets/P1/*.{jpg,JPG, jpeg, png,webp}', { eager: true })
const projectImages1 = Object.values(imagesP1).map((mod) => (mod as {default: string }).default)

const imagesP2 = import.meta.glob('@/assets/P2/*.{jpg,JPG,jpeg,png,webp}', { eager: true })
const projectImages2 = Object.values(imagesP2).map((mod) => (mod as {default: string }).default)

const imagesP3 = import.meta.glob('@/assets/P3/*.{jpg,JPG,jpeg,png,webp}', { eager: true })
const projectImages3 = Object.values(imagesP3).map((mod) => (mod as {default: string }).default)

const imagesP4 = import.meta.glob('@/assets/P4/*.{jpg,JPG,jpeg,png,webp}', { eager: true })
const projectImages4 = Object.values(imagesP4).map((mod) => (mod as {default: string }).default)

const imagesP5 = import.meta.glob('@/assets/P5/*.{jpg,JPG,jpeg,png,webp}', { eager: true })
const projectImages5 = Object.values(imagesP5).map((mod) => (mod as {default: string }).default)

const imagesP6 = import.meta.glob('@/assets/P6/*.{jpg,JPG,jpeg,png,webp}', { eager: true })
const projectImages6 = Object.values(imagesP6).map((mod) => (mod as {default: string }).default)




export function Home() {
  return (
    <div className="font-logo">
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center justify-center ">
        <div className="absolute inset-0 overflow-hidden">
          <ImageWithFallback
            src={capannone}
            alt="Costruzione in corso"
            className="w-full h-full object-cover "
          />
          <div className="absolute inset-0 bg-black/50 "></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="mb-6 flex justify-center">
           <img 
              src={logo} 
              style={{filter: 'drop-shadow(0 0 2px white) drop-shadow(0 0 2px white) '}}
              alt="Costruiamo il tuo futuro - Logo Azienda" 
              className="h-36 md:h-48 w-auto drop-shadow-xl"   // regola l'altezza come preferisci
              />
          </div>
          <p className="font-logo text-xl md:text-2xl mb-8 text-gray-200q">
            Edilizia di qualità in Lombardia da oltre 20 anni
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/servizi"
              className="bg-accent-red hover:bg-stone-800 font-logo text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              I Nostri Servizi
              <ArrowRight className="size-5" />
            </Link>
            <Link
              to="/contatti"
              className="bg-accent-red hover:bg-stone-800 font-logo text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              Richiedi Preventivo
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      

      {/* Services Preview */}
      <section className="py-16 bg-boero/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-logo text-3xl font-semibold md:text-4xl mb-4">I Nostri Servizi</h2>
            <p className="font-logo text-gray-600 text-lg">
              Soluzioni complete per ogni esigenza edilizia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to = "/servizi"
              className="bg-boero/15 rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:shadow-accent-red transition-shadow">
            
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src={nuoveCostruzioni}
                  alt="Nuove Costruzioni"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold font-logo text-xl mb-2">Nuove Costruzioni</h3>
                <p className="font-logo text-gray-600 mb-4">
                  Realizziamo edifici residenziali e commerciali chiavi in mano
                </p>
                <div
                  className="font-logo text-accent-red hover:text-stone-800 inline-flex items-center gap-1"
                >
                  Scopri di più
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </Link>

            <Link
              to = "/servizi"
              className="bg-boero/15 rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:shadow-accent-red transition-shadow">
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src={ristrutturazioni}
                  alt="Ristrutturazioni"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold font-logo text-xl mb-2">Ristrutturazioni</h3>
                <p className="font-logo text-gray-600 mb-4">
                  Rinnoviamo e riqualifichiamo immobili esistenti
                </p>
                <div
                  className="font-logo text-accent-red hover:text-stone-700 inline-flex items-center gap-1"
                >
                  Scopri di più
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </Link>

            <Link 
              to = "/servizi"
              className="bg-boero/15 rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:shadow-accent-red transition-shadow">
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src={impermeabilizzazioni}
                  alt="Manutenzioni"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold font-logo text-xl mb-2">Impermeabilizzazioni</h3>
                <p className="font-logo text-gray-600 mb-4">
                  Servizi di impermeabilizzazione, manutenzione ordinaria e straordinaria
                </p>
                <div
                  className="font-logo text-accent-red hover:text-stone-700 inline-flex items-center gap-1"
                >
                  Scopri di più
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section*/}
      <section className="py-16 bg-white text-stone-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-black font-logo font-semibold text-3xl md:text-4xl mb-4">Esplora i nostri progetti</h2>
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


      {/* Why Choose Us */}
      <section className="py-16 bg-boero/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-logo text-3xl font-semibold md:text-4xl mb-4">Perché Sceglierci</h2>
            <p className="font-logo text-gray-600 text-lg max-w-2xl mx-auto">
              La nostra esperienza e professionalità al servizio dei tuoi progetti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-boero/15 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="size-8 text-accent-red" />
              </div>
              <h3 className="font-semibold font-logo text-stone-700 mb-2">Esperienza</h3>
              <p className="font-logo text-gray-600 text-sm">
                Oltre 20 anni nel settore delle costruzioni
              </p>
            </div>

            <div className="text-center">
              <div className="bg-boero/15 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="size-8 text-accent-red" />
              </div>
              <h3 className="font-semibold font-logo text-stone-700 mb-2">Team Qualificato</h3>
              <p className="font-logo text-c text-sm">
                Professionisti certificati e altamente specializzati
              </p>
            </div>

            <div className="text-center">
              <div className="bg-boero/15 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="size-8 text-accent-red" />
              </div>
              <h3 className="font-semibold font-logo text-stone-700 mb-2">Qualità</h3>
              <p className="font-logo text-gray-600 text-sm">
                Materiali certificati e lavorazioni di eccellenza
              </p>
            </div>

            <div className="text-center">
              <div className="bg-boero/15 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="size-8 text-accent-red" />
              </div>
              <h3 className="font-semibold font-logo text-stone-700 mb-2">Puntualità</h3>
              <p className="font-logo text-gray-600 text-sm">
                Rispetto dei tempi e delle scadenze concordate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white text-stone-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-logo text-3xl text-black font-semibold md:text-4xl mb-4">Hai un Progetto in Mente?</h2>
          <p className="font-logo text-xl text-stone-700 mb-8">
            Contattaci per un preventivo gratuito e senza impegno
          </p>
          <Link
            to="/contatti"
            className="font-logo bg-accent-red hover:bg-orange-700 text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
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
    title: "Platea Villasanta",
    images: projectImages1.map(src => ({src, alt: "Platea Villasanta"}))
  },
  {
    id: 2,
    title: "Platea Villasanta Esterna",
    images: projectImages2.map(src => ({src, alt: "Platea Villasanta"}))
  },
  {
    id: 3,
    title: "Milano Ristorazione",
    images: projectImages3.map(src => ({src, alt: "Milano Ristorazione"}))
  },
  {
    id: 4,
    title: "Monterosso",
    images: projectImages4.map(src => ({src, alt: "Monterosso"}))
  },
  {
    id: 5,
    title: "Forte dei Marmi",
    images: projectImages5.map(src => ({src, alt: "Forte dei Marmi"}))
  },
  {
    id: 6,
    title: "App",
    images: projectImages6.map(src => ({src, alt: "App"}))
  },
  // aggiungi altri progetti...
];