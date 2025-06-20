// src/App.jsx
import { useState, useEffect } from "react";
import PreLivePage from "./components/modals/PreLivePage";
import Header from "./components/common/Header";
import HomePage from "./pages/HomePage";
import Footer from "./components/common/Footer";
import PrivacyPage from "./pages/PrivacyPage";
import ContactPage from "./pages/ContactPage";
import { SHOW_PRELIVE_POPUP } from "./utils/constants";
import { usePageNavigation } from "./hooks/usePageNavigation"; // Import the custom hook

// Main App Component
export default function App() {
  // Use the custom navigation hook to manage currentPage and handleNavigation
  const { currentPage, handleNavigation } = usePageNavigation();

  // State to control preLiveNotice popup visibility
  const [showPreLiveNotice, setshowPreLiveNotice] = useState(false);
  // State to control visibility of the Mac animation section on HomePage
  const [showMacAnimationSection, setShowMacAnimationSection] = useState(false);

  // Effect to conditionally show the preLiveNotice popup on initial load.
  // Also sets initial visibility of the Mac animation section.
  useEffect(() => {
    if (SHOW_PRELIVE_POPUP) {
      setshowPreLiveNotice(true);
      // If pre-live popup is shown, the Mac animation should only appear AFTER
      // the user acknowledges the pre-live notice. So, initial state is false.
      // The original code had setShowMacAnimationSection(true) here, which would
      // show it immediately even with the popup. Corrected this logic.
      setShowMacAnimationSection(false);
    } else {
      // If pre-live popup is not enabled, show the Mac animation section by default.
      setShowMacAnimationSection(true);
    }
  }, []); // Empty dependency array ensures this runs only once on mount.

  // Handler for when the pre-live notice is accepted by the user.
  const handlePreLiveSuccess = () => {
    setshowPreLiveNotice(false); // Dismiss the pre-live notice modal
    setShowMacAnimationSection(true); // Show the Mac animation section on HomePage
  };

  /**
   * Renders the appropriate page component based on the current navigation state.
   * Passes down the navigation handler and animation section visibility to HomePage.
   * @returns {JSX.Element} The component for the current page.
   */
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigation} showMacAnimationSection={showMacAnimationSection} />;
      case "privacy":
        return <PrivacyPage />;
      case "contact":
        return <ContactPage />;
      default:
        // Fallback to HomePage if currentPage is somehow an unrecognized value
        return <HomePage onNavigate={handleNavigation} showMacAnimationSection={showMacAnimationSection} />;
    }
  };

  return (
    // Main application container with theme-dependent styling
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased dark:bg-gray-900 dark:text-gray-200">
      {/* Conditionally render the PreLivePage modal if showPreLiveNotice is true */}
      {showPreLiveNotice && <PreLivePage onLoginSuccess={handlePreLiveSuccess} />}

      {/* Header component, always visible, handles site-wide navigation */}
      <Header onNavigate={handleNavigation} />

      {/* Main content area, renders the current page */}
      <main className="flex-grow">{renderPage()}</main>

      {/* Footer component, always visible */}
      <Footer onNavigate={handleNavigation} />
    </div>
  );
}
