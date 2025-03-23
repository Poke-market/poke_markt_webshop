import { Breadcrumb, Related, Loading, ProductInfo } from "../utils";
import { useParams } from "react-router-dom";
import { useGetItemsQuery, useGetItemBySlugQuery } from "../store/pokemartApi";
import ProductNotFound from "../components/detailpage/ProductNotFound";
import { useMemo, useEffect } from "react";
import { getRandomItems } from "../utils/arrayUtils";
import { generateMetadata } from "../components/Meta/MetaTags";
import { titleCase } from "../utils/stringUtils";

const DetailPage = () => {
  const { slug } = useParams();
  const { data: Item, isLoading: loading } = useGetItemBySlugQuery(slug ?? "", {
    skip: !slug,
  });

  const { data: countData } = useGetItemsQuery({
    page: 1,
    limit: 1,
  });

  const { data: allProductsData } = useGetItemsQuery(
    {
      page: 1,
      limit: countData?.info.count ?? 1,
    },
    {
      skip: !countData?.info.count,
    },
  );

  const randomProducts = useMemo(() => {
    if (!allProductsData?.items) return [];
    return getRandomItems(allProductsData.items, 5);
  }, [allProductsData?.items]);

  useEffect(() => {
    if (!Item) return;
    const upperCaseTitle = titleCase(Item.name);
    const metaDescription = `Check out ${upperCaseTitle} at Poke Market`;
    // Apply metadata for this product page
    document.title = `${upperCaseTitle} | Poke Market`;
    const meta = generateMetadata({
      title: `${upperCaseTitle} | Poke Market`,
      description: metaDescription,
      image: Item.photoUrl || "/og-image.jpg",
      type: "product",
      url: window.location.href,
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
  }, [Item]);

  if (loading) {
    return <Loading />;
  }

  if (!Item) {
    return (
      <ProductNotFound name={slug ?? ""} availableProducts={randomProducts} />
    );
  }

  return (
    <>
      <Breadcrumb />
      <ProductInfo product={Item} />
      <Related />
    </>
  );
};

export default DetailPage;
