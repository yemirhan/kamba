import { ResponsivePie } from "@nivo/pie";
import { barColorType } from "./BarChart";

export const PieChart = ({
  data,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  innerRadius,
  sort,
  outerRadiusWhenActive,
  borderWidth,
  arcLinkLabelsTextColor,
  colors,
  legendAnchor,
  legendDirection,
  legendEnabled,
  legendMarginOnXAxis,
  legendMarginOnYAxis,
  legendHeight,
  legendWidth,
  legendTextColor,
}: {
  data: any;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  innerRadius?: number;
  sort?: boolean;
  outerRadiusWhenActive?: number;
  borderWidth?: number;
  arcLinkLabelsTextColor?: string;
  colors: barColorType[keyof barColorType];
  legendAnchor?:
    | "top"
    | "top-right"
    | "right"
    | "bottom-right"
    | "bottom"
    | "bottom-left"
    | "left"
    | "top-left"
    | "center";
  legendDirection?: "column" | "row";
  legendEnabled: boolean;
  legendMarginOnXAxis?: number;
  legendMarginOnYAxis?: number;
  legendHeight?: number;
  legendWidth?: number;
  legendTextColor?: string;
}) => {
  return (
    <ResponsivePie
      data={data}
      margin={{
        top: marginTop,
        right: marginRight,
        bottom: marginBottom,
        left: marginLeft,
      }}
      innerRadius={innerRadius || 0}
      sortByValue={sort}
      activeOuterRadiusOffset={outerRadiusWhenActive}
      borderWidth={borderWidth}
      arcLinkLabelsTextColor={arcLinkLabelsTextColor}
      colors={{ scheme: colors }}
      legends={[
        {
          anchor: legendAnchor || "top",
          direction: legendDirection || "row",
          itemHeight: legendHeight || 20,
          itemWidth: legendWidth || 100,
          itemTextColor: legendTextColor || "#FFFFFF",
          translateX: legendEnabled ? legendMarginOnXAxis || 20 : 10000,
          translateY: legendEnabled ? legendMarginOnYAxis || 20 : 10000,
        },
      ]}
    />
  );
};
