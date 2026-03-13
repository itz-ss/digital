import About from "@/components/about/About";
import siteData from "@/data/site.json";

export const metadata = {
  title: "About Us",
  description: `Learn about ${siteData.name}, the leading digital marketing agency in ${siteData.city}. Discover our mission, our team, and how we help businesses grow with performance-driven marketing.`,
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
    return (
        <About />
    );
}