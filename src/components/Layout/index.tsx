import React, { FC } from 'react'
import './style.scss'
import block from 'bem-cn-lite'

const b = block('layout')

type Props = { children: React.ReactNode };

const Layout: FC<Props> = ({ children }) => {
    return (
        <div className={ b() }>
            <div className={ b('wrapper') }>
                {children}
            </div>
        </div>
    )
}

export default Layout