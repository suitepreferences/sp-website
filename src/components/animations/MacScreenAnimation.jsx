import { useState, useEffect, useRef } from "react";
import { Lock, Gauge, RefreshCw } from "lucide-react";
import SpinningProgressRing from "../common/SpinningProgressRing";

function MacScreenAnimation() {
  const [suiteGlowEnabled, setSuiteGlowEnabled] = useState(false);
  const [portletRefreshEnabled, setPortletRefreshEnabled] = useState(false);
  const [animationPhase, setAnimationPhase] = useState("initial"); // 'initial', 'mouse_to_suiteglow', 'toggle_suiteglow', 'mouse_to_portletrefresh', 'toggle_portletrefresh', 'mouse_to_save', 'click_save', 'show_progress', 'show_dashboard'
  const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" });
  const [kpis, setKpis] = useState({});
  const containerRef = useRef(null);

  // Helper to generate random KPI values
  const generateKpis = () => ({
    sales: (Math.random() * 1000000).toFixed(2),
    profit: (Math.random() * 100000).toFixed(2),
    customers: Math.floor(Math.random() * 5000),
  });

  useEffect(() => {
    setKpis(generateKpis()); // Initialize KPIs
    let timeout;
    let kpiInterval;

    const runAnimation = () => {
      // Reset state for looping
      setSuiteGlowEnabled(false);
      setPortletRefreshEnabled(false);
      setAnimationPhase("initial");

      // Phase 1: Initial state (settings page) -> Mouse to SuiteGlow
      timeout = setTimeout(() => {
        setAnimationPhase("mouse_to_suiteglow");
        if (containerRef.current) {
          // Adjust coordinates based on the assumed layout of your simulated settings page
          // These are approximate and might need fine-tuning based on actual rendering
          const toggleY = containerRef.current.offsetHeight * 0.4; // Approx Y for SuiteGlow toggle
          const toggleX = containerRef.current.offsetWidth * 0.7; // Approx X for SuiteGlow toggle
          setMousePosition({ x: `${toggleX}px`, y: `${toggleY}px` });
        }
      }, 1000); // Wait 1 second before starting

      // Phase 2: Toggle SuiteGlow
      timeout = setTimeout(() => {
        setAnimationPhase("toggle_suiteglow");
        setSuiteGlowEnabled(true); // Toggle it on
      }, 3000); // Mouse movement + 2 seconds

      // Phase 3: Mouse to PortletRefresh
      timeout = setTimeout(() => {
        setAnimationPhase("mouse_to_portletrefresh");
        if (containerRef.current) {
          const toggleY = containerRef.current.offsetHeight * 0.55; // Approx Y for PortletRefresh toggle
          const toggleX = containerRef.current.offsetWidth * 0.7; // Approx X for PortletRefresh toggle
          setMousePosition({ x: `${toggleX}px`, y: `${toggleY}px` });
        }
      }, 5000); // After SuiteGlow toggle + 2 seconds

      // Phase 4: Toggle PortletRefresh
      timeout = setTimeout(() => {
        setAnimationPhase("toggle_portletrefresh");
        setPortletRefreshEnabled(true); // Toggle it on
      }, 7000); // After PortletRefresh mouse movement + 2 seconds

      // Phase 5: Mouse to Save Button
      timeout = setTimeout(() => {
        setAnimationPhase("mouse_to_save");
        if (containerRef.current) {
          const buttonY = containerRef.current.offsetHeight * 0.8; // Approx Y for Save button
          const buttonX = containerRef.current.offsetWidth * 0.5; // Approx X for Save button
          setMousePosition({ x: `${buttonX}px`, y: `${buttonY}px` });
        }
      }, 9000); // After PortletRefresh toggle + 2 seconds

      // Phase 6: Click Save Button and Show Progress
      timeout = setTimeout(() => {
        setAnimationPhase("show_progress");
      }, 10500); // After mouse to save + 1.5 seconds

      // Phase 7: Show Dashboard
      timeout = setTimeout(() => {
        setAnimationPhase("show_dashboard");
        // Start KPI refreshing
        kpiInterval = setInterval(() => {
          setKpis(generateKpis());
        }, 2000); // Refresh every 2 seconds
      }, 12500); // After progress ring + 2 seconds

      // Phase 8: Loop back after dashboard display
      timeout = setTimeout(() => {
        clearInterval(kpiInterval); // Stop KPI refreshing before looping
        runAnimation(); // Restart the animation
      }, 20000); // Show dashboard for about 7.5 seconds before looping
    };

    runAnimation(); // Start the first iteration

    return () => {
      clearTimeout(timeout);
      clearInterval(kpiInterval);
    };
  }, []); // Empty dependency array means this runs once on mount

  // Simple Toggle Switch Component for internal animation
  const ToggleSwitch = ({ label, enabled }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
      <div className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${enabled ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-600"}`}>
        <span className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform duration-300 ${enabled ? "translate-x-6" : "translate-x-1"}`} />
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-4">
      {/* Simulated Browser Window */}
      <div className="relative w-11/12 max-w-4xl h-full rounded-lg shadow-2xl bg-gray-100 dark:bg-gray-800 transition-colors duration-300 flex flex-col border border-gray-300 dark:border-gray-700">
        {/* Browser Top Bar */}
        <div className="flex items-center p-2 bg-gray-200 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-700">
          <div className="flex space-x-2 mr-4">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>
          <div className="flex-grow bg-white dark:bg-gray-900 rounded-full px-4 py-1 text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <Lock className="h-4 w-4 mr-2 text-gray-400" /> {/* Lock icon for HTTPS */}
            https://app.netsuite.com
          </div>
        </div>

        {/* Browser Content Area */}
        <div
          ref={containerRef}
          className={`flex-grow p-6 overflow-hidden transition-colors duration-500 ${suiteGlowEnabled ? "bg-gray-900 text-white" : "bg-white text-gray-800"} flex flex-col items-center justify-center`}
        >
          {animationPhase !== "show_dashboard" && animationPhase !== "show_progress" && (
            // NetSuite Settings Page Simulation
            <div className="w-full max-w-xl bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">NetSuite Preferences</h3>
              <div className="space-y-4">
                <ToggleSwitch label="SuiteGlow™ Dark Mode" enabled={suiteGlowEnabled} />
                <ToggleSwitch label="PortletRefresh" enabled={portletRefreshEnabled} />
                <div className="pt-6">
                  <button
                    className={`w-full py-2 rounded-md font-semibold transition-all duration-300 ${
                      animationPhase === "click_save" ? "bg-indigo-700 text-white shadow-md" : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {animationPhase === "show_progress" && (
            <div className="flex flex-col items-center justify-center h-full">
              <SpinningProgressRing />
              <p className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">Applying Preferences...</p>
            </div>
          )}

          {animationPhase === "show_dashboard" && (
            // NetSuite Dashboard Simulation
            <div className="w-full max-w-2xl bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center justify-center">
                <Gauge className="h-8 w-8 mr-3 text-indigo-600 dark:text-indigo-400" />
                NetSuite Dashboard
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Total Sales</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">${kpis.sales}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Net Profit</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">${kpis.profit}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Active Customers</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{kpis.customers}</p>
                </div>
              </div>
              <p className="text-sm mt-4 text-gray-500 dark:text-gray-400 flex items-center justify-center">
                <RefreshCw className="h-4 w-4 mr-1 animate-spin-slow" />
                Refreshing automatically...
              </p>
            </div>
          )}
        </div>

        {/* Mouse Pointer */}
        <div
          className={`absolute pointer-events-none transition-all duration-1000 ease-in-out ${animationPhase.startsWith("mouse_") || animationPhase === "click_save" ? "opacity-100" : "opacity-0"}`}
          style={{ left: mousePosition.x, top: mousePosition.y, transform: "translate(-50%, -50%)" }}
        >
          {/* Simple SVG Mouse Pointer */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-gray-900 dark:text-white">
            <path d="M12 0L0 24L12 18L24 24L12 0Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default MacScreenAnimation;
