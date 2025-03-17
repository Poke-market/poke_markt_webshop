import { Icons } from "../utils/Icons.tsx";

// Header links
const headerLinks = {
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
const footerLinks = {
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

export { headerLinks, footerLinks };
