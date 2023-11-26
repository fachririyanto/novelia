'use client'

import React, { useState } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Textbox = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <input
            className="block w-full h-11 border-b border-app-border outline-none focus:border-app-primary"
            ref={ ref }
            { ...props }
        />
    )
})

export const TextboxWithIcon = React.forwardRef<HTMLInputElement, InputProps & { icon: string }>((props, ref) => {
    const { icon, ...rest } = props

    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className="relative">
            <span className="flex absolute inset-0 w-10 h-11 items-center">
                <span className={ `material-symbols-outlined text-app-${isFocused ? 'primary' : 'font-gray'}` }>{ icon }</span>
            </span>
            <input
                ref={ ref }
                className="block pl-10 h-11 w-full border-b border-app-border outline-none focus:border-app-primary"
                onFocus={ () => setIsFocused(true) }
                onBlur={ () => setIsFocused(false) }
                { ...rest }
            />
        </div>
    )
})