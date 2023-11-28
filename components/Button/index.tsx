import Link, { LinkProps } from 'next/link'

type ButtonProps = {
    children: React.ReactNode,
    className?: string,
    variant?: 'primary' | 'default',
}

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    alias: 'button',
} | React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    alias: 'a',
} | LinkProps & {
    alias: 'link',
}

export type ButtonTypeProps = ButtonType & ButtonProps

export function Button({ children, className, variant, ...rest }: ButtonTypeProps) {
    className = `inline-flex h-11 px-6 font-semibold uppercase border-0 outline-none text-sm items-center justify-center rounded-[40px] ${className}`

    switch (variant) {
        case 'primary':
            className = `${className} bg-app-primary text-white`
            break
        default:
            className = `${className} bg-app-black text-white`
            break
    }

    switch (rest.alias) {
        case 'a':
            return (
                <a className={ className } { ...rest }>
                    { children }
                </a>
            )
        case 'link':
            return (
                <Link className={ className } { ...rest }>
                    { children }
                </Link>
            )
        case 'button':
            return (
                <button className={ className } { ...rest }>
                    { children }
                </button>
            )
    }
}