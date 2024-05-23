<script lang="ts">
	import type { IPost } from '$lib/domain/entities/post'
	import type { ISite } from '$lib/domain/entities/site'
	import { sections, type SectionType } from '../sections/sections'

	export let site: ISite | undefined = undefined
	export let section: SectionType
	export let fields: ISectionFields
	export let posts: IPost[] | undefined = undefined		

	let selectedSection = (sections as any)[section]  
</script>

<svelte:component this={selectedSection} {fields} {site} {posts} />
