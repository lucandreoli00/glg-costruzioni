import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="font-logo">
      {/* Hero Section */}
      <section className="bg-boero/15 text-stone-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Contattaci</h1>
          <p className="text-xl text-stone-700 max-w-2xl mx-auto">
            Siamo a tua disposizione per qualsiasi informazione o preventivo gratuito
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl mb-6">Informazioni di Contatto</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-boero/15 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="size-6 text-accent-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Sede Legale</h3>
                    <p className="text-gray-600">
                      Via Oreno 25<br />
                      20863 Concorezzo (MB)<br />
                      Lombardia, Italia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-boero/15 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="size-6 text-accent-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefono</h3>
                    <a href="tel:+39039616229" className="text-gray-600 hover:text-stone-700">
                      +39 039 616229
                    </a>
                    <p className="text-gray-600 mt-1">
                      Cellulare: <a href="tel:+393331234567" className="hover:text-stone-700">+39 333 123 4567</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-boero/15 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="size-6 text-accent-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:info@glgcostruzioni.it" className="text-gray-600 hover:text-stone-700">
                      info@glgcostruzioni.it
                    </a>
                    <p className="text-gray-600 mt-1">
                      Preventivi: <a href="mailto:preventivi@glgcostruzioni.it" className="hover:text-stone-700">preventivi@glgcostruzioni.it</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-boero/15 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="size-6 text-accent-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Orari di Apertura</h3>
                    <p className="text-gray-600">
                      Lunedì - Venerdì: 8:30 - 18:00<br />
                      Sabato: Chiuso<br />
                      Domenica: Chiuso
                    </p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 rounded-lg overflow-hidden shadow-md h-64 bg-gray-200">
                <iframe
                  title="Mappa sede Edilizia Lombarda"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2791.704463621332!2d9.338836335679085!3d45.59648551661273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786b9167d1632ed%3A0x1532b2eeec0f7a75!2sGlg%20Costruzioni%20S.R.L.!5e0!3m2!1sit!2sus!4v1774433732360!5m2!1sit!2sus" 
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-boero/15 rounded-lg shadow-md p-8">
                <h2 className="text-2xl mb-6">Invia una Richiesta</h2>
                
                {submitted && (
                  <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
                    Grazie per averci contattato! Ti risponderemo al più presto.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nome e Cognome *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Telefono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Oggetto *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
                      >
                        <option value="">Seleziona...</option>
                        <option value="preventivo">Richiesta Preventivo</option>
                        <option value="informazioni">Informazioni Generali</option>
                        <option value="nuova-costruzione">Nuova Costruzione</option>
                        <option value="ristrutturazione">Ristrutturazione</option>
                        <option value="manutenzione">Manutenzione</option>
                        <option value="altro">Altro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Messaggio *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent resize-none"
                      placeholder="Descrivi la tua richiesta..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-accent-red hover:bg-stone-800 text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    <Send className="size-5" />
                    Invia Messaggio
                  </button>

                  <p className="text-sm text-gray-500">
                    * Campi obbligatori
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-boero/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Zone di Servizio</h2>
            <p className="text-gray-600 text-lg">
              Operiamo in tutta la Lombardia
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              "Milano",
              "Monza",
              "Bergamo",
              "Brescia",
              "Como",
              "Lecco",
              "Varese",
              "Pavia",
              "Lodi",
              "Cremona",
              "Mantova",
              "Sondrio"
            ].map((city) => (
              <div key={city} className="bg-white p-4 rounded-lg shadow-sm text-center">
                <MapPin className="size-5 text-accent-red mx-auto mb-2" />
                <p className="text-sm font-medium">{city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}