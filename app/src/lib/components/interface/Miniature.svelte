<script lang="ts">
	import { browser } from "$app/environment"
    
  export let width = 256

  let element: HTMLDivElement

  function resize(element: HTMLDivElement, width: number) {
    if (!browser || !element) return    

    const container = element.querySelector("div")!

    const aspect = container.offsetWidth / container.offsetHeight
        
    const scale = parseFloat((1 - ((container.offsetWidth - width) / container.offsetWidth)).toFixed(4))    
    
    element.style.width = `${width}px`
    element.style.height = `${width / aspect}px`        

    container.style.transform = `scale(${scale})`
    container.style.transformOrigin = "top left"    
  }    

  $: resize(element, width)
</script>

<div bind:this={element} class="relative overflow-hidden">
  <div class="absolute top-0 left-0 w-[1280px] min-h-max">
    <slot />
  </div>
</div>