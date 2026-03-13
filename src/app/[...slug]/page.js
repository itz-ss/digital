import { notFound } from "next/navigation";
import servicesData from "@/data/services.json";
import locationsData from "@/data/locations.json";
import industriesData from "@/data/industries.json";
import blogsData from "@/data/blogs.json";
import seoData from "@/data/seo.json";
import DynamicPSEOPage from "@/components/pseo/DynamicPSEOPage";
import BlogTemplate from "@/components/blog/BlogTemplate";
import LegalTemplate from "@/components/legal/LegalTemplate";
import FAQTemplate from "@/components/faq/FAQTemplate";
import legalData from "@/data/legal.json";
import { 
  generateLocalBusinessSchema, 
  generateFAQSchema, 
  generateBreadcrumbSchema, 
  generateServiceSchema,
  generateArticleSchema
} from "@/utils/schema_markup";
import faqsData from "@/data/faqs.json";
import siteData from "@/data/site.json";

export async function generateStaticParams() {
  const paths = [];

  // 1. Blog Paths
  blogsData.blogs.forEach(blog => {
    paths.push({ slug: ["blog", blog.slug] });
  });

  // 2. Service-Location Paths
  servicesData.tabs.forEach(service => {
    locationsData.target_areas.forEach(location => {
      paths.push({ slug: [`${service.id}-services-${location.slug}`] });
    });
  });

  // 3. Service-Industry Paths
  servicesData.tabs.forEach(service => {
    industriesData.industries.forEach(industry => {
      paths.push({ slug: [`${service.id}-for-${industry.slug}`] });
    });
  });

  // 4. National Service Paths
  servicesData.tabs.forEach(service => {
    paths.push({ slug: [`best-${service.id}-agency-in-india`] });
  });

  // 5. Legal & FAQ Paths
  paths.push({ slug: ["privacy-policy"] });
  paths.push({ slug: ["terms"] });
  paths.push({ slug: ["faq"] });

  return paths;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const path = slug.join("/");
  // ... rest of metadata logic

  // Handle Blog
  if (slug[0] === "blog" && slug[1]) {
    const blog = blogsData.blogs.find(b => b.slug === slug[1]);
    if (blog) {
      return {
        title: blog.title,
        description: blog.excerpt,
        alternates: {
          canonical: `${siteData.baseUrl}/${path}`,
        },
        openGraph: {
          title: blog.title,
          description: blog.excerpt,
          url: `${siteData.baseUrl}/${path}`,
          type: 'article',
          publishedTime: blog.date,
          authors: [blog.author],
        }
      };
    }
  }

  // Handle Service-Location Pattern: {service}-services-{location}
  const slMatch = path.match(/^(.+)-services-(.+)$/);
  if (slMatch) {
    const serviceSlug = slMatch[1];
    const locationSlug = slMatch[2];
    const service = servicesData.tabs.find(s => s.id === serviceSlug);
    const location = locationsData.target_areas.find(l => l.slug === locationSlug);
    
    if (service && location) {
      const template = seoData.templates.service_location;
      const title = template.title.replace(/{service}/g, service.label).replace(/{location}/g, location.name);
      const description = template.description.replace(/{service}/g, service.label).replace(/{location}/g, location.name);
      
      return {
        title,
        description,
        alternates: {
          canonical: `${siteData.baseUrl}/${path}`,
        },
        openGraph: {
          title,
          description,
          url: `${siteData.baseUrl}/${path}`,
          images: [`/service/${service.id}.jpg`],
        }
      };
    }
  }

  // Handle Service-Industry Pattern: {service}-for-{industry}
  const siMatch = path.match(/^(.+)-for-(.+)$/);
  if (siMatch) {
    const serviceSlug = siMatch[1];
    const industrySlug = siMatch[2];
    const service = servicesData.tabs.find(s => s.id === serviceSlug);
    const industry = industriesData.industries.find(i => i.slug === industrySlug);

    if (service && industry) {
      const template = seoData.templates.service_industry;
      const title = template.title.replace(/{service}/g, service.label).replace(/{industry}/g, industry.name);
      const description = template.description.replace(/{service}/g, service.label).replace(/{industry}/g, industry.name);
      
      return {
        title,
        description,
        alternates: {
          canonical: `${siteData.baseUrl}/${path}`,
        }
      };
    }
  }

  // Handle National India Pattern: best-{service}-agency-in-india
  const nationalMatch = path.match(/^best-(.+)-agency-in-india$/);
  if (nationalMatch) {
    const serviceSlug = nationalMatch[1];
    const service = servicesData.tabs.find(s => s.id === serviceSlug);
    if (service) {
      const template = seoData.templates.service_india;
      return {
        title: template.title.replace(/{service}/g, service.label),
        description: template.description.replace(/{service}/g, service.label)
      };
    }
  }

  return seoData.default;
}

export default async function Page({ params }) {
  const { slug } = await params;
  const path = slug.join("/");

  // 1. Blog Pages
  if (slug[0] === "blog" && slug[1]) {
    const blog = blogsData.blogs.find(b => b.slug === slug[1]);
    if (!blog) notFound();

    const schemas = [
      generateArticleSchema(blog),
      generateBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: blog.title, path: `/blog/${blog.slug}` }
      ])
    ];

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
        <BlogTemplate blog={blog} />
      </>
    );
  }

  // 1.1 Legal Pages
  if (slug.length === 1) {
    if (slug[0] === "privacy-policy" || slug[0] === "terms") {
      const data = slug[0] === "privacy-policy" ? legalData["privacy-policy"] : legalData["terms"];
      return <LegalTemplate data={data} />;
    }
    if (slug[0] === "faq") {
      return <FAQTemplate faqs={faqsData} />;
    }
  }

  // 2. Service-Location Pages
  const slMatch = path.match(/^(.+)-services-(.+)$/);
  if (slMatch) {
    const service = servicesData.tabs.find(s => s.id === slMatch[1]);
    const location = locationsData.target_areas.find(l => l.slug === slMatch[2]);
    if (service && location) {
      const schemas = [
        generateLocalBusinessSchema({ location, service }),
        generateFAQSchema([...(faqsData.services[service.id] || []), ...faqsData.general].slice(0, 4)),
        generateBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: service.label, path: `/services/${service.id}` },
          { name: location.name, path: `/${path}` }
        ]),
        generateServiceSchema({ service, location })
      ];

      return (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
          />
          <DynamicPSEOPage type="service-location" data={{ service, location }} />
        </>
      );
    }
  }

  // 3. Service-Industry Pages
  const siMatch = path.match(/^(.+)-for-(.+)$/);
  if (siMatch) {
    const service = servicesData.tabs.find(s => s.id === siMatch[1]);
    const industry = industriesData.industries.find(i => i.slug === siMatch[2]);
    if (service && industry) {
      return <DynamicPSEOPage type="service-industry" data={{ service, industry }} />;
    }
  }

  // 4. National India Pages
  const nationalMatch = path.match(/^best-(.+)-agency-in-india$/);
  if (nationalMatch) {
    const service = servicesData.tabs.find(s => s.id === nationalMatch[1]);
    if (service) {
      return <DynamicPSEOPage type="national" data={{ service }} />;
    }
  }

  notFound();
}
