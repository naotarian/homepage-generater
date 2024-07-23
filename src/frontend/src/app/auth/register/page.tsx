'use client'

import * as React from 'react'

import { Typography } from '@mui/material'

import Form from '@/app/auth/register/Form'

const Page = () => {
    return (
        <>
            <Typography variant={'subtitle1'} className={'text-center'}>
                新規会員登録
            </Typography>
            <Form />
        </>
    )
}

export default Page
