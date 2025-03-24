import { ProductGrid, PageBanner, FilterSortBar, UspBanner } from "../utils";
import { generateMetadata } from "../components/Meta/MetaTags";
import { useEffect } from "react";

const Homepage = () => {
  useEffect(() => {
    // Apply metadata for this page
    document.title = "Shop | Poke Market";
    const meta = generateMetadata({
      title: "Shop | Poke Market",
      description:
        "Browse and shop for the best Pokemon products at Poke Market",
      type: "website",
    });

    // Apply meta tags
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description ?? "");

    // Add Open Graph tags
    const ogTags = {
      "og:title": meta.openGraph?.title,
      "og:description": meta.openGraph?.description,
      "og:type": meta.openGraph?.type,
      "og:url": meta.openGraph?.url,
      "og:image": meta.openGraph?.images?.[0]?.url,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      if (!content) return;
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    });
  }, []);

  return (
    <>
      <PageBanner title="Shop" />

      <FilterSortBar>
        <ProductGrid />
      </FilterSortBar>
      <UspBanner />
    </>
  );
};

export default Homepage;
