import Icons from "./Icons.tsx";

// Exporting all the components for easier importing
export { default as Header } from "../components/Header.tsx";
export { default as Footer } from "../components/Footer.tsx";
export { default as ProductCard } from "../components/ProductCard.tsx";
export { default as Img } from "../components/Image.tsx";
export { default as Heading } from "../components/Headingtxt.tsx";
export { default as Input } from "../components/Input.tsx";
export { default as ShopGrid } from "../components/Shopgrid.tsx";
export { default as Button } from "../components/Button.tsx";
export { default as LoadingSkeleton } from "../components/LoadingSkeleton.tsx";
export { default as UsBanner } from "../components/UspBanner.tsx";
export { default as BannerShop } from "../components/BannerShop.tsx";
export { default as FilterSortBar } from "../components/FilterSortBar.tsx";
export { default as Pagination } from "../components/Pagination.tsx";

// I think putting the links here is a good idea, it makes it easier to manage and update as needed
// Header links
export const headerLinks = {
  navLinks: [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ],
  iconLinks: [
    { path: "/profile", icon: Icons.mdiAccountAlertOutline, label: "Profile" },
    { path: "/search", icon: Icons.Search, label: "Search" },
    { path: "/wishlist", icon: Icons.Heart, label: "Wishlist" },
    { path: "/cart", icon: Icons.ShoppingBag, label: "Shopping Cart" },
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
