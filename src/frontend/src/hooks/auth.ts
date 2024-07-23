// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect } from 'react'

import { useParams, useRouter } from 'next/navigation'

import useSWR from 'swr'

import axios from '@/lib/axios'


export const useAuth = ({
                            middleware = 'guest',
                            redirectIfAuthenticated,
                        }): {
    middleware: string
    redirectIfAuthenticated?: string
} => {
    const router = useRouter()
    const params = useParams()

    const {
        data: user,
        error,
        mutate,
    } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then((res) => res.data)
            .catch((error) => {
                if (error.response.status !== 409) throw error
                if (error.response.status === 409) router.push('/verify-email')
            }),
    )

    const csrf = async () => await axios.get('/sanctum/csrf-cookie')
    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/admin/register', props)
            .then(() => mutate())
            .catch((error) => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf()
        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch((error) => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/admin/forgot-password', { email })
            .then((response) => setStatus(response.data.status))
            .catch((error) => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/admin/reset-password', { token: params.token, ...props })
            .then(() => router.push('/auth/login'))
            // .then((response) => router.push('/login?reset=' + btoa(response?.data?.status)))
            .catch((error) => {
                if (error.response?.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/admin/email/verification-notification')
            .then((response) => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }
        window.location.pathname = '/auth/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        // if (middleware == 'auth' && !user) router.push('/login')
        if (window.location.pathname === '/verify-email' && user?.email_verified_at)
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
