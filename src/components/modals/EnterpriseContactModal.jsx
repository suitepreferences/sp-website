import React, { useState } from "react";
import { X, Loader2, CheckCircle } from "lucide-react";

function EnterpriseContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    accounts: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!formData.name || !formData.email || !formData.accounts) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://forms.suitepreferences.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Number of requested accounts: ${formData.accounts}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        // Clear form fields on success
        setFormData({
          name: "",
          email: "",
          accounts: "",
        });
      } else {
        setError("Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (submitted) {
      setSubmitted(false);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] font-sans p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md transform transition-all duration-300 scale-100 opacity-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Enterprise Inquiry</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors duration-200">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Contact Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label htmlFor="accounts" className="block text-sm font-medium text-gray-300 mb-2">
                  Number of Accounts
                </label>
                <input
                  type="number"
                  id="accounts"
                  value={formData.accounts}
                  onChange={(e) => setFormData({ ...formData, accounts: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                  placeholder="How many user accounts do you need?"
                  min="1"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-4">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Submitting...
                  </div>
                ) : (
                  "Submit Inquiry"
                )}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="bg-gray-800 border border-gray-600 rounded-xl p-6">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Inquiry Submitted!</h3>
                <p className="text-gray-300 mb-4">
                  Thank you for your interest in SuitePreferences Enterprise. We'll be in touch with you shortly at <strong>{formData.email}</strong>.
                </p>
                <p className="text-gray-400 text-sm">Our team will review your requirements and get back to you within 24 hours with pricing and next steps.</p>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EnterpriseContactModal;
