// // eslint-disable-next-line import/no-named-as-default
// import Axios from 'axios'
//
// const axios = Axios.create({
//   baseURL: process.browser
//     ? process.env.NEXT_PUBLIC_BACKEND_URL
//     : process.env.NEXT_PUBLIC_CONTAINER_ROOT,
//   headers: {
//     'Content-Type': 'application/json',
//     'X-Requested-With': 'XMLHttpRequest',
//   },
//   xsrfHeaderName: 'X-XSRF-TOKEN',
//   withCredentials: true,
//   withXSRFToken: true,
// })
// export default axios

// eslint-disable-next-line import/no-named-as-default
import Axios from 'axios'

import type { AxiosError } from 'axios'

const axios = Axios.create({
    baseURL: process.browser
        ? process.env.NEXT_PUBLIC_BACKEND_URL
        : process.env.NEXT_PUBLIC_CONTAINER_ROOT,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    xsrfHeaderName: 'X-XSRF-TOKEN',
    withCredentials: true,
    withXSRFToken: true,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError === true
}

export default axios
