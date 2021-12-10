import { RefObject } from "react"

export declare namespace AppProps {
  export interface CatalogListWrapperProps {
    root: RefObject<HTMLDivElement>,
    children: JSX.Element | JSX.Element[] | null
  }

  export interface CatalogListProps<Type> {
    data: any,
    target: RefObject<Type>
  }

  export interface CatalogTableRowProps<Type> {
    key: string
    ref?: RefObject<Type>
  }

  export interface CatalogRowFnProps<Type> {
    strains: any
    nextCursor: number
    lastIndex: number
    targetRef: RefObject<Type>
  }

  export interface CatalogListItemProps<Type> {
    key: string
    ref?: RefObject<Type>
    className: string,
  }

  export interface LoadingDisplayProps {
    loading: boolean
  }

  export interface UseIntersectionObserverProps {
    target: RefObject<Element>,
    option?: IntersectionObserverInit,
    onIntersection: IntersectionObserverCallback
  }
}
