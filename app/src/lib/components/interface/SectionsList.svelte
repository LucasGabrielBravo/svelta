<script lang="ts">
	import { dataTransferSection, dropPreviewPosition, isDragging } from '$lib/stores/dragAndDrop'
	import { sectionsGroups } from '$lib/utils/constants'
	import lodash from 'lodash'
	import Miniature from './Miniature.svelte'
	import Section from './Section.svelte'
	import { sectionsList, type ISectionItem } from './sectionsList'

	const { groupBy } = lodash

	const sectionsGrouped = groupBy(sectionsList, 'group')

	function getSectionGroupLabel(value: string) {
		const group = sectionsGroups.find((i) => i.value === value)

		if (group) {
			return group.label
		}

		return 'Group not found'
	}

	function draggable(node: HTMLElement, data: ISectionItem) {
		node.draggable = true
		node.style.cursor = 'grab'

		function handleDragStart(e: DragEvent) {
			$isDragging = true

			if (!e.dataTransfer) return

			$isDragging = data.group !== 'Footer' && data.group !== 'Navbar' ? 'section' : data.group

			$dataTransferSection = {
				section: data.section,
				group: data.group
			}
		}

		function handleDragEnd() {
			$dataTransferSection = undefined
			$isDragging = false
			$dropPreviewPosition = undefined
		}

		node.addEventListener('dragstart', handleDragStart)
		node.addEventListener('dragend', handleDragEnd)

		return {
			destroy() {
				node.removeEventListener('dragstart', handleDragStart)
				node.removeEventListener('dragend', handleDragEnd)
			}
		}
	}
</script>

<div>
	{#each Object.entries(sectionsGrouped) as [key, sections]}
		<div class="flex flex-col w-full">
			<span class="text-sm font-bold text-surface-700-200-token mb-2 border-b p-1">
				{getSectionGroupLabel(key)}
			</span>
			<div class="columns-2">
				{#each sections as section}
					<div
						use:draggable={section}
						aria-label={section.section}
						class="border border-surface-300-600-token rounded shadow h-max overflow-hidden relative group mb-4"
					>
						<Miniature width={168}>
							<Section section={section.section} fields={{}} />
						</Miniature>

						<div class="absolute inset-0"></div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
