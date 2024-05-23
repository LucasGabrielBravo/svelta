<script lang="ts">
//Skeleton css
	import '../app.postcss'
// Highlight JS
	import { Modal, initializeStores, storeHighlightJs, type ModalComponent } from '@skeletonlabs/skeleton'
	import hljs from 'highlight.js/lib/core'
	import xml from 'highlight.js/lib/languages/xml'
	import 'highlight.js/styles/github-dark.css'
// for HTML
	import css from 'highlight.js/lib/languages/css'
	import javascript from 'highlight.js/lib/languages/javascript'
	import typescript from 'highlight.js/lib/languages/typescript'
// Floating UI for Popups
	import ModalPage from '$lib/components/interface/ModalPage.svelte'
	import ModalFormField from '$lib/components/interface/form-fields/ModalFormField.svelte'
	import { modalFormField } from '$lib/stores/modalFormField'
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
	import { LightSwitch, storePopup } from '@skeletonlabs/skeleton'
	import 'iconify-icon'

	hljs.registerLanguage('xml', xml)
	hljs.registerLanguage('css', css)
	hljs.registerLanguage('javascript', javascript)
	hljs.registerLanguage('typescript', typescript)
	storeHighlightJs.set(hljs)

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow })

	initializeStores()

	function handleClickBackdrop() {
		$modalFormField = null
	}

	const modalComponentRegistry: Record<string, ModalComponent> = {
		ModalFormField: { ref: ModalFormField },
		ModalPage: { ref: ModalPage }
	}
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900;8..144,1000&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<slot />

<Modal on:backdrop={handleClickBackdrop} components={modalComponentRegistry} />

<div class="fixed bottom-2 right-2">
	<LightSwitch />
</div>
