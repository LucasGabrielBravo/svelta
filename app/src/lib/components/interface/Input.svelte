<script lang="ts">
	import { generateId } from '$lib/utils/generateId'
	import { information } from '$lib/utils/information'
	import { simplify } from '$lib/utils/simplify'
	import { cx } from 'class-variance-authority'
	import type { HTMLInputAttributes } from 'svelte/elements'

	interface $$Props extends Partial<HTMLInputAttributes> {
		label?: string
		class?: string
    inputClass?: string
		information?: string
		transforms?: {
      uppercase?: boolean
      lowercase?: boolean
      nospace?: boolean
			simplify?: boolean
    }
	}

	export let id: string | undefined | null = generateId();
	export let label: string = '';
	export let value: string | number | undefined = undefined;	
	export let transforms: $$Props['transforms'] = undefined
	export let info: $$Props['information'] = undefined
	export let inputClass: string | undefined = undefined;
	let divClass: string | undefined = undefined;
  export { divClass as class }

  let props: SvelteAllProps
	
	function uppercase(node: HTMLInputElement, enable: boolean = false) {    
    if(!enable) return

		const transform = () => node.value = node.value.toUpperCase()
		
		node.addEventListener('input', transform, { capture: true })
		
		transform()

    return {
      destroy() {
        node.removeEventListener('input', transform);
      }
    }
	}

  function lowercase(node: HTMLInputElement, enable: boolean = false) {    
    if(!enable) return

		const transform = () => node.value = node.value.toLowerCase()
		
		node.addEventListener('input', transform, { capture: true })
		
		transform()

    return {
      destroy() {
        node.removeEventListener('input', transform);
      }
    }
	}

  function nospace(node: HTMLInputElement, enable: boolean = false) {    
    if(!enable) return
    
		const transform = () => node.value = node.value.replaceAll(" ", "")
		
		node.addEventListener('input', transform, { capture: true })
		
		transform()

    return {
      destroy() {
        node.removeEventListener('input', transform);
      }
    }
	}
	  
  function simple(node: HTMLInputElement, enable: boolean = false) {    
    if(!enable) return
    
		const transform = () => node.value = simplify(node.value)
		
		node.addEventListener('input', transform, { capture: true })
		
		transform()

    return {
      destroy() {
        node.removeEventListener('input', transform);
      }
    }
	}	

  let className = divClass
	props = {...$$props}
	delete props.class
</script>

<div
	class={className}
>
	{#if label}		
		<label for={id} class="block text-sm font-semibold leading-6 text-surface-900-50-token">
			<span use:information={info}>
				{label}
			</span>

			{#if props.required === true}
				<span class="text-red-500 dark:text-red-400">*</span>
			{/if}
		</label>
	{/if}
	<input
		id={id}
		class={cx("block w-full px-3.5 py-2 bg-surface-50 dark:bg-surface-800 text-surface-900-50-token shadow-sm rounded-container-token border-token border-surface-300-600-token placeholder:text-surface-400-500-token sm:text-sm sm:leading-6 focus:shadow-primary-200 dark:focus:shadow-primary-700 focus:border-primary-600-300-token focus:ring-0", inputClass)}
		bind:value
		on:input
    {...props}
		use:uppercase={transforms?.uppercase}
		use:lowercase={transforms?.lowercase}
		use:nospace={transforms?.nospace}
		use:simple={transforms?.simplify}
	/>
</div>
