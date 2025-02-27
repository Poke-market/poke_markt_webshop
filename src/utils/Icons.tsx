import { Icon as IconifyIcon } from "@iconify/react";
import { BsViewList, BsBagX, BsArrowRight } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { IoShareSocial } from "react-icons/io5";
import { HiMiniXCircle } from "react-icons/hi2";
import { FaStar, FaStarHalf, FaCalendar, FaTag } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import {
  Search,
  Heart,
  SettingsHorizontal,
  ArrowRightLeft,
  FacebookFill,
  XFill,
  LinkedinBoxFill,
  ShoppingBag,
} from "akar-icons";
import Icon from "@mdi/react";
import { mdiAccountAlertOutline } from "@mdi/js";
import { RxMixerHorizontal } from "react-icons/rx";

const iconSize = 35;
const iconStyle = { color: "black" };

const iconComponents = {
  BsViewList,
  CiHeart,
  IoShareSocial,
  BsBagX,
  HiMiniXCircle,
  FaStar,
  FaStarHalf,
  MdOutlineKeyboardArrowRight,
  BsArrowRight,
  FaCalendar,
  FaTag,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  Search,
  Heart,
  SettingsHorizontal,
  ArrowRightLeft,
  FacebookFill,
  XFill,
  LinkedinBoxFill,
  ShoppingBag,
  RxMixerHorizontal,
};

const Icons = Object.fromEntries(
  Object.entries(iconComponents).map(([key, IconComponent]) => [
    key,
    <IconComponent size={iconSize} style={iconStyle} />,
  ]),
);

Icons.IconifyIcon = (
  <IconifyIcon
    icon="mdi:account-alert-outline"
    style={iconStyle}
    width={iconSize}
    height={iconSize}
  />
);
Icons.mdiAccountAlertOutline = (
  <Icon path={mdiAccountAlertOutline} size={iconSize / 22} style={iconStyle} />
);

export default Icons;
