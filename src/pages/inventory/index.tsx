import { useRouter } from 'next/router';
import React from 'react'

const Inventory = () => {
    const router = useRouter();
    console.log(router.route);

    return (
        <div>index</div>
    )
}

export default Inventory;