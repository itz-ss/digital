import Work from "@/components/work/Work";
import siteData from "@/data/site.json";

export const metadata = {
  title: "Our Work",
  description: `Explore the portfolio of ${siteData.name}. See how we've helped businesses in ${siteData.city} and beyond achieve massive growth through SEO, Social Media, and Performance Marketing.`,
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
    return (
        <Work />
    );
}