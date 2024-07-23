'use client'
import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'

import axios from '@/lib/axios'

const GoogleCallback = () => {
    const searchParams = useSearchParams()
    useEffect(() => {
        (async () => {
            await axios.get('/auth/google/callback/admin', {
                params: {
                    state: searchParams.get('state'),
                    code: searchParams.get('code'),
                    scope: searchParams.get('scope'),
                    authuser: searchParams.get('authuser'),
                    hd: searchParams.get('hd'),
                    prompt: searchParams.get('prompt'),
                },
            })
            window.location.pathname = '/'
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <p>認証中...</p>
        </>
    )
}

export default GoogleCallback
