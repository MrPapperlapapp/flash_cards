import { FC, memo, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import s from './pack-row.module.scss'

import { Delete } from '@/assets/icons/drop-down/delete.tsx'
import { Edit } from '@/assets/icons/drop-down/edit.tsx'
import { Play } from '@/assets/icons/drop-down/play.tsx'
import { Button, IconButton, Table, Typography } from '@/components'
import { Dialog } from '@/components/ui/dialog'
import { Deck, useDeleteDeckMutation } from '@/features/packs/model/services'
import { EditPackModal } from '@/features/packs/ui/pack-edit-modal/pack-edit-modal.tsx'
import {useAppDispatch} from "@/app/store/store.ts";
import {cardsSlice} from "@/features/cards/model/card-slice.ts";

type Props = {
  pack: Deck
  authUserId: string
}

export const PackRow: FC<Props> = memo(({ pack, authUserId }) => {
  const dispatch = useAppDispatch()
  const isMyPack = authUserId === pack.author.id
  // const isMyPack = true

  const navigate = useNavigate()

  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [editIsOpen, setEditIsOpen] = useState(false)

  const [deletePack] = useDeleteDeckMutation()

  const onConfirm = () => {
    deletePack({ id: pack.id })
    setDeleteIsOpen(false)
  }

  const onLearn = () => {
    navigate(`${pack.id}/learn`)
  }

  const setPackName = () => {
    dispatch(cardsSlice.actions.setPackName({packName: pack.name}))
  }

  return (
    <>
      <Dialog
        description={`Do you really want to remove ${pack.name}? All cards will be deleted.`}
        buttonText="Delete Pack"
        open={deleteIsOpen}
        setOpen={setDeleteIsOpen}
        onConfirm={onConfirm}
        splitLines
        title={'Delete Pack'}
      />
      <EditPackModal
        open={editIsOpen}
        setOpen={setEditIsOpen}
        id={pack.id}
        name={pack.name}
        isPrivate={pack.isPrivate}
        cover={pack.cover}
        nameButton={'Save Changes'}
      />

      <Table.Row key={pack.id}>
        <Table.Cell>
          <Button as={Link} to={pack.id} variant="link" className={s.link} onClick={setPackName}>
            {pack.cover && <img src={pack.cover} alt="Pack cover" className={s.cover} />}
            <Typography as="h3" variant="body2">
              {pack.name}
            </Typography>
          </Button>
        </Table.Cell>
        <Table.Cell className={s.count}>{pack.cardsCount}</Table.Cell>
        <Table.Cell className={s.date}>{new Date(pack.updated).toLocaleDateString()}</Table.Cell>
        <Table.Cell className={s.name}>{pack.author.name}</Table.Cell>
        <Table.Cell className={s.controls}>
          {isMyPack ? (
            <div className={s.buttons}>
              <IconButton disabled={!pack.cardsCount} onClick={onLearn} small>
                <Play />
              </IconButton>
              <IconButton onClick={() => setEditIsOpen(true)} small>
                <Edit />
              </IconButton>
              <IconButton onClick={() => setDeleteIsOpen(true)} small>
                <Delete />
              </IconButton>
            </div>
          ) : (
            <IconButton disabled={!pack.cardsCount} onClick={onLearn} small>
              <Play />
            </IconButton>
          )}
        </Table.Cell>
      </Table.Row>
    </>
  )
})
