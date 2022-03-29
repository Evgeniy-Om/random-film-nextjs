import styles from './DeleteFromListButton.module.scss'
import { Button } from '@mui/material'
import useDeleteFromList from '../../hooks/useDeleteFromList'
import { TypeListTypes } from '../../types'
import DeleteIcon from '@mui/icons-material/Delete'
import { BLACK_LIST, FAVORITES_LIST } from '../../constants'

type PropsTypes = {
    typeList: TypeListTypes
}
function DeleteFromListButton({typeList}: PropsTypes) {
    const {deleteFromList} = useDeleteFromList(typeList)
    return (
        <div className={styles._}>
            <Button
                className={styles.button}
                startIcon={<DeleteIcon/>}
                onClick={deleteFromList}
                variant="contained"
            >
                {typeList === FAVORITES_LIST && 'Удалить из избранного'}
                {typeList === BLACK_LIST && 'Удалить из блэк-листа'}
            </Button>
        </div>
    )
}

export default DeleteFromListButton