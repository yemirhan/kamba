
import type { GetServerSideProps } from 'next'
import React from 'react'
import { ShellLayout } from '../../components/ShellLayout'

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     return await getAuth(ctx, () => {
//         return {
//             redirect: {
//                 destination: '/workspaces',
//                 permanent: false,
//             },
//         }
//     })
// }
const Dashboard = () => {
    return (
        <ShellLayout>

        </ShellLayout>
    )
}

export default Dashboard