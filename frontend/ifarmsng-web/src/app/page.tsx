import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import Approach from "@/components/Approach";
import Why from "@/components/Why";
import Impact from "@/components/Impact";
import Partnership from "@/components/Partnership";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Intro />
        <Services />
        <Approach />
        <Why />
        <Impact />
        <Partnership />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
