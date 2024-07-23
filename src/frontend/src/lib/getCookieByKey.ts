export const getCookieByKey = (cookieString: string, key: string): string | null => {
    const cookies = cookieString.split(';').reduce((acc: { [key: string]: string }, cookie) => {
        const [name, value] = cookie.trim().split('=')
        acc[name] = value
        return acc
    }, {})

    return cookies[key] || null
}
