import styles from './DataGrid.module.scss'
import { DataGrid as DataGridMUI, GridCellParams, GridColDef, GridSelectionModel, ruRU } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import { FilmTypes } from '../../types'
import ImageNJS from 'next/image'
import { WatchButton } from '../WatchButton/WatchButton'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { kinopoiskSlice } from '../../store/kinopoiskSlice'

export function DataGrid({listFilms}: { listFilms: FilmTypes[] }) {
    const {pageSize} = useAppSelector(state => state.kinopoisk)
    const {changeListIDsMovedFilms, changePageSize} = kinopoiskSlice.actions
    const dispatch = useAppDispatch()

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

    const handleChangePageSize = (size: number) => {
        dispatch(changePageSize(size))
        localStorage.setItem('pageSize', JSON.stringify(size))
    }

    return (
        <Paper className={styles.paper}>
            <DataGridMUI
                className={styles.dataGrid}
                rows={listFilms}
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
    )
}