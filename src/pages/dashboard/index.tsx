import { AppShell, Loader } from '@mantine/core';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { DashboardHeader } from '../../components/DashboardHeader';
import { DashboardNavbar } from '../../components/DashboardNavbar';
import { MultipleContainers } from './components/MultipleContainers';
import { ShellLayout } from './components/ShellLayout';

const Dashboard = () => {
    const session = useSession();
    const router = useRouter();
    const [loadTasks, setLoadTasks] = useState(false)
    useEffect(() => {
        setLoadTasks(true)
    }, [])

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
            <title>Kamba - Gorevler</title>
        </Head>
        <ShellLayout>
            Anasayfa
        </ShellLayout>
    </>
    )
}

export default Dashboard;