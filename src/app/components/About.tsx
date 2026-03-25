import { Target, Eye, Award, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import capannone from "@/assets/FotoCellCapannone.jpeg"
import { ProjectSwiper1 } from "./ProjectSwiper";


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

export function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <ImageWithFallback
            src={capannone}
            alt="Il nostro team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-logo text-4xl md:text-5xl mb-4">Chi Siamo</h1>
          <p className="font-logo text-xl text-gray-200">
            La storia di GLG Costruzioni
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-boero/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-logo text-3xl mb-6">La Nostra Storia</h2>
              <div className="space-y-4 font-logo text-gray-700">
                <p>
                  GLG Costruzioni nasce nel 2015 dalla passione e dall'esperienza del Geom. Roberto Andreoli. Da oltre 10 anni operiamo in tutta la Lombardia, realizzando progetti di 
                  costruzione e ristrutturazione di alta qualità.
                </p>
                <p>
                  La nostra azienda si è affermata nel territorio grazie alla professionalità, all'affidabilità 
                  e all'attenzione ai dettagli. Crediamo fermamente che ogni progetto sia unico e meriti la massima 
                  cura in ogni fase, dalla progettazione alla realizzazione finale.
                </p>
                <p>
                  Con sede a Concorezzo, serviamo clienti in tutta la regione Lombardia, offrendo soluzioni personalizzate 
                  per abitazioni private, edifici commerciali e progetti di riqualificazione urbana.
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1518549160455-6b40bb44f3ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb21iYXJkeSUyMGl0YWx5JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MzA1MDczN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Architettura Lombarda"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>



      {/* I nostri progetti */}
<section className="font-logo py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-logo text-4xl font-bold mb-4">I Nostri Progetti</h2>
            <p className="text-gray-600">Clicca sulle frecce o passa il mouse per vedere tutte le foto</p>
          </div>

          <div className="grid grid-cols-1 grid-rows-3 md:grid-cols-1 grid-rows-3 lg:grid-cols-1 grid-rows-3 gap-20">
            {progetti.map((progetto) => (
              <div key={progetto.id} className="max-h[200px]">
                <ProjectSwiper1 
                  images={progetto.images}
                  projectTitle={progetto.title}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision 
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-boero/15 p-8 rounded-lg shadow-md">
              <div className="bg-stone-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target className="size-8 text-accent-red" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">La Nostra Missione</h3>
              <p className="text-gray-700">
                Realizzare costruzioni di qualità superiore che superino le aspettative dei nostri clienti, 
                garantendo sicurezza, sostenibilità e rispetto dell'ambiente. Vogliamo essere il partner di 
                fiducia per ogni progetto edilizio, grande o piccolo che sia.
              </p>
            </div>

            <div className="bg-boero/15 p-8 rounded-lg shadow-md">
              <div className="bg-stone-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Eye className="size-8 text-accent-red" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">La Nostra Visione</h3>
              <p className="text-gray-700">
                Diventare il punto di riferimento nel settore edile lombardo, riconosciuti per l'innovazione, 
                la qualità e l'attenzione al cliente. Investiamo continuamente in formazione e tecnologie 
                all'avanguardia per offrire soluzioni sempre migliori.
              </p>
            </div>
          </div>
        </div>
      </section>

      */}

      {/* Values */}
      <section className="font-logo py-16 bg-boero/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">I Nostri Valori</h2>
            <p className="text-gray-600 text-lg">
              I principi che guidano il nostro lavoro quotidiano
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-boero/15 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="size-8 text-accent-red" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Qualità</h3>
              <p className="text-gray-600">
                Utilizziamo solo materiali certificati e seguiamo le migliori pratiche del settore
              </p>
            </div>

            <div className="text-center">
              <div className="bg-boero/15 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="size-8 text-accent-red" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Trasparenza</h3>
              <p className="text-gray-600">
                Comunicazione chiara e onesta con i clienti in ogni fase del progetto
              </p>
            </div>

            <div className="text-center">
              <div className="bg-boero/15 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="size-8 text-accent-red" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Precisione</h3>
              <p className="text-gray-600">
                Attenzione maniacale ai dettagli e ai tempi di consegna
              </p>
            </div>

            <div className="text-center">
              <div className="bg-boero/15 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="size-8 text-accent-red" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Innovazione</h3>
              <p className="text-gray-600">
                Sempre aggiornati sulle nuove tecnologie e metodologie costruttive
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="font-logo py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Il Nostro Team</h2>
            <p className="text-gray-600 text-lg">
              Un team di oltre 30 professionisti qualificati
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-boero/15 p-6 rounded-lg shadow-md text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent-red">10+</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Ingegneri</h3>
              <p className="text-gray-600 text-sm">
                Esperti in progettazione strutturale e direzione lavori
              </p>
            </div>

            <div className="bg-boero/15 p-6 rounded-lg shadow-md text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent-red">15+</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Operai Specializzati</h3>
              <p className="text-gray-600 text-sm">
                Maestranze qualificate con anni di esperienza
              </p>
            </div>

            <div className="bg-boero/15 p-6 rounded-lg shadow-md text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent-red">5+</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Staff Amministrativo</h3>
              <p className="text-gray-600 text-sm">
                Supporto completo dalla preventivazione alla documentazione
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}