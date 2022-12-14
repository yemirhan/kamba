import { AppShell } from "@mantine/core";
import type { GetServerSideProps } from "next";

import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardNavbar } from "./DashboardNavbar";


export const ShellLayout = ({ children }: { children: React.ReactNode }) => {
    const [menu, setMenu] = useState(false)
    const { query } = useRouter()
    return (<>
        <Head>
            <title>Kamba</title>
            <link rel="icon" href="/layout-kanban.svg" />
        </Head>
        <AppShell
            header={<DashboardHeader links={[{
                label: "Görevler",
                link: `/${query.workspaceId}/workspace`,
                pageType: "workspace"
            },
            {
                label: "Envanter",
                link: `/${query.workspaceId}/inventory`,
                pageType: "inventory"
            },
            {
                label: "Faturalar",
                link: `/${query.workspaceId}/invoices`,
                pageType: "invoices"
            },
            {
                label: "Masa Takip",
                link: `/${query.workspaceId}/tables`,
                pageType: "tables"
            }
            ]}
                isMenuCollapsed={menu}
                setMenuCollapse={() => setMenu(e => !e)}
            />}
            navbar={<DashboardNavbar isMenuCollapsed={menu} />}
        >
            {children}
        </AppShell>
    </>
    )
}