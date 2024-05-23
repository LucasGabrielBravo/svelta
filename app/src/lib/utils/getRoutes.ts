import type { ISite } from "$lib/domain/entities/site";

export interface IRoute {
  title: string, 
  path: string, 
  subpages: IRoute[]
}

export function getRoutes(pages: ISite, selectedPages: string[] = []) {
  const routes: IRoute[] = pages.pages
    .filter(i => selectedPages.includes(i.id) || selectedPages.length === 0)
    .map(i => ({ path: i.path, subpages: [], title: i.props.title }))

  const routeMap: {[key:string]: IRoute} = {};

  routes.forEach((route) => {
    routeMap[route.path] = route;
    route.subpages = [];
  });

  const rootPages: IRoute[] = [];

  routes.forEach((route) => {
    const parentPath = route.path.split('/').slice(0, -1).join('/');
    if (parentPath && routeMap[parentPath]) {
      routeMap[parentPath].subpages.push(route);
    } else {
      rootPages.push(route);
    }
  });

  return rootPages;
}