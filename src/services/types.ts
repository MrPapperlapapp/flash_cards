export type PaginatorEntity<T> = {
  pagination: Pagination
  items: T[]
}
export interface Pagination {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

export type PaginatedRequest<T> = {
  currentPage?: Pagination['currentPage']
  itemsPerPage?: Pagination['itemsPerPage']
} & T
