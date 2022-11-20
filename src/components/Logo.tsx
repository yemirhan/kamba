import { Group, Text, UnstyledButton } from '@mantine/core'
import { IconLayoutKanban } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'

export const Logo = ({ href = "/" }) => {
    return (
        <UnstyledButton component={Link} href={href}>
            <Group>
                <IconLayoutKanban size={20} />
                <Text>
                    Kamba
                </Text>
            </Group>
        </UnstyledButton>
    )
}
