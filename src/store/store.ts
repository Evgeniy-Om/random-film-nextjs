import {combineReducers, configureStore} from '@reduxjs/toolkit'
import kinopoiskSlice from './kinopoiskSlice'

export const rootReducer = combineReducers({
    kinopoisk: kinopoiskSlice,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}