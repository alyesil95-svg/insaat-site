import Navbar from "./components/Navbar";
import ScrollManager from "./components/ScrollManager";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Stats from "./components/Stats";
import References from "./components/References";
import WhyUs from "./components/WhyUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AIAssistant from "./components/AIAssistant";

export default function Home() {
  return (
    <main className="relative overflow-x-clip bg-white">
      <ScrollManager />
      <Navbar />
      <Hero />
      <Projects />
      <Services />
      <Stats />
      <References />
      <WhyUs />
      <Contact />
      <Footer />
      <AIAssistant />
    </main>
  );
}
