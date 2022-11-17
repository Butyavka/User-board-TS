import React, {useEffect, useState} from 'react'
import Layout from './components/Layout'
import {IUser} from './types/types'
import {getUsers} from './api/getUsers'
import UserList from './components/UserList'

const App = () => {
    const [users, setUsers] = useState<IUser[]>([])
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

    return (
        <Layout>
            <div style={{ display: 'flex', columnGap: '20px', paddingTop: '40px' }} className="dasdf">
                {lists.map(list => <UserList key={ list.id } {...list} loading={ loading }/>)}
            </div>
        </Layout>
    )
}

export default App