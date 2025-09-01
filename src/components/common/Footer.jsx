import { Linkedin, Mail, Phone, MapPin } from "lucide-react";

function Footer({ onNavigate }) {
  return (
    <footer className="py-12 px-4 rounded-t-3xl shadow-inner bg-sp-bg-950 text-sp-text-400 max-w-6xl mx-auto">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12 items-start">
        {/* About */}
        <div>
          <h3 className="mb-4">
            <img src="./branding/sp-logo_full-width_dark-bg.png" alt="SuitePreferences" className="max-w-full" />
          </h3>
          <p className="text-sp-text-500">Enhancing your NetSuite UX with customization and productivity tools.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-sp-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onNavigate("home")}
                className="text-sp-text-400 hover:text-sp-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sp-primary-500 focus:ring-opacity-75 rounded-md p-1 -ml-1"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("#pricing")}
                className="text-sp-text-400 hover:text-sp-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sp-primary-500 focus:ring-opacity-75 rounded-md p-1 -ml-1"
              >
                Pricing
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("privacy")}
                className="text-sp-text-400 hover:text-sp-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sp-primary-500 focus:ring-opacity-75 rounded-md p-1 -ml-1"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("contact")}
                className="text-sp-text-400 hover:text-sp-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sp-primary-500 focus:ring-opacity-75 rounded-md p-1 -ml-1"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-sp-white">Get in Touch</h3>
          <p className="text-sp-text-400 flex items-center mb-2">
            <Mail className="h-5 w-5 mr-3 text-sp-text-600" />
            <a href="mailto:info@suitepreferences.com" className="text-sp-text-400 hover:text-sp-white transition-colors duration-200">
              info@suitepreferences.com
            </a>
          </p>
          <p className="text-sp-text-400 flex items-center mb-2">
            <Phone className="h-5 w-5 mr-3 text-sp-text-600" />
            <a href="tel:15126779899" className="text-sp-text-400 hover:text-sp-white transition-colors duration-200">
              +1 (512) 677-9899
            </a>
          </p>
          <p className="text-sp-text-400 flex items-center">
            <MapPin className="h-5 w-5 mr-3 text-sp-text-600" />
            <a href="https://www.google.com/maps/place/Belton,+TX" className="text-sp-text-400 hover:text-sp-white transition-colors duration-200">
              Belton, TX
            </a>
          </p>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-bold text-sp-white mb-4">Connect</h3>
          <p className="text-sp-text-400 flex items-center mb-2">
            <Linkedin className="h-5 w-5 mr-3 text-sp-text-600" />
            <a href="https://www.linkedin.com/company/107099086" className="text-sp-text-400 hover:text-sp-white transition-colors duration-200" aria-label="LinkedIn">
              LinkedIn
            </a>
          </p>
        </div>
      </div>
      <div className="text-center text-sp-text-500 text-sm mt-12 border-t pt-8 border-sp-bg-700">&copy; {new Date().getFullYear()} SuitePreferences™. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
