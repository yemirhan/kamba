import React from "react";
import { RefreshControl, Text, View } from "react-native";
import { useWorkspace } from "../../providers/useWorkspace";
import { api } from "../../utils/trpc";
import { FlashList } from "@shopify/flash-list";
import { colors } from "../../utils/colors";

export const Tables = () => {
  const workspaceId = useWorkspace((w) => w.workspaceId);
  const { data, isLoading, refetch } = api.tables.getTables.useQuery(
    {
      workspaceId: workspaceId || "",
    },
    {
      enabled: workspaceId !== null,
    },
  );
  return (
    <View className="bg-background flex h-full w-full">
      <FlashList
        contentContainerStyle={{
          backgroundColor: colors.background,
          padding: 10,
        }}
        refreshing={isLoading}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            tintColor={"white"}
            onRefresh={() => {
              refetch();
            }}
          />
        }
        data={data?.tables || []}
        renderItem={({ item }) => (
          <View key={item.id}>
            <Text className="text-white">{item.name}</Text>
          </View>
        )}
        estimatedItemSize={100}
      />
    </View>
  );
};
