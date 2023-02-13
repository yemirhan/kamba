import * as React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { api } from "../utils/trpc";
import { Menu } from "./Menu/Menu";
import { useUser } from "@clerk/clerk-expo";
import { useWorkspace } from "../providers/useWorkspace";
import {
  IconArrowsExchange,
  IconHome,
  IconToolsKitchen2,
} from "tabler-icons-react-native";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { colors } from "../utils/colors";

function HomeScreen({ navigation }: any) {
  const { data, isLoading } = api.workspace.getAll.useQuery();
  return (
    <View className="bg-background flex flex-1 flex-col space-y-3 p-2">
      {(data || []).map((workspace) => {
        return (
          <View
            key={workspace.id}
            className="rounded-lg bg-gray-900 p-4 shadow-md"
          >
            <Text className="text-lg font-semibold text-white">
              {workspace.name}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

function NotificationsScreen({ navigation }: any) {
  const { data, isLoading } = api.workspace.getAll.useQuery();
  const { data: menu } = api.menu.all.useQuery(
    {
      workspaceSlug: data?.[0]?.id || "",
    },
    {
      enabled: !isLoading && (data || [])?.length > 0,
    },
  );
  return (
    <View className="bg-background flex flex-1 flex-col space-y-3 p-2">
      {(menu || []).map((menu) => {
        return (
          <View key={menu.id} className="rounded-lg bg-gray-900 p-4 shadow-md">
            <Text className="text-lg font-semibold text-white">
              {menu.name}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const Drawer = createDrawerNavigator();
const icons = [
  <IconHome size={24} color={"white"} />,
  <IconToolsKitchen2 size={24} color={"white"} />,
];
export const Manager = () => {
  const { user } = useUser();
  const bottomSheet = React.useRef<BottomSheetModal>(null);
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={({ descriptors, state, navigation }) => {
          return (
            <SafeAreaView className="bg-background-secondary flex flex-1 flex-col justify-between p-2">
              <View className="flex flex-col space-y-3">
                {Object.values(descriptors).map((descriptor, index) => {
                  return (
                    <Pressable
                      onPress={() => {
                        navigation.navigate(descriptor.route.name);
                      }}
                      key={descriptor.route.name}
                      className={`${
                        state.index === index
                          ? "bg-emerald-700"
                          : "bg-background"
                      } flex flex-row items-center space-x-2 rounded-lg p-3 shadow-md`}
                    >
                      {icons[index]}
                      <Text className="text-base font-semibold text-white ">
                        {descriptor.route.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <View className="flex flex-row items-center space-x-3 px-2">
                <Image
                  source={{ uri: user?.profileImageUrl }}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                <Text className="flex-1 text-base font-semibold text-white">{`${user?.firstName} ${user?.lastName}`}</Text>
                <Pressable
                  onPress={() => bottomSheet.current?.present()}
                  className="bg-background rounded-lg p-2"
                >
                  <IconArrowsExchange className="text-white" color="white" />
                </Pressable>
              </View>
            </SafeAreaView>
          );
        }}
      >
        <Drawer.Screen
          name="Home"
          options={{
            headerStyle: {
              backgroundColor: "#202020",
              borderBottomWidth: 0,
            },
            headerShadowVisible: false,
            headerTintColor: "#fff",
          }}
          component={HomeScreen}
        />
        <Drawer.Screen
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: "#202020",
              borderBottomWidth: 0,
            },
            headerShadowVisible: false,
            headerTintColor: "#fff",
          }}
          name="Menu"
          component={Menu}
        />
      </Drawer.Navigator>
      <SwitchWorkspaceBottomSheet bottomSheet={bottomSheet} />
    </>
  );
};

const SwitchWorkspaceBottomSheet = ({
  bottomSheet,
}: {
  bottomSheet: React.RefObject<BottomSheetModal>;
}) => {
  const snapPoints = React.useMemo(() => ["50%", "100%"], []);
  const setWorkspaceId = useWorkspace((z) => z.setWorkspaceId);
  const workspaceId = useWorkspace((z) => z.workspaceId);
  const { top } = useSafeAreaInsets();
  const { data, isLoading } = api.workspace.getAll.useQuery();
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
        {(data || []).map((workspace) => (
          <Pressable
            onPress={() => {
              setWorkspaceId(workspace.slug);
              bottomSheet.current?.close();
            }}
            key={workspace.id}
            className={`mb-2 rounded-lg bg-gray-700 p-2 shadow-md ${
              workspaceId === workspace.slug ? "bg-emerald-700" : "bg-gray-700"
            } `}
          >
            <Text className="text-lg font-semibold text-white">
              {workspace.name}
            </Text>
          </Pressable>
        ))}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
