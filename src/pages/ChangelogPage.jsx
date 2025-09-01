import { useState } from "react";
import { Calendar, Tag, Plus, Bug, Zap, Shield, ChevronDown, ChevronUp } from "lucide-react";
import changelogData from "../extension-changelog.json";

// Icon mapping for change types
const getChangeIcon = (type) => {
  switch (type) {
    case "feature":
      return <Plus className="h-4 w-4 text-sp-success-400" />;
    case "fix":
      return <Bug className="h-4 w-4 text-sp-error-400" />;
    case "improvement":
      return <Zap className="h-4 w-4 text-sp-primary-400" />;
    case "security":
      return <Shield className="h-4 w-4 text-sp-secondary-600" />;
    default:
      return <Tag className="h-4 w-4 text-sp-text-400" />;
  }
};

// Color mapping for change types
const getChangeColor = (type) => {
  switch (type) {
    case "feature":
      return "border-l-sp-success-400 bg-sp-success-400/5";
    case "fix":
      return "border-l-sp-error-400 bg-sp-error-400/5";
    case "improvement":
      return "border-l-sp-primary-400 bg-sp-primary-400/5";
    case "security":
      return "border-l-sp-secondary-600 bg-sp-secondary-600/5";
    default:
      return "border-l-sp-text-400 bg-sp-text-400/5";
  }
};

// Version type styling
const getVersionTypeStyle = (type) => {
  switch (type) {
    case "major":
      return "bg-sp-primary-600 text-sp-white";
    case "minor":
      return "bg-sp-secondary-600 text-sp-white";
    case "patch":
      return "bg-sp-text-600 text-sp-white";
    default:
      return "bg-sp-text-500 text-sp-white";
  }
};

function ChangelogPage() {
  const [expandedVersions, setExpandedVersions] = useState(new Set([0])); // First version expanded by default

  const toggleVersion = (index) => {
    const newExpanded = new Set(expandedVersions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedVersions(newExpanded);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-sp-bg-950 text-sp-text-200">
      {/* Header Section */}
      <div className="bg-sp-bg-900 border-b border-sp-bg-700 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-sp-white mb-2">Changelog</h1>
              <p className="text-sp-text-300">Latest updates and improvements</p>
            </div>
            {/* Current Version Badge */}
            <div className="inline-flex items-center bg-sp-primary-600 text-sp-white px-4 py-2 rounded-full text-sm font-semibold">
              <Tag className="h-4 w-4 mr-2" />v{changelogData[0].version}
            </div>
          </div>
        </div>
      </div>

      {/* Changelog Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8">
          {changelogData.map((release, index) => (
            <div key={release.version} className="bg-sp-bg-800 border border-sp-bg-700 rounded-xl overflow-hidden shadow-lg">
              {/* Version Header */}
              <div className="p-6 cursor-pointer hover:bg-sp-bg-700 transition-colors duration-200" onClick={() => toggleVersion(index)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getVersionTypeStyle(release.type)}`}>{release.type.toUpperCase()}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-sp-white">v{release.version}</h2>
                      <div className="flex items-center text-sp-text-400 mt-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(release.date)}
                      </div>
                    </div>
                  </div>
                  <div className="text-sp-text-400">{expandedVersions.has(index) ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}</div>
                </div>
              </div>

              {/* Version Changes */}
              {expandedVersions.has(index) && (
                <div className="px-6 pb-6 border-t border-sp-bg-700">
                  <div className="space-y-4 mt-6">
                    {release.changes.map((change, changeIndex) => (
                      <div key={changeIndex} className={`border-l-4 pl-4 py-3 rounded-r-lg ${getChangeColor(change.type)}`}>
                        <div className="flex items-start space-x-3">
                          {getChangeIcon(change.type)}
                          <div className="flex-1">
                            <h3 className="font-semibold text-sp-text-100 mb-1">{change.title}</h3>
                            <p className="text-sp-text-300 text-sm">{change.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChangelogPage;
