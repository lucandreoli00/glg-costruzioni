import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router";
import logo from "@/assets/glgLogo.svg";

export function Footer() {
  return (
    <footer className="bg-boero text-gray-300">
      <div className="font-logo max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img src={logo}
                 alt="GLG Costruzioni"
                 style={{ filter: 'drop-shadow( 0 0 1px white) drop-shadow( 0 0 1px white)   '}}
                 className="h-12" />
            </div>
            <p className="text-sm text-gray-50">
              Da oltre 20 anni realizziamo costruzioni di qualità in tutta la Lombardia.
              Professionalità, esperienza e attenzione al cliente.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Link Rapidi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-white hover:text-stone-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/chi-siamo" className="text-white hover:text-stone-400 transition-colors">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link to="/servizi" className="text-white hover:text-stone-400 transition-colors">
                  Servizi
                </Link>
              </li>
              <li>
                <Link to="/contatti" className="text-white hover:text-stone-400 transition-colors">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contatti</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-white">
                <MapPin className="size-5 text-accent-red flex-shrink-0 mt-0.5" />
                <span>Via Oreno 25, 20863 Concorezzo (MB), Lombardia</span>
              </li>
              <li className="flex items-center gap-2 text-white">
                <Phone className="size-5 text-accent-red flex-shrink-0" />
                <a href="tel:+39039616229" className="hover:text-stone-400 transition-colors">
                  +39 039 616229
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-5 text-accent-red flex-shrink-0" />
                <a href="mailto:info@glgcostruzioni.it" className="text-white hover:text-stone-400 transition-colors">
                  info@glgcostruzioni.it
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent-red mt-8 pt-8 text-center text-sm text-white">
          <p>&copy; {new Date().getFullYear()} GLG Costruzioni. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}