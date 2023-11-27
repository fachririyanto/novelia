interface AlertProps {
    message: string,
    variant: string,
}

export function Alert(props: AlertProps) {
    const { message, variant } = props

    let classes = ''

    switch (variant) {
        case 'success':
            classes = 'bg-green-50 text-green-800'
            break
        case 'error':
            classes = 'bg-red-50 text-red-800'
            break
        default:
            classes = 'bg-blue-50 text-blue-800'
            break
    }

    return (
        <div className={ `flex items-center p-4 mb-4 rounded-lg leading-tight ${classes}` } role="alert">
            <div className="text-sm font-medium">
                { message }
            </div>
        </div>
    )
}