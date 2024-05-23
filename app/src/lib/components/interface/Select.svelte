<script lang="ts">
	import { generateId } from '$lib/utils/generateId'
	import { cx } from 'class-variance-authority'
	import type { HTMLInputAttributes } from 'svelte/elements'

	interface $$Props extends Partial<HTMLInputAttributes> {
		label?: string;
		options: { label: string, value: string }[]
	}

	export let id: string | undefined | null = generateId();
	export let label: string = 'label';
	export let value: string | number | undefined = undefined;
	export let options: { label: string, value: string }[]
	
	let classNames: string | undefined | null = undefined;	
	export { classNames as class }

  delete $$props.class 
</script>

<div class={cx("", classNames)}>
	<label for={id} class="block text-sm font-semibold leading-6 text-surface-900-50-token">
		{label}

		{#if $$props.required === true}
			<span class="text-red-500">*</span>
		{/if}
	</label>
	<select
    {id}				
    bind:value
    on:input
    class="block w-full px-3.5 py-2 bg-surface-50 dark:bg-surface-800 text-surface-900-50-token shadow-sm rounded-container-token border-token border-surface-300-600-token placeholder:text-surface-400-500-token sm:text-sm sm:leading-6 focus:shadow-primary-200 focus:border-primary-600 focus:ring-0"
    {...$$props}
  >
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}					    
  </select>
</div>
