import { CheckCircle, XCircle } from "lucide-react";

function PricingCard({ title, price, period, features, buttonText, buttonClass, isPopular, onClick, originalPrice }) {
  return (
    <div
      className={`bg-white p-8 rounded-xl shadow-lg flex flex-col items-center border-2 ${
        isPopular ? "border-indigo-600 dark:border-indigo-400" : "border-gray-100 dark:border-gray-700"
      } transition-all duration-300 hover:shadow-xl hover:scale-105 dark:bg-gray-800 dark:shadow-2xl`}
    >
      {isPopular && <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 -mt-12 shadow-md">Most Popular</span>}
      <h3 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">{title}</h3>
      <div className="text-5xl font-extrabold text-indigo-600 mb-4 dark:text-indigo-400">
        {/* Conditionally render original price with strikethrough if provided */}
        {originalPrice && <span className="text-xl font-light text-gray-500 dark:text-gray-400 line-through mr-2">{originalPrice}</span>}
        {price}
        <span className="text-xl font-medium text-gray-500 dark:text-gray-400">{period}</span>
      </div>
      <ul className="text-gray-700 text-lg space-y-3 mb-8 w-full">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center ${feature.included ? "text-gray-800 dark:text-gray-200" : "text-gray-400 line-through dark:text-gray-500"}`}>
            {feature.included ? (
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 dark:text-green-400" />
            ) : (
              <XCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0 dark:text-red-300" />
            )}
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
