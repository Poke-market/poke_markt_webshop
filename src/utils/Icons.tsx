import { Icon } from "@iconify-icon/react";
import { BsViewList, BsArrowRight } from "react-icons/bs";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { CSSProperties, ComponentType } from "react";

interface IconProps {
  style?: CSSProperties;
}

const createIcon = (IconComponent: string | ComponentType<IconProps>) => {
  return ({ style }: IconProps) => {
    if (typeof IconComponent === "string") {
      return (
        <Icon icon={IconComponent} style={{ fontSize: "24px", ...style }} />
      );
    } else {
      const IconElement = IconComponent;
      return <IconElement style={{ fontSize: "24px", ...style }} />;
    }
  };
};
export const Icons = {
  User: createIcon("tdesign:user"),
  Search: createIcon("iconamoon:search"),
  Wishlist: createIcon("mynaui:heart"),
  ShoppingCart: createIcon("hugeicons:shopping-cart-01"),
  GridIcon: createIcon("ci:grid-big-round"),
  Warranty: createIcon("ph:seal-check-light"),
  Trophy: createIcon("fluent:trophy-32-regular"),
  Delivery: createIcon("icon-park-twotone:delivery"),
  CustomerService: createIcon("bx:support"),
  Share: createIcon("ri:share-fill"),
  ViewList: createIcon(BsViewList),
  KeyBoardArrowDown: createIcon(MdKeyboardArrowDown),
  keyboardArrowUp: createIcon(MdKeyboardArrowUp),
  ArrowRight: createIcon(BsArrowRight),
  XFill: createIcon("flowbite:close-circle-solid"),
  Facebook: createIcon("formkit:facebook"),
  Linkedin: createIcon("mdi:linkedin"),
  XTwitter: createIcon("hugeicons:new-twitter-ellipse"),
  ArrowRightLeft: createIcon("fluent:arrow-swap-20-filled"),
};
