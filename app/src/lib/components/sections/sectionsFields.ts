import { contentSplitWithImageFields } from "./content/ContentSplitWithImageFields"
import { heroSplitWithImageFields } from "./hero/HeroSplitWithImageFields"
import type { SectionType } from "./sections"

export const sectionsFields: {[key in SectionType]: ISectionFields} = {
  ContentSplitWithImage: contentSplitWithImageFields,
  FooterSocialNetworks: {},
  HeroSplitWithImage: heroSplitWithImageFields,
  NavbarLeftAligned: {},
} as const