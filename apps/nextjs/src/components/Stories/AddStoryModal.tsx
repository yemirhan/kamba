
import { api } from "@acme/api/src/client"
import { Button, Group, Modal, Stack, TextInput } from "@mantine/core"
import { useRouter } from "next/router"
import { useState } from "react"

export const AddStoryModal = ({ opened, close }: { opened: boolean, close: () => void }) => {
    const context = api.useContext()
    const router = useRouter()
    const [name, setName] = useState("")
    const { mutate, isLoading: isMutating } = api.story.createStory.useMutation({
        onSuccess: () => {
            context.story.getStoriesBySlug.invalidate()
            setName("")
            close()
        },
        onError: () => {
            close()
        }
    })
    return <Modal
        opened={opened}
        onClose={close}
        title="Yeni Bölge Oluştur"
    >
        <Stack>
            <TextInput
                label="Bölge Adı"
                placeholder="Bölge Adı"
                required
                onChange={(e) => {
                    setName(e.target.value)
                }}
                value={name}
            />
            <Group position='right'>
                <Button
                    loading={isMutating}
                    disabled={name.length < 3}
                    onClick={() => mutate({
                        name,
                        slug: router.query.workspaceId as string,
                    })}
                >
                    Oluştur
                </Button>
            </Group>
        </Stack>
    </Modal>
}