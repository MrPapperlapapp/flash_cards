import {FC} from 'react'

import {Modal} from '@/components'
import {PackForm} from '@/components/auth/form-pack'
import {useUpdateDeckMutation} from '@/features/packs/model/services'
import s from '@/pages/pack-list/pack-list.module.scss'
import {toast} from "react-toastify";

type Props = {
    open: boolean
    setOpen: (value: boolean) => void
    id: string
    name: string
    isPrivate: boolean
    cover: string | null
    nameButton?: string
}

export const EditPackModal: FC<Props> = ({
                                             open,
                                             setOpen,
                                             id,
                                             name,
                                             isPrivate,
                                             cover,
                                             nameButton,
                                         }) => {
    const startValues = {
        name,
        isPrivate,
        cover,
    }

    const [editPack] = useUpdateDeckMutation()

    const editDeckHandler = (data: FormData) => {
        editPack({id, data})
            .unwrap()
            .catch(e => {
                e.status === 'FETCH_ERROR'
                    ? toast.error('No internet connection')
                    : toast.error(e.data.message)
            })
        setOpen(false)
    }

    return (
        <Modal
            isOpen={open}
            onClose={() => {
                setOpen(false)
            }}
            title={'Edit Pack'}
            showCloseButton={open}
            className={s.modal}
        >
            <PackForm
                onSubmit={editDeckHandler}
                onCancel={() => setOpen(false)}
                defaultValues={startValues}
                nameButton={nameButton}
                className={s.packForm}
            />
        </Modal>
    )
}
