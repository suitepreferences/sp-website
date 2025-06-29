import { Unlock, Rocket, Lightbulb, Users, Briefcase, Shield, Star, MessageSquare, Check } from "lucide-react";
import ChromeLogo from "../assets/icons/sp_chrome_logo_nobg.png";
import DarkModeDemo from "../components/animations/DarkModeDemo";
import FeatureCard from "../components/common/FeatureCard";
import PricingCard from "../components/common/PricingCard";
import HoneycombCluster from "../components/animations/HoneycombCluster";

function HomePage({ onNavigate }) {
  const handleGetExtensionClick = () => {
    alert("Redirecting to Chrome Web Store to install SuitePreferences!");
  };

  return (
    <div className="space-y-16 py-0 relative isolate">
      {/* Honeycomb Background */}
      <HoneycombCluster className="pointer-events-none fixed top-0 left-0 w-[800px] opacity-15 z-0" />
      <HoneycombCluster className="pointer-events-none fixed bottom-0 right-0 w-[800px] opacity-20 z-0" />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-purple-300 drop-shadow-[0_0_6px_#D100FF] animate-fade-in-up">
            Unlock
            <span className="inline-block mx-2 align-[-.1em] text-pink-500 drop-shadow-[0_0_6px_#FF00E0]">
              <Unlock className="h-[1.1em] w-[1.1em]" />
            </span>
            the NetSuite UI/UX
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up delay-100 tracking-tight text-purple-100">
            Rest Your Eyes with{" "}
            <span className="font-bold text-pink-400 tracking-tighter">
              Suite
              <span className="font-light">
                Glow<sup className="text-xs">™</sup>
              </span>
            </span>{" "}
            Dark Themes and Fonts, Boost Confidence in your Dashboards with{" "}
            <span className="font-bold text-indigo-300 tracking-tighter">
              Portlet<span className="font-light">Refresher</span>
            </span>
            , and Develop faster with{" "}
            <span className="font-bold text-purple-300 tracking-tighter">
              XML<span className="font-light">RecordSlider</span>
            </span>
            .
          </p>
          <div className="w-full max-w-7xl pb-4">
            <DarkModeDemo />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-0">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold leading-tight mb-6 animate-fade-in-up text-purple-300 drop-shadow-[0_0_6px_#D100FF]">
              Features that
              <span className="inline-block mx-3 align-[-.1em] text-pink-500 drop-shadow-[0_0_6px_#FF00E0]">
                <Rocket className="h-[1.1em] w-[1.1em]" />
              </span>
              Elevate your ERP
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Lightbulb className="h-10 w-10 text-indigo-400 drop-shadow-[0_0_4px_#7f5eff]" />}
              title="Intelligent Customization"
              description="Tailor NetSuite's appearance and behavior to perfectly match your preferences and boost productivity."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-purple-400 drop-shadow-[0_0_4px_#9f00ff]" />}
              title="Seamless Integration"
              description="Looks and feels native across all NetSuite pages, enhancing your daily tasks."
            />
            <FeatureCard
              icon={<Briefcase className="h-10 w-10 text-pink-500 drop-shadow-[0_0_4px_#ff00e0]" />}
              title="Boost Productivity"
              description="Keep important KPIs fresh with PortletRefresh. No more manual dashboard clicks."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-cyan-400 drop-shadow-[0_0_4px_#00ffff]" />}
              title="Enhanced Security"
              description="SuitePreferences™ uses the logged in user's email to validate subscriptions and will never store any personal information."
            />
            <FeatureCard
              icon={<Star className="h-10 w-10 text-yellow-300 drop-shadow-[0_0_4px_#ffff66]" />}
              title="Personalized Experience"
              description="Your chosen preferences are stored in Chrome and will follow you to any device."
            />
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-blue-400 drop-shadow-[0_0_4px_#66ccff]" />}
              title="Intuitive Interface"
              description="Easy to use and feels native, SuitePreferences™ is tucked neatly within NetSuite's 'Set Preferences' page."
            />
          </div>
        </div>
      </section>

      {/* Products Sold / Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-12 scroll-mt-25">
        <h1 className="text-5xl font-extrabold text-center mb-12 animate-fade-in-up text-purple-300 drop-shadow-[0_0_6px_#D100FF]">
          <span className="inline-block mx-2 align-[-.2em] text-pink-400 drop-shadow-[0_0_6px_#FF00E0]">
            <Check className="h-[1.1em] w-[1.1em]" />
          </span>
          Choose a Plan that works for you
        </h1>
        <div className="grid grid-cols-1 pricing-section-1050:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
            buttonClass="bg-gray-700 text-gray-200 hover:bg-gray-600"
            onClick={handleGetExtensionClick}
          />
          <PricingCard
            title="Plus"
            price="$3"
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
          <PricingCard
            title="Enterprise"
            price="$100"
            period="/month‡"
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
          <p className="text-purple-300">
            † As new features are added to <span className="font-extrabold text-indigo-300">Suite</span>
            <span className="font-normal text-pink-400">Preferences™</span>, they will be immediately available to you by simply updating the extension.
          </p>
        </div>
        <div className="max-w-6xl mx-auto text-center mt-8">
          <p className="text-purple-300">
            ‡ The Enterprise Pro plan uses NetSuite account validation. An active subscription allows for up to 50 users within a single NetSuite account to use all{" "}
            <span className="font-extrabold text-indigo-300">Suite</span>
            <span className="font-normal text-pink-400">Preferences™</span> features. NetSuite accounts with over 50 users, please
            <span className="font-medium text-indigo-400 hover:underline cursor-pointer ml-1" onClick={() => onNavigate("contact")}>
              contact us
            </span>{" "}
            for special pricing.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-br from-black to-purple-900 text-white py-16 px-4 shadow-xl">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6 drop-shadow-[0_0_4px_#D100FF]">Ready to level up your NetSuite UX?</h2>
          <p className="text-xl mb-8 opacity-90 text-purple-100">Join other users who are already enjoying a more personalized NetSuite experience.</p>
          <button
            onClick={handleGetExtensionClick}
            className="inline-flex items-center px-6 py-4 bg-white text-indigo-700 font-bold text-lg rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
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
