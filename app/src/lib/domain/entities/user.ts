import { createEntity, type ICreateEntityProps, type IEntity } from "./entity";

export interface IUserPermissions {
  createPage: boolean,
  updatePage: boolean,
  deletePage: boolean,
  createPost: boolean,
  updatePost: boolean,
  deletePost: boolean,
  updateSite: boolean,
  isAdmin: boolean
}

export interface IUser extends IEntity {
  name: string
  email: string
  enable: boolean
  permissions: IUserPermissions
}

export interface ICreateUserProps extends ICreateEntityProps, Omit<IUser, keyof ICreateEntityProps | "permissions"> {
  permissions?: Partial<IUserPermissions>
}

export function createUser(props: ICreateUserProps): IUser {
  const { email, enable, name } = props

  let permissions = {
    createPage: false,
    updatePage: false,
    deletePage: false,
    createPost: false,
    updatePost: false,
    deletePost: false,
    updateSite: false,
    isAdmin: false
  }

  if(props.permissions){
    Object.entries(props.permissions).forEach(([key, value]) => {
      if(value){
        permissions[(key as keyof IUserPermissions)] = value
      }
    })    
  }
  
  return {
    ...createEntity(props),
    email, enable, name, permissions
  }
}