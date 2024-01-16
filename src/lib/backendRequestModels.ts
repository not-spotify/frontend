export interface IDtoError {
  type: string,
  title: string,
  status: number,
  detail: string,
  instance: string
}

export interface IPageModel {
  Page: number
  PageSize: number
}

export interface IPageModelResult<T> {
  items: T[]
  totalCount: number
}

export interface IEntityCollectionPagination {
  PageModel: IPageModel
}