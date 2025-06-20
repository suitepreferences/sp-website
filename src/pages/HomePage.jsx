import { Unlock, Key, Lightbulb, Users, Briefcase, Shield, Star, MessageSquare, Sparkles } from "lucide-react";
import ChromeLogo from "../assets/icons/sp_chrome_logo_nobg.png";
import MacScreenAnimation from "../components/animations/MacScreenAnimation";
import FeatureCard from "../components/common/FeatureCard";
import PricingCard from "../components/common/PricingCard";

function HomePage({ onNavigate, showMacAnimationSection }) {
  const handleGetExtensionClick = () => {
    alert("Redirecting to Chrome Web Store to install SuitePreferences!");
  };

  return (
    <div className="space-y-16 py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-20 px-4 rounded-b-3xl shadow-xl">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
            Unlock
            <span className="inline-block mx-2 align-[-.1em]">
              <Unlock className="h-[1.1em] w-[1.1em] text-ns-gold" />
            </span>
            the NetSuite UX with
            <div className="text-ns-gold tracking-tight">
              Suite
              <span className="font-light">
                Preferences<sup className="text-3xl">™</sup>
              </span>
            </div>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up delay-100 tracking-tight">
            Boost Productivity & Comfort with Features like{" "}
            <span className="font-bold text-ns-gold tracking-tighter">
              Suite
              <span className="font-light">
                Glow<sup className="text-xs">™</sup>
              </span>
            </span>{" "}
            Dark Themes and Fonts, Real-time Dashboards by{" "}
            <span className="font-bold text-ns-gold tracking-tighter">
              Portlet<span className="font-light">Refresher</span>
            </span>
            , and More.
          </p>
          <button
            onClick={handleGetExtensionClick}
            className="inline-flex items-center px-4 py-4 bg-white text-ns-med-blue font-bold text-lg rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          >
            <img src={ChromeLogo} alt="Chrome Logo" className="w-10 h-10 mr-3" />
            Get&nbsp;
            <span className="font-extrabold text-ns-med-blue">
              Suite
              <span className="font-normal text-ns-gold">
                Preferences<sup className="text-xs">™</sup>
              </span>
            </span>
            &nbsp;Now
          </button>
        </div>
      </section>

      {/* Mac Animation Section */}
      {showMacAnimationSection && (
        <section className="bg-gray-50 dark:bg-gray-900 py-12 px-4 flex items-center justify-center">
          <div className="w-full max-w-7xl h-[600px]">
            {" "}
            {/* Adjusted height for better visibility of the simulation */}
            <MacScreenAnimation />
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          <span className="inline-flex items-center mr-2 align-[-.1em]">
            <Key className="h-8 w-8 text-ns-med-blue dark:text-ns-light-blue" />
          </span>
          Key Features that Elevate Your NetSuite UX
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Lightbulb className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />}
            title="Intelligent Customization"
            description="Tailor NetSuite's appearance and behavior to perfectly match your preferences and boost productivity."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-purple-600 dark:text-purple-400" />}
            title="Seamless Integration"
            description="Looks and feels native across all NetSuite pages, enhancing your daily tasks."
          />
          <FeatureCard
            icon={<Briefcase className="h-10 w-10 text-green-600 dark:text-green-400" />}
            title="Boost Productivity"
            description="Keep important KPIs fresh with PortletRefresh. No more manual dashboard clicks."
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-red-600 dark:text-red-400" />}
            title="Enhanced Security"
            description="SuitePreferences™ uses the logged in user's email to validate subscriptions and will never store any personal information."
          />
          <FeatureCard
            icon={<Star className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />}
            title="Personalized Experience"
            description="Your chosen preferences are stored in Chrome and will follow you to any device."
          />
          <FeatureCard
            icon={<MessageSquare className="h-10 w-10 text-blue-600 dark:text-blue-400" />}
            title="Intuitive Interface"
            description="Easy to use and feels native, SuitePreferences™ is tucked neatly within NetSuite's 'Set Preferences' page."
          />
        </div>
      </section>

      {/* Products Sold / Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-12 scroll-mt-20">
        {" "}
        {/* Added scroll-mt-20 */}
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          <span className="inline-block mx-2 align-[-.2em]">
            <Sparkles className="h-[1.1em] w-[1.1em] text-ns-gold" />
          </span>
          Choose Your <span className="font-bold tracking-tight text-ns-med-blue dark:text-ns-light-blue">Suite</span>
          <span className="font-light tracking-tighter text-ns-gold">
            Preferences<sup className="text-xl">™</sup>
          </span>{" "}
          Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <PricingCard
            title="Basic"
            price="$0"
            period="/month"
            features={[
              { text: "Portlet Refresher", included: true },
              { text: "Basic SuiteGlow™ Theme", included: true },
              { text: "10+ SuiteGlow™ Themes", included: false },
              { text: "20+ SuiteGlow™ Fonts", included: false },
              { text: "Records XML Viewer Slideout", included: false },
              { text: "New Features⁺⁺", included: false },
            ]}
            buttonText="Get Started Free"
            buttonClass="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            onClick={handleGetExtensionClick}
          />

          {/* Pro Plan */}
          <PricingCard
            title="Personal Pro"
            price="$3.99"
            period="/month"
            isPopular={true}
            features={[
              { text: "Portlet Refresher", included: true },
              { text: "10+ SuiteGlow™ Themes", included: true },
              { text: "20+ SuiteGlow™ Fonts", included: true },
              { text: "Records XML Viewer Slideout", included: true },
              { text: "New Features†", included: true },
              { text: "1 User License", included: true },
            ]}
            buttonText="Get 14-day Free Trial"
            buttonClass="bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => alert("Initiate Pro subscription checkout!")}
          />

          {/* Premium Plan */}
          <PricingCard
            title="Enterprise Pro"
            price="$99.75" // Updated price
            originalPrice="$199.50" // Added original price to show discount
            period="/month"
            features={[
              { text: "Portlet Refresher", included: true },
              { text: "10+ SuiteGlow™ Themes", included: true },
              { text: "20+ SuiteGlow™ Fonts", included: true },
              { text: "Records XML Viewer Slideout", included: true },
              { text: "New Features†", included: true },
              { text: "50+ User Licenses‡", included: true },
            ]}
            buttonText="Get Premium"
            buttonClass="bg-purple-600 text-white hover:bg-purple-700"
            onClick={() => alert("Initiate Premium subscription checkout!")}
          />
        </div>
        <div className="max-w-6xl mx-auto text-center mt-8">
          <p className="text-gray-600 dark:text-gray-300">
            † As new features are added to <span className="font-extrabold text-ns-med-blue dark:text-ns-light-blue">Suite</span>
            <span className="font-normal text-ns-gold">Preferences™</span>, they will be immediately available to you by simply updating the extension.
          </p>
        </div>
        <div className="max-w-6xl mx-auto text-center mt-8">
          <p className="text-gray-600 dark:text-gray-300">
            ‡ The Enterprise Pro plan uses NetSuite account validation. An active subscription allows for up to 50 users within a single NetSuite account to use all{" "}
            <span className="font-extrabold text-ns-med-blue dark:text-ns-light-blue">Suite</span>
            <span className="font-normal text-ns-gold">Preferences™</span> features. NetSuite accounts with over 50 users, please
            <span className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer ml-1" onClick={() => onNavigate("contact")}>
              contact us
            </span>{" "}
            for special pricing.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-indigo-700 text-white py-16 px-4 rounded-t-3xl shadow-xl">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to level up your NetSuite UX?</h2>
          <p className="text-xl mb-8 opacity-90">Join other users who are already enjoying a more personalized NetSuite experience.</p>
          <button
            onClick={handleGetExtensionClick}
            className="inline-flex items-center px-8 py-4 bg-white text-indigo-700 font-bold text-lg rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          >
            <img src={ChromeLogo} alt="Chrome Logo" className="w-10 h-10 mr-3" />
            Start Your Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
