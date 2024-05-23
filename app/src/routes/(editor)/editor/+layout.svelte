<script lang="ts">
	import { selectedPage } from "$lib/stores/selectedPage"
	import { site } from "$lib/stores/site"
	import { user } from "$lib/stores/user"
	import { onMount } from "svelte"
	import type { PageData } from "./$types"
  
  export let data: PageData
  
  let loaded = false
  
  onMount(async () => {
    await user.autoLogin()

    $site = data.site

    if($site && $site.pages.length){
      $selectedPage = $site.pages[0]
    }

    loaded = true
  })
</script>

{#if loaded}
  <slot />
{/if}