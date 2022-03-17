import { DataGrid, GridCellParams, GridColDef, ruRU } from '@mui/x-data-grid'
import ImageNJS from 'next/image'
import Head from 'next/head'
import { listFilmsTypes } from '../../types'
import styles from './FavoritesPage.module.scss'
import Paper from '@mui/material/Paper'
import MoveToBlackListButton from '../../components/MoveToBlackListButton/MoveToBlackListButton'

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

let listFilms: listFilmsTypes = []
if (typeof window !== 'undefined') {
    listFilms = JSON.parse(localStorage.getItem('whitelist') || '[]')
}

const rows = listFilms.map(f => ({
    ...f,
    countries: f.countries.map((c, i) => i === 0 ? c.country : ` ${c.country}`).toString(),
    genres: f.genres.map((g, i) => i === 0 ? g.genre : ` ${g.genre}`).toString(),

}))

export default function FavoritesPage() {
    return (
        <>
            <Head>
                <title>Избранное - генератор случайных фильмов</title>
            </Head>
            <Paper className={styles.paper}>
                <DataGrid
                    rows={rows}
                    getRowId={(row) => row.filmId}
                    rowHeight={125}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10,20,50,100]}
                    checkboxSelection
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    onSelectionModelChange={(ids) => {
                        console.log(ids)
                    }}
                />
            </Paper>
            <MoveToBlackListButton/>

        </>
    )
}