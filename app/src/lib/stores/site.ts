import type { ISite } from '$lib/domain/entities/site'
import { createSiteService } from '$lib/services/siteService'
import { writable } from 'svelte/store'

function createSiteStore() {
  const { set, subscribe, update } = writable<ISite | null>(undefined)

  async function refresh() {
    const site = await createSiteService().get()

    if(site){
      set(site)
    }
  }

  return { set, subscribe, update, refresh }
}

export const site = createSiteStore()