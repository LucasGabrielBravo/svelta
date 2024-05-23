<script lang="ts">
	import { goto } from '$app/navigation'
	import Button from '$lib/components/interface/Button.svelte'
	import Input from '$lib/components/interface/Input.svelte'
	import { user } from '$lib/stores/user'
	import Swal from 'sweetalert2'

  let loading = false

  const formData = {
    email: "",
    password: ""
  }

  async function handleSubmit() {
    try {
      loading =  true
      
      await user.login(formData.email,formData.password)
      
      loading = false

      goto("/editor")
    } catch (error) {
      loading = false
      Swal.fire("Usuário ou senha incorretos", undefined, "error")
    }
  }
</script>

<div class="h-screen w-screen flex flex-col justify-center">
	<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mb-[15%]">
		<div class="sm:mx-auto sm:w-full sm:max-w-sm">
			<h2
				class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-surface-900-50-token"
			>
				Sign in to your account
			</h2>
		</div>

		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form on:submit|preventDefault={handleSubmit} class="space-y-6">
				<Input label="E-mail" type="email" required bind:value={formData.email} />

				<Input label="Senha" type="password" required bind:value={formData.password} />

				<Button {loading} disabled={loading} class="w-full variant-filled-primary dark:text-dark-token">Entrar</Button>
			</form>
		</div>
	</div>
</div>
