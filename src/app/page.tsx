import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import Script from "next/script";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Gujarat Ghee Product",
    "image": "https://gujaratgheeproduct.com/images/hero-jar.png",
    "description": "Pure Bilona Ghee from Gir Cow Milk. Hand-churned, authentic, and pure.",
    "brand": {
      "@type": "Brand",
      "name": "Gujarat Ghee Product"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "url": "https://wa.me/917874779437"
    }
  };

  return (
    <main className="min-h-screen bg-cream selection:bg-clay-red selection:text-cream pb-16 md:pb-0">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <Story />
      <Features />
      <Footer />
      <StickyCTA />
    </main>
  );
}
