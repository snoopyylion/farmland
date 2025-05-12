import StickerHeader from "@/components/StickerHeader";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import Hws from "@/components/Hws";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Faqs from "@/components/Faqs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BTTbutton from "@/components/BTTbutton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Sticky Header */}
        <StickerHeader />
      {/* Hero Section with Animation */}
        <Hero/>
      {/* Features Section */}
        <FeaturesSection/>
      {/* Testimonials Section */}
        <Testimonials/>
      {/* Pricing Section */}
        <Pricing/>
      {/* How It Works Section */}
        <Hws/>
      {/* CTA Section */}
        <CTA/>
      {/* FAQ Section */}
        <Faqs/>
      {/* Contact Us Section */}
        <Contact/>
      {/* Footer */}
        <Footer/>
      {/* Back to Top Button */}
        <BTTbutton/>
    </div>
  );
}
