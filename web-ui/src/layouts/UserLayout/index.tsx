import { memo, useMemo } from 'react';
import { /* Outlet, */ useLocation } from 'react-router-dom';

import layoutRotes from './routes';
import useTitle from '@/hooks/useTitle';

import { formatRoutes } from '@/utils/router';

import './css/index.less';

export interface UserLayoutProps {
  children: React.ReactNode;
}

export default memo(({ children }: UserLayoutProps) => {
  const location = useLocation();

  // Frame all menu routes and patch All menu routes in key format
  const routerPathKeyRouter = useMemo(() => formatRoutes(layoutRotes), []);

  // current route item
  const routeItem = useMemo(() => routerPathKeyRouter.pathKeyRouter[location.pathname], [location]);

  // set title
  useTitle(routeItem?.meta?.title || '');

  return (
    <div className='user-layout'>
      {/* <Outlet /> */}
      {children}
    </div>
  );
});
