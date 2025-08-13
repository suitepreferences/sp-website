import { useState } from "react";
import { DollarSign, Shield, Mail, Menu, X } from "lucide-react";
import SuitePreferencesLogo from "../../assets/icons/sp_logo_nobg_large.svg";
import ChromeLogo from "../../assets/icons/sp_chrome_logo_nobg.png";
import useHeaderScroll from "../../hooks/useHeaderScroll";

function Header({ onNavigate, onPlanSelection }) {
  // State for mobile menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Use custom hook for header visibility (debounced scroll)
  const showHeader = useHeaderScroll(setIsMenuOpen);

  /**
   * Handles navigation button clicks and closes the menu (mobile).
   * @param {string} target - The navigation target.
   */
  const handleNavClickWrapper = (target) => {
    onNavigate(target);
    setIsMenuOpen(false);
  };

  /**
   * Handles the "Get Extension" button click.
   */
  const handleGetExtensionClick = () => {
    if (onPlanSelection) {
      onPlanSelection("Pro Yearly");
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 max-w-[90%] lg-header-1293:max-w-6xl mx-auto bg-gradient-to-r from-black via-purple-950 to-black text-purple-200 border-l-2 border-r-2 border-purple-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] rounded-full opacity-90 transform transition-transform duration-500 ease-out ${
          showHeader ? "translate-y-[40px]" : "-translate-y-full"
        }`}
      >
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between max-w-[100%]">
          {/* Logo/Site Title */}
          <div className="flex items-center space-x-2 cursor-pointer transition duration-500 hover:scale-105" onClick={() => handleNavClickWrapper("home")}>
            <img src={SuitePreferencesLogo} alt="SuitePreferences Logo" className="h-10 w-10" />
            <span className="text-3xl font-extrabold tracking-tight text-indigo-300">
              Suite
              <span className="font-light tracking-tighter text-pink-400">Preferences</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg-1000:flex items-center space-x-2">
            {/* Pricing */}
            <button
              onClick={() => handleNavClickWrapper("#pricing")}
              className="inline-flex items-center px-4 py-2 rounded-full text-purple-200 hover:bg-purple-800 hover:text-pink-300 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75"
            >
              <DollarSign className="h-5 w-5 mr-2 group-hover:text-pink-300 transition-colors duration-300" />
              Pricing
            </button>
            {/* Privacy */}
            <button
              onClick={() => handleNavClickWrapper("privacy")}
              className="inline-flex items-center px-4 py-2 rounded-full text-purple-200 hover:bg-purple-800 hover:text-pink-300 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75"
            >
              <Shield className="h-5 w-5 mr-2 group-hover:text-pink-300 transition-colors duration-300" />
              Privacy
            </button>
            {/* Contact */}
            <button
              onClick={() => handleNavClickWrapper("contact")}
              className="inline-flex items-center px-4 py-2 rounded-full text-purple-200 hover:bg-purple-800 hover:text-pink-300 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75"
            >
              <Mail className="h-5 w-5 mr-2 group-hover:text-pink-300 transition-colors duration-300" />
              Contact
            </button>
            {/* Get Extension Button - also pill-shaped */}
            <button
              onClick={handleGetExtensionClick}
              className="px-4 py-2 bg-purple-700 text-purple-200 rounded-full shadow-md hover:bg-purple-600 hover:text-pink-300 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75"
            >
              <span className="flex items-center">
                <img src={ChromeLogo} alt="Chrome Logo" className="w-4 h-4 mr-2" />
                Get Extension
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg-1000:hidden flex items-center space-x-2">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75 rounded-md text-purple-200 hover:text-pink-300">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 w-[75%] bg-gradient-to-br from-purple-900/30 via-gray-900/20 to-black/30 text-purple-200 border border-purple-800/30 shadow-inner backdrop-blur-sm z-40 lg-1000:hidden transform transition-all duration-500 ease-in-out rounded-b-3xl ${
          isMenuOpen ? "top-[110px] opacity-100" : "top-0 opacity-0 -translate-y-full"
        }`}
      >
        <ul className="flex flex-col items-center space-y-4 py-6">
          <li>
            <button
              onClick={() => handleNavClickWrapper("#pricing")}
              className="w-full inline-flex items-center justify-center px-4 py-2 rounded-full text-purple-200 hover:bg-purple-800 hover:text-pink-300 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75"
            >
              <DollarSign className="h-5 w-5 mr-2 group-hover:text-pink-300 transition-colors duration-300" />
              Pricing
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClickWrapper("privacy")}
              className="w-full inline-flex items-center justify-center px-4 py-2 rounded-full text-purple-200 hover:bg-purple-800 hover:text-pink-300 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75"
            >
              <Shield className="h-5 w-5 mr-2 group-hover:text-pink-300 transition-colors duration-300" />
              Privacy
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClickWrapper("contact")}
              className="w-full inline-flex items-center justify-center px-4 py-2 rounded-full text-purple-200 hover:bg-purple-800 hover:text-pink-300 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75"
            >
              <Mail className="h-5 w-5 mr-2 group-hover:text-pink-300 transition-colors duration-300" />
              Contact
            </button>
          </li>
          <li>
            <button
              onClick={handleGetExtensionClick}
              className="w-full px-6 py-2 bg-pink-600 text-white font-semibold rounded-full shadow-md hover:bg-pink-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75"
            >
              Get Extension
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
