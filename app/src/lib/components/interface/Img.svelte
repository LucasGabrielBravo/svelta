<script lang="ts">
  export let field: ISectionField
  let classNames: string | undefined = undefined
  export { classNames as class }
</script>

<img class={classNames} src={field.value.src} alt={field.value.alt} style={`object-position: ${field.value.position};`}>