import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/store.ts'
import { Button, TextField } from '@/components'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks'
import { decksSlice } from '@/services/decks/decks.slice.ts'

export const Decks = () => {
  const [cardName, setCardName] = useState('')

  const dispatch = useAppDispatch()
  const itemsPerPage = useAppSelector(state => state.decksSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.decksSlice.currentPage)
  const searchByName = useAppSelector(state => state.decksSlice.searchByName)

  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(decksSlice.actions.setItemsPerPage(itemsPerPage))
  const setCurrentPage = (currentPage: number) =>
    dispatch(decksSlice.actions.setCurrentPage(currentPage))
  const setSearch = (search: string) => dispatch(decksSlice.actions.setSearchByName(search))

  const { isLoading, data } = useGetDecksQuery({
    itemsPerPage,
    currentPage,
    name: searchByName,
    orderBy: 'created-desc',
  })

  const [createDeck, { isLoading: isCreateDeckLoading }] = useCreateDeckMutation()

  const handleCreateClicked = () => createDeck({ name: cardName })

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <div>
        <Button onClick={() => setItemsPerPage(10)}>itemsPerPage: 10</Button>
        <Button onClick={() => setItemsPerPage(20)}>itemsPerPage: 20</Button>
        <Button onClick={() => setItemsPerPage(30)}>itemsPerPage: 30</Button>
      </div>
      <div>
        <Button onClick={() => setCurrentPage(1)}>CurrentPage: 1</Button>
        <Button onClick={() => setCurrentPage(2)}>CurrentPage: 2</Button>
        <Button onClick={() => setCurrentPage(3)}>CurrentPage: 3</Button>
      </div>
      <TextField value={searchByName} onChange={e => setSearch(e.currentTarget.value)} />
      <TextField
        value={cardName}
        onChange={e => setCardName(e.currentTarget.value)}
        label={'cardName'}
      />
      <Button onClick={handleCreateClicked}>Create deck</Button>
      isCreateDeckLoading: {isCreateDeckLoading.toString()}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cards</th>
            <th>Last Updated</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map(deck => {
            return (
              <tr key={deck.id}>
                <th>{deck.name}</th>
                <th>{deck.cardsCount}</th>
                <th>{new Date(deck.updated).toLocaleString('en-GB')}</th>
                <th>{deck.author.name}</th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
