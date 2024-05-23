import type { SectionType } from "$lib/components/sections/sections"
import type { SectionGroupType } from "$lib/utils/constants"
import { createEntity, type ICreateEntityProps, type IEntity } from "./entity"

export interface IPagePropsSection {
  name: SectionType
  group: SectionGroupType
  fields: ISectionFields
}

export interface IPageProps {
  title: string
  icon?: string
  description?: string
  hiddenLayoutNavbar?: boolean
  hiddenLayoutFooter?: boolean
  sections: IPagePropsSection[]
}

export interface IPage extends IEntity {
  path: string
  index: number
  props: IPageProps
}

export interface ICreatePageProps extends ICreateEntityProps, Omit<IPage, keyof ICreateEntityProps> {}

export function createPage(props: ICreatePageProps): IPage {
  const { index, path, props: pageProps } = props

  return {
    ...createEntity(props),
    index, 
    path, 
    props: pageProps, 
  }
}