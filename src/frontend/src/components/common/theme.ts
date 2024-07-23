import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
    interface Palette {
        disabled: {
            main: string
        }
        danger: {
            main: string
        }
        dark: {
            main: string
        }
    }

    interface PaletteOptions {
        disabled?: {
            main?: string
            contrastText?: string
        }
        danger?: {
            main?: string
            contrastText?: string
        }
        dark?: {
            main?: string
            contrastText?: string
        }
    }

    interface TypographyVariants {
        small: React.CSSProperties
        body1_cap: React.CSSProperties
        body2_cap: React.CSSProperties
        body3_cap: React.CSSProperties
        body1_bold: React.CSSProperties
        body2_bold: React.CSSProperties
        body3: React.CSSProperties
        body3_bold: React.CSSProperties
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        small?: React.CSSProperties
        body1_cap?: React.CSSProperties
        body2_cap?: React.CSSProperties
        body3_cap?: React.CSSProperties
        body1_bold?: React.CSSProperties
        body2_bold?: React.CSSProperties
        body3?: React.CSSProperties
        body3_bold?: React.CSSProperties
    }
}
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        disabled: true
        danger: true
        dark: true
    }
}
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        small: true
        body1_cap: true
        body2_cap: true
        body3_cap: true
        body1_bold: true
        body2_bold: true
        body3: true
        body3_bold: true
    }
}
const theme = createTheme({
    palette: {
        primary: {
            main: '#F4B321',
            contrastText: '#fff',
        },
        disabled: {
            main: '#B9B9B9',
            contrastText: '#fff',
        },
        danger: {
            main: '#F63838',
            contrastText: '#fff',
        },
        dark: {
            main: '#291803',
            contrastText: '#fff',
        },
    },
    typography: {
        // 通常
        body1: {
            fontSize: 16,
            color: '#291803',
        },
        body1_bold: {
            fontSize: 16,
            color: '#291803',
            fontWeight: 'bold',
        },
        body1_cap: {
            fontSize: 16,
            color: '#868686',
        },
        body2: {
            fontSize: 14,
            color: '#291803',
        },
        body2_bold: {
            fontSize: 14,
            color: '#291803',
            fontWeight: 'bold',
        },
        body2_cap: {
            fontSize: 14,
            color: '#868686',
        },
        body3: {
            fontSize: 12,
            color: '#291803',
        },
        body3_bold: {
            fontSize: 12,
            color: '#291803',
            fontWeight: 'bold',
        },
        body3_cap: {
            fontSize: 12,
            color: '#868686',
        },
        small: {
            fontSize: 10,
            color: '#868686',
        },
        // ページタイトル系
        subtitle1: {
            fontSize: 20,
            color: '#291803',
        },
    },
})
export default theme
