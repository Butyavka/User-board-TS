import './style.scss'
import React, { FC } from 'react'
import { UserList as IUserList } from '../../types/types'
import block from 'bem-cn-lite'
import Loading from '../Loading'
const b = block('user-list')

const UserList: FC<IUserList> = ({ users, loading, header, onDrop, onDragOver, active }) => (
  <div className={ b() }>
    <div  className={ b('header') }>
      {header}
    </div>
    {loading ? <Loading/> : (
      <div
        className={ b('list', {active}) }
        onDrop={ (e) => onDrop && onDrop(e) }
        onDragOver={ (e) => onDragOver && onDragOver(e) }
      >
        {users}
      </div>
    )}
  </div>
)

export default UserList