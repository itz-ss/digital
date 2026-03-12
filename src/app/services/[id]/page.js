import servicesData from "@/data/services.json";
import ServiceDetail from "@/components/services/ServiceDetail";

export async function generateStaticParams() {
  return servicesData.tabs.map((service) => ({
    id: service.id,
  }));
}

export default async function ServicePage({ params }) {
  const { id } = await params;
  return <ServiceDetail id={id} />;
}
