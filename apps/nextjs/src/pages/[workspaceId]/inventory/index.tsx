
import { useRouter } from 'next/router';
import React from 'react'
import { ShellLayout } from '../../../components/ShellLayout';


const Inventory = () => {
    const router = useRouter();
    console.log(router.route);

    return (
        <ShellLayout>

        </ShellLayout>

    )
}

export default Inventory;