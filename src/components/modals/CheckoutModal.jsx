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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] font-sans p-4">
      <div className="bg-sp-bg-900 border border-sp-bg-700 rounded-2xl w-full max-w-md transform transition-all duration-300 scale-100 opacity-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-sp-bg-700">
          <h2 className="text-2xl font-bold text-sp-white">{planType} Checkout</h2>
          <button onClick={onClose} className="text-sp-text-400 hover:text-sp-white transition-colors duration-200">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Plan Switcher - Only show when form is visible */}
        {showForm && (
          <div className="p-6 border-b border-sp-bg-700">
            <label className="block text-sm font-medium text-sp-text-300 mb-4">Select Your Plan:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onPlanChange("Basic")}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 text-sm ${
                  planType === "Basic" ? "bg-sp-bg-700 text-sp-white border-2 border-sp-text-500" : "bg-sp-bg-800 text-sp-text-300 hover:bg-sp-bg-700 border-2 border-transparent"
                }`}
              >
                <div className="font-bold">Basic</div>
                <div className="text-xs opacity-80">Free</div>
              </button>
              <button
                onClick={() => onPlanChange("Pro Monthly")}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 text-sm ${
                  planType === "Pro Monthly" ? "bg-sp-bg-700 text-sp-white border-2 border-sp-text-500" : "bg-sp-bg-800 text-sp-text-300 hover:bg-sp-bg-700 border-2 border-transparent"
                }`}
              >
                <div className="font-bold">Pro Monthly</div>
                <div className="text-xs opacity-80">$5.99</div>
              </button>
              <button
                onClick={() => onPlanChange("Pro Yearly")}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 text-sm ${
                  planType === "Pro Yearly" ? "bg-sp-bg-700 text-sp-white border-2 border-sp-text-500" : "bg-sp-bg-800 text-sp-text-300 hover:bg-sp-bg-700 border-2 border-transparent"
                }`}
              >
                <div className="font-bold">Pro Yearly</div>
                <div className="text-xs opacity-80">$60</div>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onEnterpriseSelection();
                }}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 text-sm ${
                  planType === "Pro Yearly - Enterprise Domain"
                    ? "bg-sp-bg-700 text-sp-white border-2 border-sp-text-500"
                    : "bg-sp-bg-800 text-sp-text-300 hover:bg-sp-bg-700 border-2 border-transparent"
                }`}
              >
                <div className="font-bold">Enterprise</div>
                <div className="text-xs opacity-80">$60/user</div>
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {showForm ? (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-sp-text-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-sp-bg-800 border border-sp-text-600 rounded-xl text-sp-white placeholder-sp-text-400 focus:outline-none focus:ring-2 focus:ring-sp-text-500 focus:border-sp-text-500 transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-sp-text-300 mb-2">
                  NetSuite Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-sp-bg-800 border border-sp-text-600 rounded-xl text-sp-white placeholder-sp-text-400 focus:outline-none focus:ring-2 focus:ring-sp-text-500 focus:border-sp-text-500 transition-all duration-200"
                  placeholder="Enter your NetSuite login email"
                  required
                />
                <p className="text-xs text-sp-text-400 mt-2">This must match the email address you use to log into NetSuite</p>
              </div>

              {planType !== "Basic" && (
                <div>
                  <label htmlFor="discountCode" className="block text-sm font-medium text-sp-text-300 mb-2">
                    Discount Code (Optional)
                  </label>
                  <input
                    type="text"
                    id="discountCode"
                    value={formData.discountCode}
                    onChange={(e) => setFormData({ ...formData, discountCode: e.target.value })}
                    className="w-full px-4 py-3 bg-sp-bg-800 border border-sp-text-600 rounded-xl text-sp-white placeholder-sp-text-400 focus:outline-none focus:ring-2 focus:ring-sp-text-500 focus:border-sp-text-500 transition-all duration-200"
                    placeholder="Enter discount code if you have one"
                  />
                </div>
              )}

              {error && (
                <div className="bg-sp-error-400/20 border border-sp-error-400/30 rounded-xl p-4">
                  <p className="text-sp-error-400 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-sp-bg-700 hover:bg-sp-text-600 text-sp-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sp-text-500 focus:ring-offset-2 focus:ring-offset-sp-bg-900"
              >
                {planType === "Basic" ? "Get Started Free" : "Continue to Checkout"}
              </button>
            </form>
          ) : isLoading ? (
            <div className="flex items-center justify-center h-48">
              <div className="text-center">
                <Loader2 className="h-8 w-8 text-sp-text-400 animate-spin mx-auto mb-4" />
                <p className="text-sp-text-300">Creating your checkout...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-sp-error-400/20 border border-sp-error-400/30 rounded-xl p-6 text-center">
              <p className="text-sp-error-400 mb-4">{error}</p>
              <button onClick={() => setShowForm(true)} className="bg-sp-error-400 hover:bg-sp-error-400/80 text-sp-white px-6 py-2 rounded-xl transition-all duration-200">
                Back to Form
              </button>
            </div>
          ) : checkoutUrl ? (
            <div className="text-center space-y-6">
              <div className="bg-sp-bg-800 border border-sp-text-600 rounded-xl p-6">
                <div className="text-sp-success-400 text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-sp-white mb-2">{planType === "Basic" ? "Free Plan Ready!" : "Checkout Ready!"}</h3>
                <p className="text-sp-text-300 mb-4">
                  Please verify that <strong>{formData.email}</strong> is your current NetSuite email address.
                </p>
                <p className="text-sp-text-400 text-sm">
                  {planType === "Basic"
                    ? "Click below to complete your free subscription using our secure checkout overlay."
                    : "Click below to complete your purchase using our secure checkout overlay."}
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={checkoutUrl}
                  className="lemonsqueezy-button w-full py-4 bg-sp-bg-700 hover:bg-sp-text-600 text-sp-white font-bold text-lg rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sp-text-500 focus:ring-offset-2 focus:ring-offset-sp-bg-900 inline-block text-center"
                >
                  {planType === "Basic" ? "Complete Free Subscription" : "Complete Checkout"}
                </a>

                <button
                  onClick={() => setShowForm(true)}
                  className="w-full py-2 bg-sp-bg-800 hover:bg-sp-bg-700 text-sp-text-300 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sp-text-500 focus:ring-offset-2 focus:ring-offset-sp-bg-900"
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
