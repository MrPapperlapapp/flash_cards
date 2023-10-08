import { useAppDispatch, useAppSelector } from '@/app/store/store.ts'
import { currentPageSelector, pageSizeSelector } from '@/feature/packs/model/selectors'
import { packsActions } from '@/feature/packs/model/slices/packs.slice.ts'

export const usePacksPagination = () => {
  const currentPage = useAppSelector(currentPageSelector)
  const pageSize = useAppSelector(pageSizeSelector)

  const dispatch = useAppDispatch()

  const setCurrentPage = (newPage: number) => {
    dispatch(packsActions.setCurrentPage({ newPage }))
  }

  const setPageSize = (newPageSize: number) => {
    dispatch(packsActions.setPageSize({ newPageSize }))
  }

  return { currentPage, pageSize, setCurrentPage, setPageSize }
}
