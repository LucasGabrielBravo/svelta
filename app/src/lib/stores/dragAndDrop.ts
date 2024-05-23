import type { SectionType } from '$lib/components/sections/sections'
import type { SectionGroupType } from '$lib/utils/constants'
import { writable } from 'svelte/store'

interface IDataTransferSection {
  section: SectionType, 
  group: SectionGroupType
}

export const isDragging = writable<string | boolean>(false)

export const dataTransferSection = writable<IDataTransferSection | undefined>(undefined)

export const dropPreviewPosition = writable<number | undefined>(undefined)