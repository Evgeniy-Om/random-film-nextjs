import { listFilmsTypes } from '../types'

export function getListFromLocalStorage (typeList: 'whitelist' | 'blacklist'): listFilmsTypes {
    return JSON.parse(localStorage.getItem(typeList) || '[]')
}