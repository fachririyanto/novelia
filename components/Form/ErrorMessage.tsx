export function ErrorMessage({ message }: { message: string }) {
    return (
        <p className="mt-1 text-sm text-red-500 text-left">
            { message }
        </p>
    )
}