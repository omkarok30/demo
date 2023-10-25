import React from 'react';

import BreadCrumbs from '@/components/BreadCrumbs';

import { BreadcrumbType, IPathKeyRouter, IRouter } from '@/@types/router';

export interface RightTabNavProps {
  jsonMenuData: IPathKeyRouter;
  routeItem: IRouter;
  breadCrumbs?: BreadcrumbType[];
}

export default React.memo(({ breadCrumbs = [] }: RightTabNavProps) => {
  return (
    <div className='standardlayout-top-tab-nav'>
      <BreadCrumbs className='breadcrumb' list={breadCrumbs} />
    </div>
  );
});
