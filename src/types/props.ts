import { RefObject } from "react"
import { ClassNameMap } from "@material-ui/styles/withStyles"
import { AppStrainTypes } from "./strain";
import { ApolloError } from "@apollo/client"

export declare namespace AppProps {
  export interface CatalogListWrapperProps {
    root: RefObject<HTMLDivElement>,
    children: JSX.Element | JSX.Element[] | null
  }

  export interface CatalogListProps<Type> {
    data: any,
    dataField: string
    target: RefObject<Type>
  }

  export interface CatalogTableRowProps<Type> {
    key: string
    ref?: RefObject<Type>
  }

  export interface CatalogTableHeaderProps {
    headers?: string[]
    classes: ClassNameMap<"head">
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

  export interface SizeProps {
    width?: number
    height?: number
  }

  interface GraphqlQueryVarProps {
    cursor: number
    limit: number
  }

  export interface StrainCatalogSearchProps {
    searchParams: URLSearchParams,
    strainConfig: AppStrainTypes.SearchConfigMember[]
    field?: string
    value?: string
  }

  export interface FilterDropdownProps {
    paramFn: Function
    items: string[]
  }

  export interface ErrorDisplayProps {
    error: ApolloError | undefined
  }

}
