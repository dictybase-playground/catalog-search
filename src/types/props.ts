import { RefObject } from "react"

export declare namespace AppProps {
  export interface CatalogListWrapperProps {
    root: RefObject<HTMLDivElement>,
    children: JSX.Element | JSX.Element[] | null
  }

  export interface CatalogListProps {
    data: any,
    target: RefObject<HTMLLIElement>
  }

  export interface CatalogListItemProps {
    key: string
    className: string,
    ref?: RefObject<HTMLLIElement>
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
