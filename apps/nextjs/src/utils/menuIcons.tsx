import React from "react";
import {
  IconApple,
  IconBeer,
  IconBone,
  IconBottle,
  IconBowl,
  IconBread,
  IconCarrot,
  IconCheese,
  IconCookie,
  IconCup,
  IconEgg,
  IconFish,
  IconGlass,
  IconGrill,
  IconGrillFork,
  IconMug,
  IconPizza,
  IconSalad,
  IconSoup,
  TablerIconProps,
} from "@tabler/icons";

export const icons = {
  APPLE: IconApple,
  BEER: IconBeer,
  BONE: IconBone,
  BOTTLE: IconBottle,
  BOWL: IconBowl,
  BREAD: IconBread,
  CARROT: IconCarrot,
  CHEESE: IconCheese,
  COOKIE: IconCookie,
  CUP: IconCup,
  EGG: IconEgg,
  GLASS: IconGlass,
  GRILLFORK: IconGrillFork,
  GRILL: IconGrill,
  PIZZA: IconPizza,
  MUG: IconMug,
  SALAD: IconSalad,
  SOUP: IconSoup,
  FISH: IconFish,
} as const;

export const MenuIcon = ({
  icon = "APPLE",
  size = 20,
  color = "white",
  ...rest
}: {
  icon?: keyof typeof icons;
} & Partial<TablerIconProps>) => {
  return {
    APPLE: <IconApple size={size} color={color} {...rest} />,
    BEER: <IconBeer size={size} color={color} {...rest} />,
    BONE: <IconBone size={size} color={color} {...rest} />,
    BOTTLE: <IconBottle size={size} color={color} {...rest} />,
    BOWL: <IconBowl size={size} color={color} {...rest} />,
    BREAD: <IconBread size={size} color={color} {...rest} />,
    CARROT: <IconCarrot size={size} color={color} {...rest} />,
    CHEESE: <IconCheese size={size} color={color} {...rest} />,
    COOKIE: <IconCookie size={size} color={color} {...rest} />,
    CUP: <IconCup size={size} color={color} {...rest} />,
    EGG: <IconEgg size={size} color={color} {...rest} />,
    GLASS: <IconGlass size={size} color={color} {...rest} />,
    GRILLFORK: <IconGrillFork size={size} color={color} {...rest} />,
    GRILL: <IconGrill size={size} color={color} {...rest} />,
    PIZZA: <IconPizza size={size} color={color} {...rest} />,
    MUG: <IconMug size={size} color={color} {...rest} />,
    SALAD: <IconSalad size={size} color={color} {...rest} />,
    SOUP: <IconSoup size={size} color={color} {...rest} />,
    FISH: <IconFish size={size} color={color} {...rest} />,
  }[icon];
};
