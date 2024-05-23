<script lang="ts">
	import { generateId } from "$lib/utils/generateId"
	import { info } from "$lib/utils/useInfo"
	import { cx } from "class-variance-authority"
	import Icon from "./Icon.svelte"

  export let id: string | undefined | null = generateId();
	export let label: string = 'label';
	export let required: boolean = false;
  export let classNames: string = ""
  export let inputClass: string = ""
  export let placeholder: string = "mdi:cards-heart"
  export let value: string
	export let hiddenLabel: boolean | undefined = false

  function iconformat(node: HTMLInputElement) {        
		const transform = () => node.value = node.value.toLowerCase().replaceAll(" ", "-")
		
		node.addEventListener('input', transform, { capture: true })
		
		transform()

    return {
      destroy() {
        node.removeEventListener('input', transform);
      }
    }
	}
</script>

<div
	class={cx("flex flex-row items-end mb-3", classNames)}
>

	<div class="flex flex-col flex-1">
		{#if !hiddenLabel}
			<label for={id} class="block text-sm font-semibold leading-6 text-surface-900">
				<span use:info={"Use o link abaixo para pesquisar ícones e usar o nome deles no campo de texto"}>
					{label}
				</span>
			
				{#if required}
					<span class="text-red-500">*</span>
				{/if}
			</label>			
		{/if}
		<div class="flex flex-col w-full relative">
			<input
				id={id}
				class={cx("block w-full px-3.5 py-2 text-surface-900 shadow-sm rounded-container-token border-token border-surface-300 placeholder:text-surface-400 sm:text-sm sm:leading-6 focus:shadow-primary-200 focus:border-primary-600 focus:ring-0", inputClass)}
				bind:value
				on:input    
				{placeholder}
				use:iconformat
			/>
			<a class="absolute translate-y-full -bottom-1 text-xs text-primary-700 underline" href="https://icones.js.org/" target="_blank" rel="noopener noreferrer">
				obter ícones
			</a>			
		</div>
	</div>

	<div class={cx("aspect-square h-[2.65rem] flex items-center justify-center shadow-sm rounded-container-token border-token border-surface-300 ml-1 bg-white", inputClass)}>
		<Icon icon={value} class="text-3xl text-surface-900" />
	</div>
</div>