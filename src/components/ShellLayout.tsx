import { AppShell, Loader } from "@mantine/core";
import { chown } from "fs";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardNavbar } from "./DashboardNavbar";

export const ShellLayout = ({ children }: { children: React.ReactNode }) => {
    const session = useSession();
    const router = useRouter();
    if (session.status === "unauthenticated") {
        router.push("/login");
    }
    if (session.status === "loading") {
        return <div className='fixed inset-0 flex items-center justify-center'>
            <Loader />
        </div>
    }
    if (session.status === "unauthenticated") {
        return <div>asd</div>
    }
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
            ]} />}
            navbar={<DashboardNavbar />}
        >
            {children}
        </AppShell>
    </>
    )
}