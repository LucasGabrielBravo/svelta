import { createSiteService } from "$lib/services/siteService";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
  const site = await createSiteService().get()

  if(!site){
    throw error(404, "Site not found")
  }

  return {
    site
  }
}