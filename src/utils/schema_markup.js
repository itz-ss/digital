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

/**
 * Geographic SEO Schemas - TIER 1 & 2
 */

export function generateGeoServiceAreaSchema({ locations, services }) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteData.name,
    "url": siteData.baseUrl,
    "image": `${siteData.baseUrl}/logo/android-chrome-512x512.png`,
    "description": `${siteData.name} provides digital marketing services across ${locations.map(l => l.name).join(', ')}`,
    "areaServed": locations.map(location => ({
      "@type": "City",
      "name": location.name,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": location.latitude,
        "longitude": location.longitude
      }
    })),
    "priceRange": "$$$",
    "telephone": contactData.contactInfo.phone.value,
    "email": contactData.contactInfo.email?.value,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kanpur",
      "addressLocality": siteData.city,
      "addressRegion": siteData.state,
      "addressCountry": siteData.country
    },
    "serviceArea": {
      "@type": "City",
      "name": siteData.city,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 26.4499,
        "longitude": 80.3319
      }
    }
  };
}

export function generateMultiLocationSchema(locations) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteData.name,
    "url": siteData.baseUrl,
    "logo": `${siteData.baseUrl}/logo/android-chrome-512x512.png`,
    "foundingDate": "2020-01-01",
    "knowsAbout": [
      "Digital Marketing",
      "SEO",
      "Social Media Marketing",
      "Web Development",
      "Content Creation",
      "Video Editing",
      "Public Relations"
    ],
    "serviceArea": locations.map(location => ({
      "@type": "City",
      "name": location.name,
      "identifier": location.slug
    })),
    "location": locations.slice(0, 10).map(location => ({
      "@type": "Place",
      "name": `${siteData.name} - ${location.name}`,
      "url": `${siteData.baseUrl}/locations/${location.slug}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": location.name,
        "addressRegion": location.state || siteData.state,
        "addressCountry": siteData.country
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": location.latitude || 26.4499,
        "longitude": location.longitude || 80.3319
      }
    }))
  };
}

export function generateServiceAreaSpecializationSchema({ service, tier, locations }) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `${service.label} Services`,
    "provider": {
      "@type": "Organization",
      "name": siteData.name,
      "url": siteData.baseUrl
    },
    "serviceType": service.label,
    "areaServed": locations.map(location => ({
      "@type": "AdministrativeArea",
      "name": location.name,
      "url": `${siteData.baseUrl}/locations/${location.slug}`
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${service.label} in Multiple Locations`,
      "itemListElement": service.items?.map((item, idx) => ({
        "@type": "Offer",
        "position": idx + 1,
        "itemOffered": {
          "@type": "Service",
          "name": item
        }
      })) || []
    }
  };
}

export function generateStateLevelOrganizationSchema(state) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": `${siteData.name} - ${state}`,
    "url": siteData.baseUrl,
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": state,
      "containedInPlace": {
        "@type": "Country",
        "name": siteData.country
      }
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": contactData.contactInfo.phone.value,
      "contactType": "customer service"
    }
  };
}

export function generateInternationalSchema(regions) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteData.name,
    "url": siteData.baseUrl,
    "internationalExpansion": regions.map(region => ({
      "@type": "Place",
      "name": region.name,
      "areaServed": region.countries
    })),
    "globallyServes": {
      "@type": "Place",
      "name": "Global"
    }
  };
}

export function generateLocalBusinessWithRatingsSchema(location) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${siteData.name} - ${location.name}`,
    "image": `${siteData.baseUrl}/logo/android-chrome-512x512.png`,
    "url": `${siteData.baseUrl}/locations/${location.slug}`,
    "telephone": contactData.contactInfo.phone.value,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.landmarks?.[0] || location.name,
      "addressLocality": location.name,
      "addressRegion": location.state || siteData.state,
      "postalCode": location.pincode,
      "addressCountry": siteData.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.latitude,
      "longitude": location.longitude
    },
    "sameAs": contactData.socialLinks?.map(link => link.url) || [],
    "priceRange": "$$$",
    "description": location.description,
    "areaServed": location.vicinity || []
  };
}

export function generateGeoBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.path,
      "geo": item.geo ? {
        "@type": "GeoCoordinates",
        "latitude": item.geo.latitude,
        "longitude": item.geo.longitude
      } : undefined
    })).filter(item => {
      delete item.itemListElement[0].geo;
      return true;
    })
  };
}

/**
 * International & Multi-Region Schemas
 */

export function generateMultiRegionalSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteData.baseUrl}#organization`,
        "name": siteData.name,
        "url": siteData.baseUrl,
        "logo": `${siteData.baseUrl}/logo/android-chrome-512x512.png`,
        "foundingDate": "2020",
        "description": "Global digital marketing and creative agency serving India and international markets",
        "operatingRegion": [
          {
            "@type": "Region",
            "name": "India"
          },
          {
            "@type": "Region",
            "name": "South Asia"
          },
          {
            "@type": "Region",
            "name": "Global"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": `${siteData.baseUrl}#primaryservice`,
        "name": "Digital Marketing Services",
        "provider": {
          "@id": `${siteData.baseUrl}#organization`
        },
        "areaServed": [
          "Kanpur",
          "Uttar Pradesh",
          "India",
          "International"
        ]
      }
    ]
  };
}
