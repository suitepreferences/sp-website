// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 dark:bg-gray-800 dark:shadow-2xl">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

export default FeatureCard;
