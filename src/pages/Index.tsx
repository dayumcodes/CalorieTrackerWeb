import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
