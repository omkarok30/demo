import { BrowserRouterProps, Location, RouteObject } from 'react-router-dom';

/**
 * json path key RouteObject route type
 */
export interface IPathKeyRouteObject {
  [path: string]: RouteObject;
}

/**
 * Crumb Type
 */
export interface BreadcrumbType {
  // Title, routing text to display in menus, browser titles or breadcrumbs
  title: string;
  // Routing address or external link
  path: string;
}

/**
 * tab navigation storage rule type
 */
export type TabNavType = 'path' | 'querypath';

/**
 * meta customize
 */
export interface IRouteMeta {
  // Title, routing text to display in menus, browser titles or breadcrumbs
  title?: string;
  // Whether to hide in the menu
  hidden?: boolean;
  // The name of the icon, displayed before the menu title
  icon?: string;
  // Permission control, page roles (you can set multiple roles)
  roles?: string[];
  /**
   * Breadcrumb custom content:
   *     1. By default, it is not configured to automatically read according to the route;
   *     2. Set to false , automatically read according to the route and not read the current self;
   *     3. Configure the corresponding breadcrumb format as follows:
   */
  breadcrumb?: BreadcrumbType[] | false;
  /**
   * The left menu is selected, if you set a path, the sidebar will highlight the sidebar navigation corresponding to the path you set
   *   1. (default route.path), this parameter is to meet the special needs of special pages,
   *   2. For example, select the sidebar navigation or the page under module A on the details page, etc., if you want to select module B, the navigation is selected.
   */
  selectLeftMenu?: string;
  // The path of all parent elements, the subscript keys are in the order of the parent elements
  parentPath?: string[];

  /**
   * Set tab navigation storage rule type
   *    1. By default, it is not configured according to the path (route.path) rule
   *    2、querypath：path + query (route.path+route.query) rule
   */
  tabNavType?: TabNavType;
  /**
   * If this field is set, when the current tab page is closed, it will be used as the hook function before closing.
   * @param close close callback function
   */
  tabNavCloseBefore?: (close: () => void) => void;

  // Whether to hide in the sidebar
  sidebar?: boolean;
}

export type RouteComponent = React.FC<BrowserRouterProps> | (() => any);

/**
 * route type
 */
export interface IRouter {
  path: string;
  meta?: IRouteMeta;
  redirect?: string;
  component?: RouteComponent;
  children?: IRouter[];
  childrenHidden?: boolean;
}

/**
 * json path key route type
 */
export interface IPathKeyRouter {
  [path: string]: IRouter;
}

/**
 * route type IRouter and json path key route type collection
 */
export interface IRouterPathKeyRouter {
  router: IRouter[];
  pathKeyRouter: IPathKeyRouter;
}

/**
 * tab navigation type
 */
export interface TabNavItem {
  location: Location;
  menu: IRouter;
}
