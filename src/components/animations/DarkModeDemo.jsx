import { Lock } from "lucide-react";
import spDemoClip from "../../assets/demos/SP_DarkMode_Demo.mp4";
import ChromeLogo from "../../assets/icons/sp_chrome_logo_nobg.png";

function DarkModeDemo() {
  return (
    <div className="relative w-full h-full flex items-center justify-center font-[Inter]">
      {/* Simulated Mac Outer Frame */}
      <div className="relative w-full max-w-6xl aspect-video bg-gray-700 rounded-xl shadow-2xl flex flex-col p-2 md:p-4">
        {/* Mac Top Bar (Apple-style traffic lights) */}
        <div className="flex justify-between items-center px-3 py-1 bg-gray-800 rounded-t-lg">
          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>
          <div>
            {/* Added 'flex items-center' to this span */}
            <span className="text-gray-300 text-xs flex items-center">
              <img src={ChromeLogo} alt="Chrome Logo" className="w-4 h-4 mr-1" /> {/* Changed mr-3 to mr-1 for better small spacing */}
              Chrome Browser
            </span>
          </div>
          <div></div> {/* For spacing */}
        </div>

        {/* This div now represents the *content area* of the browser, directly within the Mac frame.
            It contains the browser's URL bar and the video itself. */}
        <div className="relative flex-grow rounded-b-lg shadow-xl bg-gray-800 flex flex-col overflow-hidden border border-gray-700">
          {/* Browser URL Bar */}
          <div className="flex items-center p-2 bg-gray-200 border-b border-gray-300">
            <div className="flex space-x-2 mr-4">
              {/* These are the browser's internal back/forward/refresh buttons - kept for realism */}
              <span className="w-3 h-3 rounded-full bg-gray-400"></span>
              <span className="w-3 h-3 rounded-full bg-gray-400"></span>
              <span className="w-3 h-3 rounded-full bg-gray-400"></span>
            </div>
            <div className="flex-grow bg-white rounded-full px-4 py-1 text-sm text-gray-600 flex items-center">
              <Lock className="h-4 w-4 mr-2 text-gray-400" /> {/* Lock icon for HTTPS */}
              https://TSTDRV123.app.netsuite.com/
            </div>
          </div>

          {/* Browser Content Area - Displays the Video */}
          <div className="flex-grow flex items-center justify-center bg-gray-900 p-0 overflow-hidden">
            <video
              src={spDemoClip}
              alt="App Dashboard Demo Video"
              className="w-full h-full object-cover"
              loop
              muted
              autoPlay
              playsInline
              disablePictureInPicture
              onError={(e) => {
                console.error("Failed to load dashboard demo video:", e);
                // You could display a fallback image or message here if the video fails to load
              }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DarkModeDemo;
