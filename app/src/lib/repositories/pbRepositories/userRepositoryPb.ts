import { createUser, type IUser } from "$lib/domain/entities/user";
import { pb } from "$lib/stores/pb";
import type { RecordModel, RecordSubscription } from "pocketbase";
import { get } from "svelte/store";
import type { IUserRepository } from "../iUserRepository";

interface IPermissionRecordModel extends RecordModel {
  user: string,
  createPage: boolean,
  updatePage: boolean,
  deletePage: boolean,
  createPost: boolean,
  updatePost: boolean,
  deletePost: boolean,
  updateSettings: boolean,
  createSite: boolean,
  deleteSite: boolean,
  isAdmin: boolean
}

export interface IUserRecordModel extends RecordModel {
  name: string
  email: string
  enable: boolean
  expand?: {
    "permissions(user)"?: IPermissionRecordModel
  }
}

export function createUserByRecord(record: IUserRecordModel): IUser {
  let permissions = {
    createPage: false,
    updatePage: false,
    deletePage: false,
    createPost: false,
    updatePost: false,
    deletePost: false,
    updateSettings: false,
    createSite: false,
    deleteSite: false,
    isAdmin: false
  }

  if(record.expand && record.expand["permissions(user)"]){    
    permissions = {...record.expand["permissions(user)"]}
  }

  return createUser({...record, permissions})
}

export function createUserRepositoryPb(): IUserRepository {
  const collection = get(pb).collection('users')

  const expand = "permissions(user)"
  
  async function findById(id: string) {
    try {
      const user = await collection.getOne<IUserRecordModel>(id, { expand })
      return createUserByRecord(user)
    } catch (error) {
      return null
    }
  }

  async function login(email: string, password: string) {
    try {
      const { record } = await get(pb).collection('users').authWithPassword<IUserRecordModel>(email, password, { expand })
      
      const sessionCookie = get(pb).authStore.exportToCookie()

      const result = {
        user: createUserByRecord(record),
        sessionCookie
      }

      return result
    } catch (error) {
      throw error
    }
  }

  async function authRefresh() {
    try {
      const { record } = await get(pb).collection('users').authRefresh<IUserRecordModel>()
      const sessionCookie = get(pb).authStore.exportToCookie()

      const result = {
        user: createUserByRecord(record),
        sessionCookie
      }

      return result
    } catch (error) {
      throw error
    }
  }

  async function subscribe(topic: string, callback: (data: RecordSubscription<IUserRecordModel>) => void) {
    return collection.subscribe<IUserRecordModel>(topic, callback, { query: { expand } })
  }

  return {
    findById,
    login,
    authRefresh,
    subscribe,
  }
}