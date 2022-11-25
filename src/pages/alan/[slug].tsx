import { useRouter } from 'next/router'
import React from 'react'
import { ShellLayout } from '../../components/ShellLayout'
import { trpc } from '../../utils/trpc'

const Workspace = () => {
    const router = useRouter()
    const { data, isLoading } = trpc.boards.getBoardBySlug.useQuery({ slug: router.query.slug as string, workspaceId: router.query.workspaceId as string })
    console.log(data);

    return (
        <ShellLayout>

        </ShellLayout>
    )
}

export default Workspace