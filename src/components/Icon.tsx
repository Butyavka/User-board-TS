import React, { FC } from 'react'
import {Icon} from '../types/types'

const Icon: FC<Icon> = ({ icon, className }) => {
  return (
    <div className={ className ? className : '' }>
      {icon}
    </div>
  )
}

export default Icon