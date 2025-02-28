import { Icon } from "@iconify-icon/react";
import { CSSProperties } from "react";
interface Props {
  style?: CSSProperties;
}
const createIcon = (iconName: string) => {
  return ({ style }: Props) => (
    <Icon icon={iconName} style={{ fontSize: "24px", ...style }} />
  );
};
export const Icons = {
  User: createIcon("tdesign:user"),
  Search: createIcon("iconamoon:search"),
  Wishlist: createIcon("ant-design:heart-outlined"),
  ShoppingCart: createIcon("hugeicons:shopping-cart-01"),
  GridIcon: createIcon("ci:grid-big-round"),
  Warranty: createIcon("ph:seal-check-light"),
  Trophy: createIcon("fluent:trophy-32-regular"),
  Delivery: createIcon("icon-park-twotone:delivery"),
  CustomerService: createIcon("bx:support"),
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
  Likeheart: createIcon("ph:heart-light"),
  Delete: createIcon("ant-design:delete-filled"),
  Location: createIcon("carbon:location-filled"),
  Phone: createIcon("bxs:phone"),
  Clock: createIcon("bi:clock-fill"),
  ArrowRight: createIcon("bi:arrow-right"),
  Arrowupsmall: createIcon("ri:arrow-up-s-line"),
  Arrowdownsmall: createIcon("ri:arrow-down-s-line"),
};
