import Info from "$lib/components/interface/Info.svelte"

export function info(element: HTMLElement, value?: string) {
  if(value){
    element.classList.add("relative")           
    new Info({ target: element, props: { information: value } })        
  }
}