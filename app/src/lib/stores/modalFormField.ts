import { writable } from 'svelte/store'
//import { getModalStore } from '@skeletonlabs/skeleton'

function createModalFormField() {
  const { set, subscribe, update } = writable<ISectionField | null>(null)  

  return { set, subscribe, update }
}

export const modalFormField = createModalFormField()