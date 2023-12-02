import {
    Roboto,
    Source_Serif_4,
} from 'next/font/google'

export const sourceSerif4 = Source_Serif_4({ subsets: ['latin'] })

export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
})