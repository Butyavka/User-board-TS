import React, { FC } from 'react'
import {IICON} from '../types/types'

const Icon: FC<IICON> = ({ icon, className }) => {
    return (
        <div className={ className ? className : '' }>
            {icon}
        </div>
    )
}

export default Icon