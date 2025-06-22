// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-purple-900/30 via-gray-900/20 to-black/30 hover:shadow-[0_0_20px_#D100FF] hover:backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 shadow-inner border border-purple-800/30">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-indigo-300 drop-shadow-[0_0_4px_#D100FF] tracking-tight">{title}</h3>
      <p className="text-purple-100 opacity-80">{description}</p>
    </div>
  );
}

export default FeatureCard;
