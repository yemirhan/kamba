import { Button, Flex, Paper, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const StoryCard = ({ name, tables, slug }: { name: string, tables?: number, slug: string }) => {
    const router = useRouter()
    return (
        <Paper withBorder p={"md"}>
            <Title order={3}>
                {name}
            </Title>
            <Flex direction={"row"} gap="sm">
                <Text>
                    {`${tables || 0} Masa`}
                </Text>
                <Text>
                    {`${0} aktif`}
                </Text>

            </Flex>
            <Button
                component={Link}
                href={`/${router.query.workspaceId}/tables/${slug}`}
                fullWidth>
                Git
            </Button>
        </Paper>
    )
}
