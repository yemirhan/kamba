import { api } from "@acme/api/src/client";
import { UserButton } from "@clerk/nextjs";
import { createStyles, Header, Group, Burger, Tooltip } from "@mantine/core";

import { dark } from "@clerk/themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Logo } from "./Logo";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
  linkSelected: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[1]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.teal[9]
        : theme.colors.gray[0],
    fontWeight: 500,
  },
  user: {
    color: theme.white,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1,
      ),
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1,
    ),
  },
}));

interface HeaderSearchProps {
  links: { link: string; label: string; pageType: string }[];
  isMenuCollapsed?: boolean;
  setMenuCollapse?: () => void;
}

export function DashboardHeader({
  links,
  isMenuCollapsed,
  setMenuCollapse,
}: HeaderSearchProps) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { classes, theme, cx } = useStyles();
  const router = useRouter();
  const { data: clerkuser } = api.auth.getSession.useQuery();
  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={
        (router.route.split("/")[2] || "").includes(link.pageType)
          ? classes.linkSelected
          : classes.link
      }
    >
      {link.label}
    </Link>
  ));

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        {isMenuCollapsed !== undefined ? (
          <Group>
            <Burger
              opened={isMenuCollapsed || false}
              onClick={setMenuCollapse}
              size="sm"
            />
            <Tooltip label="Tüm Çalışma Alanları" position="bottom">
              <Logo href="/workspaces" />
            </Tooltip>
          </Group>
        ) : (
          <Logo href="/workspaces" />
        )}

        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            {items}
          </Group>
          <UserButton
            showName
            appearance={{
              baseTheme: dark,
            }}
          />
        </Group>
      </div>
    </Header>
  );
}
