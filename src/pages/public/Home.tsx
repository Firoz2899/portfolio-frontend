import Navbar from "@/components/Layout/Navbar";
import Hero from "@/components/Hero/Hero";
import Skills from "@/components/Skills/Skills";
import Projects from "@/components/Projects/Projects";
import Contact from "@/components/Views/Contact/Contact";

const Home = () => {
  return (
    <>
      <Navbar />

      <Hero />

      <Skills />

      <Projects />

      <Contact />
    </>
  );
};

export default Home;