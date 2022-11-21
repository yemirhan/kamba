import { AppShell, Loader } from '@mantine/core';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'
import { DashboardHeader } from '../../components/DashboardHeader';
import { DashboardNavbar } from '../../components/DashboardNavbar';
import { MultipleContainers } from './components/MultipleContainers';

const Dashboard = () => {
    const session = useSession();
    const router = useRouter();
    // if (session.status === "unauthenticated") {
    //     router.push("/login");
    // }
    // if (session.status === "loading") {
    //     return <div className='fixed inset-0 flex items-center justify-center'>
    //         <Loader  />
    //     </div>
    // }
    // if(session.status === "unauthenticated") {
    //     return <div>asd</div>
    // }
    return (<>
        <Head>
            <title>Kamba - Gorevler</title>
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
            <MultipleContainers
                containerStyle={{
                    maxHeight: '80vh',
                }}
                itemCount={15}
                scrollable
            />
        </AppShell>
    </>
    )
}

export default Dashboard;