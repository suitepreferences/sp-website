import { useState, useEffect } from "react";
import { Unlock, Lock } from "lucide-react";
import PricingCard from "../components/common/PricingCard";

function HomePage({ onNavigate, onPlanSelection, onPageLoad }) {
  const [currentCard, setCurrentCard] = useState(1); // Start on Pro Monthly
  const [currentHeroMessage, setCurrentHeroMessage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isLocked, setIsLocked] = useState(true); // Start with locked state
  const [isLoaded, setIsLoaded] = useState(false); // Track if page has loaded

  const heroMessages = [
    "Dark themes and custom fonts with SuiteGlow",
    "Auto-refresh dashboards with PortletRefresher",
    "Faster development with SuiteConsole",
    "Safe client demos with Privacy Settings",
  ];

  // Create infinite loop by duplicating first message at the end
  const infiniteMessages = [...heroMessages, heroMessages[0]];

  // Rotate hero messages with proper timing
  useEffect(() => {
    let interval;

    if (currentHeroMessage < heroMessages.length) {
      // Only run interval when showing regular messages (not duplicate)
      interval = setInterval(() => {
        setCurrentHeroMessage((prev) => {
          if (prev === heroMessages.length - 1) {
            // When we reach the last real message, show duplicate
            return heroMessages.length; // Show the duplicate
          }
          return prev + 1;
        });
      }, 4000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentHeroMessage, heroMessages.length]);

  // Handle the reset from duplicate back to first message without animation
  useEffect(() => {
    if (currentHeroMessage === heroMessages.length) {
      // We're showing the duplicate, wait for it to be fully visible, then reset without animation
      const resetTimer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentHeroMessage(0);
        setTimeout(() => {
          setIsTransitioning(true);
          // After reset, advance to second message quickly
          setTimeout(() => {
            setCurrentHeroMessage(1);
          }, 1000); // Only show first message for 1 second after reset
        }, 50);
      }, 4000); // Wait 4 seconds for duplicate to be fully visible

      return () => clearTimeout(resetTimer);
    }
  }, [currentHeroMessage, heroMessages.length]);

  // Load animation effect - unlock lock and show content on page load
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
      if (onPageLoad) {
        onPageLoad(true);
      }
    }, 100); // Small delay to ensure smooth animation

    // Unlock the lock after header animation completes (1000ms duration)
    const unlockTimer = setTimeout(() => {
      setIsLocked(false);
    }, 1100); // 100ms initial delay + 1000ms header animation duration

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(unlockTimer);
    };
  }, [onPageLoad]);

  // Circular carousel logic
  const goToPrevious = () => {
    setCurrentCard((prev) => (prev === 0 ? 3 : prev - 1));
  };

  const goToNext = () => {
    setCurrentCard((prev) => (prev === 3 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-10 py-0 relative isolate">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-10 pb-0">
        <div className="container mx-auto text-center max-w-4xl">
          {/* Mobile/Tablet Hero Title - No Animation */}
          <h1 className="lg-1000:hidden text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-400">
            Unlock
            <span className="inline-block mx-2 align-[-.1em]" style={{ color: "#22c55e" }}>
              <Unlock className="h-[1.1em] w-[1.1em]" />
            </span>
            the NetSuite UI/UX
          </h1>

          {/* Desktop Hero Title - With Animation */}
          <h1
            className="hidden lg-1000:block text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-400 transition-all duration-1000 ease-out whitespace-nowrap"
            style={{
              transform: isLoaded ? "translateY(0) opacity-100" : "translateY(-20px) opacity-0",
            }}
          >
            <div className="relative inline-block overflow-hidden text-right" style={{ height: "1.2em", width: "5.5em", marginLeft: "-2em" }}>
              <span
                className="block absolute bottom-0 left-0 right-0 transition-all duration-700 ease-in-out"
                style={{
                  transform: isLocked ? "translateY(0)" : "translateY(-100%)",
                  opacity: isLocked ? 1 : 0,
                  bottom: "-0.125em",
                }}
              >
                Lock
              </span>
              <span
                className="block absolute bottom-0 right-0 transition-all duration-700 ease-in-out"
                style={{
                  transform: isLocked ? "translateY(100%)" : "translateY(0)",
                  opacity: isLocked ? 0 : 1,
                  bottom: "-0.125em",
                }}
              >
                Unlock
              </span>
            </div>
            <span className="inline-block mx-2 align-[-.1em] text-white">
              <div className="relative inline-block w-[1.1em] h-[1.1em]">
                <Lock
                  className="h-[1.1em] w-[1.1em] absolute top-0 left-0 transition-all duration-700 ease-in-out transform"
                  style={{
                    opacity: isLocked ? 1 : 0,
                    transform: isLocked ? "scale(1) rotate(0deg)" : "scale(0.8) rotate(-10deg)",
                    color: "#ef4444", // Red when locked
                  }}
                />
                <Unlock
                  className="h-[1.1em] w-[1.1em] absolute top-0 left-0 transition-all duration-700 ease-in-out transform"
                  style={{
                    opacity: isLocked ? 0 : 1,
                    transform: isLocked ? "scale(0.8) rotate(10deg)" : "scale(1) rotate(0deg)",
                    color: "#22c55e", // Green when unlocked
                  }}
                />
              </div>
            </span>
            <span className="whitespace-nowrap">the NetSuite UI/UX</span>
          </h1>
          <div
            className="text-xl md:text-2xl mb-8 opacity-90 tracking-tight text-gray-200 overflow-hidden relative h-16 transition-all duration-1000 ease-out delay-300"
            style={{
              transform: isLoaded ? "translateY(0) opacity-100" : "translateY(20px) opacity-0",
            }}
          >
            <div className={`flex ${isTransitioning ? "transition-transform duration-1000 ease-in-out" : ""}`} style={{ transform: `translateX(-${currentHeroMessage * 100}%)` }}>
              {infiniteMessages.map((message, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  {message}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Sold / Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 pb-12 scroll-mt-64">
        <div className="relative max-w-7xl mx-auto">
          {/* Mobile/Tablet Layout - Vertically Stacked Cards */}
          <div className="lg-1000:hidden space-y-8">
            <PricingCard
              title="Basic"
              price="$0"
              period="/month"
              features={[
                { text: "Record Inspector", included: true },
                { text: "Portlet Refresher", included: true },
                { text: "UI Zoom", included: true },
                { text: "Privacy Mode", included: true },
                { text: "SuiteGlow themes & fonts", included: false },
                { text: "SuiteConsole", included: false },
                { text: "Show Field IDs", included: false },
                { text: "All Other Pro features", included: false },
              ]}
              buttonText="Get Started Free"
              buttonClass="bg-gray-700 text-gray-200 hover:bg-gray-600"
              onClick={() => onPlanSelection("Basic")}
            />

            <PricingCard
              title="Pro Monthly"
              price="$5.99"
              period="/month"
              features={[
                { text: "All Basic features", included: true },
                { text: "SuiteGlow themes & fonts", included: true },
                { text: "SuiteConsole", included: true },
                { text: "Show Field IDs", included: true },
                { text: "Connected Scripts & Workflows", included: true },
                { text: "Record Browser", included: true },
                { text: "1 User Account (transferable)*", included: true },
                { text: "14-day Free Trial", included: true },
              ]}
              buttonText="Get Pro Monthly"
              buttonClass="bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={() => onPlanSelection("Pro Monthly")}
            />

            <PricingCard
              title="Pro Yearly"
              price="$60"
              originalPrice="$71.88"
              period="/year"
              isPopular={false}
              features={[
                { text: "All Basic & Pro Monthly features", included: true },
                { text: "Billed Annually", included: true },
                { text: "1 User Account (transferable)*", included: true },
                { text: "14-day Free Trial", included: true },
              ]}
              buttonText="Get Pro Yearly"
              buttonClass="bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => onPlanSelection("Pro Yearly")}
            />

            <PricingCard
              title="Pro Yearly - Enterprise Domain"
              price="$60"
              period="/user/year"
              features={[
                { text: "All Basic & Pro Monthly features", included: true },
                { text: "Annual billing", included: true },
                { text: "Multiple user accounts", included: true },
                { text: "Domain-wide access for all users", included: true },
                { text: "Instant access to new features", included: true },
              ]}
              buttonText="Contact Sales"
              buttonClass="bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={() => onPlanSelection("Pro Yearly - Enterprise Domain")}
            />
          </div>

          {/* Desktop Layout - Carousel (Hidden on screens under 1000px) */}
          <div className="hidden lg-1000:block">
            {/* Navigation Controls - Centered Vertically */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full transition-colors duration-200 shadow-lg backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full transition-colors duration-200 shadow-lg backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Container */}
            <div className="relative overflow-hidden">
              <div className="flex justify-center items-center">
                {/* Left Card (Previous) */}
                <div className="absolute left-8 transition-all duration-700 ease-in-out transform scale-75 opacity-60 pointer-events-none">
                  <div className="w-96">
                    {currentCard === 0 ? (
                      <PricingCard
                        title="Pro Yearly - Enterprise Domain"
                        price="$60"
                        period="/user/year"
                        features={[
                          { text: "All Basic & Pro Monthly features", included: true },
                          { text: "Annual billing", included: true },
                          { text: "Multiple user accounts", included: true },
                          { text: "Domain-wide access for all users", included: true },
                          { text: "Instant access to new features", included: true },
                        ]}
                        buttonText="Contact Sales"
                        buttonClass="bg-emerald-600 text-white hover:bg-emerald-700"
                        onClick={() => {}}
                      />
                    ) : currentCard === 1 ? (
                      <PricingCard
                        title="Basic"
                        price="$0"
                        period="/month"
                        features={[
                          { text: "Record Inspector", included: true },
                          { text: "Portlet Refresher", included: true },
                          { text: "UI Zoom", included: true },
                          { text: "Privacy Mode", included: true },
                          { text: "SuiteGlow themes & fonts", included: false },
                          { text: "SuiteConsole", included: false },
                          { text: "Show Field IDs", included: false },
                          { text: "All Other Pro features", included: false },
                        ]}
                        buttonText="Get Started Free"
                        buttonClass="bg-gray-700 text-gray-200 hover:bg-gray-600"
                        onClick={() => {}}
                      />
                    ) : currentCard === 2 ? (
                      <PricingCard
                        title="Pro Monthly"
                        price="$5.99"
                        period="/month"
                        features={[
                          { text: "All Basic features", included: true },
                          { text: "SuiteGlow themes & fonts", included: true },
                          { text: "SuiteConsole", included: true },
                          { text: "Show Field IDs", included: true },
                          { text: "Connected Scripts & Workflows", included: true },
                          { text: "Record Browser", included: true },
                          { text: "1 User Account (transferable)*", included: true },
                          { text: "14-day Free Trial", included: true },
                        ]}
                        buttonText="Get Pro Monthly"
                        buttonClass="bg-indigo-600 text-white hover:bg-indigo-700"
                        onClick={() => {}}
                      />
                    ) : (
                      <PricingCard
                        title="Pro Yearly"
                        price="$60"
                        originalPrice="$71.88"
                        period="/year"
                        isPopular={false}
                        features={[
                          { text: "All Basic & Pro Monthly features", included: true },
                          { text: "Billed Annually", included: true },
                          { text: "1 User Account (transferable)*", included: true },
                          { text: "14-day Free Trial", included: true },
                        ]}
                        buttonText="Get Pro Yearly"
                        buttonClass="bg-purple-600 text-white hover:bg-purple-700"
                        onClick={() => {}}
                      />
                    )}
                  </div>
                </div>

                {/* Center Card (Current) */}
                <div className="z-10 transition-all duration-700 ease-in-out transform scale-100 opacity-100">
                  <div className="w-96">
                    {currentCard === 0 && (
                      <PricingCard
                        title="Basic"
                        price="$0"
                        period="/month"
                        features={[
                          { text: "Record Inspector", included: true },
                          { text: "Portlet Refresher", included: true },
                          { text: "UI Zoom", included: true },
                          { text: "Privacy Mode", included: true },
                          { text: "SuiteGlow themes & fonts", included: false },
                          { text: "SuiteConsole", included: false },
                          { text: "Show Field IDs", included: false },
                          { text: "All Other Pro features", included: false },
                        ]}
                        buttonText="Get Started Free"
                        buttonClass="bg-gray-700 text-gray-200 hover:bg-gray-600"
                        onClick={() => onPlanSelection("Basic")}
                      />
                    )}
                    {currentCard === 1 && (
                      <PricingCard
                        title="Pro Monthly"
                        price="$5.99"
                        period="/month"
                        features={[
                          { text: "All Basic features", included: true },
                          { text: "SuiteGlow themes & fonts", included: true },
                          { text: "SuiteConsole", included: true },
                          { text: "Show Field IDs", included: true },
                          { text: "Connected Scripts & Workflows", included: true },
                          { text: "Record Browser", included: true },
                          { text: "1 User Account (transferable)*", included: true },
                          { text: "14-day Free Trial", included: true },
                        ]}
                        buttonText="Get Pro Monthly"
                        buttonClass="bg-indigo-600 text-white hover:bg-indigo-700"
                        onClick={() => onPlanSelection("Pro Monthly")}
                      />
                    )}
                    {currentCard === 2 && (
                      <PricingCard
                        title="Pro Yearly"
                        price="$60"
                        originalPrice="$71.88"
                        period="/year"
                        isPopular={false}
                        features={[
                          { text: "All Basic & Pro Monthly features", included: true },
                          { text: "Billed Annually", included: true },
                          { text: "1 User Account (transferable)*", included: true },
                          { text: "14-day Free Trial", included: true },
                        ]}
                        buttonText="Get Pro Yearly"
                        buttonClass="bg-purple-600 text-white hover:bg-purple-700"
                        onClick={() => onPlanSelection("Pro Yearly")}
                      />
                    )}
                    {currentCard === 3 && (
                      <PricingCard
                        title="Pro Yearly - Enterprise Domain"
                        price="$60"
                        period="/user/year"
                        features={[
                          { text: "All Basic & Pro Monthly features", included: true },
                          { text: "Annual billing", included: true },
                          { text: "Multiple user accounts", included: true },
                          { text: "Domain-wide access for all users", included: true },
                          { text: "Instant access to new features", included: true },
                        ]}
                        buttonText="Contact Sales"
                        buttonClass="bg-emerald-600 text-white hover:bg-emerald-700"
                        onClick={() => onPlanSelection("Pro Yearly - Enterprise Domain")}
                      />
                    )}
                  </div>
                </div>

                {/* Right Card (Next) */}
                <div className="absolute right-8 transition-all duration-700 ease-in-out transform scale-75 opacity-60 pointer-events-none">
                  <div className="w-96">
                    {currentCard === 0 ? (
                      <PricingCard
                        title="Pro Monthly"
                        price="$5.99"
                        period="/month"
                        features={[
                          { text: "All Basic features", included: true },
                          { text: "SuiteGlow themes & fonts", included: true },
                          { text: "SuiteConsole", included: true },
                          { text: "Show Field IDs", included: true },
                          { text: "Connected Scripts & Workflows", included: true },
                          { text: "Record Browser", included: true },
                          { text: "1 User Account (transferable)*", included: true },
                          { text: "14-day Free Trial", included: true },
                        ]}
                        buttonText="Get Pro Monthly"
                        buttonClass="bg-indigo-600 text-white hover:bg-indigo-700"
                        onClick={() => {}}
                      />
                    ) : currentCard === 1 ? (
                      <PricingCard
                        title="Pro Yearly"
                        price="$60"
                        originalPrice="$71.88"
                        period="/year"
                        isPopular={false}
                        features={[
                          { text: "All Basic & Pro Monthly features", included: true },
                          { text: "Billed Annually", included: true },
                          { text: "1 User Account (transferable)*", included: true },
                          { text: "14-day Free Trial", included: true },
                        ]}
                        buttonText="Get Pro Yearly"
                        buttonClass="bg-purple-600 text-white hover:bg-purple-700"
                        onClick={() => {}}
                      />
                    ) : currentCard === 2 ? (
                      <PricingCard
                        title="Pro Yearly - Enterprise Domain"
                        price="$60"
                        period="/user/year"
                        features={[
                          { text: "All Basic & Pro Monthly features", included: true },
                          { text: "Annual billing", included: true },
                          { text: "Multiple user accounts", included: true },
                          { text: "Domain-wide access for all users", included: true },
                          { text: "Instant access to new features", included: true },
                        ]}
                        buttonText="Contact Sales"
                        buttonClass="bg-emerald-600 text-white hover:bg-emerald-700"
                        onClick={() => {}}
                      />
                    ) : (
                      <PricingCard
                        title="Basic"
                        price="$0"
                        period="/month"
                        features={[
                          { text: "Record Inspector", included: true },
                          { text: "Portlet Refresher", included: true },
                          { text: "UI Zoom", included: true },
                          { text: "Privacy Mode", included: true },
                          { text: "SuiteGlow themes & fonts", included: false },
                          { text: "SuiteConsole", included: false },
                          { text: "Show Field IDs", included: false },
                          { text: "All Other Pro features", included: false },
                        ]}
                        buttonText="Get Started Free"
                        buttonClass="bg-gray-700 text-gray-200 hover:bg-gray-600"
                        onClick={() => {}}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {[0, 1, 2, 3].map((index) => (
                <button key={index} onClick={() => setCurrentCard(index)} className={`w-3 h-3 rounded-full transition-colors duration-200 ${currentCard === index ? "bg-gray-400" : "bg-gray-700"}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto text-center mt-8">
          <p className="text-gray-300">
            * Your <span className="font-extrabold text-gray-200">Suite</span>
            <span className="font-normal text-gray-300">Preferences</span> subscription is tied to your NetSuite login email and can be updated at any time.
          </p>
          <p className="text-gray-300 mt-2">For Enterprise accounts, subscriptions are tied to the logged in user's email domain.</p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-br from-gray-900 to-black text-white py-16 px-4 shadow-xl">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6 text-gray-100">Ready to level up your NetSuite UX?</h2>
          <p className="text-xl mb-8 opacity-90 text-gray-200">Join other users who are already enjoying a more personalized NetSuite experience.</p>
          <button
            onClick={() => onPlanSelection("Pro Yearly")}
            className="inline-flex items-center px-6 py-4 bg-gray-800 text-white font-bold text-lg rounded-full shadow-lg hover:bg-gray-700 transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-3"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M12 9h8.4" />
              <path d="M14.598 13.5l-4.2 7.275" />
              <path d="M9.402 13.5l-4.2 -7.275" />
            </svg>
            Start Your Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
