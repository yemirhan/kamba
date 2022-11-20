import { createStyles, Header, Autocomplete, Group, Burger, UnstyledButton, Text, Menu, Avatar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconHeart, IconLayoutKanban, IconLogout, IconSearch, IconSettings, IconStar, IconSwitchHorizontal } from '@tabler/icons';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';


const useStyles = createStyles((theme) => ({
    header: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },

    inner: {
        height: 56,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    search: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
    linkSelected: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.gray[0],
        fontWeight: 500,
    },
    user: {
        color: theme.white,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
                0.1
            ),
        },

        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    userActive: {
        backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
            0.1
        ),
    },
}));

interface HeaderSearchProps {
    links: { link: string; label: string }[];
}

export function DashboardHeader({ links }: HeaderSearchProps) {
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const { classes, theme, cx } = useStyles();
    const router = useRouter();
    const session = useSession()
    console.log(session);
    
    const items = links.map((link) => (
        <Link
            key={link.label}
            href={link.link}
            className={router.route === link.link ? classes.linkSelected : classes.link}


        >
            {link.label}
        </Link>
    ));

    return (
        <Header height={56} className={classes.header} mb={120}>
            <div className={classes.inner}>
                <Group>
                    <Burger opened={opened} onClick={toggle} size="sm" />
                    <UnstyledButton>
                        <Group>
                            <IconLayoutKanban size={20} />
                            <Text>
                                Kamba
                            </Text>
                        </Group>
                    </UnstyledButton>
                </Group>

                <Group>
                    <Group ml={50} spacing={5} className={classes.links}>
                        {items}
                    </Group>
                    <Menu
                        width={260}
                        position="bottom-end"
                        transition="pop-top-right"
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                    >
                        <Menu.Target>
                            <UnstyledButton
                                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                            >
                                <Group spacing={7}>
                                    <Avatar src={session.data?.user?.image} alt={session.data?.user?.name || "PP"} radius="xl" size={20} />
                                    <Text weight={500} size="sm" sx={{ lineHeight: 1, color: theme.white }} mr={3}>
                                        {session.data?.user?.name}
                                    </Text>
                                    <IconChevronDown size={12} stroke={1.5} />
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Settings</Menu.Label>
                            <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>Account settings</Menu.Item>
                            <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
                                Change account
                            </Menu.Item>
                            <Menu.Item onClick={() => signOut({
                                callbackUrl: `${window.location.origin}/`
                            })} icon={<IconLogout size={14} stroke={1.5} />}>Logout</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </div>
        </Header>
    );
}