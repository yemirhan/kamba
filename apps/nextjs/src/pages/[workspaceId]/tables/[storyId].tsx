import { api } from '@acme/api/src/client'
import { Button, Container, Grid, Group, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronLeft } from '@tabler/icons'
import { useRouter } from 'next/router'
import React from 'react'
import { ShellLayout } from '../../../components/ShellLayout'
import { CreateTableModal } from '../../../components/Tables/CreateTableModal'
import { TableItem } from '../../../components/Tables/TableItem'

const Story = () => {
    const { query, isReady, ...router } = useRouter()
    const [opened, { close, open }] = useDisclosure(false)
    const { data: story } = api.story.getStoryBySlug.useQuery({
        slug: query.storyId as string
    }, { enabled: isReady })
    console.log(story);

    return (
        <ShellLayout>
            <Container>
                <Group position='apart'>
                    <Title>
                        <IconChevronLeft size={24} stroke={3} className={"mr-2"} onClick={() => { router.back() }} />
                        {story?.name}
                    </Title>
                    <Button
                        onClick={open}
                    >
                        Masa Oluştur
                    </Button>
                </Group>
                <Grid mt={"md"}>
                    {(story?.tables || []).map((table) => <Grid.Col key={table.id} span={4}>
                        <TableItem name={table.name} orderCount={table._count.orders || 0} />
                    </Grid.Col>)}
                </Grid>
            </Container>
            <CreateTableModal opened={opened} close={close} />
        </ShellLayout>
    )
}

export default Story