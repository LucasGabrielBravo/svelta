import { env } from '$env/dynamic/public'
import { createUser, type IUser } from '$lib/domain/entities/user'
import { pb } from '$lib/stores/pb'
import { user as userStore } from '$lib/stores/user'
import { cookieName } from "$lib/utils/constants"
import localforage from 'localforage'
import type { RecordModel, RecordSubscription } from 'pocketbase'
import Pocketbase from 'pocketbase'
import { get } from 'svelte/store'
import type { IUserService } from '../userService'

const { PUBLIC_SVELTA_PB_API_URL } = env

interface IPermissionRecordModel extends RecordModel {
	user: string
	createPage: boolean
	updatePage: boolean
	deletePage: boolean
	createPost: boolean
	updatePost: boolean
	deletePost: boolean
	updateSettings: boolean
	createSite: boolean
	deleteSite: boolean
	isAdmin: boolean
}

export interface IUserRecordModel extends RecordModel {
	name: string
	email: string
	enable: boolean
	expand?: {
		'permissions(user)'?: IPermissionRecordModel
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

	if (record.expand && record.expand['permissions(user)']) {
		permissions = { ...record.expand['permissions(user)'] }
	}

	return createUser({ ...record, permissions })
}

export function createUserServicePb(): IUserService {
	const collection = get(pb).collection('users')

	const expand = 'permissions(user)'	

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

	async function subscribe(
		topic: string,
		callback: (data: RecordSubscription<IUserRecordModel>) => void
	) {
		return collection.subscribe<IUserRecordModel>(topic, callback, { query: { expand } })
	}

	return {
		authRefresh,

		login: async (email: string, password: string) => {
			try {
				const { record } = await get(pb)
					.collection('users')
					.authWithPassword<IUserRecordModel>(email, password, { expand })
	
				const sessionCookie = get(pb).authStore.exportToCookie()
	
				const result = {
					user: createUserByRecord(record),
					sessionCookie
				}
	
				return result
			} catch (error) {
				throw error
			}
		},

		findById: async (id: string) => {
			try {
				const user = await collection.getOne<IUserRecordModel>(id, { expand })
				return createUserByRecord(user)
			} catch (error) {
				return null
			}
		},			

		verifySession: async (cookies) => {
			const pb = new Pocketbase(PUBLIC_SVELTA_PB_API_URL)

			const cookie = cookies.get(cookieName)

			if (cookie) {
				pb.authStore.loadFromCookie(cookie)
			}

			if (!pb.authStore.isValid || !pb.authStore.model) {
				pb.authStore.clear()
				return false
			}

      return true
		},				

		autoLogin: async () => {
			const sessionCookie = await localforage.getItem<string>(cookieName)

			if(!sessionCookie) {								
				return await userStore.logout()
			}

			get(pb).authStore.loadFromCookie(sessionCookie)

			try {      
				if(!get(pb).authStore.isValid){
					return await userStore.logout()
				}

				const { sessionCookie, user } = await authRefresh()
				
				await userStore.setCookie(sessionCookie)
				
				userStore.set(user)
			} catch (error) {
				return await userStore.logout()
			}
		},

		logout: async () => {
			get(pb).authStore.clear()
		},
	}
}

/**
createUserService().subscribe(user.id, async ({ record }) => {
					createUserService().findById(record.id).then(u => {
						if(u){
							set(u)
						}
					})
				})
 */