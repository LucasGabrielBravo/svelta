export const heroSplitWithImageFields: ISectionFields = {
  logo: {
    index: 0,
    enable: true,
    label: "Logo",
    type: "image",
    value: {
      alt: "Logo",
      src: "https://img.logoipsum.com/247.svg",
      type: 'url'
    } as ISectionFieldImage,
  },

  title: {
    index: 1,
    label: "Titulo",
    type: "text",
    value: "<p>Enim cupidatat id ullamco ea.</p>",    
  },

  paragraph: {
    index: 2,
    label: "Parágrafo",
    type: "text",
    value: `<p>Deserunt consequat do voluptate commodo elit Lorem voluptate commodo duis ex fugiat. 
    Voluptate do est aliqua do sint. Id cupidatat labore cillum voluptate. Quis culpa excepteur deserunt fugiat do.</p>`,     
  },

  callToActionText: {
    index: 3,
    enable: true,
    label: "Call to action: Texto",
    type: "text",
    value: `<p>Sint et commodo pariatur aliqua laborum irure consectetur.</p>`,     
  },

  callToActionLink: {
    index: 4,
    label: "Call to action: Link",
    type: "link",
    value: {
      href: "/",
      label: "Leia mais",
      type: "route"
    } as ISectionFieldLink     
  },

  linkPrimary: {
    index: 5,
    enable: true,
    label: "Link primário",
    type: "link",
    value: {
      href: "/",
      label: "Comece agora",
      type: "route"
    } as ISectionFieldLink
  },

  linkSecondary: {
    index: 6,
    enable: true,
    label: "Link secundário",
    type: "link",
    value: {
      href: "/",
      label: "Saiba mais",
      type: "route"
    } as ISectionFieldLink
  }
}