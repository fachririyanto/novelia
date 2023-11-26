interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
    return (
        <button
            className="flex w-full h-11 px-4 bg-app-primary text-white font-semibold uppercase rounded-[40px] border-0 outline-none text-sm items-center justify-center"
            { ...props }
            />
    )
}