import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import * as MediaLibrary from "expo-media-library";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { FlashList } from "@shopify/flash-list";
import React, { useRef } from "react";
import { Image, Pressable, RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconPlus } from "tabler-icons-react-native";
import { TextInput } from "../../components/TextInput";
import { useWorkspace } from "../../providers/useWorkspace";
import { colors } from "../../utils/colors";
import { api } from "../../utils/trpc";
import { Category } from "../../components/MenuCategories/Category";
import { MenuCategory } from "./MenuCategory";

export type MenuCategoryRouterParamList = {
  MenuCategories: undefined;
  MenuCategory: { id: string };
};

export type MenuCategoryParams = StackScreenProps<
  MenuCategoryRouterParamList,
  "MenuCategory"
>;

const Stack = createStackNavigator<MenuCategoryRouterParamList>();

export const MenuCategoryRouter = () => {
  const workspace = useWorkspace();
  const { data, isLoading, refetch } = api.newMenuCategories.all.useQuery({
    workspaceSlug: workspace.workspaceId as string,
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
              renderItem={({ item }) => <Category item={item} />}
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
      <Stack.Screen name="MenuCategory" component={MenuCategory} />
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
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Kategori Adı"
        />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
