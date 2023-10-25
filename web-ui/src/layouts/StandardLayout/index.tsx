import { memo, useMemo } from 'react';
import * as ReactRouter from 'react-router-dom';
import _ from 'lodash';
import classnames from 'classnames';

import LeftSider from './components/LeftSider';
import RightTop from './components/RightTop';
import RightFooter from './components/RightFooter';
import layoutRoutes from './routes';
import { useUserState } from '@/store/user';

import { formatRoutes, getBreadcrumbRoutes } from '@/utils/router';

import Permission from '@/components/Permission';

import useTitle from '@/hooks/useTitle';

import './css/index.less';
import { useGlobalState } from '@/store/global';
import { IRouter } from '@/@types/router';

export interface StandardLayoutProps {
  children: React.ReactNode;
}

export default memo(({ children }: StandardLayoutProps) => {
  const location = ReactRouter.useLocation();

  const global = useGlobalState((state: any) => state.default);
  const user = useUserState((state: any) => state.default);

  // Frame all menu routes and patch All menu routes in key format
  const routerPathKeyRouter = useMemo(() => formatRoutes(layoutRoutes), []);

  // current route item
  // const routeItem = useMemo(() => routerPathKeyRouter.pathKeyRouter[location.pathname], [location]);
  const routeItem = useMemo(() => {
    const matchPath: IRouter | undefined = _.find(routerPathKeyRouter.pathKeyRouter, (pattern): any => ReactRouter.matchPath(pattern, location.pathname));
    return matchPath;
  }, [location]);

  // Breadcrumbs
  const breadCrumbs = useMemo(() => {
    const breads = getBreadcrumbRoutes(location.pathname, routerPathKeyRouter.pathKeyRouter).map(item => ({
      ...item,
      title: item.title,
    }));
    return breads;
  }, [location, routerPathKeyRouter]);

  // set title
  useTitle(routeItem?.meta?.title || '');

  return (
    <div id='standardlayout' className={classnames({ light: global.theme === 'light' })}>
      {global.navMode === 'inline' && (
        <LeftSider
          collapsed={global.collapsed}
          userRoles={user.roles}
          menuData={routerPathKeyRouter.router}
          routeItem={routeItem}
          theme={global.theme}
          leftSiderFixed={global.leftSiderFixed}
        />
      )}
      <div id='standardlayout-right'>
        <RightTop
          userRoles={user.roles}
          menuData={routerPathKeyRouter.router}
          jsonMenuData={routerPathKeyRouter.pathKeyRouter}
          routeItem={routeItem}
          breadCrumbs={breadCrumbs}
        />
        <div id='standardlayout-right-main'>
          <Permission role={routeItem?.meta?.roles}>
            {/* <Outlet /> */}
            {children}
          </Permission>
          <RightFooter />
        </div>
      </div>
    </div>
  );
});
