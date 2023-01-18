import { AppShell, Container, Stack } from "@mantine/core";
import type { GetServerSideProps } from "next";

import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { DashboardHeader } from "../DashboardHeader";
import { TableNavbar } from "./TableNavbar";



export const TablesLayout = ({ children }: { children: React.ReactNode }) => {
    const [menu, setMenu] = useState(false)
    const { query } = useRouter()
    return (<>
        <Head>
            <title>Kamba</title>

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
            navbar={<TableNavbar isMenuCollapsed={menu} />}
        >
            <Container>
                <Stack>
                    {children}
                </Stack>
            </Container>
        </AppShell>
    </>
    )
}