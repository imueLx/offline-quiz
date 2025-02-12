import React from "react";
import Link from "next/link";
import Image from "next/image";
import PWAInstallPrompt from "./PWAInstallPrompt";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-blue-200">
      {/* Background Images */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-10 w-36 h-36 sm:w-28 sm:h-28 lg:w-40 lg:h-40">
          <Image
            src="/images/nurse-cap.png"
            alt="Nurse Cap"
            fill
            sizes="(max-width: 640px) 112px, (max-width: 1024px) 160px, 144px"
            style={{ objectFit: "contain" }}
            className="opacity-50"
          />
        </div>
        <div className="absolute bottom-5 right-0 w-60 h-60 sm:w-52 sm:h-36 lg:w-72 lg:h-72">
          <Image
            src="/images/nurse-casual.png"
            alt="Nurse Casual"
            fill
            sizes="(max-width: 640px) 208px, (max-width: 1024px) 288px, 240px"
            style={{ objectFit: "contain" }}
            className="opacity-50"
          />
        </div>
        <div className="absolute right-24 bottom-72 transform -translate-x-1/2 top-1/4 w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 sm:top-1/8">
          <Image
            src="/images/stethoscope.png"
            alt="Stethoscope"
            fill
            sizes="(max-width: 640px) 128px, (max-width: 1024px) 144px, 144px"
            style={{ objectFit: "contain" }}
            className="opacity-50"
          />
        </div>
        <div className="absolute left-36 transform -translate-x-1/2 bottom-48 w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 sm:top-3/4">
          <Image
            src="/images/blue-stethoscope.png"
            alt="Blue Stethoscope"
            fill
            sizes="(max-width: 640px) 128px, (max-width: 1024px) 144px, 144px"
            style={{ objectFit: "contain" }}
            className="opacity-75"
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto text-center z-10">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to the Quiz App!
        </h1>
        <p className="mt-3 text-lg text-gray-500 sm:mt-5 sm:text-xl md:mt-5 md:text-2xl">
          Test your knowledge with our quiz. Are you ready?
        </p>
        <div className="mt-5 sm:mt-8 sm:flex justify-center space-y-3 sm:space-y-0 sm:space-x-3">
          <Link
            href="/start-quiz"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            Start Quiz
          </Link>
        </div>
        <PWAInstallPrompt />
      </div>
    </div>
  );
};

export default Hero;
