<script lang="ts">
	import type { IPagePropsSection } from "$lib/domain/entities/page"
	import { dataTransferSection, dropPreviewPosition, isDragging } from "$lib/stores/dragAndDrop"
	import { selectedPage } from "$lib/stores/selectedPage"
	import { site } from "$lib/stores/site"
	import Swal from "sweetalert2"
	import { sectionsFields } from "../sections/sectionsFields"
	import Icon from "./Icon.svelte"
	import Miniature from "./Miniature.svelte"
	import Section from "./Section.svelte"

  export let section: IPagePropsSection
  export let index: number
  export let group: "section" | "Navbar" | "Footer" = "section"

  function dropzone(node: HTMLElement, params: { index: number, group: "section" | "Navbar" | "Footer" }) {  
    const { group, index } = params

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

      if(group === "Navbar"){
        $site.layoutComponents.navbar = {
          fields: sectionsFields[$dataTransferSection.section],
          group: 'Navbar',
          name: $dataTransferSection.section,
        }

        //createSiteService().update($site)
      }else if(group === "Footer"){
        $site.layoutComponents.footer = {
          fields: sectionsFields[$dataTransferSection.section],
          group: 'Footer',
          name: $dataTransferSection.section,
        }

        //createSiteService().update($site)
      }else{        
        const s = { 
          name: $dataTransferSection.section, 
          group: $dataTransferSection.group, 
          fields: sectionsFields[$dataTransferSection.section],
        }
        
        $selectedPage.props.sections.splice(index, 0, s)
        $selectedPage.props.sections = [...$selectedPage.props.sections]

        //createPageService().update($selectedPage)
      }

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

  async function handleDeleteSection() {
    if(!$selectedPage) return

    const res = await Swal.fire({
      icon: 'question',
      title: "Deseja remover a seção?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Remover",
    })

    if(res.isConfirmed){
      $selectedPage.props.sections.splice(index, 1)      
      $selectedPage = {...$selectedPage, updated: new Date()}
      //createPageService().update($selectedPage).then(() => { site.refresh() })
    }
  }

  function toggleHiddenLayoutSection(layoutItem: "hiddenLayoutNavbar" | "hiddenLayoutFooter") {
    if(!$selectedPage) return

    $selectedPage.props[layoutItem] = !$selectedPage.props[layoutItem]

    //createPageService().update($selectedPage).then(() => { site.refresh() })
  }

  function handleChangePosition(value: "up" | "down") {
    if(!$selectedPage) return
    if(value === "up" && index === 0) return
    if(value === "down" && index === $selectedPage.props.sections.length-1) return

    if(value === "up") {
      const sections = $selectedPage.props.sections
      const componentA = sections[index]
      const componentB = sections[index-1]

      sections[index-1] = componentA
      sections[index] = componentB
      $selectedPage.props.sections = sections
    }

    if(value === "down") {
      const sections = $selectedPage.props.sections
      const componentA = sections[index]
      const componentB = sections[index+1]

      sections[index+1] = componentA
      sections[index] = componentB
      $selectedPage.props.sections = sections
      $selectedPage = {...$selectedPage, updated: new Date()}
    }

    //createPageService().update($selectedPage).then(() => { site.refresh() })
  }
</script>

<div class="relative ring-surface-700-200-token dark:slate-200 ring-offset-1 hover:ring-4 hover:z-20 group/editor-component">
  <div class="relative" aria-label={section.name} use:dropzone={{ index: index, group: group }}>
    {#if $isDragging === "section" && $dataTransferSection && $dropPreviewPosition === index}
      <Miniature>
        <Section section={$dataTransferSection.section} fields={{}} />
      </Miniature>          
    {/if}

    <Section section={section.name} fields={section.fields} />

    {#if $isDragging === group}
      <div class="absolute inset-0 overlayer z-20" />          
    {/if}
  </div>

  {#if $selectedPage}
    <div class="absolute top-0 right-0 z-20 hidden group-hover/editor-component:flex translate-x-px -translate-y-px">
      {#if group === "section"}
        {#if $selectedPage.props.sections.length > 1}
          <button title="Deletar seção" on:click={handleDeleteSection} class="btn btn-sm variant-filled-surface rounded-none bg-surface-700 dark:bg-surface-200 text-surface-50 dark:text-surface-900">        
            <Icon icon="carbon:trash-can" class="text-lg" />        
          </button>                
        {/if}
      {:else}
        {@const layoutItem = (group === "Navbar") ? "hiddenLayoutNavbar" : "hiddenLayoutFooter"}
        <button title={($selectedPage.props[layoutItem]) ? "Exibir seção" : "Esconder seção"} on:click={() => toggleHiddenLayoutSection(layoutItem)} class="btn btn-sm variant-filled-surface rounded-none bg-surface-700 dark:bg-surface-200 text-surface-50 dark:text-surface-900">        
          <Icon icon={($selectedPage.props[layoutItem]) ? "mdi:eye-outline" : "mdi:eye-off-outline"} class="text-lg" />        
        </button>
      {/if}
      
      {#if group === "section"}
        <button title="Subir" on:click={() => handleChangePosition('up')} class="btn btn-sm variant-filled-surface rounded-none bg-surface-700 dark:bg-surface-200 text-surface-50 dark:text-surface-900">
          <Icon icon="carbon:chevron-up" class="text-lg" />
        </button>
        <button title="Descer" on:click={() => handleChangePosition('down')} class="btn btn-sm variant-filled-surface rounded-none bg-surface-700 dark:bg-surface-200 text-surface-50 dark:text-surface-900">
          <Icon icon="carbon:chevron-down" class="text-lg" />
        </button>
      {/if}
    </div>    
  {/if}
</div>