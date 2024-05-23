import type { SectionGroupType } from "$lib/utils/constants"
import type { SectionType } from "../sections/sections"

export interface ISectionItem {
  name: string
  section: SectionType
  group: SectionGroupType
}

export const sectionsList: ISectionItem[] = [
  {
    group: 'Content',
    section: 'ContentSplitWithImage',
    name: 'Conteúdo dividido com imagem',
  },
  {
    group: 'Footer',
    section: 'FooterSocialNetworks',
    name: 'Rodapé com redes sociais',
  },
  {
    group: 'Hero',
    section: 'HeroSplitWithImage',
    name: 'Hero divido com imagem',
  },
  {
    group: 'Navbar',
    section: 'NavbarLeftAligned',
    name: 'Barra de navegação alinhada a esquerda',
  },
]