import { View, Text } from "react-native";
import React from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { icons } from "../constants";
interface SvgComponentProps {
  props: any;
  icon: any;
}

const SvgComponent = ({ ...props }: SvgComponentProps) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" className="h-10 w-10">
      <Path d="M16.993 6.667H3.227l6.883 6.883 6.883-6.883z" fill="#000" />
    </Svg>
  );
};

export default SvgComponent;
