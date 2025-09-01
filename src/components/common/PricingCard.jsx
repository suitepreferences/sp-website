import { CheckCircle, XCircle } from "lucide-react";

function PricingCard({ title, price, period, features, buttonText, buttonClass, isPopular, onClick, originalPrice, badge }) {
  return (
    <div
      className={`w-[70vw] sm:w-full sm:max-w-[300px] lg-1000:w-full lg-1000:max-w-[400px] xl:max-w-[500px] mx-auto p-4 sm:p-4 lg-1000:p-6 xl:p-8 rounded-xl bg-gradient-to-br from-sp-bg-800/30 via-sp-bg-900/20 to-sp-bg-950/30 flex flex-col items-center border border-sp-text-600/30 shadow-inner hover:backdrop-blur-sm transition-all duration-300 h-[500px] sm:h-[500px] lg-1000:h-[550px] xl:h-[600px] ${
        isPopular ? "ring-2 ring-sp-primary-400" : ""
      }`}
    >
      {isPopular && <span className="bg-sp-primary-600 text-sp-white text-xs font-bold px-3 py-1 rounded-full mb-4 -mt-12 shadow-md">Most Popular</span>}

      <h3 className={`text-sp-white text-3xl sm:text-3xl font-bold mb-2 text-center max-w-[280px] ${isPopular ? "mt-2" : ""}`}>{title}</h3>
      <div className="text-sp-primary-400 text-4xl sm:text-5xl font-extrabold mb-2">
        {price}
        <span className="text-sp-text-400 text-lg sm:text-xl font-medium">{period}</span>
      </div>
      {/* Original price displayed below main price */}
      {originalPrice && (
        <div className="text-sp-text-400 text-xl sm:text-2xl font-light mb-4 relative">
          <span className="relative">
            {originalPrice}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-sp-text-400 transform -rotate-12 origin-center"></div>
            </div>
          </span>
        </div>
      )}
      <ul className="text-sp-text-300 text-sm sm:text-lg space-y-3 mb-8 w-full flex-grow">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center ${feature.included ? "text-sp-text-300" : "line-through text-sp-text-400"}`}>
            {feature.included ? <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0 text-sp-success-400" /> : <XCircle className="h-5 w-5 text-sp-error-400 mr-3 flex-shrink-0" />}
            {feature.text}
          </li>
        ))}
      </ul>
      {badge && <div className="mb-6 flex justify-center">{badge}</div>}
      <button
        onClick={onClick}
        className={`w-full py-3 font-semibold rounded-lg shadow-md ${buttonClass} transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75 mt-auto`}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default PricingCard;
