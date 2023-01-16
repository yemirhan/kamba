import { Group, Text, Tooltip, UnstyledButton } from '@mantine/core'
import { IconLayoutKanban } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'

export const Logo = ({ href = "/" }) => {
    return (
        <Tooltip label="Ana Sayfa" position='bottom' withArrow transitionDuration={300} transition="scale">
            <UnstyledButton component={Link} href={href}>
                <Group>
                    <IconLayoutKanban size={20} />
                    <Text weight={'bolder'}>
                        Kamba
                    </Text>
                </Group>
            </UnstyledButton>
        </Tooltip>
    )
}
