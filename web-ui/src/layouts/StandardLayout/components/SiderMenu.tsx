import React from 'react';
import { Menu } from 'antd';
import { unionWith } from 'lodash';

import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { hasPermissionRoles } from '@/utils/router';
import { isExternalURL } from '@/utils/validate';
import ALink from '@/components/ALink';
import IconSvg from '@/components/IconSvg';

import { Theme } from '@/@types/settings';
import { IRouter } from '@/@types/router';

/**
 * according to routes: IRouter[] generate antd menu:ItemType[] menu
 * @param userRoles string[] user's permissions
 * @param routes IRouter[] configured route
 * @param parentPath string superior path
 */
const createMenuItems = (
  userRoles: string[],
  routes: IRouter[],
  parentPath = '/',
): ItemType[] => {
  const items: ItemType[] = [];

  for (let index = 0; index < routes.length; index++) {
    const item = routes[index];

    // Verify permissions
    if (!hasPermissionRoles(userRoles, item.meta?.roles)) {
      continue;
    }

    const icon = item.meta?.icon || undefined;
    const hidden = item.meta?.hidden || false;
    if (hidden === true) {
      continue;
    }

    // set path
    let path = item.path || '';
    if (!isExternalURL(item.path)) {
      path = item.path.startsWith('/')
        ? item.path
        : `${parentPath.endsWith('/') ? parentPath : `${parentPath}/`}${item.path}`;
    }

    const title = item.meta?.title || '--';

    if (item.children && item.childrenHidden !== true) {
      items.push({
        key: path,
        label: (<>
          {icon && (
            <span className='anticon'>
              <IconSvg name={icon} />
            </span>
          )}
          <span>{title}</span>
        </>),
        children: createMenuItems(userRoles, item.children, path),
      });
    }
    else {
      items.push({
        key: path,
        label: (
          <ALink to={path}>
            {icon && (
              <span className='anticon'>
                <IconSvg name={icon} />
              </span>
            )}
            <span>{title}</span>
          </ALink>
        ),
      });
    }
  }

  return items;
};

export interface SiderMenuProps {
  menuData: IRouter[];
  routeItem?: IRouter;
  userRoles?: string[];
  collapsed?: boolean;
  mode?: 'horizontal' | 'inline';
  theme?: Theme;
}

export default React.memo(
  ({ menuData, routeItem, userRoles = [], collapsed = false, mode = 'inline', theme = 'dark' }: SiderMenuProps) => {
    const selectedKeys = React.useMemo(() => {
      if (!routeItem) {
        return [];
      }
      if (routeItem.meta && routeItem.meta.selectLeftMenu) {
        return [routeItem.meta.selectLeftMenu];
      }
      return [routeItem.path];
    }, [routeItem]);

    const parentPaths = React.useMemo(() => {
      if (routeItem && routeItem.meta && routeItem.meta.parentPath) {
        return routeItem.meta.parentPath;
      }
      return [];
    }, [routeItem]);

    const [openKeys, setOpenKeys] = React.useState<string[]>(mode === 'inline' ? parentPaths : []);

    React.useLayoutEffect(() => {
      if (!collapsed && mode === 'inline') {
        setOpenKeys(unionWith(openKeys, parentPaths));
      }
      else {
        setOpenKeys([]);
      }
    }, [collapsed, parentPaths]);
    return mode === 'inline'
      ? (<Menu
        className='standardlayout-menu'
        mode={mode}
        theme={theme}
        inlineCollapsed={collapsed}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
        items={createMenuItems(userRoles, menuData)}
      />)
      : (<Menu
        className='standardlayout-menu'
        mode={mode}
        theme={theme}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
        items={createMenuItems(userRoles, menuData)}
      />);
  },
);
