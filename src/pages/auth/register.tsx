import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    UnstyledButton,
    Group,
    Flex,
    Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconChevronLeft } from '@tabler/icons';
import { signIn, signOut, useSession } from "next-auth/react";
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: 900,
        height: "100vh",
        backgroundSize: 'cover',
        backgroundImage:
            'url(https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80)',
    },

    form: {
        borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
            }`,
        minHeight: 900,
        height: "100vh",
        maxWidth: 450,
        paddingTop: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",


        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    logo: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        width: 120,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

export function Register() {
    const { classes } = useStyles();
    const session = useSession();
    const form = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: (value) => /\S+@\S+\.\S+/.test(value) && 'Invalid email',
        }
    })

    return (<>
        <Head>
            <title>Kamba - Giriş Yap</title>
            <link rel="icon" href="/layout-kanban.svg" />
        </Head>

        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Stack spacing={"xs"}>
                    <Title order={2} className={classes.title} align="center" mt="md" mb={"md"}>
                        Kamba&apos;ya Hoşgeldin!
                    </Title>

                    <TextInput value={form.values.email} onChange={(e) => form.setFieldValue("email", e.target.value)} label="E-Posta Adresi" placeholder="hello@gmail.com" size="md" />
                    <Button
                        disabled={form.isValid()}
                        loading={session.status === "loading"}
                        onClick={() => {
                            signIn("email", {
                                email: form.values.email,
                                callbackUrl: "http://localhost:3000/dashboard",
                            })
                        }} fullWidth mt={"xs"} size="md">
                        E-Postama link gönder
                    </Button>

                    <Text align="center" >
                        Daha önce kaydoldun mu?{' '}
                        <Anchor component={Link} href="/auth/signin" weight={700} >
                            Giriş Yap
                        </Anchor>
                    </Text>
                </Stack>
                <UnstyledButton
                    component={Link}
                    href="/"
                >
                    <Group>
                        <IconChevronLeft size={20} />
                        <Text>
                            Ana sayfaya dön
                        </Text>
                    </Group>

                </UnstyledButton>

            </Paper>

        </div>
    </>
    );
}

export default Register;