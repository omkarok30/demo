import _ from 'lodash';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getAllSettings } from '@/services/settings/settings';
import { isEmptyValue } from '@/utils/object';

const loading = {
  none: 'none',
  working: 'working',
  done: 'done',
};

const store = (set: any, get: any) => ({
  settings: [],
  byKeys: new Map(),
  isLoaded: loading.none,

  fetchSettings: async (reload = false) => {
    if (get().isLoaded === loading.done && reload !== true) {
      return;
    }
    if (get().isLoaded === loading.working) {
      return;
    }
    set({ isLoaded: loading.working });
    const resp: any = await getAllSettings();
    const byKeys = new Map();
    const records = resp.records;
    _.each(records, (o) => {
      if (isEmptyValue(o)) {
        return;
      }
      let value = o.value;
      try {
        value = JSON.parse(o.value);
      }
      catch (e) { }
      byKeys.set(o.key, value);
    });
    set({ settings: records, byKeys, isLoaded: loading.done });
  },

  forKey: async (key: string) => {
    if (get().isLoaded === loading.none) {
      await get().fetchSettings();
    }
    return get().byKeys.get(key);
  },

  asSelect: (key: string) => {
    const values = get().byKeys.get(key);
    const options = _.map(values, value => ({ value }));
    return options;
  },
});

const storeObject = create(devtools(store, {
  name: 'useSettings',
  serialize: {
    options: {
      map: true,
      set: true,
    },
  },
}));
export const useSettings = storeObject;
