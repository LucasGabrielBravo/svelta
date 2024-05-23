<script lang="ts">
	import Field from "$lib/components/interface/Field.svelte"
	import Icon from "$lib/components/interface/Icon.svelte"
	import Text from "$lib/components/interface/Text.svelte"
	import SectionContainer from "$lib/components/shared/SectionContainer.svelte"
	import { contentSplitWithImageFields } from "./ContentSplitWithImageFields"

  export let fields: ISectionFields


  let image = fields.image || contentSplitWithImageFields.image
  let preTitle = fields.preTitle || contentSplitWithImageFields.preTitle
  let title = fields.title || contentSplitWithImageFields.title
  let textOne = fields.textOne || contentSplitWithImageFields.textOne
  let textTwo = fields.textTwo || contentSplitWithImageFields.textTwo
  let topics = fields.topics || contentSplitWithImageFields.topics
  let textEnd = fields.textEnd || contentSplitWithImageFields.textEnd
</script>

<div class="relative bg-surface-50-900-token">
  <SectionContainer class="lg:flex lg:justify-between lg:px-8 xl:justify-end">
    <div class="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
      <Field bind:field={image} class="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
        <img class="absolute inset-0 h-full w-full bg-surface-50-900-token object-cover" src={image.value.src} alt={image.value.alt}>
      </Field>
    </div>
    <div class="px-6 lg:contents">
      <div class="mx-auto max-w-2xl pb-24 pt-16 sm:pb-32 sm:pt-20 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
        <Field bind:field={preTitle}>                
          <p class="text-base font-semibold leading-7 text-primary-600-300-token">
            <Text bind:value={preTitle.value} />
          </p>
        </Field>
        
        <Field bind:field={title}>
          <h1 class="mt-2 text-3xl font-bold tracking-tight text-surface-900-50-token sm:text-4xl">
            <Text bind:value={title.value} />
          </h1>
        </Field>

        <Field bind:field={textOne}>
          <p class="mt-6 text-xl leading-8 text-surface-700-200-token">
            <Text bind:value={textOne.value} />            
          </p>
        </Field>
        
        <div class="mt-10 max-w-xl text-base leading-7 text-surface-700-200-token lg:max-w-none">
          <Field bind:field={textTwo}>            
            <p>
              <Text bind:value={textTwo.value} />                          
            </p>
          </Field>

          <Field bind:field={topics}>
            <ul role="list" class="mt-8 space-y-8 text-surface-600-300-token">
              {#each topics.value.items as item}
              <li class="flex gap-x-3">
                  <Field bind:field={item.icon} class="mt-[1%] text-primary-600-300-token">
                    <Icon icon={item.icon.value} />
                  </Field>                  

                  <div class="">
                    <Field class="float-left mr-1" bind:field={item.topic}>
                      <strong class="font-semibold text-surface-900-50-token z-10 relative">
                        <Text bind:value={item.topic.value} />
                      </strong> 
                    </Field>
                    <Field bind:field={item.text}>
                      <span>
                        <Text bind:value={item.text.value} />
                      </span> 
                    </Field>                  
                  </div>
                </li>                            
              {/each}
            </ul>
          </Field>

          <Field class="mt-8" bind:field={textEnd}>
            <Text bind:value={textEnd.value} />
          </Field> 
        </div>
      </div>
    </div>
  </SectionContainer>
</div>
