import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/NAAC/FileDescription/fileDescription';
import * as modelFileDescription from '@/models/NAAC/fileDescription/fileDescription';
import { convertValues } from '@/utils/cast';

const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],

  getRecords: async (year, criteria: string) => {
    try {
      const res = await service.getAllFileDescriptions(criteria);
      const data: any = res;
      let sortData = _.orderBy(data?.records, ['introductionyear'], ['desc']);
      sortData = sortData.filter((list: any) => list.introductionyear === year);
      set({ allRecords: sortData });
    } catch (e) {
      // eslint-disable-next-line no-console
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
    const res = await service.getRecord(id);
    const data: any = res;
    const dataResult = convertValues(data?.records, modelFileDescription.allColumns);
    set({ current: dataResult });
  },

  addRecord: async (values: any) => {
    const data = modelFileDescription.submitJSON(values);
    await service.add(data);
    set({ allRecords: [...get().allRecords, values] });
  },

  updateRecord: async (id: string, values: any) => {
    try {
      const data = modelFileDescription.submitJSON(values);
      const resp = await service.update(id, data);
      set({ current: resp });
    } catch (e) { }
  },

  deleteRecord: async (id: string) => {
    await service.deleteRecord(id);
  },

  deleteLink: async (id: string) => {
    await service.deleteLink(id);
  },

  asOptions: () => {
    const options = _.map(get().allRecords, record => ({
      value: record.yearAt,
      label: record.year,
    }));
    return options;
  },
});

const devstore = devtools(store);
export const useFileDescription = create(devstore);
