import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '../global';
import * as service from '@/services/settings/bluNodeCoordinator';
import * as modelBluNodeCoordinator from '@/models/settings/BluNodeCoordinator';
import { convertForDisplay, convertValues } from '@/utils/cast';

export const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  overallCoordinatorsRecord: [],

  getRecords: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getAllCoordinators();
      const data: any = res;

      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(
          item,
          modelBluNodeCoordinator.allColumns,
          global,
        );
        records.push(record);
      });
      set({ allRecords: records });
    }
    catch (e) {
      console.log(e);
    }
  },
  getOverAllCoordinatorsRecords: async () => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getOverallCoordinators();
      const data: any = res;

      const records: any = [];
      _.each(data, (item) => {
        const record = convertForDisplay(
          item,
          modelBluNodeCoordinator.allColumns,
          global,
        );
        records.push(record);
      });
      set({ overallCoordinatorsRecord: records });
    }
    catch (e) {
      console.log(e);
    }
  },

  clearRecord: async () => {
    set({ current: {} });
  },

  getRecord: async (id = 'new') => {
    if (id === 'new') {
      set({ current: {} });
      return;
    }
    const res = await service.getCoordinator(id);
    const data = convertValues(res, modelBluNodeCoordinator.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    try {
      values.id = 'new';
      const data = modelBluNodeCoordinator.submitJSON(values);
      const res = await service.add(data);
      set({ allRecords: [] });
      return res;
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },

  updateRecord: async (id: string, values: any) => {
    try {
      values.id = id;
      const data = modelBluNodeCoordinator.submitJSON(values);
      const res = await service.update(id, data);
      set({ allRecords: [] });
      return res;
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },

  deleteRecord: async (id: string, values: any) => {
    try {
      values.id = id;
      const data = modelBluNodeCoordinator.submitJSON(values);
      const res = await service.delete(id, data);
      set({ allRecords: [] });
      return res;
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },
});

const devstore = devtools(store);
export const useBluNodeCoordinator = create(devstore);
