<script lang="ts">
	import { site } from "$lib/stores/site"
	import Input from "../Input.svelte"
	import Select from "../Select.svelte"

  export let field: ISectionField  
</script>

<div class="w-full flex flex-col">
  <span class="text-base font-bold text-surface-900-50-token">{field.label}</span>

  <hr class="my-3" />

  <Input label="Texto" bind:value={field.value.label} />
  
  <div class="flex flex-row mb-2 gap-2 my-6">
    <label class="flex items-center space-x-2">
      <input class="radio" type="radio" value="route" bind:group={field.value.type} />
      <span class="text-base font-bold">Página</span>
    </label>
    <label class="flex items-center space-x-2">
      <input class="radio" type="radio" value="url" bind:group={field.value.type} />
      <span class="text-base font-bold">URL</span>
    </label>
  </div>

  {#if field.value.type === "route"}
    {#if $site}          
      <Select 
        label="Página" 
        bind:value={field.value.href} 
        options={$site.pages.map(i => ({ label: i.props.title, value: i.path }))}
      />
    {/if}        
  {:else}
    <div>          
      <Input label="URL" bind:value={field.value.href} />
    </div>        
  {/if}
</div>