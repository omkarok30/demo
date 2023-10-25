import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import settings from '@/config/settings';

import { NavMode, Theme } from '@/@types/settings.d';

export interface StateType {
  /* The following are for all Layout extension fields */
  // left expand collapse
  collapsed: boolean;
  // head fixed open
  headFixed: boolean;
  // Template themes
  theme: Theme;
  // Left side fixed open
  leftSiderFixed: boolean;

  /* The following are extension fields for StandardLayout */
  // tab menu open
  tabNavEnable: boolean;
  // menu bar mode
  navMode: NavMode;
  displayDateFormat: string;
  displayDateTimeFormat: string;
}

const initialState: StateType = {
  collapsed: false,
  headFixed: settings.headFixed,
  theme: settings.theme,
  leftSiderFixed: settings.leftSiderFixed,
  tabNavEnable: settings.tabNavEnable,
  navMode: settings.navMode,
  displayDateFormat: settings.displayDateFormat,
  displayDateTimeFormat: settings.displayDateTimeFormat,
};

export interface DiscoveryType {
  main?: string;
  tenant?: string;
}

export const useGlobalState = create(
  devtools((set: any, get: any) => ({
    default: initialState,
    discovery: { main: '', tenant: '' },
    updateWith: (values: StateType) => set((state: any) => ({ default: { ...state.default, ...values } })),
    updateDiscovery: (values: DiscoveryType) => set({ discovery: { ...get().discovery, ...values } }),
  })),
);
