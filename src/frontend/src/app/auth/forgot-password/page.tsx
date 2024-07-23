// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client'
import type { SetStateAction } from 'react'
import * as React from 'react'
import { useState } from 'react'

import { Button, TextField, Typography } from '@mui/material'

import AuthSessionStatus from '@/app/auth/AuthSessionStatus'

import { useAuth } from '@/hooks/auth'

const Page = () => {
    const { forgotPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState('')

    const submitForm = (event: { preventDefault: () => void }) => {
        event.preventDefault()

        forgotPassword({ email, setErrors, setStatus })
    }

    return (
        <div className="pc:max-w-[400px] pc:mx-auto">
            <Typography variant='subtitle1' className={'text-center font-medium'}>
                パスワードを忘れた方
            </Typography>
            <Typography className="leading-8 mb-4 text-center text-[#000000]" variant='body2'>
                ご登録のメールアドレスを入力ください。
                <br />
                入力いただいたメールアドレスに
                <br />
                パスワード再設定用のメールを送信します。
            </Typography>

            <AuthSessionStatus className="mb-4" status={status} />

            <form onSubmit={submitForm}>
                <TextField
                    value={email}
                    fullWidth
                    placeholder={'メールアドレスを入力'}
                    onChange={(event: { target: { value: SetStateAction<string> } }) =>
                        setEmail(event.target.value)
                    }
                    required
                    autoFocus
                    type={'email'}
                    error={errors?.email}
                    helperText={errors?.email}
                />

                <div className="flex items-center justify-end mt-4">
                    <Button
                        type="submit"
                        variant="contained"
                        color="disabled"
                        fullWidth
                        size='large'
                        className={'h-[55px] mb-3'}
                    >
                        送信
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Page
