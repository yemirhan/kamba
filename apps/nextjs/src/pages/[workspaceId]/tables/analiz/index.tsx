import { Dropdown } from "@/components/Analiz/AnalizFiltre/dropdown";
import { BarChart } from "@/components/Analiz/BarChart";
import { LineChart } from "@/components/Analiz/LineChart";
import { TablesLayoutNC } from "@/components/Tables/TablesLayoutNC";
import { Card, Grid, Group, Text, Title } from "@mantine/core";
const BarListData = [
  {
    name: "Twitter",
    value: 456,
    href: "https://twitter.com/tremorlabs",
  },
  {
    name: "Google",
    value: 351,
    href: "https://google.com",
  },
  {
    name: "GitHub",
    value: 271,
    href: "https://github.com/tremorlabs/tremor",
  },

  {
    name: "Reddit",
    value: 191,
    href: "https://reddit.com",
  },
  {
    name: "Youtube",
    value: 91,
    href: "https://www.youtube.com/@tremorlabs3079",
  },
];

const areaChartData = [
  {
    id: "Deneme",
    data: [
      {
        x: "Jan 22",
        y: 2890,
      },
      {
        x: "Feb 22",
        y: 2756,
      },
      {
        x: "Mar 22",
        y: 3322,
      },
      {
        x: "Apr 22",
        y: 3470,
      },
      {
        x: "May 22",
        y: 3475,
      },
      {
        x: "Jun 22",
        y: 3129,
      },
    ],
  },
];

const Index = () => {
  return (
    <TablesLayoutNC>
      <div className="flex h-[70vh] w-full flex-col p-2">
        <div className="flex flex-row items-center justify-between">
          <Title>Analizler</Title>
          <Dropdown />
        </div>
        <div className="mt-6 h-full w-full rounded-xl border-2 border-solid border-white border-opacity-40 p-4">
          <Grid gutter={30}>
            <Grid.Col span={4}>
              <Card withBorder radius="md" style={{ height: "30vh" }}>
                <Group position="apart">
                  <Text style={{ fontSize: 14 }}>En Çok Satan Kategoriler</Text>
                </Group>
                <BarChart
                  data={BarListData}
                  indexBy="name"
                  layoutPreference="horizontal"
                  textColor="white"
                  marginBottom={40}
                  marginLeft={60}
                  marginRight={20}
                  marginTop={20}
                  barColor="nivo"
                />
              </Card>
            </Grid.Col>
            <Grid.Col span={4} style={{ position: "relative" }}>
              <Card radius="md" withBorder style={{ height: "30vh" }}>
                <Group position="left">
                  <Text style={{ fontSize: 14 }}>Haftalık Satış Durumu</Text>
                </Group>
                <div className="h-[100%]">
                  <LineChart
                    data={areaChartData}
                    isEnableArea={true}
                    marginBottom={40}
                    marginLeft={40}
                    marginRight={20}
                    marginTop={20}
                    textColor="white"
                  />
                </div>
              </Card>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </TablesLayoutNC>
  );
};

export default Index;
