import axios from 'axios'
import { User } from '../types/types'

export const getUsers = ( per_page = 100 ) => {
  return axios.get<User[]>('https://api.github.com/users', {
    params: {
      per_page
    }
  })
}