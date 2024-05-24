import { createPageService } from "$lib/services/pageService"
import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url }) => {
  const page = await createPageService().findByPath(url.pathname)

  if (!page) {
    throw error(404, "Page not found")
  }

  return {
    page
  }
}