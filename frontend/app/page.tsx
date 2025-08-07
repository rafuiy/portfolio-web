import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Experience from './sections/Experience/Experience';
import Projects from './sections/Projects/Projects';
import Contact from './sections/Contact/Contact';
import Footer from './sections/Footer/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
