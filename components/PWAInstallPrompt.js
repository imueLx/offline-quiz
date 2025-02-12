"use client";

import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [manualInstall, setManualInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log("✅ Before Install Prompt fired!");
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    if (!window.hasOwnProperty("BeforeInstallPromptEvent")) {
      console.log(
        "❌ beforeinstallprompt not supported, showing manual option."
      );
      setManualInstall(true);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) {
      console.log("❌ No install prompt available.");
      return;
    }
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      console.log(
        choiceResult.outcome === "accepted"
          ? "🎉 User accepted the PWA install."
          : "❌ User dismissed the PWA install."
      );
      setDeferredPrompt(null);
      setIsVisible(false);
    });
  };

  return (
    <div className="mt-6 flex justify-center">
      {isVisible && (
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-all duration-300 
            text-sm sm:text-lg font-semibold sm:font-bold sm:rounded-xl"
        >
          <FaDownload className="text-lg sm:text-2xl" />
          Install App
        </button>
      )}

      {/* Manual Install Guide for Unsupported Browsers */}
      {manualInstall && (
        <p className="text-gray-500 text-sm mt-2">
          📌 To install manually, use "Add to Home Screen" in your browser menu.
        </p>
      )}
    </div>
  );
};

export default PWAInstallPrompt;
