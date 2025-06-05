import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";
import SuitePreferencesLogo from "./assets/icons/sp_logo_nobg_large.svg";
import ChromeLogo from "./assets/icons/sp_chrome_logo_nobg.png";

// Import Lucide React icons
import {
  Linkedin,
  Sparkles,
  Unlock,
  Key,
  Shield,
  Mail,
  Home,
  DollarSign,
  CheckCircle,
  XCircle,
  Star,
  MessageSquare,
  Users,
  Briefcase,
  Lightbulb,
  Menu,
  X,
  Phone,
  MapPin,
  Clock,
  MessageSquareWarning,
} from "lucide-react";

// --- PreLive Configuration Flag ---
// Set to false to disable it.
const SHOW_PRELIVE_POPUP = true;

// --- PreLive Page Component ---
// This component renders the preLive form as a modal.
function PreLivePage({ onLoginSuccess }) {
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Target date for the countdown: August 15, 2025
  const targetDate = new Date("2025-08-15T00:00:00").getTime();

  useEffect(() => {
    // Function to calculate the time remaining
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      // If the target date has passed, set all values to 0
      if (difference < 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    // Call calculateTimeRemaining immediately to set initial state
    calculateTimeRemaining();

    // Set up an interval to update the countdown every second
    const intervalId = setInterval(calculateTimeRemaining, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [targetDate]);

  // Handles the submission of the preLiveNotice form.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate if the acknowledgment checkbox is checked
    if (isAcknowledged) {
      // <--- Modified validation logic
      onLoginSuccess(); // Call the parent's success handler
    } else {
      setError("You must acknowledge the pre-live preview conditions to proceed.");
    }
  };

  return (
    // Overlay for the modal, covers the entire screen with a semi-transparent dark background.
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] font-sans">
      {/* Modal content container */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100 opacity-100">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Pre-Launch Notice
          <span className="inline-block mx-2 align-[-.2em]">
            <MessageSquareWarning className="h-[1.1em] w-[1.1em] text-ns-gold" />
          </span>
        </h2>
        <p className="my-6 text-gray-900 dark:text-white mb-6 text-center">
          <span className="font-extrabold text-ns-light-blue">Suite</span>
          <span className="font-normal text-ns-gold">Preferences™</span> is not live yet, but feel free to stop in. Some links may connect to sandboxed tools or to nothing at all.
        </p>

        {/* Countdown Timer Section */}
        <div className="flex items-center justify-center space-x-3 mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner">
          <div className="text-center flex flex-col justify-center">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">Going Live in:</p>
            <div className="flex space-x-2 text-xl font-bold text-indigo-700 dark:text-indigo-300">
              <Clock className="h-8 w-8 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <span>{countdown.days}D</span>
              <span>{countdown.hours}H</span>
              <span>{countdown.minutes}M</span>
              <span>{countdown.seconds}S</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Acknowledgment Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="acknowledge"
              checked={isAcknowledged}
              onChange={(e) => setIsAcknowledged(e.target.checked)}
              className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-indigo-500"
            />
            <label htmlFor="acknowledge" className="ml-3 block text-base font-medium text-gray-700 dark:text-gray-300">
              I understand the site is not live yet.
            </label>
          </div>

          {/* Error message display */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            Enter Site
          </button>
        </form>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState("home"); // State to manage current page
  const [pendingScrollId, setPendingScrollId] = useState(null); // New state for pending scroll
  const [showPreLiveNotice, setshowPreLiveNotice] = useState(false); // State to control preLiveNotice popup visibility

  // Effect to show preLiveNotice popup on initial load if the flag is true.
  useEffect(() => {
    if (SHOW_PRELIVE_POPUP) {
      setshowPreLiveNotice(true);
    }
  }, []); // Empty dependency array ensures this runs only once on mount.

  // Centralized navigation handler
  const handleNavigation = (target) => {
    if (target.startsWith("#")) {
      const id = target.substring(1);

      if (currentPage !== "home") {
        setCurrentPage("home"); // First navigate to home page
        setPendingScrollId(id); // Set the ID to scroll to once home page is rendered
      } else {
        // Already on home page, just scroll directly
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setPendingScrollId(null); // Clear any old pending scroll
      }
    } else {
      // This is a full page change
      setCurrentPage(target);
      window.scrollTo(0, 0); // Always scroll to top when changing full pages
      setPendingScrollId(null); // Clear pending scroll on full page change
    }
  };

  // Effect to handle pending scrolls once the target page is rendered
  useEffect(() => {
    if (pendingScrollId && currentPage === "home") {
      // Only scroll if on home and an ID is pending
      const element = document.getElementById(pendingScrollId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setPendingScrollId(null); // Clear the pending scroll after execution
      }
    }
  }, [currentPage, pendingScrollId]); // Re-run when page changes or scroll ID is set

  // Simple routing logic
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigation} />;
      case "privacy":
        return <PrivacyPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    // Applied dark mode classes to the main container
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased dark:bg-gray-900 dark:text-gray-200">
      {/* Conditionally render the PreLivePage if showPreLiveNotice is true */}
      {showPreLiveNotice && <PreLivePage onLoginSuccess={() => setshowPreLiveNotice(false)} />}
      <Header onNavigate={handleNavigation} /> {/* Pass the new handler */}
      <main className="flex-grow">{renderPage()}</main>
      <Footer onNavigate={handleNavigation} /> {/* Pass the new handler */}
    </div>
  );
}

// Header Component
function Header({ onNavigate }) {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This local handler wraps onNavigate to also close the mobile menu
  const handleNavClickWrapper = (target) => {
    onNavigate(target);
    setIsMenuOpen(false); // Close menu on navigation
  };

  return (
    // Applied dark mode classes to header background and shadow
    <header className="bg-white shadow-sm sticky top-0 z-50 dark:bg-gray-800 dark:shadow-lg transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo/Site Title - Applied dark mode text color, hover effect, and circular image */}
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
          {/* Nav Items - Applied dark mode text and hover colors */}
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

        {/* Mobile Menu Button - Applied dark mode text and hover colors */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 rounded-md dark:text-gray-300 dark:hover:text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Applied dark mode background and border */}
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

// Navigation Item for Desktop - Applied dark mode text and hover colors
function NavItem({ onClick, children, icon }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 font-medium transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 rounded-md p-2 dark:text-gray-300 dark:hover:text-indigo-400"
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

// Navigation Item for Mobile - Applied dark mode text and hover colors
function MobileNavItem({ onClick, children, icon }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-medium text-lg w-full justify-center py-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 rounded-md dark:text-gray-200 dark:hover:text-indigo-400"
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

// Home Page Component
function HomePage({ onNavigate }) {
  const handleGetExtensionClick = () => {
    alert("Redirecting to Chrome Web Store to install SuitePreferences!");
  };

  return (
    <div className="space-y-16 py-12">
      {/* Hero Section - Text already white, no change needed for dark mode */}
      <section className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-20 px-4 rounded-b-3xl shadow-xl">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
            Unlock
            <span className="inline-block mx-2 align-[-.1em]">
              <Unlock className="h-[1.1em] w-[1.1em] text-ns-gold" />
            </span>
            the NetSuite UX with
            <div className="text-ns-gold tracking-tight">
              Suite
              <span className="font-light">
                Preferences<sup className="text-3xl">™</sup>
              </span>
            </div>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up delay-100 tracking-tight">
            Boost Productivity & Comfort with Features like{" "}
            <span className="font-bold text-ns-gold tracking-tighter">
              Suite
              <span className="font-light">
                Glow<sup className="text-xs">™</sup>
              </span>
            </span>{" "}
            Dark Themes and Fonts, Real-time Dashboards by{" "}
            <span className="font-bold text-ns-gold tracking-tighter">
              Portlet<span className="font-light">Refresher</span>
            </span>
            , and More.
          </p>
          <button
            onClick={handleGetExtensionClick}
            className="inline-flex items-center px-4 py-4 bg-white text-ns-med-blue font-bold text-lg rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          >
            <img src={ChromeLogo} alt="Chrome Logo" className="w-10 h-10 mr-3" />
            Get&nbsp;
            <span className="font-extrabold text-ns-med-blue">
              Suite
              <span className="font-normal text-ns-gold">
                Preferences<sup className="text-xs">™</sup>
              </span>
            </span>
            &nbsp;Now
          </button>
        </div>
      </section>

      {/* Features Section - Applied dark mode heading and feature card styling */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          <span className="inline-flex items-center mr-2 align-[-.1em]">
            <Key className="h-8 w-8 text-ns-med-blue dark:text-ns-light-blue" />
          </span>
          Key Features that Elevate Your NetSuite UX
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Lightbulb className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />}
            title="Intelligent Customization"
            description="Tailor NetSuite's appearance and behavior to perfectly match your preferences and boost productivity."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-purple-600 dark:text-purple-400" />}
            title="Seamless Integration"
            description="Looks and feels native across all NetSuite pages, enhancing your daily tasks."
          />
          <FeatureCard
            icon={<Briefcase className="h-10 w-10 text-green-600 dark:text-green-400" />}
            title="Boost Productivity"
            description="Keep important KPIs fresh with PortletRefresh. No more manual dashboard clicks."
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-red-600 dark:text-red-400" />}
            title="Enhanced Security"
            description="SuitePreferences™ uses the logged in user's email to validate subscriptions and will never store any personal information."
          />
          <FeatureCard
            icon={<Star className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />}
            title="Personalized Experience"
            description="Your chosen preferences are stored in Chrome and will follow you to any device."
          />
          <FeatureCard
            icon={<MessageSquare className="h-10 w-10 text-blue-600 dark:text-blue-400" />}
            title="Intuitive Interface"
            description="Easy to use and feels native, SuitePreferences™ is tucked neatly within NetSuite's 'Set Preferences' page."
          />
        </div>
      </section>

      {/* Products Sold / Pricing Section - Applied dark mode heading and pricing card styling */}
      <section id="pricing" className="container mx-auto px-4 py-12 scroll-mt-20">
        {" "}
        {/* Added scroll-mt-20 */}
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          <span className="inline-block mx-2 align-[-.2em]">
            <Sparkles className="h-[1.1em] w-[1.1em] text-ns-gold" />
          </span>
          Choose Your <span className="font-bold tracking-tight text-ns-med-blue dark:text-ns-light-blue">Suite</span>
          <span className="font-light tracking-tighter text-ns-gold">
            Preferences<sup className="text-xl">™</sup>
          </span>{" "}
          Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <PricingCard
            title="Basic"
            price="$0"
            period="/month"
            features={[
              { text: "Portlet Refresher", included: true },
              { text: "Basic SuiteGlow™ Theme", included: true },
              { text: "10+ SuiteGlow™ Themes", included: false },
              { text: "20+ SuiteGlow™ Fonts", included: false },
              { text: "Records XML Viewer Slideout", included: false },
              { text: "New Features⁺⁺", included: false },
            ]}
            buttonText="Get Started Free"
            buttonClass="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            onClick={handleGetExtensionClick}
          />

          {/* Pro Plan */}
          <PricingCard
            title="Personal Pro"
            price="$3.99"
            period="/month"
            isPopular={true}
            features={[
              { text: "Portlet Refresher", included: true },
              { text: "10+ SuiteGlow™ Themes", included: true },
              { text: "20+ SuiteGlow™ Fonts", included: true },
              { text: "Records XML Viewer Slideout", included: true },
              { text: "New Features†", included: true },
              { text: "1 User License", included: true },
            ]}
            buttonText="Get 14-day Free Trial"
            buttonClass="bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => alert("Initiate Pro subscription checkout!")}
          />

          {/* Premium Plan */}
          <PricingCard
            title="Enterprise Pro"
            price="$99.75" // Updated price
            originalPrice="$199.50" // Added original price to show discount
            period="/month"
            features={[
              { text: "Portlet Refresher", included: true },
              { text: "10+ SuiteGlow™ Themes", included: true },
              { text: "20+ SuiteGlow™ Fonts", included: true },
              { text: "Records XML Viewer Slideout", included: true },
              { text: "New Features†", included: true },
              { text: "50+ User Licenses‡", included: true },
            ]}
            buttonText="Get Premium"
            buttonClass="bg-purple-600 text-white hover:bg-purple-700"
            onClick={() => alert("Initiate Premium subscription checkout!")}
          />
        </div>
        <div className="max-w-6xl mx-auto text-center mt-8">
          <p className="text-gray-600 dark:text-gray-300">
            † As new features are added to <span className="font-extrabold text-ns-med-blue dark:text-ns-light-blue">Suite</span>
            <span className="font-normal text-ns-gold">Preferences™</span>, they will be immediately available to you by simply updating the extension.
          </p>
        </div>
        <div className="max-w-6xl mx-auto text-center mt-8">
          <p className="text-gray-600 dark:text-gray-300">
            ‡ The Enterprise Pro plan uses NetSuite account validation. An active subscription allows for up to 50 users within a single NetSuite account to use all{" "}
            <span className="font-extrabold text-ns-med-blue dark:text-ns-light-blue">Suite</span>
            <span className="font-normal text-ns-gold">Preferences™</span> features. NetSuite accounts with over 50 users, please
            <span className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer ml-1" onClick={() => onNavigate("contact")}>
              contact us
            </span>{" "}
            for special pricing.
          </p>
        </div>
      </section>

      {/* Call to Action Section - Text already white, no change needed for dark mode */}
      <section className="bg-indigo-700 text-white py-16 px-4 rounded-t-3xl shadow-xl">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to level up your NetSuite UX?</h2>
          <p className="text-xl mb-8 opacity-90">Join other users who are already enjoying a more personalized NetSuite experience.</p>
          <button
            onClick={handleGetExtensionClick}
            className="inline-flex items-center px-8 py-4 bg-white text-indigo-700 font-bold text-lg rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          >
            <img src={ChromeLogo} alt="Chrome Logo" className="w-10 h-10 mr-3" />
            Start Your Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}

// Feature Card Component - Applied dark mode background, shadow, title, and description text
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 dark:bg-gray-800 dark:shadow-2xl">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

// Pricing Card Component - Applied dark mode background, border, text, and feature list item colors
function PricingCard({ title, price, period, features, buttonText, buttonClass, isPopular, onClick, originalPrice }) {
  return (
    <div
      className={`bg-white p-8 rounded-xl shadow-lg flex flex-col items-center border-2 ${
        isPopular ? "border-indigo-600 dark:border-indigo-400" : "border-gray-100 dark:border-gray-700"
      } transition-all duration-300 hover:shadow-xl hover:scale-105 dark:bg-gray-800 dark:shadow-2xl`}
    >
      {isPopular && <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 -mt-12 shadow-md">Most Popular</span>}
      <h3 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">{title}</h3>
      <div className="text-5xl font-extrabold text-indigo-600 mb-4 dark:text-indigo-400">
        {/* Conditionally render original price with strikethrough if provided */}
        {originalPrice && <span className="text-xl font-light text-gray-500 dark:text-gray-400 line-through mr-2">{originalPrice}</span>}
        {price}
        <span className="text-xl font-medium text-gray-500 dark:text-gray-400">{period}</span>
      </div>
      <ul className="text-gray-700 text-lg space-y-3 mb-8 w-full">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center ${feature.included ? "text-gray-800 dark:text-gray-200" : "text-gray-400 line-through dark:text-gray-500"}`}>
            {feature.included ? (
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 dark:text-green-400" />
            ) : (
              <XCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0 dark:text-red-300" />
            )}
            {feature.text}
          </li>
        ))}
      </ul>
      <button
        onClick={onClick}
        className={`w-full py-3 font-semibold rounded-lg shadow-md ${buttonClass} transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75`}
      >
        {buttonText}
      </button>
    </div>
  );
}

// Privacy Page Component - Applied dark mode background, shadow, headings, paragraph, list, and link colors
function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl bg-white shadow-lg rounded-xl my-8 dark:bg-gray-800 dark:shadow-2xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center dark:text-white">Privacy Policy for SuitePreferences</h1>
      <div className="prose prose-indigo max-w-none dark:prose-invert">
        <p className="dark:text-gray-300">
          This Privacy Policy describes how SuitePreferences ("we," "us," or "our") collects, uses, and discloses information when you use our Chrome Extension, SuitePreferences (the "Extension").
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 dark:text-white">Information We Do Not Collect</h2>
        <p className="dark:text-gray-300">SuitePreferences is designed with your privacy in mind. We do not collect, store, or transmit any personal data from your browsing activity, including:</p>
        <ul className="dark:text-gray-300">
          <li>Your browsing history.</li>
          <li>Your search queries.</li>
          <li>Your personal information (name, email, IP address, etc.).</li>
          <li>Any data you input into websites.</li>
          <li>Any data about your usage of other websites or applications.</li>
        </ul>
        <p className="dark:text-gray-300">
          All preferences and customizations you set within the SuitePreferences extension are stored locally on your device and are never sent to our servers or any third-party servers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 dark:text-white">Information We May Collect (for Subscription Management)</h2>
        <p className="dark:text-gray-300">
          If you opt to purchase a subscription to SuitePreferences, we will use a secure, third-party payment processor. In this case, the following information related to your subscription may be
          processed by the payment processor and shared with us for billing and account management purposes:
        </p>
        <ul className="dark:text-gray-300">
          <li>Your email address (for account identification and communication regarding your subscription).</li>
          <li>Subscription tier and payment status.</li>
        </ul>
        <p className="dark:text-gray-300">
          We do not directly collect or store your credit card details or other sensitive payment information. This is handled entirely by our trusted payment processor.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 dark:text-white">Data Security</h2>
        <p className="dark:text-gray-300">
          We take reasonable measures to protect the limited information we do collect (related to subscriptions) from unauthorized access, disclosure, alteration, or destruction.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 dark:text-white">Changes to This Privacy Policy</h2>
        <p className="dark:text-gray-300">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy
          periodically for any changes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 dark:text-white">Contact Us</h2>
        <p className="dark:text-gray-300">If you have any questions about this Privacy Policy, please contact us:</p>
        <p className="dark:text-gray-300">
          By email:{" "}
          <a href="mailto:support@suitepreferences.com" className="text-indigo-600 hover:underline dark:text-indigo-400">
            support@suitepreferences.com
          </a>
        </p>
      </div>
    </div>
  );
}

// Contact Page Component - Applied dark mode background, shadow, headings, paragraph, info card styling, form input styling
function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    // In a real application, you would send this data to a backend server
    // For this example, we'll just simulate a successful submission
    console.log("Form submitted:", formData);

    setTimeout(() => {
      setStatus("Message sent successfully! We will get back to you soon.");
      setFormData({ name: "", email: "", message: "" }); // Clear form
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl bg-white shadow-lg rounded-xl my-8 dark:bg-gray-800 dark:shadow-2xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center dark:text-white">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-8 text-center dark:text-gray-300">Have questions about SuitePreferences or need support? We're here to help!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex items-center space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm dark:bg-gray-700 dark:shadow-lg">
          <Mail className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Email Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              <a href="mailto:support@suitepreferences.com" className="text-indigo-600 hover:underline dark:text-indigo-400">
                support@suitepreferences.com
              </a>
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm dark:bg-gray-700 dark:shadow-lg">
          <Phone className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Phone</h3>
            <p className="text-gray-600 dark:text-gray-300">+1 (512) 677-9899</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center dark:text-white">Send a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        >
          Send Message
        </button>
        {status && <p className={`mt-4 text-center text-lg ${status.includes("sent") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{status}</p>}
      </form>
    </div>
  );
}

// Footer Component
function Footer({ onNavigate }) {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 rounded-t-3xl shadow-inner dark:bg-gray-950 dark:text-gray-400">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-4 dark:text-white">
            <span className="font-extrabold text-ns-light-blue">Suite</span>
            <span className="font-normal text-ns-gold">Preferences™</span>
          </h3>
          <p className="text-gray-400 dark:text-gray-500">Enhancing your NetSuite UX with customization and productivity tools.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4 dark:text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onNavigate("home")}
                className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 rounded-md p-1 -ml-1"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("#pricing")}
                className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 rounded-md p-1 -ml-1"
              >
                Pricing
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("privacy")}
                className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 rounded-md p-1 -ml-1"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("contact")}
                className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 rounded-md p-1 -ml-1"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4 dark:text-white">Get in Touch</h3>
          <p className="text-gray-400 flex items-center mb-2 dark:text-gray-400">
            <Mail className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-600" />
            <a href="mailto:info@suitepreferences.com" className="text-gray-400 hover:text-white transition-colors duration-200">
              info@suitepreferences.com
            </a>
          </p>
          <p className="text-gray-400 flex items-center mb-2 dark:text-gray-400">
            <Phone className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-600" />
            <a href="tel:15126779899" className="text-gray-400 hover:text-white transition-colors duration-200">
              +1 (512) 677-9899
            </a>
          </p>
          <p className="text-gray-400 flex items-center dark:text-gray-400">
            <MapPin className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-600" />
            <a href="https://www.google.com/maps/place/Belton,+TX" className="text-gray-400 hover:text-white transition-colors duration-200">
              Belton, TX
            </a>
          </p>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4 dark:text-white">Connect</h3>
          <p className="text-gray-400 flex items-center mb-2 dark:text-gray-400">
            <Linkedin className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-600" />
            <a href="https://www.linkedin.com/company/107099086/admin/dashboard/" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
              LinkedIn
            </a>
          </p>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-12 border-t border-gray-800 pt-8 dark:border-gray-700">&copy; {new Date().getFullYear()} SuitePreferences™. All rights reserved.</div>
    </footer>
  );
}
