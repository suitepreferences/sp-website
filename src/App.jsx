import { useState, useEffect } from "react";
import PreLivePage from "./components/modals/PreLivePage";
import CheckoutModal from "./components/modals/CheckoutModal";
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

  // State to control checkout modal
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

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

  // Handler for opening the checkout modal
  const handlePlanSelection = (planType) => {
    setSelectedPlan(planType);
    setIsCheckoutModalOpen(true);
  };

  // Handler for closing the checkout modal
  const closeCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
    setSelectedPlan("");
  };

  /**
   * Renders the appropriate page component based on the current navigation state.
   * Passes down the navigation handler and animation section visibility to HomePage.
   * @returns {JSX.Element} The component for the current page.
   */
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onPlanSelection={handlePlanSelection} />;
      case "privacy":
        return <PrivacyPage />;
      case "contact":
        return <ContactPage />;
      default:
        // Fallback to HomePage if currentPage is somehow an unrecognized value
        return <HomePage onPlanSelection={handlePlanSelection} />;
    }
  };

  return (
    // Main application container with theme-dependent styling
    <div className="min-h-screen antialiased bg-gray-950 text-gray-200">
      {/* Conditionally render the PreLivePage modal if showPreLiveNotice is true */}
      {showPreLiveNotice && <PreLivePage onLoginSuccess={handlePreLiveSuccess} />}

      {/* Header component, always visible, handles site-wide navigation */}
      <Header onNavigate={handleNavigation} onPlanSelection={handlePlanSelection} />

      {/* Main content area, renders the current page */}
      <main className="flex-grow">{renderPage()}</main>

      {/* Footer component, always visible */}
      <Footer onNavigate={handleNavigation} />

      {/* Checkout Modal - rendered at app level to cover entire viewport */}
      <CheckoutModal isOpen={isCheckoutModalOpen} onClose={closeCheckoutModal} planType={selectedPlan} onPlanChange={setSelectedPlan} />
    </div>
  );
}
