import { Icon } from "@iconify-icon/react";
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
};
