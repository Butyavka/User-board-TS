import './style.scss'
import React from 'react'
import block from 'bem-cn-lite'


const b = block('empty')

const Empty = () => {
    return (
        <div className={ b() }>
            No Data
        </div>
    )
}

export default Empty