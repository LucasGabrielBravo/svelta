<script lang="ts">
	import { cx } from 'class-variance-authority'
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import Icon from './Icon.svelte'

	interface $$Props extends Omit<HTMLButtonAttributes, 'color'> {		
		loading?: boolean;
	}

	export let loading: boolean | undefined = undefined;
	let className: string | undefined | null = undefined
	export { className as class }
	
	delete $$props.class 	
</script>

<button class={cx('btn flex flex-row', className)} {...$$props} on:click>
	{#if $$slots.icon || loading}
		<span>
			{#if loading}
				<Icon class="text-current" icon="svg-spinners:ring-resize" />
			{:else}
				<slot name="icon"/>
			{/if}
		</span>			
	{/if}

	<span>
		<slot />
	</span>
</button>
