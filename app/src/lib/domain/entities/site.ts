import type { SectionType } from "$lib/components/sections/sections";
import type { SectionGroupType } from "$lib/utils/constants";
import { createEntity, type ICreateEntityProps, type IEntity } from "./entity";
import { createPage, type ICreatePageProps, type IPage } from "./page";
import type { IPost } from "./post";

interface ISiteSeo {
  siteName: string
  description: string
  canonical: string
  image: string
}

interface ISiteSocialNetwork {
  url: string
  icon: string
}

interface ISiteLayoutComponents {
  navbar: {
    name: SectionType
    group: SectionGroupType
    fields: ISectionFields
  }
  footer: {
    name: SectionType
    group: SectionGroupType
    fields: ISectionFields
  }
}

export interface ISite extends IEntity {
  host: string
  seo: ISiteSeo
  socialNetworks: ISiteSocialNetwork[]
  domains: string[]
  favicon: string
  layoutComponents: ISiteLayoutComponents
  theme: string
  pages: IPage[]
  posts: IPost[]
}

export interface ICreateSiteProps extends ICreateEntityProps, Omit<ISite, keyof ICreateEntityProps | "pages"> {
  pages: IPage[] | ICreatePageProps[]
}

export function createSite(props: ICreateSiteProps): ISite {
  const { domains, favicon, host, layoutComponents, posts, seo, socialNetworks, theme } = props

  const pages = props.pages.sort((a, b) => a.index - b.index).map(createPage)

  console.log(pages)

  return {
    ...createEntity(props),
    domains, 
    favicon, 
    host, 
    layoutComponents, 
    pages,
    posts, 
    seo, 
    socialNetworks, 
    theme,
  }
}