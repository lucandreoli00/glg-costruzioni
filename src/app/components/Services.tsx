import { Building2, Home, Wrench, Hammer, Paintbrush, Zap, Check, Umbrella } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Services() {
  const services = [
    {
      icon: Building2,
      title: "Nuove Costruzioni",
      description: "Realizziamo edifici residenziali e commerciali chiavi in mano",
      features: [
        "Progettazione architettonica e strutturale",
        "Costruzione di edifici residenziali",
        "Realizzazione di immobili commerciali",
        "Gestione completa delle pratiche edilizie",
        "Coordinamento sicurezza cantiere"
      ],
      image: "https://images.unsplash.com/photo-1630259970029-7b1e1160243e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMHNpdGV8ZW58MXx8fHwxNzczMDQyMjg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Home,
      title: "Ristrutturazioni",
      description: "Rinnoviamo e riqualifichiamo immobili esistenti",
      features: [
        "Ristrutturazione completa appartamenti",
        "Restauro edifici storici",
        "Ampliamenti e sopraelevazioni",
        "Riqualificazione energetica",
        "Cambio destinazione d'uso"
      ],
      image: "https://images.unsplash.com/photo-1763218161026-dd8bcfa832de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMHJlbm92YXRpb258ZW58MXx8fHwxNzczMDQ5MzYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Umbrella,
      title: "Impermeabilizzazioni",
      description: "Servizi di impermeabilizzazione, manutenzione ordinaria e straordinaria",
      features: [
        "Manutenzione ordinaria immobili",
        "Riparazione e consolidamento strutture",
        "Impermeabilizzazioni e isolamenti",
        "Rifacimento tetti e coperture",
        "Manutenzione impianti"
      ],
      image: "https://images.unsplash.com/photo-1704297275778-8763889fa47d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzcyOTcyNDkxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Hammer,
      title: "Opere Murarie",
      description: "Lavori di muratura di ogni tipo e complessità",
      features: [
        "Realizzazione murature portanti",
        "Tramezzature e divisori",
        "Apertura e chiusura vani",
        "Intonaci e finiture",
        "Lavori in pietra e mattoni"
      ],
      image: "https://images.unsplash.com/photo-1630259970029-7b1e1160243e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMHNpdGV8ZW58MXx8fHwxNzczMDQyMjg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Paintbrush,
      title: "Finiture",
      description: "Lavori di finitura per interni ed esterni",
      features: [
        "Tinteggiatura interni ed esterni",
        "Posa pavimenti e rivestimenti",
        "Cartongesso e controsoffitti",
        "Cappotti termici",
        "Decorazioni e stucchi"
      ],
      image: "https://images.unsplash.com/photo-1763218161026-dd8bcfa832de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMHJlbm92YXRpb258ZW58MXx8fHwxNzczMDQ5MzYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: Zap,
      title: "Impianti",
      description: "Installazione e manutenzione impianti tecnologici",
      features: [
        "Impianti elettrici civili e industriali",
        "Impianti idraulici e termici",
        "Impianti di climatizzazione",
        "Domotica e automazione",
        "Impianti fotovoltaici"
      ],
      image: "https://images.unsplash.com/photo-1704297275778-8763889fa47d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzcyOTcyNDkxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-boero/15 text-stone-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">I Nostri Servizi</h1>
          <p className="text-xl text-stone-700 max-w-2xl mx-auto">
            Soluzioni complete per ogni esigenza edilizia, dalla progettazione alla realizzazione
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="bg-boero/15 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <service.icon className="size-8 text-accent-red" />
                  </div>
                  <h2 className="text-3xl mb-4">{service.title}</h2>
                  <p className="text-gray-600 text-lg mb-6">{service.description}</p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="size-5 text-accent-red flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="rounded-lg overflow-hidden shadow-lg h-[400px]">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-boero/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Interessato ai Nostri Servizi?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Contattaci per discutere del tuo progetto e ricevere un preventivo personalizzato
          </p>
          <a
            href="/contatti"
            className="bg-accent-red hover:bg-stone-800 text-white px-8 py-3 rounded-lg transition-colors inline-block"
          >
            Richiedi Informazioni
          </a>
        </div>
      </section>
    </div>
  );
}