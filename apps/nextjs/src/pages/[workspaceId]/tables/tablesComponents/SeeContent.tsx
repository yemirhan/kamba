import React from "react";
import { Modal } from "@mantine/core";
import { Group } from "@mantine/core";
import { MenuItem } from "@acme/db";
import { Stack, Text, Title, } from "@mantine/core";
import { Grid } from "@mantine/core";
import { SearchBar } from "./SearchBar";
import { SeeContentCard } from "./SeeContentCard";

export const SeeContent = ({menuItems, seeContent, setSeeContent, name, image}:{menuItems: MenuItem[], seeContent : boolean, setSeeContent : React.Dispatch<React.SetStateAction<boolean>>, name: string, image?: string} ) => {
  return <div>{seeContent ? (
    <Modal
    opened={seeContent}
    onClose={() => setSeeContent(false)}
    size='60%'
  >
    <Stack align='center'>
      <Title>Katalog İçeriği</Title>
      <div className="flex flex-col w-full h-auto items-center border-4 border-slate-500">
        <img src={image} alt="kategori resmi" className="w-1/2 aspect-video rounded-xl"/>
      </div>
      <Title order={2} className="relative">{name}</Title>
      
      <Grid>
        {menuItems.map((value, index)=>{
          return (
            <Grid.Col span={4}>
            <SeeContentCard itemDescription={value.description!} itemName={value.name} itemPrice={value.price} />
            </Grid.Col>
          )
        })}
      </Grid>

      
    </Stack>
    

  </Modal>
  ) : <></>}</div>;
};
