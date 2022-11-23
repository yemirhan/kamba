import { AppShell } from "@mantine/core";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React, { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardNavbar } from "./DashboardNavbar";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx);
    if (!session) {
        return {
            redirect: {
                destination: '/auth/signin',
                permanent: false,
            },
        };
    }
    return {
        props: {
            session,
        },
    };
}

export const ShellLayout = ({ children }: { children: React.ReactNode }) => {
    const [menu, setMenu] = useState(false)
    return (<>
        <Head>
            <title>Kamba</title>
            <link rel="icon" href="/layout-kanban.svg" />
        </Head>
        <AppShell
            header={<DashboardHeader links={[{
                label: "Görevler",
                link: "/dashboard"
            },
            {
                label: "Envanter",
                link: "/inventory"
            },
            {
                label: "Faturalar",
                link: "/invoices"
            },
            {
                label: "Masa Takip",
                link: "/tables"
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