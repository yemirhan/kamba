import React from "react";
import { categoryPusherTypes } from "./MenuAdder";
import { Text, Popover } from "@mantine/core";

export const Items = ({ itemList }: { itemList: categoryPusherTypes }) => {
  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-teal-800 p-4 shadow-xl">
      <div className="flex flex-row items-center justify-between">
        <p className="font-bold">{itemList.itemName}</p>
        <div className="flex flex-row">
          <p className="font-semilight text-sm">{itemList.price}</p>
          <p className="ml-1 text-base font-bold">₺</p>
        </div>
      </div>
      <div className="border-t-2 border-black font-mono ">
        <Popover width={400} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Text size="sm" lineClamp={3}>
              {itemList.description}
            </Text>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="lg">{itemList.description}</Text>
          </Popover.Dropdown>
        </Popover>
      </div>
    </div>
  );
};
