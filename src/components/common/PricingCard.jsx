import { CheckCircle, XCircle } from "lucide-react";

function PricingCard({ title, price, period, features, buttonText, buttonClass, isPopular, onClick, originalPrice }) {
  return (
    <div
      className={`w-full max-w-[600px] mx-auto p-8 rounded-xl bg-gradient-to-br from-purple-900/30 via-gray-900/20 to-black/30 flex flex-col items-center border border-purple-800/30 shadow-inner hover:shadow-[0_0_20px_#D100FF] hover:backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 ${
        isPopular ? "ring-2 ring-indigo-400" : ""
      }`}
    >
      {isPopular && <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 -mt-12 shadow-md">Most Popular</span>}
      <h3 className="text-white text-3xl font-bold mb-2">{title}</h3> {/* Permanent white text */}
      <div className="text-indigo-400 text-5xl font-extrabold mb-4">
        {" "}
        {/* Permanent indigo-400 */}
        {/* Conditionally render original price with strikethrough if provided */}
        {originalPrice && <span className="text-gray-400 text-xl font-light line-through mr-2">{originalPrice}</span>} {/* Permanent gray-400 */}
        {price}
        <span className="text-gray-400 text-xl font-medium">{period}</span> {/* Permanent gray-400 */}
      </div>
      <ul className="text-gray-300 text-lg space-y-3 mb-8 w-full">
        {" "}
        {/* Permanent gray-300 */}
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center ${feature.included ? "text-gray-300" : "line-through text-gray-400"}`}>
            {" "}
            {/* Permanent gray-300/400 */}
            {feature.included ? <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0 text-green-400" /> : <XCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />}{" "}
            {/* Permanent green-400/red-400 */}
            {feature.text}
          </li>
        ))}
      </ul>
      <button
        onClick={onClick}
        className={`w-full py-3 font-semibold rounded-lg shadow-md ${buttonClass} transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75`}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default PricingCard;
