import { RouterOutputs } from "@acme/api";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";
import { MenuCategoryParams } from "../../screens/Menu/MenuCategories";

export const Category = ({
  item,
}: {
  item: RouterOutputs["newMenuCategories"]["all"][number];
}) => {
  const { navigation } = useNavigation<MenuCategoryParams>();
  return (
    <Pressable
      onPress={() => navigation.navigate("MenuCategory", { id: item.id })}
      className="bg-background-secondary mb-2 flex h-32 w-full flex-row overflow-hidden rounded-lg"
    >
      <Image
        source={
          item?.image
            ? {
                uri: item.image || "",
              }
            : (require("../../../assets/placeholder.png") as ImageSourcePropType)
        }
        className="h-32 w-32"
      />
      <View className="ml-3 flex h-full w-full flex-col justify-center space-y-1">
        <Text className="text-xl font-semibold text-white">{item.name}</Text>
        <Text className="text-base font-medium text-white">
          {`${item._count.menuItems || 0} İçerik`}
        </Text>
      </View>
    </Pressable>
  );
};
