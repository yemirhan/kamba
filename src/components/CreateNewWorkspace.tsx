import { Button, Group, Modal, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { trpc } from '../utils/trpc';

export const CreateNewWorkspace = ({ open, setClose }: { open: boolean; setClose: () => void; }) => {
    const [title, setTitle] = useState("");
    const { query: { workspaceId } } = useRouter()
    const context = trpc.useContext();
    const { mutate, isLoading, } = trpc.boards.createNewBoard.useMutation({
        onSuccess: () => {
            context.boards.getUserBoards.invalidate();
            setClose();
        },
        onError: () => {
            showNotification({
                title: "Hata",
                message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
            });
        }
    });
    return (
        <Modal
            title="Yeni Çalışma Alanı Oluştur"
            opened={open}
            onClose={setClose}
        >
            <TextInput my={"md"} placeholder='Benim Çalıma Alanım' label='Çalışma Alanı Adı' value={title} onChange={({ target: { value } }) => setTitle(value)} />
            <Group position='right'>
                <Button
                    loading={isLoading}
                    onClick={() => mutate({
                        name: title,
                        workspaceId: workspaceId as string
                    })}
                    disabled={title.length < 3}>
                    Oluştur
                </Button>
            </Group>
        </Modal>
    );
};
