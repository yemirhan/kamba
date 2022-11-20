import { createStyles, Container, Group, Anchor } from '@mantine/core';
import Link, { LinkProps } from 'next/link';
import { Logo } from './Logo';


const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: 120,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));

interface FooterSimpleProps {
    links: { link: string; label: string }[];
}

export function SplashFooter({ links }: FooterSimpleProps) {
    const { classes } = useStyles();
    const items = links.map((link) => (
        <Anchor component={Link}
            color="dimmed"
            key={link.label}
            href={link.link}
            
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Logo />
                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    );
}