import { Logo } from '@/components/Logo'
import { trpc } from '@/utils/trpc'
import { AppShell, Button, Center, Group, Header, Paper, Stack, Text, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconArrowRight, IconLogout } from '@tabler/icons'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

const Onboard = () => {
    const router = useRouter()
    const { mutate, isLoading } = trpc.profile.updateProfile.useMutation({
        onSuccess: () => {
            router.push("/workspaces")
        }
    })
    const form = useForm({
        initialValues: {
            name: "",
            bio: ""
        },
        validate: {
            name: (value) => value.length < 3 && "Adınız en az 3 karakter olmalıdır."
        }
    })

    return (
        <AppShell
            header={<Header height={60} px="md">
                <Group position="apart" sx={{ height: '100%' }}>
                    <Logo />
                    <Button
                        variant="default"
                        leftIcon={<IconLogout size={18} />}
                        onClick={() => signOut({
                            callbackUrl: '/'
                        })}>
                        Çıkış Yap
                    </Button>
                </Group>

            </Header>}
        >
            <Center style={{ width: "full", height: "calc(100vh - 92px)" }}>
                <Paper withBorder p={"xl"} >
                    <form onSubmit={form.onSubmit(() => {
                        mutate(form.values)
                    })}> 
                        <Stack>
                            <Text
                                variant="gradient"
                                gradient={{ from: 'teal', to: 'green', deg: 45 }}
                                sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                                ta="center"
                                size={32}
                                fw={700}
                            >
                                Kamba&apos;ya hoşgeldin!
                            </Text>
                            <Text weight={"bold"} align="center">
                                Devam etmeden önce seni tanımamız lazım.
                            </Text>
                            <TextInput
                                label="Adınız"
                                placeholder="Adınız"
                                required
                                {...form.getInputProps("name")}


                            />
                            <Textarea
                                label="Hakkınızda"
                                placeholder="Hakkınızda"
                                {...form.getInputProps("bio")}
                            />
                            <Button
                                type='submit'
                                loading={isLoading}
                                disabled={!form.isValid()}
                                rightIcon={<IconArrowRight size={20} />} fullWidth>
                                Devam Et
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Center>
        </AppShell>
    )
}

export default Onboard