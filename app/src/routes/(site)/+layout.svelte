<script lang="ts">
	import { browser } from "$app/environment"
	import { page } from "$app/stores"
	import { site } from "$lib/stores/site"
	import { onMount } from "svelte"
	import type { PageData } from "./[...path]/$types"

  export let data: PageData
  
  let loaded = !browser

  onMount(() => {
    $site = data.site

    loaded = true
  })
</script>

{#if loaded}
  {#key $page.url.pathname}    
    <slot />
  {/key}
{/if}