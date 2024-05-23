import type { IPage } from "$lib/domain/entities/page";
import { getSveltaService } from "$lib/utils/getSveltaService";
import { createPageServiceFirebase } from "./firebaseServices/pageServiceFirebase";
import { createPageServicePb } from "./pbServices/pageServicePb";

export interface IPageService {
  getAll: () => Promise<IPage[]>
  findByPath: (path: string) => Promise<IPage | null>
  create: (page: IPage) => Promise<IPage>
  update: (page: IPage) => Promise<IPage>
  delete: (page: IPage) => Promise<void>
}

export function createPageService(): IPageService {
  const service = getSveltaService()

  if(service === "firebase"){
    return createPageServiceFirebase()
  }

  return createPageServicePb()
}