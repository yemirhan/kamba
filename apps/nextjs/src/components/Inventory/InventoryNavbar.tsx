import { createStyles, Navbar } from "@mantine/core";
import {
  IconBell,
  IconCategory,
  IconChartAreaLine,
  IconHistory,
  IconHome,
  IconPageBreak,
  IconSwitchHorizontal,
  IconTemplate,
} from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
    },
    label: {
      marginLeft: theme.spacing.xs,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

export function InventoryNavbar({
  isMenuCollapsed,
}: {
  isMenuCollapsed: boolean;
}) {
  const { classes, cx } = useStyles();
  const router = useRouter();

  const data = [
    {
      link: `/${router.query.workspaceId}/inventory`,
      label: "Ana Sayfa",
      icon: IconHome,
    },
    {
      link: `/${router.query.workspaceId}/inventory/sablon`,
      label: "Şablonlar",
      icon: IconTemplate,
    },
    {
      link: `/${router.query.workspaceId}/inventory/bildirimler`,
      label: "Bildirimler",
      icon: IconBell,
    },
    {
      link: `/${router.query.workspaceId}/inventory/kategoriler`,
      label: "Kategoriler",
      icon: IconCategory,
    },
    {
      link: `/${router.query.workspaceId}/inventory/liste`,
      label: "Envanter Listesi",
      icon: IconPageBreak,
    },
    {
      link: `/${router.query.workspaceId}/inventory/gecmis`,
      label: "Satış Geçmişi",
      icon: IconHistory,
    },
    {
      link: `/${router.query.workspaceId}/inventory/analiz`,
      label: "Analiz",
      icon: IconChartAreaLine,
    },
  ];
  const links = data.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.link === router.route,
      })}
      href={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      {isMenuCollapsed ? null : (
        <span className={classes.label}>{item.label}</span>
      )}
    </Link>
  ));

  return (
    <Navbar height={"full"} width={{ sm: isMenuCollapsed ? 84 : 300 }} p="md">
      <Navbar.Section grow>{links}</Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          {isMenuCollapsed ? null : (
            <span className={classes.label}>Change account</span>
          )}
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
