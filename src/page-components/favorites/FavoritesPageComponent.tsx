import { DataGrid, GridCellParams, GridColDef, GridSelectionModel, ruRU } from '@mui/x-data-grid'
import ImageNJS from 'next/image'
import styles from './FavoritesPageComponent.module.scss'
import Paper from '@mui/material/Paper'
import MoveToBlackListButton from '../../components/MoveToBlackListButton/MoveToBlackListButton'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { kinopoiskSlice } from '../../store/kinopoiskSlice'
import { useEffect } from 'react'
import { getListFromLocalStorage } from '../../features/getFavoritesListFromLocalStorage'
import { convertFormatListFilms } from '../../features/convertFormatListFilms'
import DeleteFromListButton from '../../components/DeleteFromListButton/DeleteFromListButton'
import { FAVORITES_LIST } from '../../constants'
import { WatchButton } from '../../components/WatchButton/WatchButton'

const columns: GridColDef[] = [
    {
        field: 'Постер',
        headerName: '',
        sortable: false,
        filterable: false,
        width: 100,
        disableColumnMenu: true,
        renderCell: (param: GridCellParams<string>) => {
            return (
                // <div href={param.value} className={styles._} onClick={(e) => e.stopPropagation()}>
                <div className={styles.poster}>
                    <ImageNJS
                        src={param.row.posterUrlPreview}
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
    {
        field: 'Кнопка',
        headerName: '',
        sortable: false,
        filterable: false,
        minWidth: 150,
        disableColumnMenu: true,
        renderCell: (param: GridCellParams<string>) => {
            return (
                // <div href={param.value} className={styles._} onClick={(e) => e.stopPropagation()}>
                <div className={styles.button}>
                    <WatchButton name={param.row.nameRu}/>
                </div>
            )
        }
    },
]

export default function FavoritesPageComponent() {
    const {favoritesList, pageSize} = useAppSelector(state => state.kinopoisk)
    const {changeListIDsMovedFilms, changePageSize, changeFavoritesList} = kinopoiskSlice.actions
    const dispatch = useAppDispatch()

    useEffect(() => {
        const favoritesList = getListFromLocalStorage(FAVORITES_LIST)
        const convertedList = convertFormatListFilms(favoritesList)
        dispatch(changeFavoritesList(convertedList))

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

            <div className={styles.flexContainer}>
                <h1 className={styles.title}>Избранное</h1>
                <div className={styles.buttonsContainer}>
                    <DeleteFromListButton typeList={FAVORITES_LIST}/>
                    <MoveToBlackListButton/>
                </div>
            </div>
            <Paper className={styles.paper}>
                <DataGrid
                    className={styles.dataGrid}
                    rows={favoritesList}
                    getRowId={(row) => row.filmId}
                    rowHeight={125}
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 20, 50, 100]}
                    onPageSizeChange={(newPageSize) => handleChangePageSize(newPageSize)}
                    checkboxSelection
                    autoHeight={true}
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    onSelectionModelChange={(ids: GridSelectionModel) => {
                        dispatch(changeListIDsMovedFilms(ids))
                    }}
                />
            </Paper>
        </div>
    )
}