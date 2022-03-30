import { TypeListTypes, FilmTypes } from '../types'

export function getListFromLocalStorage (typeList: TypeListTypes): FilmTypes[] {
    return JSON.parse(localStorage.getItem(typeList) || '[]')
}