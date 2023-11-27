interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    className?: string,
}

export function Button({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            className={ `h-11 px-6 font-semibold uppercase border-0 outline-none text-sm items-center justify-center ${className}` }
            { ...rest }
        >
            { children }
        </button>
    )
}