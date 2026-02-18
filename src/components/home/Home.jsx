import Hero from "./pages/Hero";
import HomeServices from "./pages/HomeServices";
import HowWeWorkTimeline from "./pages/HowWeWork";
import WhoWeWorkWith from "./pages/WhoWeWorkWith";
import Testimonials from "./pages/Testimonials";
import ContactCTA from "./pages/ContactCTA";
import AnimatedBackground from '../backgroundAnimation/AnimatedBackground';
// import "./style/home.css";

export default function Home() {
  return (
    <div>
      <AnimatedBackground />
      <Hero />
      <HomeServices />
      <section className="howWeWork">
        <HowWeWorkTimeline />
      </section>
      <section className="whoWeWorkWith">
        <WhoWeWorkWith />
      </section>
      <Testimonials />
      <section id="contact">
        <ContactCTA />
      </section>

    </div>
  );
}