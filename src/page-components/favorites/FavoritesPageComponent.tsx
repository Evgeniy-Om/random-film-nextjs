import { DataGrid, GridCellParams, GridColDef, GridSelectionModel, ruRU } from '@mui/x-data-grid'
import ImageNJS from 'next/image'
import styles from './FavoritesPageComponent.module.scss'
import Paper from '@mui/material/Paper'
import MoveToBlackListButton from '../../components/MoveToBlackListButton/MoveToBlackListButton'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { kinopoiskSlice } from '../../store/kinopoiskSlice'
import { useEffect } from 'react'
import { getListFromLocalStorage } from '../../features/getWhiteListFromLocalStorage'
import { convertFormatListFilms } from '../../features/convertFormatListFilms'
import DeleteFromListButton from '../../components/DeleteFromListButton/DeleteFromListButton'

const columns: GridColDef[] = [
    {
        field: 'posterUrlPreview',
        headerName: 'Постер',
        sortable: false,
        filterable: true,
        width: 100,
        disableColumnMenu: true,
        renderCell: (param: GridCellParams<string>) => {
            return (
                // <div href={param.value} className={styles._} onClick={(e) => e.stopPropagation()}>
                <div className={styles.poster}>
                    <ImageNJS
                        src={param.value}
                        className={styles.image}
                        layout="fill"
                        objectFit="contain"
                        quality={15}
                        priority
                    />
                </div>
            )
        }
    },
    {field: 'nameRu', headerName: 'Название фильма', minWidth: 150, maxWidth: 350, flex: 3},
    {field: 'year', headerName: 'Год', minWidth: 60, maxWidth: 100, flex: 4},
    {field: 'rating', headerName: 'Рейтинг', minWidth: 80, maxWidth: 130, flex: 4},
    {field: 'genres', headerName: 'Жанры', minWidth: 150, maxWidth: 350, flex: 2, sortable: false},
    {field: 'countries', headerName: 'Страны', minWidth: 150, maxWidth: 350, flex: 1, sortable: false},
]

export default function FavoritesPageComponent() {
    const {whiteList, pageSize} = useAppSelector(state => state.kinopoisk)
    const {changeListIDsMovedFilms, changePageSize, changeWhiteList} = kinopoiskSlice.actions
    const dispatch = useAppDispatch()

    useEffect(() => {
        const whiteList = getListFromLocalStorage('whitelist')
        const convertedList = convertFormatListFilms(whiteList)
        dispatch(changeWhiteList(convertedList))

        const pageSize = localStorage.getItem('pageSize')
        let resultNumber
        if (pageSize) {
            resultNumber = Number(JSON.parse(pageSize))
            dispatch(changePageSize(resultNumber))
        }
    }, [])

    const handleChangePageSize = (size: number) => {
        dispatch(changePageSize(size))
        localStorage.setItem('pageSize', JSON.stringify(size))
    }

    return (
        <div className={styles._}>
            <h1>Избранное</h1>
            <div className={styles.buttonsContainer}>
                <DeleteFromListButton typeList="whitelist" />
                <MoveToBlackListButton/>
            </div>
            <Paper className={styles.paper}>
                <DataGrid
                    rows={whiteList}
                    getRowId={(row) => row.filmId}
                    rowHeight={125}
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 20, 50, 100]}
                    onPageSizeChange={(newPageSize) => handleChangePageSize(newPageSize)}
                    checkboxSelection
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    onSelectionModelChange={(ids: GridSelectionModel) => {
                        dispatch(changeListIDsMovedFilms(ids))
                    }}
                />
            </Paper>
        </div>
    )
}