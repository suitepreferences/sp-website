import { useState, useEffect } from "react";

function MobileLoadingScreen({ onLoadingComplete, onAnimationStart }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Optimizing NetSuite UX...");

  useEffect(() => {
    // Loading text messages
    const messages = [
      "Optimizing NetSuite UX...",
      "Loading PortletRefresher...",
      "Detecting NetSuite User Permissions...",
      "Loading SuiteConsole...",
      "Validating 'N/Require' modules...",
      "NetSuite UX Experience Ready...",
    ];

    // Change loading text based on progress
    let messageIndex = 0;
    const textInterval = setInterval(() => {
      setLoadingText(messages[messageIndex]);
      messageIndex++;

      // If we've shown all messages, start the flicker sequence
      if (messageIndex >= messages.length) {
        clearInterval(textInterval);

        // Flicker through all messages quickly
        let flickerIndex = 0;
        const flickerInterval = setInterval(() => {
          setLoadingText(messages[flickerIndex]);
          flickerIndex++;

          // After flickering through all messages, hold on the last one
          if (flickerIndex >= messages.length) {
            clearInterval(flickerInterval);
            setLoadingText(messages[messages.length - 1]); // Hold on last message

            // Complete loading after holding on final message for 0.3 seconds
            setTimeout(() => {
              setProgress(100);
            }, 300);
          }
        }, 80); // Quick flicker every 80ms
      }
    }, 500); // Change text every 500ms to fit in 4 seconds

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);

          // Start animations 0.25 seconds before fade out
          setTimeout(() => {
            if (onAnimationStart) {
              onAnimationStart();
            }
          }, 50); // Start animations 0.25 seconds before fade out (300ms - 250ms)

          // Fade out after completion
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
              onLoadingComplete();
            }, 500); // Wait for fade out animation
          }, 300);
          return 100;
        }
        return prev + 1; // Smooth progress increment
      });
    }, 40); // Smooth progress every 40ms (4 seconds total)

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-sp-bg-950/80 backdrop-blur-sm flex items-center justify-center z-[200] transition-opacity duration-500">
      {/* Progress Ring - fixed center position */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96">
        <svg className="w-96 h-96 transform -rotate-90" viewBox="0 0 36 36">
          {/* Background circle */}
          <path
            className="text-sp-bg-800"
            stroke="currentColor"
            strokeWidth="1"
            fill="transparent"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          {/* Progress circle */}
          <path
            className="text-sp-primary-500"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={`${progress}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
      </div>

      {/* Content - fixed center position */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center space-y-8 px-6 z-10">
        {/* Logo */}
        <div className="flex justify-center">
          <img src="./branding/sp-chromestore_logo_original.svg" alt="SuitePreferences" className="h-24 w-auto" />
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <img src="./branding/sp-logo_full-width_dark-bg.png" alt="SuitePreferences" className="h-8 w-auto" />
          </div>
          <p className="text-sp-text-300 text-sm transition-all duration-300 min-h-[1.5rem] w-64 whitespace-nowrap overflow-hidden text-ellipsis">{loadingText}</p>
        </div>
      </div>
    </div>
  );
}

export default MobileLoadingScreen;
