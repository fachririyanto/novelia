import React from 'react'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string,
    widthRatio: number,
    heightRatio: number,
    bgDefault?: string,
}

export function ImageCover({ className, widthRatio, heightRatio, loading, src, alt, bgDefault }: ImageProps) {
    const ratio = heightRatio / widthRatio * 100;

    return (
        <figure
            className={ `relative overflow-hidden ${className}` }
            style={ { paddingTop: `${ratio}%`, backgroundColor: bgDefault } }>
            <picture className="flex absolute inset-0 overflow-hidden">
                { src ? <img loading={ loading } src={ src } alt={ alt } className="block w-full h-full object-cover outline-none border-none" /> : null }
            </picture>
        </figure>
    )
}