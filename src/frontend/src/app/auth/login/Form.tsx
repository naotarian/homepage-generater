// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client'
import type { SetStateAction } from 'react'
import * as React from 'react'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
    Button,
    Divider,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from '@mui/material'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import '@/styles/googleSignInButton.css'
import axios from '@/lib/axios'

import AuthSessionStatus from '@/app/auth/AuthSessionStatus'

import { useAuth } from '@/hooks/auth'

export default function Form() {
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/select/facility',
    })
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState<string | null>(null)
    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    }, [router.reset, errors.length])

    const submitForm = async (event: { preventDefault: () => void }) => {
        event.preventDefault()

        await login({
            email,
            password,
            remember: false,
            setErrors,
            setStatus,
        })
    }

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const google = async (): Promise<void> => {
        const res = await axios.get('/auth/google/admin')
        window.location.href = res.data
    }
    return (
        <div>
            <AuthSessionStatus className="mb-3" status={status} />
            <form onSubmit={submitForm}>
                {/* Email Address */}
                <div>
                    <TextField
                        label="メールアドレス"
                        value={email}
                        fullWidth
                        onChange={(event: { target: { value: SetStateAction<string> } }) =>
                            setEmail(event.target.value)
                        }
                        required
                        autoFocus
                        type={'email'}
                        error={errors?.email}
                        helperText={errors?.email}
                    />
                    <FormControl variant="outlined" fullWidth className={'my-3'}>
                        <InputLabel htmlFor="outlined-adornment-password">パスワードを入力</InputLabel>
                        <OutlinedInput
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(event: { target: { value: SetStateAction<string> } }) =>
                                setPassword(event.target.value)
                            }
                            required
                            error={errors?.password}
                            autoComplete="current-password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="パスワードを入力"
                        />
                    </FormControl>
                </div>

                {/* Remember Me */}
                {/*<div className="block mt-4">*/}
                {/*  <label htmlFor="remember_me" className="inline-flex items-center">*/}
                {/*    <input*/}
                {/*      id="remember_me"*/}
                {/*      type="checkbox"*/}
                {/*      name="remember"*/}
                {/*      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"*/}
                {/*      onChange={(event) => setShouldRemember(event.target.checked)}*/}
                {/*    />*/}
                {/*    <span className="ml-2 text-sm text-gray-600">Remember me</span>*/}
                {/*  </label>*/}
                {/*</div>*/}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size={'large'}
                    className={'h-[55px] mb-3'}
                >
                    ログイン
                </Button>
            </form>
            <Button variant="outlined" color="primary" fullWidth href="/register" className={'h-[55px]'}>
                新規登録
            </Button>
            <div className="flex items-center justify-end mt-[9px]">
                <Link
                    href="/forgot-password"
                    className="underline text-sm text-gray-600 hover:text-gray-900"
                >
                    <Typography variant={'body2'}>パスワードをお忘れですか？</Typography>
                </Link>
            </div>
            <Divider className={'mt-[49px] my-[43px]'}>
                <Typography variant={'body2'} className={'mx-[22px]'}>
                    または
                </Typography>
            </Divider>
            <button className="gsi-material-button w-full mb-3" onClick={google}>
                <div className="gsi-material-button-state"></div>
                <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className="block"
                        >
                            <path
                                fill="#EA4335"
                                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                            ></path>
                            <path
                                fill="#4285F4"
                                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                            ></path>
                            <path
                                fill="#FBBC05"
                                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                            ></path>
                            <path
                                fill="#34A853"
                                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                            ></path>
                            <path fill="none" d="M0 0h48v48H0z"></path>
                        </svg>
                    </div>
                    <span className="gsi-material-button-contents">Googleでサインイン</span>
                    <span className="hidden">Sign in with Google</span>
                </div>
            </button>
            {/*<div className="fb-login-button" data-width="" data-size="" data-button-type="" data-layout=""*/}
            {/*     data-auto-logout-link="false" data-use-continue-as="false"></div>*/}
        </div>
    )
}
