import axios from 'axios'
import { IUser } from "../types/types"

export const getUsers = ( per_page: number = 100 ) => {
    return axios.get<IUser[]>('https://api.github.com/users', {
        params: {
            per_page
        }
    })
};