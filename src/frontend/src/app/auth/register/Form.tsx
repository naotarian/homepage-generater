// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { SetStateAction } from 'react'
import * as React from 'react'
import { useState } from 'react'

import Link from 'next/link'

import { Button, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

import InputError from '@/components/InputError'

import { useAuth } from '@/hooks/auth'



export default function Form() {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/verify-email',
    })

    const [lastName, setLastName] = useState('')
    const [lastNameKana, setLastNameKana] = useState('')
    const [firstName, setFirstName] = useState('')
    const [firstNameKana, setFirstNameKana] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [phone, setPhone] = useState('')
    const [sex, setSex] = useState('0')

    const [errors, setErrors] = useState([])


    const [birthYear, setBirthYear] = useState('')
    const [birthMonth, setBirthMonth] = useState('')
    const [birthDay, setBirthDay] = useState('')


    const yearChange = event => {
        setBirthYear(event.target.value)
    }
    const monthChange = event => {
        setBirthMonth(event.target.value)
    }
    const dayChange = event => {
        setBirthDay(event.target.value)
    }

    const yearSelectSet = () => {
        return [...Array(100)].map((_, i) => {
            return (
                <MenuItem value={1923 + i} key={i}>
                    {1923 + i}年
                </MenuItem>
            )
        })
    }
    const monthSelectSet = () => {
        return [...Array(12)].map((_, i) => {
            return (
                <MenuItem value={i + 1} key={i}>
                    {i + 1}月
                </MenuItem>
            )
        })
    }
    const daySelectSet = () => {
        if (!birthYear || !birthMonth) return
        let datesOfYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        const datesOfFebruary = isLeapYear(birthYear) ? 29 : 28
        datesOfYear = [31, datesOfFebruary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        return [...Array(datesOfYear[birthMonth - 1])].map((_, i) => {
            return (
                <MenuItem value={i + 1} key={i}>
                    {i + 1}日
                </MenuItem>
            )
        })
    }
    const isLeapYear = year =>
        (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

    const submitForm = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        await register({
            lastName,
            lastNameKana,
            firstName,
            firstNameKana,
            email,
            password,
            phone,
            password_confirmation: passwordConfirmation,
            dateOfBirth: `${birthYear}-${('00' + birthMonth).slice(-2)}-${('00' + birthDay).slice(-2)}`,
            sex,
            setErrors,
        })
    }
    return (
        <div className={'mt-[35px] pc:w-[370px] pc:mx-auto tb:w-[370px] tb:mx-auto'}>
            <form onSubmit={submitForm}>
                <section className={'mb-8'}>
                    <div className={'flex justify-between items-center bg-[#f2f2f2] px-4 py-1 mb-4'}>
                        <Typography variant={'body1'}>お名前</Typography>
                        <Typography
                            variant={'small'}
                            color="#fff"
                            className={'bg-[#F63838] px-2 rounded-sm sm:w-[40px] sm:h-[15px] text-center'}>必須</Typography>
                    </div>
                    <div>
                        <Typography variant={'body2'}>姓</Typography>
                        <TextField variant="outlined" size={'small'} fullWidth placeholder={'例) 山田'} className={'mb-3'}
                                   value={lastName}
                                   onChange={(event: {
                                       target: { value: SetStateAction<string> }
                                   }) => setLastName(event.target.value)}
                                   required
                                   autoFocus
                                   error={errors.lastName}
                                   helperText={errors.lastName}
                        />
                        <Typography variant={'body2'}>名</Typography>
                        <TextField variant="outlined" size={'small'} fullWidth placeholder={'例) 太郎'}
                                   value={firstName}
                                   onChange={(event: {
                                       target: { value: SetStateAction<string> }
                                   }) => setFirstName(event.target.value)}
                                   required
                                   autoFocus
                                   error={errors.firstName}
                                   helperText={errors.firstName}
                        />
                    </div>
                </section>
                <section className={'mb-8'}>
                    <div className={'flex justify-between items-center bg-[#f2f2f2] px-4 py-1 mb-4'}>
                        <Typography variant={'body1'}>フリガナ</Typography>
                        <Typography
                            variant={'small'}
                            color="#fff"
                            className={'bg-[#F63838] px-2 rounded-sm sm:w-[40px] sm:h-[15px] text-center'}>必須</Typography>
                    </div>
                    <Typography variant={'body2'}>姓</Typography>
                    <TextField variant="outlined"
                               size={'small'}
                               fullWidth
                               placeholder={'例) ヤマダ'}
                               className={'mb-3'}
                               value={lastNameKana}
                               onChange={(event: {
                                   target: { value: SetStateAction<string> }
                               }) => setLastNameKana(event.target.value)}
                               required
                               autoFocus
                               error={errors.lastNameKana}
                               helperText={errors.lastNameKana}
                    />
                    <Typography variant={'body2'}>名</Typography>
                    <TextField variant="outlined"
                               size={'small'}
                               fullWidth
                               placeholder={'例) タロウ'}
                               value={firstNameKana}
                               onChange={(event: {
                                   target: { value: SetStateAction<string> }
                               }) => setFirstNameKana(event.target.value)}
                               required
                               autoFocus
                               error={errors.firstNameKana}
                               helperText={errors.firstNameKana}
                    />
                </section>
                <section className={'mb-8'}>
                    <div className={'flex justify-between items-center bg-[#f2f2f2] px-4 py-1 mb-4'}>
                        <Typography variant={'body1'}>電話番号</Typography>
                        <Typography
                            variant={'small'}
                            color="#fff"
                            className={'bg-[#F63838] px-2 rounded-sm sm:w-[40px] sm:h-[15px] text-center'}>必須</Typography>
                    </div>
                    <TextField variant="outlined"
                               size={'small'}
                               fullWidth
                               placeholder={'例) 09012345678'}
                               value={phone}
                               onChange={(event: { target: { value: SetStateAction<string> } }) => setPhone(event.target.value)}
                               required
                               error={errors.phone}
                               helperText={errors.phone}
                    />
                </section>
                <section className={'mb-8'}>
                    <div className={'flex justify-between items-center bg-[#f2f2f2] px-4 py-1 mb-4'}>
                        <Typography variant={'body1'}>メールアドレス</Typography>
                        <Typography
                            variant={'small'}
                            color="#fff"
                            className={'bg-[#F63838] px-2 rounded-sm sm:w-[40px] sm:h-[15px] text-center'}>必須</Typography>
                    </div>
                    <TextField variant="outlined"
                               size={'small'}
                               fullWidth
                               placeholder={'例) example@email.com'}
                               value={email}
                               onChange={(event: { target: { value: SetStateAction<string> } }) => setEmail(event.target.value)}
                               required
                               error={errors.email}
                               helperText={errors.email}
                    />
                </section>
                <section className={'mb-8'}>
                    <div className={'flex justify-between items-center bg-[#f2f2f2] px-4 py-1 mb-4'}>
                        <Typography variant={'body1'}>生年月日</Typography>
                        <Typography
                            variant={'small'}
                            color="#fff"
                            className={'bg-[#F63838] px-2 rounded-sm sm:w-[40px] sm:h-[15px] text-center'}>必須</Typography>
                    </div>
                    <div className={'flex justify-between'}>
                        <FormControl sx={{ m: 1, minWidth: 100, maxWidth: 100 }} size="small">
                            <InputLabel id="birthYear">年</InputLabel>
                            <Select value={birthYear} label="年" onChange={yearChange} labelId={'birthYear'}>
                                {yearSelectSet()}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 100, maxWidth: 100 }} size="small">
                            <InputLabel>月</InputLabel>
                            <Select value={birthMonth} label="月" onChange={monthChange}>
                                {monthSelectSet()}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 100, maxWidth: 100 }} size="small">
                            <InputLabel>日</InputLabel>
                            <Select value={birthDay} label="日" onChange={dayChange}>
                                {daySelectSet()}
                            </Select>
                        </FormControl>
                    </div>
                    <InputError messages={errors.dateOfBirth} className="mt-2" />
                </section>


                <section className={'mb-8'}>
                    <div className={'flex justify-between items-center bg-[#f2f2f2] px-4 py-1 mb-4'}>
                        <Typography variant={'body1'}>性別</Typography>
                        <Typography
                            variant={'small'}
                            color="#fff"
                            className={'bg-[#F63838] px-2 rounded-sm sm:w-[40px] sm:h-[15px] text-center'}>必須</Typography>
                    </div>
                    <FormControl>
                        <RadioGroup
                            defaultValue=""
                            onChange={(e) => setSex(e.target.value)}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="男性" />
                            <FormControlLabel value="2" control={<Radio />} label="女性" />
                            <FormControlLabel value="3" control={<Radio />} label="その他" />
                            <FormControlLabel value="4" control={<Radio />} label="無回答" />
                        </RadioGroup>
                    </FormControl>
                    <InputError messages={errors.sex} className="mt-2" />
                </section>
                {/* Password */}
                <section className={'mb-8'}>
                    <div className={'flex justify-between items-center bg-[#f2f2f2] px-4 py-1 mb-4'}>
                        <Typography variant={'body1'}>パスワード</Typography>
                        <Typography
                            variant={'small'}
                            color="#fff"
                            className={'bg-[#F63838] px-2 rounded-sm sm:w-[40px] sm:h-[15px] text-center'}>必須</Typography>
                    </div>
                    <Typography variant={'body2'}>パスワード(8文字以上かつ英数字を含む)</Typography>
                    <TextField variant="outlined"
                               size={'small'}
                               fullWidth
                               placeholder={''}
                               value={password}
                               onChange={(event: {
                                   target: { value: SetStateAction<string> }
                               }) => setPassword(event.target.value)}
                               required
                               className={'mb-3'}
                               error={errors.password}
                               helperText={errors.password}
                    />
                    <Typography variant={'body2'}>確認用パスワード</Typography>
                    <TextField variant="outlined"
                               size={'small'}
                               fullWidth
                               placeholder={''}
                               value={passwordConfirmation}
                               onChange={(event: {
                                   target: { value: SetStateAction<string> }
                               }) => setPasswordConfirmation(event.target.value)}
                               required
                               error={errors.password_confirmation}
                               helperText={errors.password_confirmation}
                    />
                </section>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size={'large'}
                    className={'h-[55px] mb-3'}>登録</Button>
                <div className="flex items-center justify-end mt-4">
                    <Link href="/login" className="underline text-sm text-gray-600 hover:text-gray-900">
                        登録済みの方はこちら
                    </Link>
                </div>
            </form>
        </div>
    )
}