import { useState } from "react";
import { Sun, Moon, Home, DollarSign, Shield, Mail, Menu, X } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import SuitePreferencesLogo from "../../assets/icons/sp_logo_nobg_large.svg";
import NavItem from "./NavItem";
import MobileNavItem from "./MobileNavItem";

function Header({ onNavigate }) {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This local handler wraps onNavigate to also close the mobile menu
  const handleNavClickWrapper = (target) => {
    onNavigate(target);
    setIsMenuOpen(false); // Close menu on navigation
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 dark:bg-gray-800 dark:shadow-lg transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo/Site Title */}
        <div className="flex items-center space-x-2 cursor-pointer transform transition-transform duration-300 hover:scale-105" onClick={() => handleNavClickWrapper("home")}>
          <img src={SuitePreferencesLogo} alt="SuitePreferences Logo" className="h-10 w-10" />
          <span className="text-3xl font-extrabold text-ns-med-blue dark:text-ns-light-blue tracking-tight">
            Suite
            <span className="font-normal tracking-tighter text-ns-gold">
              Preferences<sup className="text-xs">™</sup>
            </span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          {/* Nav Items */}
          <NavItem onClick={() => handleNavClickWrapper("home")} icon={<Home className="h-5 w-5" />}>
            Home
          </NavItem>
          {/* Pricing now scrolls to #pricing */}
          <NavItem onClick={() => handleNavClickWrapper("#pricing")} icon={<DollarSign className="h-5 w-5" />}>
            Pricing
          </NavItem>
          <NavItem onClick={() => handleNavClickWrapper("privacy")} icon={<Shield className="h-5 w-5" />}>
            Privacy
          </NavItem>
          <NavItem onClick={() => handleNavClickWrapper("contact")} icon={<Mail className="h-5 w-5" />}>
            Contact
          </NavItem>
          <button
            onClick={() => alert("Redirect to Chrome Web Store for installation!")}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            Get Extension
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 rounded-md dark:text-gray-300 dark:hover:text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 dark:bg-gray-800 dark:border-gray-700">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <MobileNavItem onClick={() => handleNavClickWrapper("home")} icon={<Home className="h-5 w-5" />}>
                Home
              </MobileNavItem>
            </li>
            {/* Mobile Pricing now scrolls to #pricing */}
            <li>
              <MobileNavItem onClick={() => handleNavClickWrapper("#pricing")} icon={<DollarSign className="h-5 w-5" />}>
                Pricing
              </MobileNavItem>
            </li>
            <li>
              <MobileNavItem onClick={() => handleNavClickWrapper("privacy")} icon={<Shield className="h-5 w-5" />}>
                Privacy
              </MobileNavItem>
            </li>
            <li>
              <MobileNavItem onClick={() => handleNavClickWrapper("contact")} icon={<Mail className="h-5 w-5" />}>
                Contact
              </MobileNavItem>
            </li>
            <li>
              <button
                onClick={() => alert("Redirect to Chrome Web Store for installation!")}
                className="w-full px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
              >
                Get Extension
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
