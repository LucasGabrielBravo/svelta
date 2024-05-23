<script lang="ts">
	import { cx } from "class-variance-authority"

  export let href: string
  export let newTab: boolean = false
  let classNames: string | undefined = undefined
  export { classNames as class }

  function openNewTab(node: HTMLAnchorElement) {
    if(!newTab) return

    node.target = "_blank"
    node.rel = "noopener noreferrer"
  }
</script>

<a {href} class={cx("btn flex flex-row", classNames)} use:openNewTab>
  <slot />
</a>