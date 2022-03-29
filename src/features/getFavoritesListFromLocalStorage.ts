import { TypeListTypes, filmTypes } from '../types'

export function getListFromLocalStorage (typeList: TypeListTypes): filmTypes[] {
    return JSON.parse(localStorage.getItem(typeList) || '[]')
}