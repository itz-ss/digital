import contactData from "@/data/contact.json";
import siteData from "@/data/site.json";

export function generateLocalBusinessSchema({ location, service }) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `DigitalGram ${location.name}`,
    "image": siteData.logo?.footer || `${siteData.baseUrl}/logo.png`,
    "@id": `${siteData.baseUrl}/${service.id}-services-${location.slug}`,
    "url": `${siteData.baseUrl}/${service.id}-services-${location.slug}`,
    "telephone": contactData.contactInfo.phone.value,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.landmarks[0],
      "addressLocality": location.name,
      "addressRegion": location.state || siteData.state,
      "postalCode": location.pincode,
      "addressCountry": siteData.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "26.4499",
      "longitude": "80.3319"
    }
  };
}

export function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteData.name,
    "url": siteData.baseUrl,
    "logo": `${siteData.baseUrl}/logo/android-chrome-512x512.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": contactData.contactInfo.phone.value,
      "contactType": "customer service",
      "areaServed": siteData.country,
      "availableLanguage": "en"
    },
    "sameAs": contactData.socialLinks.map(link => link.url)
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteData.baseUrl}${item.path}`
    }))
  };
}

export function generateServiceSchema({ service, location }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.label,
    "provider": {
      "@type": "LocalBusiness",
      "name": siteData.name
    },
    "areaServed": {
      "@type": "City",
      "name": location?.name || siteData.city
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${service.label} Services`,
      "itemListElement": service.items?.map(item => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": item
        }
      })) || []
    }
  };
}

export function generateArticleSchema(blog) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt,
    "author": {
      "@type": "Organization",
      "name": siteData.name,
      "url": siteData.baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": siteData.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteData.baseUrl}/logo/android-chrome-512x512.png`
      }
    },
    "datePublished": blog.date,
    "url": `${siteData.baseUrl}/blog/${blog.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteData.baseUrl}/blog/${blog.slug}`
    }
  };
}
