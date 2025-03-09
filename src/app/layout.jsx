import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CategoriesBar from "@/components/categoriesBar";
import { Suspense } from "react";
import { fetchCategories } from "@/lib/data";
import Script from "next/script";

export const metadata = {
  title: "Shutter",
  description:
    "Shutter is a photography blog that shares my photography experiences.",
};

async function CategoriesContainer() {
  const categories = await fetchCategories({ category: "" });
  return <CategoriesBar categories={categories} />;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EJ8KB4YL6D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EJ8KB4YL6D');
          `}
        </Script>
      </head>
      <body
        className={`mx-auto flex min-h-screen max-w-7xl flex-col bg-gray-50 font-mono dark:bg-gray-900 dark:text-white`}
      >
        {/* <Header /> */}
        <Suspense fallback={<div>Loading...</div>}>
          <CategoriesContainer />
        </Suspense>
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
