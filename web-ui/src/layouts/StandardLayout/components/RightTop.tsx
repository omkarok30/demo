import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import SiderMenu from './SiderMenu';
import RightTopUser from './RightTopUser';
import RightTabNav from './RightTabNav';
import IconSvg from '@/components/IconSvg';

import logo from '@/assets/images/logo.png';

import { BreadcrumbType, IPathKeyRouter, IRouter } from '@/@types/router';
import { useGlobalState } from '@/store/global';

export interface RightTopProps {
  menuData: IRouter[];
  jsonMenuData: IPathKeyRouter;
  routeItem?: IRouter;
  userRoles?: string[];
  breadCrumbs?: BreadcrumbType[];
}

export default React.memo(({ menuData, jsonMenuData, routeItem, userRoles = [], breadCrumbs = [] }: RightTopProps) => {
  const global = useGlobalState((state: any) => state.default);
  const setGlobal = useGlobalState((state: any) => state.updateWith);

  const toggleCollapsed = () => {
    setGlobal({ ...global, collapsed: !global.collapsed });
  };

  return (
    <div
      id='standardlayout-right-top'
      className={classnames({
        // fixed: global.headFixed,
        narrow: global.collapsed,
        tabNavEnable: !global.tabNavEnable,
        navModeHorizontal: global.navMode === 'horizontal',
      })}
    >
      <div className='standardlayout-right-top-header'>
        {global.navMode === 'inline'
          ? (
            <div className='standardlayout-right-top-top'>
              <div className='standardlayout-flexible' onClick={toggleCollapsed}>
                {global.collapsed ? <IconSvg name='menu-unfold'></IconSvg> : <IconSvg name='menu-fold'></IconSvg>}
              </div>
              <div className='standardlayout-top-menu'>
              </div>
              <div className='standardlayout-top-menu-right'>
                <RightTopUser />
              </div>
            </div>
            )
          : (
            <div className='standardlayout-right-top-top menu'>
              <div className='standardlayout-right-top-logo'>
                <Link to='/' className='logo-url'>
                  <img alt='' src={logo} width='30' />
                  <h3 className='logo-title'>BlueNode</h3>
                </Link>
              </div>
              <div className='standardlayout-top-menu'>
                <SiderMenu
                  userRoles={userRoles}
                  menuData={menuData}
                  routeItem={routeItem}
                  theme={global.theme}
                  mode='horizontal'
                />
              </div>
              <div className='standardlayout-top-menu-right'>
                <RightTopUser />
              </div>
            </div>
            )}
        {global.tabNavEnable && <RightTabNav routeItem={routeItem} jsonMenuData={jsonMenuData} breadCrumbs={breadCrumbs} />}
      </div>
    </div>
  );
});
