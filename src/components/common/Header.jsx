import { useState } from "react";
import { Shield, Mail, Menu, X, Chrome } from "lucide-react";
import useHeaderScroll from "../../hooks/useHeaderScroll";

function Header({ onNavigate, onPlanSelection, isLoaded = true }) {
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

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 w-full bg-sp-bg-900 text-sp-text-200 border-b border-sp-bg-700 shadow-sm transform transition-all duration-1000 ease-out ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          transform: showHeader && isLoaded ? "translateY(0)" : showHeader ? "translateY(-100%)" : "-translate-y-full",
        }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo/Site Title */}
          <div className="flex items-center cursor-pointer transition duration-500" onClick={() => handleNavClickWrapper("home")}>
            <img src="./branding/sp-logo_full-width_dark-bg.png" alt="SuitePreferences" className="h-8 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg-1000:flex items-center space-x-2">
            <button
              onClick={() => handleNavClickWrapper("privacy")}
              className="inline-flex items-center px-4 py-2 rounded-full text-sp-text-200 hover:bg-sp-bg-800 hover:text-sp-text-100 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-sp-text-500 focus:ring-opacity-75"
            >
              <Shield className="h-5 w-5 mr-2 group-hover:text-sp-text-100 transition-colors duration-300" />
              Privacy
            </button>
            {/* Contact */}
            <button
              onClick={() => handleNavClickWrapper("contact")}
              className="inline-flex items-center px-4 py-2 rounded-full text-sp-text-200 hover:bg-sp-bg-800 hover:text-sp-text-100 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-sp-text-500 focus:ring-opacity-75"
            >
              <Mail className="h-5 w-5 mr-2 group-hover:text-sp-text-100 transition-colors duration-300" />
              Contact
            </button>
            {/* See in Chrome Store Button - also pill-shaped */}
            <button
              onClick={() => window.open("https://chromewebstore.google.com/detail/suitepreferences/gdaohblaiiefllpkhpolbfeiacbpommo", "_blank")}
              className="inline-flex items-center px-4 py-2 rounded-full text-sp-text-200 hover:bg-sp-bg-800 hover:text-sp-text-100 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-sp-text-500 focus:ring-opacity-75"
            >
              <span className="flex items-center">
                <Chrome className="h-5 w-5 mr-2" />
                Chrome Store
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg-1000:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 focus:outline-none focus:ring-2 focus:ring-sp-text-500 focus:ring-opacity-75 rounded-md text-sp-text-200 hover:text-sp-text-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 w-[75%] bg-sp-bg-800 text-sp-text-200 border border-sp-text-600 shadow-lg z-40 lg-1000:hidden transform transition-all duration-500 ease-in-out rounded-b-3xl ${
          isMenuOpen ? "top-[70px] opacity-100" : "top-0 opacity-0 -translate-y-full"
        }`}
      >
        <ul className="flex flex-col items-center space-y-4 py-6">
          <li>
            <button
              onClick={() => handleNavClickWrapper("privacy")}
              className="w-full inline-flex items-center justify-center px-4 py-2 rounded-full text-sp-text-200 hover:bg-sp-bg-800 hover:text-sp-text-100 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-sp-text-500 focus:ring-opacity-75"
            >
              <Shield className="h-5 w-5 mr-2 group-hover:text-sp-text-100 transition-colors duration-300" />
              Privacy
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClickWrapper("contact")}
              className="w-full inline-flex items-center justify-center px-4 py-2 rounded-full text-sp-text-200 hover:bg-sp-bg-800 hover:text-sp-text-100 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-sp-text-500 focus:ring-opacity-75"
            >
              <Mail className="h-5 w-5 mr-2 group-hover:text-sp-text-100 transition-colors duration-300" />
              Contact
            </button>
          </li>
          <li>
            <button
              onClick={() => window.open("https://chromewebstore.google.com/detail/suitepreferences/gdaohblaiiefllpkhpolbfeiacbpommo", "_blank")}
              className="w-full inline-flex items-center justify-center px-4 py-2 rounded-full text-sp-text-200 hover:bg-sp-bg-800 hover:text-sp-text-100 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-sp-text-500 focus:ring-opacity-75"
            >
              <Chrome className="h-5 w-5 mr-2" />
              See in Chrome Store
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
