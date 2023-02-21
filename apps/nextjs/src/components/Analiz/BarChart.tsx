import { ResponsiveBar } from "@nivo/bar";
type barColorType = {
  accent: "accent";
  blueGreen: "blue_green";
  bluePurple: "blue_purple";
  blues: "blues";
  brown_blueGreen: "brown_blueGreen";
  category10: "category10";
  dark2: "dark2";
  green_blue: "green_blue";
  greens: "greens";
  greys: "greys";
  nivo: "nivo";
  orange_red: "orange_red";
  oranges: "oranges";
  paired: "paired";
  pastel1: "pastel1";
  pastel2: "pastel2";
  pink_yellowGreen: "pink_yellowGreen";
  purpleRed_green: "purpleRed_green";
  purple_blue: "purple_blue";
  purple_blue_green: "purple_blue_green";
  purple_orange: "purple_orange";
  purple_red: "purple_red";
  purples: "purples";
  red_blue: "red_blue";
  red_grey: "red_grey";
  red_purple: "red_purple";
  red_yellow_blue: "red_yellow_blue";
  red_yellow_green: "red_yellow_green";
  reds: "reds";
  set1: "set1";
  set2: "set2";
  set3: "set3";
  spectral: "spectral";
  yellow_green: "yellow_green";
  yellow_green_blue: "yellow_green_blue";
  yellow_orange_brown: "yellow_orange_brown";
  yellow_orange_red: "yellow_orange_red";
};

export const BarChart = ({
  data,
  layoutPreference,
  indexBy,
  yAxisLegend,
  xAxisLegend,
  yAxisPosition,
  xAxisPosition,
  textColor,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  barColor,
}: {
  data: any;
  layoutPreference: "horizontal" | "vertical" | undefined;
  indexBy: string;
  yAxisLegend?: string | undefined;
  xAxisLegend?: string | undefined;
  yAxisPosition?: "middle" | "start" | "end" | undefined;
  xAxisPosition?: "middle" | "start" | "end" | undefined;
  textColor: string | undefined;
  marginTop: number;
  marginLeft: number;
  marginRight: number;
  marginBottom: number;
  barColor: barColorType[keyof barColorType];
}) => {
  return (
    <ResponsiveBar
      layout={layoutPreference}
      padding={0.2}
      margin={{
        bottom: marginBottom,
        left: marginLeft,
        right: marginRight,
        top: marginTop,
      }}
      theme={{
        textColor: textColor,
      }}
      colors={{ scheme: barColor }}
      data={data}
      indexBy={indexBy}
      axisBottom={{
        legend: xAxisLegend,
        tickSize: 5,
        legendPosition: xAxisPosition,
      }}
      axisLeft={{
        legend: yAxisLegend,
        tickSize: 5,
        legendPosition: yAxisPosition,
        legendOffset: -60,
      }}
    />
  );
};
