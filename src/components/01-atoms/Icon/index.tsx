import { createElement } from "react";
import { cn } from "@/utils/cn";
import { ICONS } from "./iconsMap";
export const iconSize = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-7 h-7",
  xl: "w-12 h-12",
  xxl: "w-20 h-20",
};

type CustomIconType = keyof typeof ICONS;

interface IIcon {
  icon: CustomIconType;
  className?: string;
  size?: keyof typeof iconSize;
}
export function Icon({ icon, className, size = "md" }: IIcon) {
  return (
    <div className={cn(className)}>
      {createElement(ICONS[icon], {
        className: cn(iconSize[size]),
      })}
    </div>
  );
}
