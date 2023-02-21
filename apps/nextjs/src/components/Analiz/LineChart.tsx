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
    />
  );
};
