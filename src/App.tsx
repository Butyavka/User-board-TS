import React, {useEffect, useState} from 'react'
import Layout from './components/Layout'
import {IUser, IUserList} from './types/types'
import {getUsers} from './api/getUsers'
import UserItem from './components/UserItem'
import './components/UserList/style.scss'
import Empty from './components/Empty'
import block from 'bem-cn-lite'
import Loading from './components/Loading'

const b = block('user-list')

const App = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [currentUser, setCurrentUser] = useState<IUser>()
  const [favoriteUsers, setFavoriteUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const lists = [
    {
      id: 'all',
      users: users,
      setUsers: setUsers,
      header: 'All Users'
    },
    {
      id: 'favorite',
      users: favoriteUsers,
      setUsers: setFavoriteUsers,
      header: 'Favorite Users'
    }
  ]

  useEffect(() => {
    setLoading(true)
    getUsers()
      .then(res => {
        setUsers(res.data)
        setLoading(false)
      })
      .catch(e => console.log(e))
  }, [])

  function dragStartHandler(user: IUser): () => void {
    return () => setCurrentUser(user)
  }

  function dragEndHandler(e: DragEvent, user: IUser): () => void {
    return () => setCurrentUser(user)
  }

  function dragOverHandler(user: IUser, board: IUserList): (e: any) => void {
    return (e) => {
      e.preventDefault()
      if (e.target.className === 'user-card__header') {
        e.target.style.backgroundColor = '#48BCD9'
      }
    }
  }

  function dragLeaveHandler(user: IUser, board: IUserList): (e: any) => void  {
    return (e) => {
      e.preventDefault()
      if (e.target.className === 'user-card__header') {
        e.target.style.backgroundColor = ''
      }
    }
  }

  function dropHandler(user: IUser, board: IUserList): (e: DragEvent) => void {
    return (e: DragEvent) => e.preventDefault()
  }

  const getContent = (users: IUser[], list: IUserList) => {
    const empty = users.length === 0
    if (empty) return <Empty/>

    return (
      <div className={ b('list') }>
        {users.map(user => (
          <UserItem
            key={ user.id }
            onDrop={ dropHandler(user, list) }
            onDragStart={ dragStartHandler(user) }
            onDragEnd={ (e: DragEvent, user: IUser) => dragEndHandler(e, user) }
            onDragOver={ dragOverHandler(user, list) }
            onDragLeave={ dragLeaveHandler(user, list) }
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
    <Layout>
      <div style={{ display: 'flex', columnGap: '20px', paddingTop: '40px' }} className="dasdf">
        {lists.map(list => (
          <div key={list.id } className={ b('list') }>
            <div className={ b() }>
              <div  className={ b('header') }>
                {list.header}
              </div>
              {loading ? <Loading/> : getContent(list.users, list)}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default App