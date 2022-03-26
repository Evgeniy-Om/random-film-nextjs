import { listFilmsTypes } from '../types'

export function excludeMovingFilmsFromList (list: listFilmsTypes, excludeFilms: listFilmsTypes) {
    let updatedList = []
    for (let i = 0; i < list.length; i++) {
        let includes = false
        for (let y = 0; y < excludeFilms.length; y++) {
            if (list[i].filmId === excludeFilms[y].filmId) {
                includes = true
            }
        }
        if (!includes) {
            updatedList.push(list[i])
        }
    }
    return updatedList
}