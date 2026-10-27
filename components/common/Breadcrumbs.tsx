import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { getCanonicalUrl } from "@/lib/config/site";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  includeHome?: boolean;
  className?: string;
}

export function Breadcrumbs({
  items,
  includeHome = true,
  className = "",
}: BreadcrumbsProps) {
  const fullItems: BreadcrumbItem[] = includeHome
    ? [{ label: "Home", href: "/" }, ...items]
    : items;

  // Generate Schema.org BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullItems.map((item, index) => {
      const element: {
        "@type": string;
        position: number;
        name: string;
        item?: string;
      } = {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
      };

      if (item.href) {
        element.item = getCanonicalUrl(item.href);
      }

      return element;
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`w-full overflow-x-auto scrollbar-none py-2 text-xs md:text-sm text-neutral-400 ${className}`}
      >
        <ol className="flex items-center space-x-1.5 md:space-x-2 whitespace-nowrap">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;

            return (
              <li key={`${item.label}-${index}`} className="inline-flex items-center">
                {index > 0 && (
                  <ChevronRight
                    className="w-3.5 h-3.5 mx-1 text-neutral-600 flex-shrink-0"
                    aria-hidden="true"
                  />
                )}
                {isLast || !item.href ? (
                  <span
                    aria-current="page"
                    className="text-white font-medium truncate max-w-[200px] md:max-w-none"
                  >
                    {index === 0 && item.label === "Home" ? (
                      <span className="inline-flex items-center gap-1">
                        <Home className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Home</span>
                      </span>
                    ) : (
                      item.label
                    )}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    {index === 0 && item.label === "Home" ? (
                      <>
                        <Home className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Home</span>
                      </>
                    ) : (
                      item.label
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumbs;
