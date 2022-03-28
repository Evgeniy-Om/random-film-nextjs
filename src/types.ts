import { rootReducer, setupStore } from './store/store'
import { GridSelectionModel } from '@mui/x-data-grid'

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export type filmTypes = {
    filmId: number
    filmLength: string
    nameEn: null | string
    nameRu: string
    posterUrl: string
    posterUrlPreview: string
    rating: string
    ratingChange: number | null
    ratingVoteCount: number
    year: string
    genres: {
        genre: string
    }[]
    countries: {
        country: string
    }[]
}

export type InitialStateTypes = {
    selectedCountry: { id: number | string, country: string }
    selectedGenre: { id: number, genre: string }
    selectedYears: [number, number]
    selectedRating: [number, number]
    currentFilmNumber: number
    counter: number
    listFilms: filmTypes[]
    isChangedFilters: boolean
    currentPageResponse: number
    totalPagesResponse: number
    totalFilteredFilms: number
    isDisabledRandomFilmButton: boolean
    status: null | string
    error: null | string

    whiteList: filmTypes[]
    blackList: filmTypes[]
    listIDsMovedFilms: GridSelectionModel

    pageSize: number
}

export type FetchParamsTypes = {
    ratingFrom: number
    ratingTo: number
    yearFrom: number
    yearTo: number
    order: string
    page: number
    country?: number | string
    genre?: number
}

export type TypeListTypes = 'whitelist' | 'blacklist'