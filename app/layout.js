import { Raleway } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import RegisterSW from "./regiter-sw";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL("https://example.com"),
  title: "Quiz App",
  description: "Test your knowledge with our quiz app!",
  category: "website",
  generator: "Next.js",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Quiz App",
  },
  icons: [
    { rel: "apple-touch-icon", url: "apple-icon.png" },
    { rel: "icon", url: "icon.png" },
  ],
  openGraph: {
    type: "website",
    siteName: "Quiz App",
    title: {
      default: "Quiz App",
      template: "%s | Quiz App",
    },
    description: "Test your knowledge with our quiz app!",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={raleway.className}>
        <meta name="apple-mobile-web-app-title" content="QuizApp" />

        <div className="bg-images">
          <div className="bg-image bg-image-nurse-cap">
            <Image
              src="/images/nurse-cap.png"
              alt="Nurse Cap"
              fill
              sizes="(max-width: 640px) 128px, (max-width: 1024px) 144px, 144px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="bg-image bg-image-nurse-casual">
            <Image
              src="/images/nurse-casual.png"
              alt="Nurse Casual"
              fill
              sizes="(max-width: 640px) 128px, (max-width: 1024px) 144px, 144px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="bg-image bg-image-stethoscope">
            <Image
              src="/images/stethoscope.png"
              alt="Stethoscope"
              fill
              sizes="(max-width: 640px) 128px, (max-width: 1024px) 144px, 144px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="bg-image bg-image-blue-stethoscope">
            <Image
              src="/images/blue-stethoscope.png"
              alt="Blue Stethoscope"
              fill
              sizes="(max-width: 640px) 128px, (max-width: 1024px) 144px, 144px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
