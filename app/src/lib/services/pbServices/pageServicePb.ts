import type { IPageService } from "../pageService";

export function createPageServicePb(): IPageService {
  return {
    getAll: async () => {
      throw new Error("Not implemented")
    },

    findByPath: async (path) => {
      throw new Error("Not implemented")
    },

    create: async (page) => {
      throw new Error("Not implemented")
    },

    update: async (page) => {
      throw new Error("Not implemented")
    },

    delete: async (page) => {
      throw new Error("Not implemented")
    },
  }
}