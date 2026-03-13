import servicesData from "@/data/services.json";
import siteData from "@/data/site.json";
import ServiceDetail from "@/components/services/ServiceDetail";
import { generateBreadcrumbSchema } from "@/utils/schema_markup";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = servicesData.tabs.find(s => s.id === id);
  if (!service) return {};

  return {
    title: `${service.label} Services`,
    description: service.description,
    alternates: {
      canonical: `${siteData.baseUrl}/services/${id}`,
    },
    openGraph: {
      title: `${service.label} Services | ${siteData.name}`,
      description: service.description,
      url: `${siteData.baseUrl}/services/${id}`,
    }
  };
}

export async function generateStaticParams() {
  return servicesData.tabs.map((service) => ({
    id: service.id,
  }));
}

export default async function ServicePage({ params }) {
  const { id } = await params;
  const service = servicesData.tabs.find(s => s.id === id);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service?.label || "Service", path: `/services/${id}` }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServiceDetail id={id} />
    </>
  );
}
