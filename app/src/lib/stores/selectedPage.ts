import type { IPage } from '$lib/domain/entities/page'
import { writable } from 'svelte/store'

function createPageStore() {
  const { set, subscribe, update } = writable<IPage | undefined>(undefined)

  return { set, subscribe, update }
}

export const selectedPage = createPageStore()