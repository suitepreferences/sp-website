import { useState, useEffect } from "react";
import CheckoutModal from "./components/modals/CheckoutModal";
import EnterpriseContactModal from "./components/modals/EnterpriseContactModal";
import Header from "./components/common/Header";
import HomePage from "./pages/HomePage";
import Footer from "./components/common/Footer";
import PrivacyPage from "./pages/PrivacyPage";
import ContactPage from "./pages/ContactPage";
import MobileLoadingScreen from "./components/common/MobileLoadingScreen";
import { usePageNavigation } from "./hooks/usePageNavigation";

// Main App Component
export default function App() {
  // Use the navigation hook to manage currentPage and handleNavigation
  const { currentPage, handleNavigation } = usePageNavigation();

  // State to control checkout modal
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  // State to control enterprise contact modal
  const [isEnterpriseModalOpen, setIsEnterpriseModalOpen] = useState(false);

  // State to control page load animation
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // State to control loading screen (now for all devices)
  const [showLoading, setShowLoading] = useState(true);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [animationsStarted, setAnimationsStarted] = useState(false);

  // State to control screen size warning overlay
  const [showScreenSizeWarning, setShowScreenSizeWarning] = useState(false);

  // Handler for opening the checkout modal or enterprise contact modal
  const handlePlanSelection = (planType) => {
    if (planType === "Pro Yearly - Enterprise Domain") {
      setIsEnterpriseModalOpen(true);
    } else {
      setSelectedPlan(planType);
      setIsCheckoutModalOpen(true);
    }
  };

  // Handler for closing the checkout modal
  const closeCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
    setSelectedPlan("");
  };

  // Handler for closing the enterprise contact modal
  const closeEnterpriseModal = () => {
    setIsEnterpriseModalOpen(false);
  };

  // Handler for loading screen completion
  const handleLoadingComplete = () => {
    setIsLoadingComplete(true);
    setShowLoading(false);
  };

  // Handler for starting animations early
  const handleAnimationStart = () => {
    setAnimationsStarted(true);
  };

  // Start page animations immediately when loading is complete
  useEffect(() => {
    if (isLoadingComplete) {
      setIsPageLoaded(true);
    }
  }, [isLoadingComplete]);

  // Start header animation when animations start (0.25s before loading completes)
  useEffect(() => {
    if (animationsStarted) {
      setIsPageLoaded(true);
    }
  }, [animationsStarted]);

  // Check screen size and show warning overlay for unoptimized sizes
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const isUnoptimizedSize = width >= 640 && width < 1000;
      setShowScreenSizeWarning(isUnoptimizedSize);
    };

    // Check on mount
    checkScreenSize();

    // Check on resize
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  /**
   * Renders the appropriate page component based on the current navigation state.
   * Passes down the navigation handler and animation section visibility to HomePage.
   * @returns {JSX.Element} The component for the current page.
   */
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onPlanSelection={handlePlanSelection} onPageLoad={animationsStarted} />;
      case "privacy":
        return <PrivacyPage />;
      case "contact":
        return <ContactPage />;
      default:
        // Fallback to HomePage if currentPage is somehow an unrecognized value
        return <HomePage onPlanSelection={handlePlanSelection} onPageLoad={animationsStarted} />;
    }
  };

  return (
    // Main application container with theme-dependent styling
    <div className="min-h-screen antialiased bg-sp-bg-950 text-sp-text-200">
      {/* Loading Screen - shows on all devices */}
      {showLoading && <MobileLoadingScreen onLoadingComplete={handleLoadingComplete} onAnimationStart={handleAnimationStart} />}

      {/* Screen Size Warning Overlay - shows for unoptimized screen sizes */}
      {showScreenSizeWarning && (
        <div className="fixed inset-0 bg-sp-bg-950/95 backdrop-blur-sm flex items-center justify-center z-[150] px-4">
          <div className="bg-sp-bg-800 border border-sp-text-600/30 rounded-xl p-8 max-w-md text-center shadow-2xl">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-sp-text-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-sp-white mb-2">Screen Size Not Optimized</h2>
              <p className="text-sp-text-300">
                This website is optimized for mobile devices (under 640px) and desktop screens (1000px+). For the best experience, please resize your browser window or use a different device.
              </p>
            </div>
            <button
              onClick={() => setShowScreenSizeWarning(false)}
              className="bg-sp-primary-600 text-sp-white px-6 py-3 rounded-lg font-semibold hover:bg-sp-primary-700 transition-colors duration-200"
            >
              Continue Anyway
            </button>
          </div>
        </div>
      )}

      {/* Header component, always visible, handles site-wide navigation */}
      <Header onNavigate={handleNavigation} onPlanSelection={handlePlanSelection} isLoaded={isPageLoaded} />

      {/* Main content area, renders the current page */}
      <main className="flex-grow">{renderPage()}</main>

      {/* Footer component, always visible */}
      <Footer onNavigate={handleNavigation} />

      {/* Checkout Modal - rendered at app level to cover entire viewport */}
      <CheckoutModal isOpen={isCheckoutModalOpen} onClose={closeCheckoutModal} planType={selectedPlan} onPlanChange={setSelectedPlan} onEnterpriseSelection={() => setIsEnterpriseModalOpen(true)} />

      {/* Enterprise Contact Modal - rendered at app level to cover entire viewport */}
      <EnterpriseContactModal isOpen={isEnterpriseModalOpen} onClose={closeEnterpriseModal} />
    </div>
  );
}
