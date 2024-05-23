<script lang="ts">
	import { getModalStore } from "@skeletonlabs/skeleton"
	import Button from "../Button.svelte"
	import FormFieldLink from "./FormFieldLink.svelte"
	import FormFieldText from "./FormFieldText.svelte"

  const modal = getModalStore()

  export let field: ISectionField
  export let setField: (field: ISectionField) => void

  function handleSubmit() {
    setField(field)
    modal.close()
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4 p-4 rounded-token border border-surface-300 dark:border-surface-800 bg-surface-50-900-token shadow-md dark:shadow-black">
  {#if field.type === "link"}
    <div class="w-96">
      <FormFieldLink bind:field={field} />
    </div>

  {:else if field.type === "text"}
    <div class="h-96 w-full max-w-3xl">
      <FormFieldText bind:field={field} />
    </div>
  {/if}

  <Button class="variant-filled-primary">
    Confirmar
  </Button>
</form>