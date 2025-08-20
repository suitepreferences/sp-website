import React, { useState, useEffect, useCallback } from "react";
import { X, Loader2 } from "lucide-react";
import { checkoutConfig } from "../../config/checkout";

function CheckoutModal({ isOpen, onClose, planType, onPlanChange, onEnterpriseSelection }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    discountCode: "",
  });

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowForm(false);
      createCheckout(formData);
    }
  };

  const createCheckout = useCallback(
    async (formDataToUse) => {
      setIsLoading(true);
      setError("");

      // Map plan types to the format expected by your proxy service
      const planMapping = {
        Basic: "basic",
        "Pro Monthly": "pro_monthly",
        "Pro Yearly": "pro_yearly",
        "Pro Yearly - Enterprise Domain": "pro_yearly_enterprise",
      };

      const selectedPlan = planMapping[planType] || "pro_monthly";

      try {
        // Call your proxy service instead of Lemon Squeezy directly
        const response = await fetch(checkoutConfig.baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan: selectedPlan,
            email: formDataToUse.email.trim(),
            name: formDataToUse.name.trim(),
            discountCode: formDataToUse.discountCode.trim() || null,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          const errorMessage = result.error || result.message || "Failed to create checkout";
          throw new Error(errorMessage);
        }

        // Your proxy service returns checkout_url
        const url = result.checkout_url;
        if (!url) {
          throw new Error("No checkout URL received from service");
        }

        setCheckoutUrl(url);
        setIsLoading(false);
      } catch (error) {
        console.error("Checkout creation error:", error);
        setError(error.message || "Failed to create checkout. Please try again.");
        setIsLoading(false);
      }
    },
    [planType]
  );

  // Initialize Lemon Squeezy overlay when checkout URL is ready
  useEffect(() => {
    if (checkoutUrl && window.createLemonSqueezy) {
      // Small delay to ensure the overlay is ready
      setTimeout(() => {
        try {
          window.createLemonSqueezy();
        } catch (error) {
          // Silently handle overlay initialization errors
        }
      }, 100);
    }
  }, [checkoutUrl]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setShowForm(true);
      setError("");
      setCheckoutUrl("");
      setFormData({
        name: "",
        email: "",
        discountCode: "",
      });
    } else {
      setShowForm(true);
      setError("");
      setCheckoutUrl("");
      setFormData({
        name: "",
        email: "",
        discountCode: "",
      });
    }
  }, [isOpen, planType]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-[100] font-sans">
      <div className="bg-gradient-to-br from-purple-900/30 via-gray-900/20 to-black/30 p-8 rounded-xl w-full max-w-lg mx-4 transform transition-all duration-300 scale-100 opacity-100 max-h-[90vh] overflow-visible">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-purple-800/40">
          <h2 className="text-3xl font-bold text-indigo-300 drop-shadow-[0_0_4px_#D100FF]">{planType} Checkout</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl font-bold transition-colors duration-200">
            <X className="h-8 w-8" />
          </button>
        </div>

        {/* Plan Switcher - Only show when form is visible */}
        {showForm && (
          <div className="mb-6 flex flex-col items-center">
            <label className="block text-sm font-medium text-purple-200 mb-3">Select Your Plan:</label>
            <div className="w-full max-w-lg px-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <button
                  onClick={() => onPlanChange("Basic")}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    planType === "Basic" ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Basic
                  <br />
                  Free
                </button>
                <button
                  onClick={() => onPlanChange("Pro Monthly")}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    planType === "Pro Monthly" ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Pro Monthly
                  <br />
                  $5.99
                </button>
                <button
                  onClick={() => onPlanChange("Pro Yearly")}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    planType === "Pro Yearly" ? "bg-purple-600 text-white shadow-lg" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Pro Yearly
                  <br />
                  $60
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onEnterpriseSelection();
                  }}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    planType === "Pro Yearly - Enterprise Domain" ? "bg-emerald-600 text-white shadow-lg" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Enterprise
                  <br />
                  $60/user
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-visible">
          {showForm ? (
            <form onSubmit={handleFormSubmit} className="space-y-6 flex flex-col items-center">
              <div className="w-full max-w-lg px-2">
                <label htmlFor="name" className="block text-sm font-medium text-purple-200 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-purple-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="w-full max-w-lg px-2">
                <label htmlFor="email" className="block text-sm font-medium text-purple-200 mb-2">
                  NetSuite Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-purple-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your NetSuite login email"
                  required
                />
                <p className="text-xs text-purple-300 mt-2">This must match the email address you use to log into NetSuite</p>
              </div>

              {planType !== "Basic" && (
                <div className="w-full max-w-lg px-2">
                  <label htmlFor="discountCode" className="block text-sm font-medium text-purple-200 mb-2">
                    Discount Code (Optional)
                  </label>
                  <input
                    type="text"
                    id="discountCode"
                    value={formData.discountCode}
                    onChange={(e) => setFormData({ ...formData, discountCode: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-purple-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter discount code if you have one"
                  />
                </div>
              )}

              {error && (
                <div className="w-full max-w-md px-2 bg-red-900/30 border border-red-700/50 rounded-lg p-4">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-indigo-500"
              >
                {planType === "Basic" ? "Get Started Free" : "Continue to Checkout"}
              </button>
            </form>
          ) : isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 className="h-12 w-12 text-indigo-400 animate-spin mx-auto mb-4" />
                <p className="text-purple-200 text-lg">Creating your checkout...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-6 text-center">
              <p className="text-red-300 text-lg mb-4">{error}</p>
              <button onClick={() => setShowForm(true)} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                Back to Form
              </button>
            </div>
          ) : checkoutUrl ? (
            <div className="text-center space-y-6 flex flex-col items-center">
              <div className="w-full max-w-md px-2 bg-green-900/30 border border-green-700/50 rounded-lg p-6">
                <div className="text-green-400 text-6xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-green-300 mb-2">{planType === "Basic" ? "Free Plan Ready!" : "Checkout Ready!"}</h3>
                <p className="text-green-200 mb-4">
                  Please verify that <strong>{formData.email}</strong> is your current NetSuite email address.
                </p>
                <p className="text-purple-200 text-sm">
                  {planType === "Basic"
                    ? "Click below to complete your free subscription using our secure checkout overlay."
                    : "Click below to complete your purchase using our secure checkout overlay."}
                </p>
              </div>

              <div className="space-y-3 w-full max-w-md px-2 mx-1">
                <a
                  href={checkoutUrl}
                  className="lemonsqueezy-button w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-lg transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-indigo-500 inline-block text-center"
                >
                  {planType === "Basic" ? "Complete Free Subscription" : "Complete Checkout"}
                </a>

                <button
                  onClick={() => setShowForm(true)}
                  className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-gray-500"
                >
                  Edit Information or Plan
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;
