import { createSiteService } from '$lib/services/siteService';
import { createUserService } from '$lib/services/userService';
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url, cookies }) => {
  const isAuthenticated = await createUserService().verifySession(cookies)

  if(!isAuthenticated){    
    throw redirect(302, "/signin")
  }

  const site = await createSiteService().get()

  return {
    site: site
  }
}