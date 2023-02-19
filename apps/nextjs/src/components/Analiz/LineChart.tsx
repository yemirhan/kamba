import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "japan",
    color: "hsl(123, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 300,
      },
      {
        x: "helicopter",
        y: 262,
      },
      {
        x: "boat",
        y: 182,
      },
      {
        x: "train",
        y: 138,
      },
      {
        x: "subway",
        y: 210,
      },
      {
        x: "bus",
        y: 167,
      },
      {
        x: "car",
        y: 248,
      },
      {
        x: "moto",
        y: 204,
      },
      {
        x: "bicycle",
        y: 219,
      },
      {
        x: "horse",
        y: 73,
      },
      {
        x: "skateboard",
        y: 164,
      },
      {
        x: "others",
        y: 27,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(38, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 119,
      },
      {
        x: "helicopter",
        y: 6,
      },
      {
        x: "boat",
        y: 234,
      },
      {
        x: "train",
        y: 195,
      },
      {
        x: "subway",
        y: 66,
      },
      {
        x: "bus",
        y: 20,
      },
      {
        x: "car",
        y: 188,
      },
      {
        x: "moto",
        y: 296,
      },
      {
        x: "bicycle",
        y: 262,
      },
      {
        x: "horse",
        y: 276,
      },
      {
        x: "skateboard",
        y: 195,
      },
      {
        x: "others",
        y: 25,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(256, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 107,
      },
      {
        x: "helicopter",
        y: 193,
      },
      {
        x: "boat",
        y: 278,
      },
      {
        x: "train",
        y: 75,
      },
      {
        x: "subway",
        y: 213,
      },
      {
        x: "bus",
        y: 184,
      },
      {
        x: "car",
        y: 267,
      },
      {
        x: "moto",
        y: 41,
      },
      {
        x: "bicycle",
        y: 8,
      },
      {
        x: "horse",
        y: 24,
      },
      {
        x: "skateboard",
        y: 272,
      },
      {
        x: "others",
        y: 198,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(26, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 66,
      },
      {
        x: "helicopter",
        y: 224,
      },
      {
        x: "boat",
        y: 27,
      },
      {
        x: "train",
        y: 198,
      },
      {
        x: "subway",
        y: 204,
      },
      {
        x: "bus",
        y: 5,
      },
      {
        x: "car",
        y: 47,
      },
      {
        x: "moto",
        y: 221,
      },
      {
        x: "bicycle",
        y: 211,
      },
      {
        x: "horse",
        y: 190,
      },
      {
        x: "skateboard",
        y: 62,
      },
      {
        x: "others",
        y: 89,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(5, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 227,
      },
      {
        x: "helicopter",
        y: 163,
      },
      {
        x: "boat",
        y: 145,
      },
      {
        x: "train",
        y: 171,
      },
      {
        x: "subway",
        y: 169,
      },
      {
        x: "bus",
        y: 7,
      },
      {
        x: "car",
        y: 280,
      },
      {
        x: "moto",
        y: 290,
      },
      {
        x: "bicycle",
        y: 297,
      },
      {
        x: "horse",
        y: 265,
      },
      {
        x: "skateboard",
        y: 7,
      },
      {
        x: "others",
        y: 180,
      },
    ],
  },
];

const theme = {
  axis: {
    ticks: {
      text: {
        fill: "#FFFFFF",
      },
    },
    legend: {
      text: {
        fill: "#FFFFFF",
      },
    },
  },
  legends: {
    text: {
      fill: "#FFFFFF",
    },
    title: {
      text: {
        fill: "#FFFFFF",
      },
    },
  },
};

export const LineChart = () => {
  return (
    //@ts-ignore
    <ResponsiveLine
      data={data}
      theme={theme}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};
