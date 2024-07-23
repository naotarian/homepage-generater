// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client'

import * as React from 'react'
import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { Button, Typography } from '@mui/material'

import { useAuth } from '@/hooks/auth'

const Page = () => {
    const { resendEmailVerification, logout } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/',
    })
    const params = useSearchParams()
    const [status, setStatus] = useState(null)

    return (
        <div className={'pc:max-w-[800px] mx-auto'}>
            {!params.st && (
                <Typography className="leading-8 mb-4 text-center text-[#000000] mb-7" variant={'body2'}>
                    ご登録ありがとうございます。<br />
                    入力いただいたメールアドレスに<br />
                    確認メールを送信しました。
                </Typography>
            )}

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    確認メールを再送しました。
                </div>
            )}

            <div className="mt-4 flex items-center justify-between gap-4">
                <Button
                    type="button"
                    variant="contained"
                    color="success"
                    onClick={() => resendEmailVerification({ setStatus })}
                    fullWidth
                    size={'large'}
                    className={'h-[55px] mb-3'}>再送</Button>
                <Button
                    type="button"
                    variant="contained"
                    color="disabled"
                    onClick={logout}
                    fullWidth
                    size={'large'}
                    className={'h-[55px] mb-3'}>ログアウト</Button>
            </div>
        </div>
    )
}

export default Page
