import Work from "@/components/work/Work";
import siteData from "@/data/site.json";

export const metadata = {
  title: "Our Work",
  description: `Explore ${siteData.name}’s portfolio. See how we help businesses in ${siteData.city} and beyond achieve growth through SEO, Social Media, and Performance Marketing.`,
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
    return (
        <Work />
    );
}