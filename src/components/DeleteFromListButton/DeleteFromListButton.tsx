import styles from './DeleteFromListButton.module.scss'
import { Button } from '@mui/material'
import useDeleteFromList from '../../hooks/useDeleteFromList'
import { TypeListTypes } from '../../types'
import DeleteIcon from '@mui/icons-material/Delete'

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
                {typeList === 'whitelist' && 'Удалить из избранного'}
                {typeList === 'blacklist' && 'Удалить из блэк-листа'}
            </Button>
        </div>
    )
}

export default DeleteFromListButton