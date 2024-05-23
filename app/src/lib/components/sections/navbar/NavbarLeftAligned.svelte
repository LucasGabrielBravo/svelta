<script>
	import SectionContainer from "$lib/components/shared/SectionContainer.svelte"

</script>
<header class="bg-surface-50-900-token border-b border-surface-200 dark:border-surface-800 shadow-sm dark:shadow-black relative z-10">
  <SectionContainer>
    <nav class="flex items-center justify-between py-6">
      <div class="flex items-center gap-x-12">
        <a href="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
        </a>
        <div class="hidden lg:flex lg:gap-x-12">
          <a href="/" class="text-sm font-semibold leading-6 text-surface-900-50-token">Product</a>
          <a href="/" class="text-sm font-semibold leading-6 text-surface-900-50-token">Features</a>
          <a href="/" class="text-sm font-semibold leading-6 text-surface-900-50-token">Marketplace</a>
          <a href="/" class="text-sm font-semibold leading-6 text-surface-900-50-token">Company</a>
        </div>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-surface-700-200-token">
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex">
        <a href="/" class="text-sm font-semibold leading-6 text-surface-900-50-token">Log in <span aria-hidden="true">&rarr;</span></a>
      </div>
    </nav>  
  </SectionContainer>
</header>
