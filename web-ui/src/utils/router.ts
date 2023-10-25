import React from 'react';
import * as ReactRouter from 'react-router-dom';
import _ from 'lodash';
import qs from 'query-string';
import { isExternalURL } from '@/utils/validate';
import { equalObject, isEmptyValue } from '@/utils/object';
import {
  BreadcrumbType,
  IPathKeyRouteObject,
  IPathKeyRouter,
  IRouter,
  IRouterPathKeyRouter,
  TabNavType,
} from '@/@types/router';

/**
 * Generate the data of the parameter routes: RouteObject[] of useRoutes according to configRoutes: IRouter[]
 * @param configRoutes IRouter[] config configured route
 * @param parentPath  string superior path
 * @returns RouteObject[]
 */
export const createUseRoutes = (configRoutes: IRouter[], parentPath = '/'): ReactRouter.RouteObject[] => {
  const routes: ReactRouter.RouteObject[] = [];
  for (let index = 0; index < configRoutes.length; index++) {
    const item = configRoutes[index];
    if (isExternalURL(item.path)) { continue; }

    const routesItem: ReactRouter.RouteObject = {};

    // path
    routesItem.path = item.path.startsWith('/')
      ? item.path
      : `${parentPath.endsWith('/') ? parentPath : `${parentPath}/`}${item.path}`;
    // element
    if (item.component) { routesItem.element = React.createElement(item.component); }

    // children
    const children: ReactRouter.RouteObject[] = [];
    if (item.redirect) {
      children.push({
        path: routesItem.path,
        element: React.createElement(ReactRouter.Navigate, { to: item.redirect }),
      });
    }
    if (item.children) { children.push(...createUseRoutes(item.children, routesItem.path)); }

    if (children.length > 0) { routesItem.children = children; }

    // newItem push
    routes.push(routesItem);
  }

  return routes;
};

/**
 * The data processed by createUseRoutes is converted into IPathKeyRouteObject format
 * @param routes  RouteObject[] routes processed by createUseRoutes
 * @returns IPathKeyRouteObject
 */
export const pathKeyCreateUseRoutes = (routes: ReactRouter.RouteObject[]): IPathKeyRouteObject => {
  let jsonItems: IPathKeyRouteObject = {};
  for (let index = 0; index < routes.length; index++) {
    const item = routes[index];
    jsonItems[item.path || ''] = {
      ...item,
    };

    if (item.children) { jsonItems = _.merge({}, jsonItems, pathKeyCreateUseRoutes(item.children)); }
  }
  return jsonItems;
};

/**
 * Reset according to routes: IRouter[]
 * @param routes IRouter[] routing configuration
 * @param parentPath string superior path
 * @param parentPaths string[] parent array collection
 * @returns IRouterPathKeyRouter
 */
export const formatRoutes = (routes: IRouter[], parentPath = '/', parentPaths: string[] = []): IRouterPathKeyRouter => {
  const items: IRouter[] = [];
  let jsonItems: IPathKeyRouter = {};

  for (let index = 0; index < routes.length; index++) {
    const item = routes[index];
    const newItem: IRouter = {
      ...item,
    };

    // set path
    let path = item.path || '';
    if (!isExternalURL(item.path)) {
      path = item.path.startsWith('/')
        ? item.path
        : `${parentPath.endsWith('/') ? parentPath : `${parentPath}/`}${item.path}`;
    }
    newItem.path = path;

    // set up meta
    const meta = item.meta || {};
    // set up meta.parentPath
    const pPaths = meta.parentPath && meta.parentPath.length > 0 ? meta.parentPath : parentPaths;
    meta.parentPath = pPaths;
    newItem.meta = meta;

    // children assignment
    let children: IRouter[] | undefined;
    let pkChildren: IPathKeyRouter | undefined;
    if (item.children) {
      const fRoutes = formatRoutes(item.children, path, [...pPaths, path]);

      children = fRoutes.router;
      newItem.children = children;

      pkChildren = fRoutes.pathKeyRouter;
    }

    // final item assignment
    items.push(newItem);
    jsonItems[path] = newItem;
    if (pkChildren) { jsonItems = _.merge({}, jsonItems, pkChildren); }
  }

  return {
    router: items,
    pathKeyRouter: jsonItems,
  };
};

/**
 * Determine whether the current user has permission according to the permission name of the custom incoming authentication
 * @param userRoles string[] user's permissions
 * @param roles string | string[] Permission name for custom authentication
 * @returns boolean
 */
export const hasPermissionRoles = (userRoles: string[], roles?: string | string[]): boolean => {
  if (userRoles.length < 1) { return false; }

  if (userRoles.includes('super')) { return true; }

  if (userRoles.includes('admin')) { return true; }

  if (typeof roles === 'undefined') { return true; }

  if (typeof roles === 'string') { return userRoles.includes(roles); }

  if (Array.isArray(roles) && roles.length === 0) { return true; }

  if (Array.isArray(roles) && roles.length > 0) { return roles.some(role => userRoles.includes(role)); }

  return false;
};

/**
 * According to the route pathname array - returns the corresponding route array
 * @param pathname string[] route path array
 * @param jsonRoutesData IPathKeyRouter After formatRoutes processing, all pathKeyRouter routes of the framework
 * @returns IRouter[]
 */
export const getPathsTheRoutes = (pathname: string[], jsonRoutesData: IPathKeyRouter): IRouter[] => {
  const routeItem: IRouter[] = [];

  for (let index = 0, len = pathname.length; index < len; index += 1) {
    const element = pathname[index];
    const item = jsonRoutesData[element] || {};
    if (item.path !== '') { routeItem.push(item); }
  }

  return routeItem;
};

/**
 * Get the array corresponding to the breadcrumbs
 * @param pathname string current route path
 * @param jsonRoutesData  IPathKeyRouter  IPathKeyRouter After formatRoutes processing, all pathKeyRouter routes of the framework
 * @returns BreadcrumbType[]
 */
export const getBreadcrumbRoutes = (pathname: string, jsonRoutesData: IPathKeyRouter): BreadcrumbType[] => {
  let route: IRouter = jsonRoutesData[pathname] || {};

  if (isEmptyValue(route)) {
    route = _.find(jsonRoutesData, (_route, pattern): any => {
      const found = ReactRouter.matchPath(pattern, pathname);
      return found;
    }) || <IRouter>{};
  }

  if (!route.path) { return []; }

  if (!route.meta?.breadcrumb) {
    const parentPath = route.meta?.parentPath || [];
    const routes = getPathsTheRoutes(parentPath, jsonRoutesData);
    const bread: BreadcrumbType[] = [];

    for (let index = 0; index < routes.length; index++) {
      const element = routes[index];
      bread.push({
        title: element.meta?.title || '',
        path: element.path,
      });
    }

    if (route.meta?.breadcrumb === false) {
      return bread;
    }

    bread.push({
      title: route.meta?.title || '',
      path: route.path,
    });

    return bread;
  }

  return route.meta.breadcrumb;
};

/**
 * Judging tabNav, whether the corresponding Location is equal
 * @param route1 vue-route
 * @param route2 vue-route
 * @param type Judgment Rules
 * @returns
 */
export const equalTabNavRoute = (location1: Location, location2: Location, type: TabNavType = 'path'): boolean => {
  let is = false;
  switch (type) {
    case 'querypath': // path + query
      is = equalObject(qs.parse(location1.search), qs.parse(location2.search))
        && location1.pathname === location2.pathname;
      break;
    default: // path
      is = location1.pathname === location2.pathname;
      break;
  }

  return is;
};
