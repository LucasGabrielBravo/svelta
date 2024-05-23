<script lang="ts">
	import Field from "$lib/components/interface/Field.svelte"
	import Img from "$lib/components/interface/Img.svelte"
	import Link from "$lib/components/interface/Link.svelte"
	import Text from "$lib/components/interface/Text.svelte"
	import SectionContainer from "$lib/components/shared/SectionContainer.svelte"
	import { heroSplitWithImageFields } from "./HeroSplitWithImageFields"

  export let fields: ISectionFields = {}

  let logo = fields.logo || heroSplitWithImageFields.logo
  let title = fields.title || heroSplitWithImageFields.title
  let paragraph = fields.paragraph || heroSplitWithImageFields.paragraph
  let callToActionText = fields.callToActionText || heroSplitWithImageFields.callToActionText
  let callToActionLink = fields.callToActionLink || heroSplitWithImageFields.callToActionLink
  let linkPrimary = fields.linkPrimary || heroSplitWithImageFields.linkPrimary
  let linkSecondary = fields.linkSecondary || heroSplitWithImageFields.linkSecondary
</script>
<div class="relative bg-surface-50-900-token">
  <SectionContainer class="lg:grid lg:grid-cols-12 lg:gap-x-8">
    <div class="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <Field bind:field={logo}>          
          <Img bind:field={logo} class="h-11" />
        </Field>
  
        <Field bind:field={callToActionText}>
          <div class="hidden sm:mt-32 sm:flex lg:mt-16">
            <div class="flex flex-row gap-1 relative rounded-full px-3 py-1 text-sm leading-6 text-surface-500-400-token ring-1 ring-surface-900/10 dark:ring-surface-50/10 hover:ring-surface-900/20 dark:hover:ring-surface-50/20">
              <Text bind:value={callToActionText.value} />
              
              <Field bind:field={callToActionLink}>
                <a href={callToActionLink.value.href} class="whitespace-nowrap font-semibold text-primary-600-300-token">
                  <span class="absolute inset-0" aria-hidden="true" />                
                  {callToActionLink.value.label}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </Field>
            </div>
          </div>
        </Field>

        <Field bind:field={title}>
          <h1 class="mt-24 text-4xl font-bold tracking-tight text-surface-900-50-token sm:mt-10 sm:text-6xl">
            <Text bind:value={title.value} />
          </h1>          
        </Field>

        <Field bind:field={paragraph}>
          <p class="mt-6 text-lg leading-8 text-surface-600-300-token">
            <Text bind:value={paragraph.value} />          
          </p>
        </Field>
        <div class="mt-10 flex items-center gap-x-6">
          <Field bind:field={linkPrimary}>
            <Link href={linkPrimary.value.href} class="variant-filled-primary">
              {linkPrimary.value.label}
            </Link>
          </Field>

          <Field bind:field={linkSecondary}>
            <Link href={linkSecondary.value.href} class="hover:variant-soft-primary">
              {linkSecondary.value.label}
            </Link>
          </Field>          

          <!-- <a href="/" class="rounded-md bg-primary-600-300-token px-3.5 py-2.5 text-sm font-semibold text-surface-50-900-token shadow-sm hover:bg-primary-500-400-token focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:focus-visible:outline-primary-300">Get started</a>
          <a href="/" class="text-sm font-semibold leading-6 text-surface-900-50-token">Learn more <span aria-hidden="true">→</span></a> -->
        </div>
      </div>
    </div>
    <div class="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
      <img class="aspect-[3/2] w-full bg-surface-50-900-token object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full" src="https://images.unsplash.com/photo-1498758536662-35b82cd15e29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80" alt="">
    </div>
  </SectionContainer>
</div>
