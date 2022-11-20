import { Container, Paper, Stack, Title } from '@mantine/core';
import React from 'react'
import { Logo } from '../../components/Logo';

export const VerifyRequest = () => {
    return (
        <div className='flex flex-col fixed items-center justify-center inset-0'>
            <Container size={"lg"}>
                <Paper withBorder p={"lg"}>
                    <Stack align={"center"}>
                        <Logo />
                        <Title>
                            Mesaj Gönderildi!
                        </Title>
                    </Stack>
                </Paper>
            </Container>
        </div>
    )
}
export default VerifyRequest;