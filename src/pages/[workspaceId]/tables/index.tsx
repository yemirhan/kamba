import { ShellLayout } from '@/components/ShellLayout'
import { AddStoryModal } from '@/components/Stories/AddStoryModal'
import { StoryCard } from '@/components/Stories/StoryCard'
import { trpc } from '@/utils/trpc'
import { Button, Container, Flex, Grid, Group, Loader, Modal, Paper, Stack, Text, TextInput, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'


const Tables = () => {
    const router = useRouter()
    const [opened, { close, open }] = useDisclosure(false)
    const context = trpc.useContext()
    const { data: stories, isLoading } = trpc.story.getStoriesBySlug.useQuery({
        slug: router.query.workspaceId as string
    }, { enabled: router.isReady })
    const { mutate, isLoading: isMutating } = trpc.story.createStory.useMutation({
        onSuccess: () => {
            context.story.getStoriesBySlug.invalidate()
            close()
        },
        onError: () => {
            close()
        }
    })


    return (
        <ShellLayout>
            <Container>
                <Stack>
                    <Group position='apart'>
                        <Title>
                            Bölgeler
                        </Title>
                        <Button
                            onClick={open}
                        >
                            Yeni Bölge Oluştur
                        </Button>
                    </Group>
                    <AnimatePresence mode='wait'>
                        {
                            isLoading ? <Paper
                                component={motion.div}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                withBorder bg={"gray"} p="lg">
                                <Flex align={"center"} justify="center">
                                    <Loader size="lg" />
                                </Flex>
                            </Paper> :
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <Grid >
                                        {(stories?.stories || []).map(story => <Grid.Col key={story.id} span={4}>
                                            <StoryCard name={story.name} slug={story.slug} tables={story._count.tables} />
                                        </Grid.Col>)}
                                    </Grid>
                                </motion.div>
                        }
                    </AnimatePresence>

                </Stack>
            </Container>
            <AddStoryModal close={close} opened={opened} />
        </ShellLayout>
    )
}

export default Tables

