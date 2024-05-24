<script lang="ts">
	import Section from "$lib/components/interface/Section.svelte"
	import type { PageData } from "./$types"

  export let data: PageData

  let site = data.site
  let page = data.page

  
</script>

<svelte:head>
  <title>{site.seo.siteName} - {page.props.title}</title>
</svelte:head>

{#if !page.props.hiddenLayoutNavbar}
  <Section site={site} section={site.layoutComponents.navbar.name} fields={site.layoutComponents.navbar.fields} />
{/if}

<div>
  {#each page.props.sections as section}
    <Section site={site} section={section.name} fields={section.fields} />
  {/each}
</div>

{#if !page.props.hiddenLayoutFooter}
  <Section site={site} section={site.layoutComponents.footer.name} fields={site.layoutComponents.footer.fields} />
{/if}