import React, { Suspense, lazy, memo } from 'react';
import * as ReactRouter from 'react-router-dom';
import _ from 'lodash';
import { isEmptyValue } from '../utils/object';
import { createUseRoutes, pathKeyCreateUseRoutes } from '@/utils/router';

import PageLoading from '@/components/PageLoading';

// BlankLayout
import BlankLayout from '@/layouts/BlankLayout';

// SecurityLayout
import SecurityLayout from '@/layouts/SecurityLayout';

// StandardLayout
import StandardLayoutRoutes from '@/layouts/StandardLayout/routes';
import StandardLayout from '@/layouts/StandardLayout';

// UserLayout
import UserLayoutRoutes from '@/layouts/UserLayout/routes';
import UserLayout from '@/layouts/UserLayout';

/**
 * configure all routes
 */
const routes = createUseRoutes([
  {
    path: '/',
    redirect: '/home',
    children: StandardLayoutRoutes,
  },
  {
    path: '/user',
    redirect: '/user/login',
    children: UserLayoutRoutes,
  },
  {
    path: '*',
    component: lazy(() => import('@/pages/404')),
  },
]);

/**
 * Configure the route corresponding to the framework
 */
const layoutToRoutes = {
  StandardLayout: pathKeyCreateUseRoutes([routes[0]]),
  UserLayout: pathKeyCreateUseRoutes([routes[1]]),
};

export const SuspenseLazy = memo(({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoading />}>{children}</Suspense>
));

export default memo(() => {
  const routesElement = ReactRouter.useRoutes(routes);
  const location = ReactRouter.useLocation();
  const standardRoute: ReactRouter.RouteObject = _.find(layoutToRoutes.StandardLayout, (_route, pattern): any | null => ReactRouter.matchPath(pattern, location.pathname)) || {};

  // belongs to StandardLayout
  if (!isEmptyValue(standardRoute) && layoutToRoutes.StandardLayout[standardRoute.path || '']) {
    return (
      <SecurityLayout>
        <StandardLayout>
          <SuspenseLazy>{routesElement}</SuspenseLazy>
        </StandardLayout>
      </SecurityLayout>
    );
  }

  // belongs to UserLayout
  if (layoutToRoutes.UserLayout[location.pathname]) {
    return (
      <UserLayout>
        <SuspenseLazy>{routesElement}</SuspenseLazy>
      </UserLayout>
    );
  }

  // default BlankLayout
  return (
    <BlankLayout>
      <SuspenseLazy>{routesElement}</SuspenseLazy>
    </BlankLayout>
  );
});
