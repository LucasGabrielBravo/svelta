import { createPage, type IPage } from "$lib/domain/entities/page";
import { firebase } from "$lib/stores/firebase";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { get } from "svelte/store";
import type { IPageService } from "../pageService";

interface IPageCollection {
  created: { seconds: number },
  updated: { seconds: number },
  index: number
  path: string
  props: IPage['props']  
}

export function createPageByCollection(id: string, data: IPageCollection) {
  const created = new Date(data.created.seconds*1000)
  const updated = new Date(data.updated.seconds*1000)

  return createPage({...data, id: id, created, updated})
}

export function createPageServiceFirebase(): IPageService {
  const app = get(firebase)
  const db = getFirestore(app)

  return {
    getAll: async () => {
      const q = query(collection(db, "pages"))
      
      const { docs } = await getDocs(q)

      const pages = docs.map(i => ({ id: i.id, data: i.data() as IPageCollection }))      

      return pages.map(({ id, data }) => createPageByCollection(id, data))
    },

    findByPath: async (path) => {
      const q = query(collection(db, "pages"), where("path", "==", path))

      const { docs, size } = await getDocs(q)

      if(!size) {
        return null
      }

      const page = {
        id: docs[0].id,
        data: docs[0].data() as IPageCollection
      }

      return createPageByCollection(page.id, page.data)      
    },

    create: async (page) => {
      const { id: _, ...data } = page

      const { id } = await addDoc(collection(db, "pages"), data)

      const pageRef = doc(db, "pages", id)
      const pageData = await getDoc(pageRef)

      return createPageByCollection(id, pageData.data() as IPageCollection)
    },

    update: async (page) => {
      page.updated = new Date()

      const { id, ...pageProps } = page
      
      const ref = doc(db, "pages", id)

      try {
        await setDoc(ref, pageProps)

        return page
      } catch (error) {        
        console.log(getAuth(app).currentUser)
        throw error
      }
    },

    delete: async (page) => {
      throw new Error("Not implemented")
    },
  }
}