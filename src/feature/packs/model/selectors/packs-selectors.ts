import { RootState } from '@/app/store/store.ts'

export const currentPageSelector = (state: RootState): number => state.packs.pagination.currentPage
export const pageSizeSelector = (state: RootState): number => state.packs.pagination.pageSize
export const searchNameSelector = (state: RootState): string => state.packs.filter.searchName
export const sliderValueSelector = (state: RootState): number[] => state.packs.filter.sliderValue
export const tabValueSelector = (state: RootState): string => state.packs.filter.tabValue
