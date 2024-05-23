<script lang="ts">
  import { cx } from 'class-variance-authority'

  let className: string | null | undefined = undefined
  export { className as class }
</script>

<div class={cx("container mx-auto max-w-7xl px-4 sm:px-8 h-[inherit]", className)}>
  <slot />
</div>