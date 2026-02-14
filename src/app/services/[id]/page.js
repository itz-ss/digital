import ServiceDetail from "@/components/services/ServiceDetail";

export default async function ServicePage({ params }) {
  const { id } = await params;
  return <ServiceDetail id={id} />;
}
