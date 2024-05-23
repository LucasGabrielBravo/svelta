<script lang="ts">
	import SectionsList from '$lib/components/interface/SectionsList.svelte'
//import { decodeUpperCase } from '$lib/utils/uppercase'
	import Button from '$lib/components/interface/Button.svelte'
	import DefaultDropzone from '$lib/components/interface/DefaultDropzone.svelte'
	import Icon from '$lib/components/interface/Icon.svelte'
	import MenuPages from '$lib/components/interface/MenuPages.svelte'
	import SectionEditor from '$lib/components/interface/SectionEditor.svelte'
	import { createPageService } from '$lib/services/pageService'
	import { createSiteService } from '$lib/services/siteService'
	import { selectedPage } from '$lib/stores/selectedPage'
	import { site } from '$lib/stores/site'
	import Swal from 'sweetalert2'

  let loadingSave = false

  async function handleClickSave() {
    if(!$site || loadingSave) return

    loadingSave = true

    const pages = $site.pages

    try {
      await Promise.all(pages.map(page => createPageService().update(page)))
      $site = await createSiteService().update($site)      

      const pageIndex = $site.pages.findIndex(i => i.path === $selectedPage?.path)
      
      if(pageIndex !== -1){
        $selectedPage = $site.pages[pageIndex]
      }
    } catch (error) {
      console.error(error)
      Swal.fire("Erro on save", undefined, "error")
    } finally {
      loadingSave = false
    }
  }
</script>

{#if $site && $selectedPage}
  <div class="relative flex flex-row bg-surface-100-800-token gap-8 pr-8">
    <div
      class="h-screen flex flex-col gap-4 sticky top-0 w-96 p-4 border-r border-surface-300 dark:border-surface-800 shadow-md bg-surface-50-900-token"
    >
      <MenuPages />

      <div class="flex-1">
        <SectionsList />
      </div>

      <Button loading={loadingSave} on:click={handleClickSave} class="variant-filled-primary">
        <Icon icon="mdi:content-save" slot="icon" />
        Salvar
      </Button>
    </div>
    <div    
      class="relative w-full max-w-7xl min-h-[90vh] my-10 mx-auto border border-surface-300 dark:border-surface-800 bg-surface-50-900-token shadow-md"
    >    
      <SectionEditor index={-1} section={$site.layoutComponents.navbar} group="Navbar" />

      {#key `${$selectedPage.id}`+`${$selectedPage.props.sections.length}`+`${$selectedPage.updated.getTime()}`}
        {#each $selectedPage.props.sections as section, i (i)}
          <SectionEditor index={i} {section} />
        {/each}      
      {/key}     
      
      <DefaultDropzone />

      <SectionEditor index={-2} section={$site.layoutComponents.footer} group="Footer" />
    </div>
  </div>
{/if}

<!-- 
  /* let sectionNavbar: IPage['props']['sections'][number] = {
    name: "NavbarLeftAligned",
    group: "Navbar",    
    fields: {},
  }

  let sectionFooter: IPage['props']['sections'][number] = {
    name: "FooterSocialNetworks",
    group: "Footer",    
    fields: {},
  } */

  /* function dropzone(node: HTMLElement, params: { index: number, group: "section" | "Navbar" | "Footer" }) {  
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
          fields: {},
          group: 'Navbar',
          name: $dataTransferSection.section,
        }

        createSiteService().update($site)
      }else if(group === "Footer"){
        $site.layoutComponents.footer = {
          fields: {},
          group: 'Footer',
          name: $dataTransferSection.section,
        }

        createSiteService().update($site)
      }else{        
        $selectedPage.props.sections.splice(index, 0, { name: $dataTransferSection.section, group: $dataTransferSection.group, fields: {}, })
        $selectedPage.props.sections = [...$selectedPage.props.sections]

        createPageService().update($selectedPage)
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
  } */
 -->