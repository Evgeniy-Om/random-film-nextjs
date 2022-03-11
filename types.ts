import {rootReducer, setupStore} from './store/store'
import top250ListFilms from './store/top250ListFilms'

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export type InitialStateTypes = {
    selectedCountry: {id: number, country: string}
    selectedGenre: {id: number, genre: string}
    selectedYears: [number, number]
    selectedRating: [number, number]
    currentFilmNumber: number
    listFilms: typeof top250ListFilms
    isChangedFilters: boolean
    currentPageResponse: number
    totalPagesResponse: number
    totalFilteredFilms: number
    isDisabledRandomFilmButton: boolean
    status: null | string
    error: null | string
}

export type FetchParamsTypes = {
    ratingFrom: number
    ratingTo: number
    yearFrom: number
    yearTo: number
    order: string
    page: number
    country?: number
    genre?: number
}

export type ListFilmsTypes = {
    
}