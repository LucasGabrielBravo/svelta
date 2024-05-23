<script lang="ts">
	import { dataTransferSection, dropPreviewPosition, isDragging } from "$lib/stores/dragAndDrop"
	import { selectedPage } from "$lib/stores/selectedPage"
	import { site } from "$lib/stores/site"
	import { sectionsFields } from "../sections/sectionsFields"
	import Icon from "./Icon.svelte"
	import Miniature from "./Miniature.svelte"
	import Section from "./Section.svelte"

  function dropzone(node: HTMLElement) {      
    if(!$selectedPage) return

    const index = -3
    const group = "section"

    function handleDragEnter(e: DragEvent) {      
      if(!e.dataTransfer) return                      

      $dropPreviewPosition = index
    }

    function handleDragLeave(e: DragEvent) {      
      setTimeout(() => {
        if($dropPreviewPosition === index){
          $dropPreviewPosition = undefined
        }      
      }, 100)
    }

    function handleDragOver(e: DragEvent) {
      e.preventDefault()

      if(!e.dataTransfer) return

      e.dataTransfer.dropEffect = 'move'
    }

    function handleDrop(e: DragEvent) {
      e.preventDefault()

      if(!$site || !$selectedPage) return
      if(!e.dataTransfer || !$dataTransferSection) return
      if(group !== $isDragging) return

      const s = { 
        name: $dataTransferSection.section, 
        group: $dataTransferSection.group, 
        fields: sectionsFields[$dataTransferSection.section],
      }
        
      $selectedPage.props.sections.splice($selectedPage.props.sections.length, 0, s)
      $selectedPage.props.sections = [...$selectedPage.props.sections]

      //createPageService().update($selectedPage)

      $dataTransferSection = undefined
      $isDragging = false
      $dropPreviewPosition = undefined      
    }

    node.addEventListener('dragenter', handleDragEnter)
    node.addEventListener('dragleave', handleDragLeave)
    node.addEventListener('dragover', handleDragOver)
    node.addEventListener('drop', handleDrop)

    return {
      destroy() {
        node.removeEventListener('dragenter', handleDragEnter)
        node.removeEventListener('dragleave', handleDragLeave)
        node.removeEventListener('dragover', handleDragOver)
        node.removeEventListener('drop', handleDrop)
      }
    }
  }
</script>

{#if $selectedPage}
  <div use:dropzone class="relative p-2">
    {#if $isDragging === "section" && $dataTransferSection && $dropPreviewPosition === -3}
      <Miniature>
        <Section section={$dataTransferSection.section} fields={{}} />
      </Miniature>          
    {/if}
    <div class="w-full h-28 text-3xl flex items-center justify-center border">
      {#if $isDragging === "section"}
        <Icon icon="ri:drag-drop-fill" />
      {:else}
        <Icon icon="ri:drag-drop-line" />
      {/if}
    </div>  
    {#if $isDragging === "section"}
      <div class="absolute inset-0 overlayer z-20" />          
    {/if}
  </div>
{/if}