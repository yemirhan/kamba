import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Image, RefreshControl, Text, View } from "react-native";
import { useWorkspace } from "../../providers/useWorkspace";
import { api } from "../../utils/trpc";

export const MenuCategories = () => {
  const workspace = useWorkspace();
  const { data, isLoading, refetch } = api.newMenuCategories.all.useQuery({
    workspaceId: workspace.workspaceId as string,
  });
  return (
    <View className="bg-background h-full w-full p-2">
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <View className="bg-background-secondary mb-2 flex h-32 w-full flex-row overflow-hidden rounded-lg">
            <Image
              source={
                item?.image
                  ? {
                      uri: item.image || "",
                    }
                  : require("../../../assets/placeholder.png")
              }
              className="h-32 w-32"
            />
            <View className="flex flex-col space-y-2">
              <Text className="font-semibold text-white">{item.name}</Text>
              <Text className="text-xs font-semibold text-white">
                {item._count.menuItems || 0}
              </Text>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        refreshing={isLoading}
        estimatedItemSize={128}
      />
    </View>
  );
};
