import { memo } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import SiderMenu from './SiderMenu';
import logo from '@/assets/images/logo.png';
import logo48 from '@/assets/images/logo-48x48.png';

import { IRouter } from '@/@types/router';
import { Theme } from '@/@types/settings';

export interface LeftSiderProps {
  menuData: IRouter[];
  routeItem?: IRouter;
  userRoles?: string[];
  collapsed?: boolean;
  theme?: Theme;
  leftSiderFixed?: boolean;
}

export default memo(
  ({
    menuData,
    routeItem,
    userRoles = [],
    collapsed = false,
    theme = 'dark',
    leftSiderFixed = true,
  }: LeftSiderProps) => (
    <div id='standardlayout-left' className={classnames({ narrow: collapsed })}>
      <div className='standardlayout-left-sider'>
        <div className='standardlayout-left-logo'>
          <Link to='/' className='logo-url'>
            {collapsed ? <img alt='' src={logo48} width='48' height='48' /> : <img alt='' src={logo} height='48' />}
          </Link>
        </div>
        <div className='standardlayout-left-menu'>
          <SiderMenu
            userRoles={userRoles}
            menuData={menuData}
            routeItem={routeItem}
            collapsed={collapsed}
            theme={theme}
          />
        </div>
      </div>
    </div>
  ),
);
