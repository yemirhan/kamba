import React from 'react'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

export const SeeContentCard = ({itemName, itemDescription, itemPrice, image}:{itemName:string, itemDescription:string, itemPrice:number, image?:string}) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{itemName}</Text>        
        <Badge color="pink" variant="light">
          Satışta
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {itemDescription}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        {`${itemPrice} ₺`}
      </Button>
    </Card>
  )
}
