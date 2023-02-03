import React from "react";
import { categoryPusherTypes } from "./MenuAdder";
import { Text, Popover, ActionIcon } from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import { Group } from "@mantine/core";
import { useState } from "react";
import { EditItem } from "./EditItem";
import { UseFormReturnType } from "@mantine/form";
export const Items = ({ itemList, index, setItemList, edit}: { itemList: categoryPusherTypes, index : number, setItemList : React.Dispatch<React.SetStateAction<categoryPusherTypes[]>>, edit?: boolean | undefined}) => {
  const [editItem, seteditItem] = useState(false)
  return (
    <>
    <div className="relative flex h-full w-full flex-col rounded-xl bg-teal-800 p-4 shadow-xl">
      <div className="flex flex-row items-center justify-between">
        <p className="font-bold">{itemList.itemName}</p>
        <div className="flex flex-row">
          <p className="font-semilight text-sm">{itemList.price}</p>
          <p className="ml-1 text-base font-bold">₺</p>
        </div>
      </div>
      {
        edit ? (
          <Group className="absolute right-[10px] bottom-[10px]">
        <ActionIcon
          onClick={()=>seteditItem(true)}
        >
          <IconPencil size={20} />
        </ActionIcon>
      </Group>
        ) : 
        <></>
      }
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
    <EditItem editItem={editItem} seteditItem={seteditItem} itemList={itemList} index = {index} setItemList = {setItemList}/>
    </>
  );
};