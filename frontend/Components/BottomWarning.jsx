import React from 'react'
import {Link} from 'react-router-dom'

export default function BottomWarning({ sentence, to, buttonWarning }) {
    return (
        <>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {sentence} <Link to={to} className="font-medium text-primary-600 hover:underline dark:text-primary-500">{buttonWarning}</Link>
            </p>
        </>
    )
}
