import { LineChart } from "@/components/Analiz/LineChart";
import { TablesLayout } from "@/components/Tables/TablesLayout";
import { Title } from "@mantine/core";

const Index = () => {
  return (
    <TablesLayout>
      <div className="flex h-[60vh] w-full flex-col p-2">
        <Title>Analizler</Title>
        <div className="mt-4 h-full w-full">
          <LineChart />
        </div>
      </div>
    </TablesLayout>
  );
};

export default Index;
