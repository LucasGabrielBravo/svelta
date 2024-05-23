import { createSite, type ISite } from "$lib/domain/entities/site";
import { firebase } from "$lib/stores/firebase";
import { collection, doc, getDocs, getFirestore, query, setDoc } from 'firebase/firestore';
import { get } from "svelte/store";
import type { ISiteService } from "../siteService";
import { createPageServiceFirebase } from "./pageServiceFirebase";

interface ISiteCollection {
  created: { seconds: number },
  updated: { seconds: number },
  host: string,
  seo: ISite['seo'],
  socialNetworks: ISite['socialNetworks'],
  domains: string[],
  favicon: string,
  theme: string,
  layoutComponents: ISite['layoutComponents'],        
  pages: ISite['pages']
}

export function createSiteByCollection(id: string, data: ISiteCollection) {
  const created = new Date(data.created.seconds*1000)
  const updated = new Date(data.updated.seconds*1000)
  return createSite({...data, id: id, posts: [], created, updated})
}

export function createSiteServiceFirebase(): ISiteService {
  const app = get(firebase)
  const db = getFirestore(app)

  return {
    get: async () => {
      const q = query(collection(db, "site"))

      const sites = await getDocs(q)

      if(sites.empty){
        return null
      }

      const id = sites.docs[0].id
      const data = sites.docs[0].data() as ISiteCollection           
      
      const pages = await createPageServiceFirebase().getAll()
      
      data.pages = pages
      
      const site = createSiteByCollection(id, data)

      return site
    },

    update: async (site) => {
      site.updated = new Date()

      const { id, pages, posts, ...siteProps } = site
      
      try {
        const ref = doc(db, "site", id)        
        
        await setDoc(ref, siteProps)

        return site
      } catch (error) {
        throw error  
      }
    },
  }
}