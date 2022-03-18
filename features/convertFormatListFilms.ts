import { listFilmsTypes } from '../types'

export function convertFormatListFilms(listFilms: listFilmsTypes) {
    return listFilms.map(f => ({
        ...f,
        countries: f.countries.map((c, i) => i === 0 ? c.country : ` ${c.country}`).toString(),
        genres: f.genres.map((g, i) => i === 0 ? g.genre : ` ${g.genre}`).toString(),

    }))
}