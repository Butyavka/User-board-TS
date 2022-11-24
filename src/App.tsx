import React, { DragEvent, useEffect, useState } from 'react'
import Layout from './components/Layout'
import {id, User, UserList as IUserList} from './types/types'
import {getUsers} from './api/getUsers'
import UserItem from './components/UserItem'
import './components/UserList/style.scss'
import Empty from './components/Empty'
import UserList from './components/UserList'

const LISTS = {
  ALL: 'all',
  FAVORITE: 'favorite'
}

const App = () => {
  const [users, setUsers] = useState<User[]>([])
  const [favoriteActive, setFavoriteActive] = useState(false)
  const [favoriteUsers, setFavoriteUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const lists = [
    {
      id: LISTS.ALL,
      users: users,
      header: 'All Users'
    },
    {
      id: LISTS.FAVORITE,
      users: favoriteUsers,
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

  function dragStartHandler(user: User): (e: DragEvent<HTMLDivElement>) => void {
    return (e: DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData('user', JSON.stringify(user))
    }
  }

  function dragEndHandler(): void {
    setFavoriteActive(false)
  }

  function dropHandler(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const currentUser = e.dataTransfer?.getData('user') &&  JSON.parse(e.dataTransfer?.getData('user'))

    if (currentUser) {
      const isFavoriteUser = !!favoriteUsers.find((user: User) => user.id === currentUser.id)

      if (isFavoriteUser) return null

      setFavoriteUsers([...favoriteUsers, currentUser])
    }
  }

  const isFavorite = (id: string | number) => {
    return !!favoriteUsers.find((user: User) => user.id === id)
  }

  const deleteFromFavorite = (user: User) => {
    const index = favoriteUsers.indexOf(user)
    const newList = favoriteUsers
    newList.splice(index, 1)
    setFavoriteUsers([...newList])
  }

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setFavoriteActive(true)
  }

  const renderUsers = (users: User[], id: id) => {
    const isFavoriteList = id === LISTS.FAVORITE
    const empty = users.length === 0

    if (empty) return <Empty/>

    return (
      <>
        {users.map(user => (
          <UserItem
            key={ user.id }
            onDragStart={ dragStartHandler(user) }
            onDragEnd={ dragEndHandler }
            draggable={ !isFavoriteList }
            id={ user.id }
            avatar_url={ user.avatar_url }
            html_url={ user.html_url }
            login={ user.login }
            isFavorite={ isFavoriteList ? false : isFavorite(user.id) }
            canDelete={ isFavoriteList }
            deleteElement={ () => deleteFromFavorite(user) }
          />
        ))}
      </>
    )
  }

  const renderList = (list: IUserList) => {
    const isFavoriteList = list.id === LISTS.FAVORITE
    interface DragSettings {
      onDrop?: (e: DragEvent<HTMLDivElement>) => void
      onDragOver?: (e: DragEvent<HTMLDivElement>) => void
      onDragLeave?: () => void
    }
    const dragSettings: DragSettings = {}

    if (isFavoriteList) {
      dragSettings.onDrop = dropHandler
      dragSettings.onDragOver = dragOverHandler
      dragSettings.onDragLeave = () => setFavoriteActive(false)
    }

    return (
      <UserList
        key={ list.id }
        id={ list.id }
        users={ list.users }
        renderUsers={ renderUsers }
        loading={ loading }
        header={ list.header }
        active={ isFavoriteList && favoriteActive }
        {...dragSettings}
      />
    )
  }

  return (
    <Layout>
      <div style={{ display: 'flex', columnGap: '20px', paddingTop: '40px' }}>
        {lists.map(list => renderList(list))}
      </div>
    </Layout>
  )
}

export default App