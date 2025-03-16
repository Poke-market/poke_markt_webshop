import { Icons } from "./Icons.tsx";

// Exporting all the components for easier importing
export { default as Header } from "../components/common/Header.tsx";
export { default as Footer } from "../components/common/Footer.tsx";
export { default as ProductCard } from "../components/home/ProductCard.tsx";
export { default as Img } from "../components/common/Image.tsx";
export { default as Heading } from "../components/common/Headingtxt.tsx";
export { default as Input } from "../components/common/Input.tsx";
export { default as ShopGrid } from "../components/home/Shopgrid.tsx";
export { default as Button } from "../components/common/Button.tsx";
export { default as LoadingSkeleton } from "../components/common/LoadingSkeleton.tsx";
export { default as UspBanner } from "../components/common/UspBanner.tsx";
export { default as BannerShop } from "../components/common/BannerShop.tsx";
export { default as FilterSortBar } from "../components/filters/FilterSortBar.tsx";
export { default as Pagination } from "../components/common/Pagination.tsx";
export { default as Breadcrumb } from "../components/common/Breadcrumb.tsx";
export { default as Icons } from "./Icons.tsx";
export { default as Related } from "../components/detailpage/RelatedProducts.tsx";
export * from "./helperFunctions.ts";

// Header links
export const headerLinks = {
  navLinks: [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ],
  iconLinks: [
    { path: "/profile", icon: Icons.User, label: "Profile" },
    { path: "/search", icon: Icons.Search, label: "Search" },
    { path: "/wishlist", icon: Icons.Wishlist, label: "Wishlist" },
    { path: "/cart", icon: Icons.ShoppingCart, label: "Shopping Cart" },
  ],
};

// Footer links
export const footerLinks = {
  mainLinks: [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ],
  helpLinks: [
    { path: "/payment", label: "Payment Options" },
    { path: "/returns", label: "Returns" },
    { path: "/privacy", label: "Privacy Policies" },
  ],
};
