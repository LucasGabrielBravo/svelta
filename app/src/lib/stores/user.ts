import { goto } from '$app/navigation'
import type { IUser } from '$lib/domain/entities/user'
import { createUserService } from '$lib/services/userService'
import { cookieName } from '$lib/utils/constants'
import Cookies from 'js-cookie'
import localforage from 'localforage'
import { writable } from 'svelte/store'
import { loading } from './loading'

function createUserStore() {
  const { set, subscribe, update } = writable<IUser | null>(null)  

  async function setCookie(cookie: string | null) {
    if(cookie){
      await localforage.setItem(cookieName, cookie)      
      Cookies.set(cookieName, cookie)
    }else{
      localforage.removeItem(cookieName)
      Cookies.remove(cookieName)
    }
  }

  async function loadCookie() {
    const cookie = await localforage.getItem<string>(cookieName)

    if(cookie){
      Cookies.set(cookieName, cookie)
    }
  }

  async function login(email: string, password: string) {
    try {
      const { sessionCookie, user } = await createUserService().login(email, password)
      
      await setCookie(sessionCookie)
      
      set(user)      
    } catch (error) {
      await setCookie(null)
      set(null)
      throw error
    }
  }

  async function logout() {
    await createUserService().logout()
    await setCookie(null)
    set(null)
    await goto("/")
  }

  async function autoLogin() {
    loading.set(true)    
    await createUserService().autoLogin()
    loading.set(false)
  }

  return { set, subscribe, update, login, logout, autoLogin, setCookie, loadCookie }
}

export const user = createUserStore()