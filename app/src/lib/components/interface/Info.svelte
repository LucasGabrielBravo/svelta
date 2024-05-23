<script lang="ts">
	import Icon from "./Icon.svelte";

  export let information: string  
</script>

<div class="absolute top-px -right-1 translate-x-full">
  <div class="relative">      
    <div class="icon">
      <Icon icon="mdi:information-slab-circle-outline" />    
    </div>
  
    <div class="text">
      <p>{information}</p>
      <div class="arrow variant-filled-surface" />
    </div>    
  </div>
</div>

<style lang="postcss">
  .icon {
    @apply cursor-pointer
  }

  .text {
    max-width: 256px;

    @apply hidden absolute text-sm p-3 bg-surface-50 shadow drop-shadow -translate-y-full translate-x-1/2 right-1/2 rounded-sm w-max
  }

  .icon:hover + .text, .text:hover {
    @apply flex
  }
</style>