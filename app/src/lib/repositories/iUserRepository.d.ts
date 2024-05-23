import type { IUser } from "$lib/domain/entities/user";

export interface IUserRepository {
  findById: (id: string) => Promise<IUser | null>
  login: (email: string, password: string) => Promise<{ user: IUser, sessionCookie: string }>
  authRefresh: () => Promise<{ user: IUser, sessionCookie: string }>
  subscribe?: <T>(topic: string, callback: (data: T<Y>) => void) => Promise<P>
}