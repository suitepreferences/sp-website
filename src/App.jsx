import { useState, useEffect } from "react";
import PreLivePage from "./components/modals/PreLivePage";
import Header from "./components/common/Header";
import HomePage from "./pages/HomePage";
import Footer from "./components/common/Footer";
import PrivacyPage from "./pages/PrivacyPage";
import ContactPage from "./pages/ContactPage";
import { SHOW_PRELIVE_POPUP } from "./utils/constants";
import { usePageNavigation } from "./hooks/usePageNavigation";

// Main App Component
export default function App() {
  // Use the navigation hook to manage currentPage and handleNavigation
  const { currentPage, handleNavigation } = usePageNavigation();

  // State to control preLiveNotice popup visibility
  const [showPreLiveNotice, setshowPreLiveNotice] = useState(false);

  // Effect to conditionally show the preLiveNotice popup on initial load.
  // Also sets initial visibility of the Mac animation section.
  useEffect(() => {
    if (SHOW_PRELIVE_POPUP) {
      setshowPreLiveNotice(true);
    }
  }, []); // Empty dependency array ensures this runs only once on mount.

  // Handler for when the pre-live notice is accepted by the user.
  const handlePreLiveSuccess = () => {
    setshowPreLiveNotice(false);
  };

  /**
   * Renders the appropriate page component based on the current navigation state.
   * Passes down the navigation handler and animation section visibility to HomePage.
   * @returns {JSX.Element} The component for the current page.
   */
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "privacy":
        return <PrivacyPage />;
      case "contact":
        return <ContactPage />;
      default:
        // Fallback to HomePage if currentPage is somehow an unrecognized value
        return <HomePage />;
    }
  };

  return (
    // Main application container with theme-dependent styling
    <div className="min-h-screen antialiased bg-gray-950 text-gray-200">
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
