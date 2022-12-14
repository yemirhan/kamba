import { Indicator, Modal, Paper, Title, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { motion } from 'framer-motion'
import React from 'react'

export const TableItem = ({ name, orderCount }: { name: string, orderCount: number }) => {
    const [opened, { close, open }] = useDisclosure(false)
    return (<>
        <Indicator
            className='cursor-pointer'
            onClick={open}
            disabled={orderCount === 0}
        >
            <Paper
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                withBorder p={"md"}>
                <Title order={3}>
                    {name}
                </Title>
            </Paper >
        </Indicator>
        <TableModal opened={opened} close={close} />
    </>
    )
}
const TableModal = ({ opened, close }: { opened: boolean, close: () => void }) => {
    const theme = useMantineTheme();

    return <Modal
        opened={opened}
        onClose={close}
        title="Masa"
        size="100%"
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
    >

    </Modal>
}