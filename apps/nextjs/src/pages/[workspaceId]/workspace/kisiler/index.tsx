
import { Button, Container, Group, Stack, Title } from '@mantine/core'
import { IconUserPlus } from '@tabler/icons'
import React, { useState } from 'react'
import { AddNewUserModal } from '../../../../components/AddNewUserModal'
import { ShellLayout } from '../../../../components/ShellLayout'
import { TableSelection } from '../../../../components/TableLayout'

const data = [
    {
        "id": "1",
        "avatar": "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
        "name": "Robert Wolfkisser",
        "job": "Engineer",
        "email": "rob_wolf@gmail.com"
    },
    {
        "id": "2",
        "avatar": "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
        "name": "Jill Jailbreaker",
        "job": "Engineer",
        "email": "jj@breaker.com"
    },
    {
        "id": "3",
        "avatar": "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
        "name": "Henry Silkeater",
        "job": "Designer",
        "email": "henry@silkeater.io"
    },
    {
        "id": "4",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
        "name": "Bill Horsefighter",
        "job": "Designer",
        "email": "bhorsefighter@gmail.com"
    },
    {
        "id": "5",
        "avatar": "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
        "name": "Jeremy Footviewer",
        "job": "Manager",
        "email": "jeremy@foot.dev"
    }
]
const People = () => {
    const [opened, setOpened] = useState(false)
    return (<>
        <ShellLayout>
            <Container size={'xl'}>
                <Stack>
                    <Group position='apart'>

                        <Title>
                            Kisiler
                        </Title>
                        <Button leftIcon={<IconUserPlus size={18} />} onClick={() => setOpened(true)}>
                            Yeni Kisi Ekle
                        </Button>
                    </Group>
                    <TableSelection data={data} />
                </Stack>
            </Container>
        </ShellLayout>
        <AddNewUserModal opened={opened} onClose={() => setOpened(false)} />
    </>
    )
}

export default People