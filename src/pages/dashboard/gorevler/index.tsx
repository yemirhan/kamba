import React, { useEffect, useState } from 'react'
import { MultipleContainers } from '../components/MultipleContainers'
import { ShellLayout } from '../components/ShellLayout'

const Tasks = () => {
    const [loadable, setLoadable] = useState(false)
    useEffect(() => {
        setLoadable(true)
    }, [])

    return (
        <ShellLayout>
            {
                loadable && <MultipleContainers
                    containerStyle={{
                        maxHeight: '70vh',
                    }}
                    itemCount={15}
                    scrollable
                />
            }
        </ShellLayout>
    )
}

export default Tasks