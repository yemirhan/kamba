import { ResponsiveLine } from "@nivo/line";

export const LineChart = ({
  data,
  marginTop,
  marginRight,
  marginLeft,
  marginBottom,
  textColor,
  isEnableArea,
  xAxisLegend,
  xlegendOffset,
  xlegendPosition,
  yAxisLegend,
  ylegendOffset,
  ylegendPosition,
  legendAnchor,
  legendDirection,
  legendMarginOnXAxis,
  legendMarginOnYAxis,
  legendWidth,
  legendHeight,
  legendEnabled,
}: {
  data: any;
  marginTop: number;
  marginRight: number;
  marginLeft: number;
  marginBottom: number;
  textColor: string;
  isEnableArea: boolean;
  xAxisLegend?: string | undefined;
  xlegendOffset?: number | undefined;
  xlegendPosition?: "middle" | "end" | "start" | undefined;
  yAxisLegend?: string | undefined;
  ylegendOffset?: number | undefined;
  ylegendPosition?: "middle" | "end" | "start" | undefined;
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
  legendMarginOnXAxis?: number;
  legendMarginOnYAxis?: number;
  legendWidth?: number;
  legendHeight?: number;
  legendEnabled: boolean;
}) => {
  return (
    <ResponsiveLine
      data={data}
      margin={{
        top: marginTop,
        right: marginRight,
        bottom: marginBottom,
        left: marginLeft,
      }}
      theme={{
        textColor: textColor,
      }}
      enableArea={isEnableArea}
      axisBottom={{
        legend: xAxisLegend || "",
        tickSize: 5,
        tickPadding: 5,
        legendOffset: xlegendOffset || 0,
        legendPosition: xlegendPosition || "middle",
      }}
      axisLeft={{
        legend: yAxisLegend || "",
        tickSize: 5,
        tickPadding: 5,
        legendOffset: ylegendOffset || 0,
        legendPosition: ylegendPosition || "middle",
      }}
      legends={[
        {
          anchor: legendAnchor || "top",
          direction: legendDirection || "row",
          translateX: legendEnabled ? legendMarginOnXAxis || 0 : 10000,
          translateY: legendEnabled ? legendMarginOnYAxis || 0 : 10000,
          itemWidth: legendWidth || 0,
          itemHeight: legendHeight || 0,
        },
      ]}
    />
  );
};
