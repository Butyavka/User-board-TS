import './style.scss'
import React, {FC, useState} from 'react'
import {User, UserList} from '../../types/types'
import UserItem from '../UserItem'
import block from 'bem-cn-lite'
import Loading from '../Loading'
import Empty from '../Empty'
const b = block('user-list')

const UserList: FC<UserList> = ({ users, loading, header }) => {
  const [currentUser, setCurrentUser] = useState<User>()

  const empty = users.length === 0

  function dragStartHandler(user: User): () => void {
    return () => setCurrentUser(user)
  }
  const getContent = () => {
    if (empty) return <Empty/>

    return (
      <div className={ b('list') }>
        {users.map(user => (
          <UserItem
            key={ user.id }
            onDragStart={ dragStartHandler(user) }
            draggable={ true }
            id={ user.id }
            avatar_url={ user.avatar_url }
            html_url={ user.html_url }
            login={ user.login }
          />
        ))}
      </div>
    )
  }

  return (
    <div className={ b() }>
      <div  className={ b('header') }>
        {header}
      </div>
      {loading ? <Loading/> : getContent()}
    </div>
  )
}

export default UserList