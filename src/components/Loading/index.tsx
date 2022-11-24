import './style.scss'
import React from 'react'
import block from 'bem-cn-lite'

const b = block('loading')

const Loading = () => {
  return (
    <div className={ b() }>
      Loading
    </div>
  )
}

export default Loading