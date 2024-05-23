<script lang="ts">
	import { page } from "$app/stores"
	import { selectedPage } from "$lib/stores/selectedPage"
	import { site } from "$lib/stores/site"

  export let value: string
  export let isNavbarOrFooter: boolean = false

  const isEditor = $page.url.pathname === "/editor"

  async function handleBlur() {
    if(!$site || !$selectedPage) return

    if(isNavbarOrFooter){
      //await createSiteService().update($site)
    }else{
      //await createPageService().update($selectedPage)
    }    
  }
</script>

{#if isEditor}
  <span>
    <div contenteditable bind:innerHTML={value} on:blur={handleBlur} class="hover:ring-2 ring-offset-2"/>
  </span>  
{:else}  
  {@html value}
{/if}