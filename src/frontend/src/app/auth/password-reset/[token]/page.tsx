// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client'
import type { SetStateAction } from 'react'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { Button, TextField, Typography } from '@mui/material'

import AuthSessionStatus from '@/app/(top)/(auth)/AuthSessionStatus'

import { useAuth } from '@/hooks/auth'

const PasswordReset = () => {
    const searchParams = useSearchParams()
    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = async (event: { preventDefault: () => void }) => {
        event.preventDefault()

        await resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        setEmail(searchParams?.get('email'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.get('email')])

    return (
        <div className="pc:max-w-[400px] pc:mx-auto">
            {/* Session Status */}
            <AuthSessionStatus className="mb-4" status={status} />

            <form onSubmit={submitForm}>
                <div className="mt-4">
                    <Typography variant={'body2'} className={'mb-1'}>
                        メールアドレス
                    </Typography>
                    <TextField
                        type="email"
                        value={email}
                        disabled
                        fullWidth
                        required
                        autoFocus
                        error={errors?.email}
                        helperText={errors?.email}
                    />
                </div>
                <div className="mt-4">
                    <Typography variant={'body2'} className={'mb-1'}>
                        新しいパスワード
                    </Typography>
                    <TextField
                        type="password"
                        value={password}
                        fullWidth
                        placeholder={'パスワードを入力'}
                        onChange={(event: { target: { value: SetStateAction<string> } }) =>
                            setPassword(event.target.value)
                        }
                        required
                        autoFocus
                        error={errors?.password}
                        helperText={errors?.password}
                    />
                </div>
                <div className="mt-4">
                    <Typography variant={'body2'} className={'mb-1'}>
                        新しいパスワード(確認用)
                    </Typography>
                    <TextField
                        type="password"
                        value={passwordConfirmation}
                        fullWidth
                        placeholder={'パスワードを入力'}
                        onChange={(event: { target: { value: SetStateAction<string> } }) =>
                            setPasswordConfirmation(event.target.value)
                        }
                        required
                        autoFocus
                        error={errors?.passwordConfirmation}
                        helperText={errors?.passwordConfirmation}
                    />
                </div>

                {/* Confirm Password */}
                {/*<div className="mt-4">*/}
                {/*  <Label htmlFor="passwordConfirmation">Confirm Password</Label>*/}

                {/*  <Input*/}
                {/*    id="passwordConfirmation"*/}
                {/*    type="password"*/}
                {/*    value={passwordConfirmation}*/}
                {/*    className="block mt-1 w-full"*/}
                {/*    onChange={(event: {*/}
                {/*      target: { value: SetStateAction<string> }*/}
                {/*    }) => setPasswordConfirmation(event.target.value)}*/}
                {/*    required*/}
                {/*  />*/}
                {/*  /!* @ts-ignore *!/*/}
                {/*  <InputError messages={errors.password_confirmation} className="mt-2" />*/}
                {/*</div>*/}

                <div className="flex items-center justify-end mt-4">
                    <Button
                        type="submit"
                        variant="contained"
                        color="disabled"
                        fullWidth
                        size={'large'}
                        className={'h-[55px] mb-3'}
                    >
                        再設定
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PasswordReset
