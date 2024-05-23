import ContentSplitWithImage from "./content/ContentSplitWithImage.svelte"
import FooterSocialNetworks from "./footer/FooterSocialNetworks.svelte"
import HeroSplitWithImage from "./hero/HeroSplitWithImage.svelte"
import NavbarLeftAligned from "./navbar/NavbarLeftAligned.svelte"

export const sections = {
  ContentSplitWithImage: ContentSplitWithImage,
  FooterSocialNetworks: FooterSocialNetworks,
  HeroSplitWithImage: HeroSplitWithImage,
  NavbarLeftAligned: NavbarLeftAligned,
} as const

export type SectionType = keyof typeof sections