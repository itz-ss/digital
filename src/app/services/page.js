import ServicesGrid from "@/components/services/ServicesGrid";
import siteData from "@/data/site.json";

export const metadata = {
  title: "Our Services",
  description: `Comprehensive digital marketing services by ${siteData.name} in ${siteData.city}. From SEO and PPC to Social Media and Content Strategy, we drive growth for your brand.`,
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesGrid />;
}
