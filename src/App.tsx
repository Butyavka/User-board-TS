import React, {useEffect, useState} from 'react'
import Layout from './components/Layout'
import {IUser} from "./types/types";
import {getUsers} from "./api/getUsers";
import UserList from "./components/UserList";

const App = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [favoriteUsers, setFavoriteUsers] = useState<IUser[]>([])
    const [loading, setLoading] = useState<boolean>(false)

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
            <div style={{ display: 'flex', columnGap: '20px' }}>
                <UserList users={ users } loading={ loading } header={ 'All Users' }/>
                <UserList users={ favoriteUsers } loading={ loading } header={ 'Favorite Users' }/>
            </div>
        </Layout>
    )
}

export default App