<script lang="ts">
  import { tinyMCEConfig } from "$lib/utils/tinyMCEConfig"
  import TinyMCE from "@tinymce/tinymce-svelte"

  export let value: string
  export let headings: boolean | undefined = false
  let key = Math.random().toString();

  let h: number

  $: conf = tinyMCEConfig({ max_height: h, min_height: h, headings })
</script>

{#key key}
  <div bind:clientHeight={h} class="w-full h-full rounded-md overflow-hidden">
    <TinyMCE 
      scriptSrc={"/libs/tinymce/tinymce.min.js"} 
      cssClass="tinymce tinymce-no-border"
      {conf}     
      bind:value
    />
  </div>
{/key}

<style lang="postcss">
  :global(.tinymce-no-border > div) {
    @apply border-none
  }
</style>