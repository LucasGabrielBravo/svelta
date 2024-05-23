declare interface Image {
  src: string,
  alt: string,
  position?: string,
}

declare interface ISectionProps {
  [key: string]: any
}

declare interface ISectionFieldList {
  type: ISectionField['type'],
  items: any[]
  min?: number
  max?: number
}

declare interface ISectionFieldPosts {
  type: "latest" | "featured" | "selected",
  items: { label: string, value: string }[] | null | undefined
}

declare interface ISectionFieldImage {
  type: "url",
  src: string,
  alt: string,
  position?: string,
}

declare interface ISectionFieldLink {
  type: "route" | "url",
  href: string,
  label: string,
}

declare interface ISectionFieldNumber {
  number: number,
  min?: number
  max?: number
}

declare interface ISectionField {
  label: string
  type: "text" | "string" | "number" | "select" | "multiselect" | "link" | "image" | "file" | "form" | "map" | "list" | "icon" | "lottie" | "pages" | "posts" | "info" | "video"
  value: any
  index: number
  enable?: boolean | undefined
  key?: string
  prompt?: string
  maxTokens?: number
}

declare interface ISectionFields {
  [key: string]: ISectionField
}