<script lang="ts">
	import { page } from "$app/stores"
	import { selectedPage } from "$lib/stores/selectedPage"
	import { getModalStore } from "@skeletonlabs/skeleton"
	import { cx } from "class-variance-authority"
	import lodash from 'lodash'
	import Button from "./Button.svelte"
	import Icon from "./Icon.svelte"
	import ModalFormField from "./form-fields/ModalFormField.svelte"

  const { cloneDeep } = lodash

  const modal = getModalStore()

  const isEditor = $page.url.pathname === "/editor"

  export let field: ISectionField
  let classNames: string | undefined = undefined
  export { classNames as class }

  const floatHiddenButton = "absolute hidden group-hover:flex z-20 -right-3 -top-3 btn p-1 variant-glass-primary text-on-primary-token"

  function handleOpenModalFormField() {  
    modal.trigger({
      type: 'component',
      component: {
        ref: ModalFormField,
        props: {
          field: cloneDeep(field),
          setField: (value: ISectionField) => {
            Object.assign(field, value)

            if($selectedPage){
              $selectedPage.updated = new Date()
            }
          }
        }
      },      
    })
  }

  function handleClickAddList() {        
    if(field.type !== 'list') return

    const max = field.value.max

    if(max !== undefined && field.value.items.length >= max) return 

    const items = cloneDeep(field.value.items)
    items.push(cloneDeep(items[0]))

    field.value.items = items

    field = field

    //createPageService().update($selectedPage!)
  }

  function handleClickDeleteList() {
    if(field.type !== 'list') return

    const min = field.value.min

    if(min !== undefined && field.value.items.length <= min) return     

    if(field.value.items.length > 1){
      field.value.items.splice(field.value.items.length-1, 1)
      field = field
    }

    //createPageService().update($selectedPage!)
  }
</script>

<div class={cx(isEditor ? "relative group hover:ring-2 ring-offset-2 ring-primary-200-700-token" : "", classNames)}>
  {#if isEditor}
    {#if field.type === "link"}
      <button 
        title="Editar link" 
        class={floatHiddenButton}
        on:click={handleOpenModalFormField}
      >      
        <Icon icon="mdi:edit" />
      </button>

    {:else if field.type === "text"}
      <button 
        title="Editar texto" 
        class={floatHiddenButton}
        on:click={handleOpenModalFormField}
      >      
        <Icon icon="mdi:edit" />
      </button>

    {:else if field.type === "list"}      
      <div class="absolute -inset-2 rounded-token ring-2 hidden group-hover:flex">
        <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 flex flex-row items-center gap-2 z-10">
          {#if (field.value.max === undefined || field.value.items.length < field.value.max)}
            <Button on:click={handleClickAddList} class="variant-filled-primary p-1">
              <Icon icon="mdi:add" />
            </Button>
          {/if}

          {#if field.value.min === undefined || field.value.items.length > field.value.min}
            <Button on:click={handleClickDeleteList} class="variant-filled-primary p-1">
              <Icon icon="mdi:minus" />
            </Button>
          {/if}
        </div>
      </div>
    {/if}    
  {/if}

  {#if field.enable === true || field.enable === undefined}
    <slot />
  {:else}
    <!-- svelte-ignore empty-block -->
  {/if}
</div>