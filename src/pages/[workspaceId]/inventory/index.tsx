import { ShellLayout } from '@/components/ShellLayout';
import { useRouter } from 'next/router';
import React from 'react'


const Inventory = () => {
    const router = useRouter();
    console.log(router.route);

    return (
        <ShellLayout>

        </ShellLayout>

    )
}

export default Inventory;