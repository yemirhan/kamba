import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { createStackNavigator } from "@react-navigation/stack";
import { FlashList } from "@shopify/flash-list";
import React, { useRef } from "react";
import { Image, Pressable, RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconPlus } from "tabler-icons-react-native";
import { TextInput } from "../../components/TextInput";
import { useWorkspace } from "../../providers/useWorkspace";
import { colors } from "../../utils/colors";
import { api } from "../../utils/trpc";

const Stack = createStackNavigator();

export const MenuCategoryRouter = () => {
  const workspace = useWorkspace();
  const { data, isLoading, refetch } = api.newMenuCategories.all.useQuery({
    workspaceId: workspace.workspaceId as string,
  });
  const bottomSheet = useRef<BottomSheetModal>(null);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MenuCategories"
        options={{
          headerStyle: {
            backgroundColor: "#202020",
            borderBottomWidth: 0,
          },
          headerShadowVisible: false,
          headerTintColor: "#fff",
          headerTitle: "Kategoriler",
          headerRight: () => {
            return (
              <Pressable
                onPress={() => bottomSheet.current?.present()}
                className="mr-3"
              >
                <IconPlus color="white" size={22} />
              </Pressable>
            );
          },
        }}
        children={() => (
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
                    <Text className="font-semibold text-white">
                      {item.name}
                    </Text>
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
            <AddCategoryBottomSheet bottomSheet={bottomSheet} />
          </View>
        )}
      />
    </Stack.Navigator>
  );
};

export const AddCategoryBottomSheet = ({
  bottomSheet,
}: {
  bottomSheet: React.RefObject<BottomSheetModal>;
}) => {
  const [name, setName] = React.useState("");
  const snapPoints = React.useMemo(() => ["100%"], []);
  const setWorkspaceId = useWorkspace((z) => z.setWorkspaceId);
  const workspaceId = useWorkspace((z) => z.workspaceId);
  const { top } = useSafeAreaInsets();
  const { mutate, isLoading } = api.newMenuCategories.create.useMutation({
    onSuccess: () => {
      bottomSheet.current?.close();
    },
  });

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        {...props}
        pressBehavior={"close"}
      />
    ),
    [],
  );
  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      index={0}
      enableDismissOnClose={true}
      ref={bottomSheet}
      topInset={top}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: colors.background,
      }}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{
        backgroundColor: "#aaa",
      }}
    >
      <BottomSheetScrollView
        contentContainerStyle={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextInput value={name} onChangeText={(text) => setName(text)} />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
