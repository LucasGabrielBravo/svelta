<script lang="ts">
	import { selectedPage } from "$lib/stores/selectedPage"
	import { site } from "$lib/stores/site"
	import { getRoutes } from "$lib/utils/getRoutes"
	import { getModalStore } from "@skeletonlabs/skeleton"
	import { slide } from 'svelte/transition'
	import Button from "./Button.svelte"
	import Icon from "./Icon.svelte"

  const modal = getModalStore()

  let open = true

  $: routes = ($site) ? getRoutes($site) : []

  function handleSelectPage(path: string) {
    if(!$site) return
    const page = $site.pages.find(i => i.path === path)
    if(page) {
      $selectedPage = page
      open = false
    }
  }

  function handleOpenModalPage() {
    modal.trigger({
      type: 'component',
      component: 'ModalPage'
    })
  }
</script>

{#if $selectedPage}
  <div class="w-full flex flex-row gap-2">    
    <div class="flex-1 flex flex-col gap-2">
      <Button on:click={() => open = !open} class="variant-soft-surface">
        {$selectedPage.props.title}
      </Button>

      {#if open}        
        <div transition:slide class="flex flex-col items-stretch variant-soft-surface pb-2">
          {#each routes as route}
            <Button class="hover:variant-soft-primary flex-1 flex justify-start" on:click={() => handleSelectPage(route.path)}>
              {route.title}
            </Button>

            <div class="w-[calc(100%_-_1.5rem)] flex flex-col items-stretch border-l border-black/20 dark:border-white/20 ml-6">
              {#each route.subpages as subpage}
                <Button class="hover:variant-soft-primary flex-1 flex justify-start text-left" on:click={() => handleSelectPage(subpage.path)}>
                  {subpage.title}
                </Button>

                <div class="w-[calc(100%_-_1.5rem)] flex flex-col items-stretch border-l border-black/20 dark:border-white/20 ml-6">
                  {#each subpage.subpages as ssp}
                    <Button class="hover:variant-soft-primary flex-1 flex justify-start text-left" on:click={() => handleSelectPage(ssp.path)}>
                      {ssp.title}
                    </Button>
                  {/each}
                </div>
              {/each}
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <Button on:click={handleOpenModalPage} class="variant-soft-surface hover:variant-soft-primary w-10 h-10">
      <Icon icon="mdi:add" />
    </Button>
  </div>
{/if}