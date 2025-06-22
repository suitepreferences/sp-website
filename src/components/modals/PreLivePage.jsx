import { useState } from "react";
import { MessageSquareWarning, Clock } from "lucide-react";
import { useCountdown } from "../../hooks/useCountdown";
import { TARGET_DATE } from "../../utils/constants";

function PreLivePage({ onLoginSuccess }) {
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [error, setError] = useState("");
  const countdown = useCountdown(TARGET_DATE);

  // Handles the submission of the preLiveNotice form.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate if the acknowledgment checkbox is checked
    if (isAcknowledged) {
      onLoginSuccess(); // Call the parent's success handler
    } else {
      setError("You must acknowledge the pre-live preview conditions to proceed.");
    }
  };

  return (
    // Overlay for the modal, covers the entire screen with a semi-transparent dark background.
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] font-sans">
      {/* Modal content container */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100 opacity-100">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Pre-Launch Notice
          <span className="inline-block mx-2 align-[-.2em]">
            <MessageSquareWarning className="h-[1.1em] w-[1.1em] text-ns-gold" />
          </span>
        </h2>
        <p className="my-6 text-white mb-6 text-center">
          <span className="font-extrabold text-ns-light-blue">Suite</span>
          <span className="font-normal text-ns-gold">Preferences™</span> is not live yet, but feel free to stop in. Some links may connect to sandboxed tools or to nothing at all.
        </p>

        {/* Countdown Timer Section */}
        <div className="flex items-center justify-center space-x-3 mb-6 p-4 bg-gray-700 rounded-lg shadow-inner">
          <div className="text-center flex flex-col justify-center">
            <p className="text-lg font-semibold text-white">Going Live in:</p>
            <div className="flex space-x-2 text-xl font-bold text-indigo-300">
              <Clock className="h-8 w-8 text-indigo-400 flex-shrink-0" />
              <span>{countdown.days}D</span>
              <span>{countdown.hours}H</span>
              <span>{countdown.minutes}M</span>
              <span>{countdown.seconds}S</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Acknowledgment Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="acknowledge"
              checked={isAcknowledged}
              onChange={(e) => setIsAcknowledged(e.target.checked)}
              className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 bg-gray-700 border-gray-600 checked:bg-indigo-500"
            />
            <label htmlFor="acknowledge" className="ml-3 block text-base font-medium text-gray-300">
              I understand the site is not live yet.
            </label>
          </div>

          {/* Error message display */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            Enter Site
          </button>
        </form>
      </div>
    </div>
  );
}

export default PreLivePage;
