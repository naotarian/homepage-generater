import React from 'react'

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '確認メール送信',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>
}
