import type { ISite } from "$lib/domain/entities/site";
import { getSveltaService } from "$lib/utils/getSveltaService";
import { createSiteServiceFirebase } from "./firebaseServices/siteServiceFirebase";

export interface ISiteService {
  get: () => Promise<ISite | null>
  update: (site: ISite) => Promise<ISite>
}

export function createSiteService():ISiteService {
  const service = getSveltaService()

  if(service === "firebase") {
    return createSiteServiceFirebase()
  }

  return createSiteServiceFirebase()
}