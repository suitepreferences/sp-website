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
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-[100] font-sans">
      <div className="bg-gradient-to-br from-purple-900/30 via-gray-900/20 to-black/30 p-8 rounded-xl w-full max-w-lg mx-4 transform transition-all duration-300 scale-100 opacity-100 max-h-[90vh] overflow-visible">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-purple-800/40">
          <h2 className="text-3xl font-bold text-indigo-300 drop-shadow-[0_0_4px_#D100FF]">Enterprise Inquiry</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white text-3xl font-bold transition-colors duration-200">
            <X className="h-8 w-8" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-visible">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
              <div className="w-full max-w-lg px-2">
                <label htmlFor="name" className="block text-sm font-medium text-purple-200 mb-2">
                  Contact Name
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
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-purple-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="w-full max-w-lg px-2">
                <label htmlFor="accounts" className="block text-sm font-medium text-purple-200 mb-2">
                  Number of Requested Accounts
                </label>
                <input
                  type="number"
                  id="accounts"
                  value={formData.accounts}
                  onChange={(e) => setFormData({ ...formData, accounts: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-purple-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter number of accounts needed"
                  min="1"
                  required
                />
              </div>

              {error && (
                <div className="w-full max-w-md px-2 bg-red-900/30 border border-red-700/50 rounded-lg p-4">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  "Submit Inquiry"
                )}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6 flex flex-col items-center">
              <div className="w-full max-w-md px-2 bg-green-900/30 border border-green-700/50 rounded-lg p-6">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-300 mb-2">Inquiry Submitted!</h3>
                <p className="text-green-200 mb-4">Thank you for your interest in our Enterprise plan. I will reach out with a link to checkout at the email you provided.</p>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-gray-500"
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
