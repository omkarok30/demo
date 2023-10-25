import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/library/manageLibrary/manageLibrary';
import * as modelBooks from '@/models/library/BookAccession';
import { convertForDisplay, convertValues } from '@/utils/cast';

export const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],

  getRecords: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllBooks();

      set({ allRecords: res.records });
    } catch (e) {
      console.log(e);
    }
  },
  getRecord: async (id = 'new') => {
    if (id === 'new') {
      set({ current: {} });
      return;
    }
    const res = await service.getBook(id);

    set({ current: res });
  },
});

const devstore = devtools(store);
export const useManageLibrary = create(devstore);
