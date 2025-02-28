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
import { PiCirclesFourFill } from "react-icons/pi";

const iconSizeSmall = 10;
const iconSize = 35;
const iconStyle = { color: "black" };
const iconStyleWhite = { color: "white" };

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
  PiCirclesFourFill,
};

const Icons = Object.fromEntries(
  Object.entries(iconComponents).map(([key, IconComponent]) => [
    key,
    ({ size = iconSize, style = iconStyle }) => (
      <IconComponent size={size} style={style} />
    ),
  ]),
);

Icons.IconifyIcon = ({ size = iconSize, style = iconStyle }) => (
  <IconifyIcon
    icon="mdi:account-alert-outline"
    style={style}
    width={size}
    height={size}
  />
);
Icons.mdiAccountAlertOutline = ({ size = iconSize, style = iconStyle }) => (
  <Icon path={mdiAccountAlertOutline} size={size / 22} style={style} />
);
Icons.IoShareSocial = (
  <IoShareSocial size={iconSizeSmall} style={iconStyleWhite} />
);
Icons.ArrowRightLeft = (
  <ArrowRightLeft size={iconSizeSmall} style={iconStyleWhite} />
);
Icons.ciHeart = <CiHeart size={iconSizeSmall} style={iconStyleWhite} />;

const filterSortBarIconSize = 15;

const filterSortBarIcons = {
  RxMixerHorizontal: ({ size = filterSortBarIconSize, style = {} }) => (
    <RxMixerHorizontal size={size} style={style} />
  ),
  PiCirclesFourFill: ({ size = filterSortBarIconSize, style = {} }) => (
    <PiCirclesFourFill size={size} style={style} />
  ),
  BsViewList: ({ size = filterSortBarIconSize, style = {} }) => (
    <BsViewList size={size} style={style} />
  ),
};

Object.assign(Icons, filterSortBarIcons);

export default Icons;
