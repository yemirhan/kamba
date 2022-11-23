import { useRouter } from 'next/router'
import React from 'react'
import { ShellLayout } from '../../components/ShellLayout'
import { trpc } from '../../utils/trpc'

const Workspace = () => {
    const router = useRouter()
    const { data, isLoading } = trpc.workspaces.getWorkspaceBySlug.useQuery({ slug: router.query.slug as string })
    console.log(data);

    return (
        <ShellLayout>

        </ShellLayout>
    )
}

export default Workspace