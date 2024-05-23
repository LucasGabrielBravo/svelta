import { createUser, type IUser } from "$lib/domain/entities/user";
import { firebase } from "$lib/stores/firebase";
import { user as userStore } from '$lib/stores/user';
import { cookieName } from "$lib/utils/constants";
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { get } from "svelte/store";
import type { IUserService } from "../userService";

interface IUserCollection extends Omit<IUser, "created" | "updated">{
  created: { seconds: number }
  updated: { seconds: number }
}

export function createUserByCollection(data: IUserCollection) {
  const created = new Date(data.created.seconds*1000)
  const updated = new Date(data.updated.seconds*1000)

  return createUser({...data, created, updated})
}

export function createUserServiceFirebase(): IUserService {
  const app = get(firebase)  
  const auth = getAuth(app)
  const db = getFirestore(app)

  async function findById(id: string): Promise<IUser | null> {
    const ref = doc(db, "users", id)

    const userDoc = await getDoc(ref)

    if(!userDoc.exists()){
      return null
    }

    const userData = userDoc.data() as IUserCollection

    return createUserByCollection(userData)
  }

  async function logout() {
    await auth.signOut()
  }

  return {
    login: async (email: string, password: string) => {
      await setPersistence(auth, browserLocalPersistence)

      try {
        const userAuth = await signInWithEmailAndPassword(auth, email, password)
        
        const user = await findById(userAuth.user.uid)

        if(!user){
          throw new Error("User not found")
        }

        return {
          user: user,
          sessionCookie: await userAuth.user.getIdToken()
        }
      } catch (error) {
        throw error
      }
    },

    authRefresh: async () => {
      try {
        await auth.authStateReady()
        
        if(!auth.currentUser){
          throw new Error("Invalid Session")
        }

        const user = await findById(auth.currentUser.uid)

        if(!user){
          throw new Error("User not found")
        }

        return {
          user: user,
          sessionCookie: await auth.currentUser.getIdToken()
        }
      } catch (error) {
        throw error
      }
    },    

    verifySession: async (cookies) => {
      try {
        //import { createFirebaseAdmin } from "$lib/server/firebaseAdmin";
        const { createFirebaseAdmin } = await import("$lib/server/firebaseAdmin")
        
        const idToken = cookies.get(cookieName)        
        
        if(!idToken){
          return false
        }
        
        const { auth } = createFirebaseAdmin()        
        
        const expiresIn = 1000 * 60 * 60 * 24 * 7 // 7 dias
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })
        
        await auth.verifySessionCookie(sessionCookie, true)                   
  
        return true        
      } catch (error) {     
        console.error(error)   
        return false
      }
    },

    autoLogin: async () => {
      auth.onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          const user = await findById(userAuth.uid)

          if(!user) {
            await userStore.logout()
          }

          userStore.set(user)
        } else {
          await userStore.logout()
        }
      });
    },

    logout,

    findById,
  }
}