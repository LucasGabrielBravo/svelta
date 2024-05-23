import Information from "$lib/components/interface/Information.svelte"

export function information(element: HTMLElement, value?: string) {
  if(value){
    element.classList.add("relative")           
    new Information({ target: element, props: { information: value } })        
  }
}