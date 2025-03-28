import { Icon } from "@iconify-icon/react";
import { ComponentProps, CSSProperties } from "react";

type Props = {
  style?: CSSProperties;
} & Omit<ComponentProps<typeof Icon>, "style" | "icon">;

const createIcon = (iconName: string) => {
  return ({ style, ...rest }: Props) => (
    <Icon icon={iconName} style={{ fontSize: "24px", ...style }} {...rest} />
  );
};

const Icons = {
  User: createIcon("tdesign:user"),
  Search: createIcon("iconamoon:search"),
  Wishlist: createIcon("ant-design:heart-outlined"),
  ShoppingCart: createIcon("hugeicons:shopping-cart-01"),
  GridIcon: createIcon("ci:grid-big-round"),
  Warranty: createIcon("ph:seal-check-light"),
  Trophy: createIcon("mdi-light:trophy"),
  Delivery: createIcon("material-symbols-light:delivery-truck-speed-outline"),
  CustomerService: createIcon("ph:headset-light"),
  Share: createIcon("material-symbols:share"),
  ViewList: createIcon("bi:view-list"),
  XFill: createIcon("flowbite:close-circle-solid"),
  Facebook: createIcon("formkit:facebook"),
  Linkedin: createIcon("mdi:linkedin"),
  XTwitter: createIcon("hugeicons:new-twitter-ellipse"),
  ArrowRightLeft: createIcon("fluent:arrow-swap-20-filled"),
  Settings: createIcon("mingcute:settings-2-line"),
  Bagx: createIcon("bi:bag-x"),
  Star: createIcon("jam:star-f"),
  HalfStar: createIcon("la:star-half"),
  Likeheart: createIcon("ph:heart-bold"),
  LikeheartFilled: createIcon("ph:heart-fill"),
  Delete: createIcon("ant-design:delete-filled"),
  Location: createIcon("carbon:location-filled"),
  Phone: createIcon("bxs:phone"),
  Clock: createIcon("bi:clock-fill"),
  ArrowRight: createIcon("bi:arrow-right"),
  Arrowupsmall: createIcon("ri:arrow-up-s-line"),
  Arrowdownsmall: createIcon("ri:arrow-down-s-line"),
  Arrowrightsmall: createIcon("weui:arrow-filled"),
  Filtering: createIcon("system-uicons:filtering"),
  Unlike: createIcon("icon-park-outline:unlike"),
  Plus: createIcon("bi:plus"),
  Minus: createIcon("bi:dash"),
  Help: createIcon("material-symbols-light:help-outline"),
  Profile: createIcon("mingcute:user-4-fill"),
  Innovation: createIcon("lets-icons:atom-light"),
};

export default Icons;
export { Icons };
