import React, {useEffect, useState} from 'react'
import Layout from './components/Layout'
import {id, User, UserList} from './types/types'
import {getUsers} from './api/getUsers'
import UserItem from './components/UserItem'
import './components/UserList/style.scss'
import Empty from './components/Empty'
import block from 'bem-cn-lite'
import Loading from './components/Loading'

const b = block('user-list')

const LISTS = {
  ALL: 'all',
  FAVORITE: 'favorite'
}

const App = () => {
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User>()
  const [currentList, setCurrentList] = useState<UserList>()
  const [favoriteUsers, setFavoriteUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const lists = [
    {
      id: LISTS.ALL,
      users: users,
      setUsers: setUsers,
      header: 'All Users'
    },
    {
      id: LISTS.FAVORITE,
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
        setFavoriteUsers([res.data[0]])
        setLoading(false)
      })
      .catch(e => console.log(e))
  }, [])

  function dragStartHandler(user: User, list: UserList): () => void {
    return () => {
      setCurrentUser(user)
      setCurrentList(list)
    }
  }

  function dragEndHandler(e: DragEvent, user: User): () => void {
    return () => setCurrentUser(user)
  }

  function dragOverHandler(): (e: any) => void {
    return (e) => {
      e.preventDefault()
      if (e.target.className === 'user-card__header') {
        e.target.style.backgroundColor = '#48BCD9'
      }
    }
  }

  function dragLeaveHandler(): (e: any) => void  {
    return (e) => {
      e.preventDefault()
      if (e.target.className === 'user-card__header') {
        e.target.style.backgroundColor = ''
      }
    }
  }

  function dropHandler(user: User, list: UserList): (e: DragEvent) => void {
    return (e: DragEvent) => {
      e.preventDefault()
      if (list.id === LISTS.FAVORITE && currentUser) {
        const isFavoriteUser = !!favoriteUsers.find((user: User) => user.id === currentUser.id)

        if (isFavoriteUser) return null

        setFavoriteUsers([...favoriteUsers, currentUser])
      }
    }
  }

  const isFavorite = (id: string | number) => {
    return !!favoriteUsers.find((user: User) => user.id === id)
  }

  const deleteFromFavorite = (id: id) => {
    return () => console.log(id)
  }

  const getContent = (users: User[], list: UserList) => {
    const empty = users.length === 0
    // if (empty) return <Empty/>

    return (
      <div className={ b('list') }>
        {users.map(user => (
          <UserItem
            key={ user.id }
            onDrop={ dropHandler(user, list) }
            onDragStart={ dragStartHandler(user, list) }
            onDragEnd={ (e: DragEvent, user: User) => dragEndHandler(e, user) }
            onDragOver={ dragOverHandler() }
            onDragLeave={ dragLeaveHandler() }
            draggable={ true }
            id={ user.id }
            avatar_url={ user.avatar_url }
            html_url={ user.html_url }
            login={ user.login }
            isFavorite={ list.id === LISTS.FAVORITE ? false : isFavorite(user.id) }
            canDelete={ list.id === LISTS.FAVORITE }
            delete={ deleteFromFavorite(user.id) }
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