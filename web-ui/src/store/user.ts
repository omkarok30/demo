import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface CurrentUser {
  id: number;
  name: string;
  avatar: string;
  roles: string[];
  tenant: string;
}

export const initialState: CurrentUser = {
  id: 0,
  name: '',
  avatar: '',
  roles: [],
  tenant: '',
};

export const useUserState = create(
  devtools((set, _get) => ({
    default: initialState,
    updateWith: (values: CurrentUser) => set((state: any) => ({ default: { ...state.default, ...values } })),
  })),
);
