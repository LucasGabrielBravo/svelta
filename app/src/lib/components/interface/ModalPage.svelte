<script lang="ts">
	import { page } from "$app/stores"
	import { createPage, type IPage } from "$lib/domain/entities/page"
	import { createPageService } from "$lib/services/pageService"
	import { createSiteService } from "$lib/services/siteService"
	import { site } from "$lib/stores/site"
	import { simplify } from "$lib/utils/simplify"
	import { getModalStore, popup, type PopupSettings } from "@skeletonlabs/skeleton"
	import { onMount } from "svelte"
	import Swal from "sweetalert2"
	import Button from "./Button.svelte"
	import Input from "./Input.svelte"
	import InputIcon from "./InputIcon.svelte"

  const modal = getModalStore()

  let pageUpdate = $modal[0].meta?.page as IPage | undefined || undefined
  let isHome = $modal[0].meta?.isHome as boolean | undefined || false

  let loading = false

  const formData = {
    title: "",
    path: "/",
    icon: "",
    description: "",
  }

  function handleGeneratePath() {    
    if(isHome) return
    formData.path = `/${simplify(formData.title)}`
  }
  
  async function handleSubmit() {
    if(!$site || loading) return    

    const page = createPage({
      path: formData.path,
      index: $site.pages.length,
      props: {
        title: formData.title,
        icon: formData.icon,
        description: formData.description,
        sections: [],
      },
    })

    if(pageUpdate){
      pageUpdate.path = formData.path
      pageUpdate.props.title = formData.title
      pageUpdate.props.icon = formData.icon
      pageUpdate.props.description = formData.description
    }

    try {
      loading = true

      if(pageUpdate){
        await createPageService().update(pageUpdate)           
      }else{
        await createPageService().create(page)           
      }

      createSiteService().get().then(site => $site = site)
      
      modal.close()
      Swal.fire("A nova pagina foi criada com sucesso!", undefined, "success")
    } catch (error) {
      Swal.fire("Houve um erro ao tentar criar a página", "Tente novamente ou entre em contato conosco", "error")
    } finally {
      loading = false
    }
  }

  const popupSubpage: PopupSettings = {
    event: 'click',
    target: 'popupSubpage',
  	placement: 'bottom',
  };

  onMount(() => {
    if(pageUpdate){
      formData.path = pageUpdate.path
      formData.title = pageUpdate.props.title
      formData.icon = pageUpdate.props.icon || ""
      formData.description = pageUpdate.props.description || ""
    }
  })
</script>

<div class="w-full max-w-sm bg-surface-50-900-token p-4 rounded-lg">
  <div class="flex flex-col gap-2">
    <strong class="text-xl text-surface-800-100-token">
      {(pageUpdate) ? "Atualizar página" : "Criar nova página"}      
    </strong>
    <span class="text-surface-700-200-token">
      {(pageUpdate) ? "Você está editando uma pagina em" : `Você está criando uma nova pagina para`} {$page.url.host}
    </span>
  </div>

  <button class='btn mt-2 p-1 text-sm variant-soft-surface' use:popup={popupSubpage}>
    Como criar uma subpágina?
  </button>
  <div class="card bg-white p-4 w-72 shadow-xl z-20" data-popup="popupSubpage">
    <div class="flex flex-col text-sm font-light">
      <p class="text-lg font-medium mb-2">Criando subpáginas</p>

      <p class="mb-2">Para criar uma subpágina basta alterar o caminho da pagina da seguinte forma:</p>

      <p class="mb-1">De</p>
      <code>        
        /pagina-a <br/>
        /pagina-a-1 <br/>
        /pagina-a-2 <br/>
      </code>      

      <p class="mt-3 mb-1">Para</p>
      <code>
        /pagina-a <br/>
        /pagina-a/pagina-a-1 <br/>
        /pagina-a/pagina-a-2 <br/>
      </code>   
      
      <p class="mt-3 mb-2">
        Dessa forma as paginas <code>pagina-a-1</code> e <code>pagina-a-2</code> estão dentro da pagina <code>pagina-a</code>
      </p>
    </div>
    <div class="arrow bg-surface-50-900-token" />
  </div>

  <form on:submit|preventDefault={handleSubmit}  class="flex flex-col w-full items-stretch gap-2 mt-4">
    <Input label="Titulo da página" bind:value={formData.title} on:input={handleGeneratePath} required minlength={2} maxlength={127} />
    {#if !isHome}
      <Input label="Caminho da página" bind:value={formData.path} required minlength={3} placeholder="Ex.: /fale-conosco ou /sobre/time" pattern="^\/.*?$" />       
    {/if}
    <InputIcon label="Ícone" bind:value={formData.icon} />    
    <Input label="Descrição" bind:value={formData.description} maxlength={255} />
    <Button class="variant-filled-primary" {loading} disabled={loading}>
      {#if pageUpdate}
        Atualizar página
      {:else}
        Criar página
      {/if}
    </Button>
  </form>
</div>