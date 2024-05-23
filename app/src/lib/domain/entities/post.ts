import { createEntity, type ICreateEntityProps, type IEntity } from "./entity";

export interface IPost extends IEntity {
  title: string,
  content: string,
  author?: any,
  category: string,  
  path: string,
  image: string,
  description: string,
  published: boolean
  featured: boolean
}

export interface ICreatePostProps extends ICreateEntityProps, Omit<IPost, keyof ICreateEntityProps> {}

export function createPost(props: ICreatePostProps): IPost {
  const { category, content, title, author, path, image, description, featured, published } = props
  
  return {
    ...createEntity(props),
    category, content, title, author, path, image, description, featured, published
  }
}