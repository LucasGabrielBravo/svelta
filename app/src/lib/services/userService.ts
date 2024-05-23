import { type IUser } from "$lib/domain/entities/user";
import { getSveltaService } from "$lib/utils/getSveltaService";
import type { Cookies } from '@sveltejs/kit';
import { createUserServiceFirebase } from "./firebaseServices/userServiceFirebase";
import { createUserServicePb } from "./pbServices/userServicePb";

export interface IUserService {
  findById: (id: string) => Promise<IUser | null>
  login: (email: string, password: string) => Promise<{ user: IUser, sessionCookie: string }>
  logout: () => Promise<void>
  authRefresh: () => Promise<{ user: IUser, sessionCookie: string }>
  verifySession: (cookies: Cookies) => Promise<boolean>
  autoLogin: () => Promise<void>
}

export function createUserService(): IUserService {
  const service = getSveltaService()
  
  if(service === "firebase"){
    return createUserServiceFirebase()
  }
  
  return createUserServicePb()
}