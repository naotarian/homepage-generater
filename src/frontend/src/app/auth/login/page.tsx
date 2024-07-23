import Image from 'next/image'

import Form from '@/app/auth/login/Form'

export default function Home() {
    return (
        <div className={'w-[375px] mx-auto'}>
            <div
                className={'relative pc:w-[375px] pc:h-[100px] tb:w-[375px] tb:h-[100px] sp:w-[375px] sp:h-[120px] mt-[100px]'}>
                <Image
                    alt="BITSLEEPのロゴ"
                    src="/images/common/logo.webp"
                    fill
                    style={{
                        objectFit: 'contain',
                    }}
                />
            </div>
            <Form />
        </div>
    )
}