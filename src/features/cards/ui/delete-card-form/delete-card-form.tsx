import {Button, Card, Typography} from '@/components'
import {useDeleteCardMutation} from "@/features/cards/model";
import s from './delete-card-form.module.scss'
import {useDeleteDeckMutation} from "@/features/packs/model/services";
import {useNavigate} from "react-router-dom";


type DeleteCardProps = {
    id: string
    onCancel: () => void
    isPack?: boolean
}

export const DeleteItem = ({id, onCancel, isPack}: DeleteCardProps) => {
    const [deleteCard] = useDeleteCardMutation()
    const [deletePack] = useDeleteDeckMutation()
    const navigate = useNavigate()

    const deleteHandler = () => {
        if(isPack) {
            deletePack({id})
            navigate('/')
        }  else {
            deleteCard({id})
        }

        onCancel()
    }

    return (
        <>
            {/*<DevTool control={control} />*/}
            <Card className={s.card}>
                <Typography className={s.row}>
                    {isPack ? 'Do you really want to remove this pack? All cards will be deleted.'
                        : 'Do you really want to remove this card?'}

                </Typography>
                <div className={s.buttons}>
                    <Button variant={"secondary"} onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button onClick={deleteHandler}>
                        Delete Card
                    </Button>
                </div>
            </Card>
        </>
    )
}
