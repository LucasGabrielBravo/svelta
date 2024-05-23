<script lang="ts">
	import TextEditor from "../TextEditor.svelte"

  export let field: ISectionField
</script>

<TextEditor bind:value={field.value} headings />