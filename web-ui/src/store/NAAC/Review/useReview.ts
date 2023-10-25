import create from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/NAAC/Review/review';
import * as modelReview from '@/models/NAAC/review/review';
import { convertForDisplay, convertValues } from '@/utils/cast';

const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  externalData: [],
  internalData: [],

  getRecords: async (year, criteria: string, type) => {
    try {
      const global = useGlobalState.getState().default;
      const res = await service.getReview(criteria);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['academicYear'], ['desc']);
      const filterData = sortData?.filter((list: any) => list.academicYear === year && list.assessmentType === type);
      const records: any = [];
      _.each(filterData, (item) => {
        const record = convertForDisplay(item, modelReview.allColumns, global);
        records.push(record);
      });

      set({
        allRecords: records,
        externalData: records?.filter((item: any) => item.reviewType?.toLowerCase() === 'external'),
        internalData: records?.filter((item: any) => item.reviewType?.toLowerCase() === 'internal'),
      });
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
    const data = convertValues(res, modelReview.allColumns);
    set({ current: data });
  },

  addRecord: async (values: any) => {
    const data = modelReview.submitJSON(values);
    await service.add(data);
    set({ allRecords: [...get().allRecords, values] });
  },

  saveDraft: async (id: string, values: any) => {
    try {
      const data = modelReview.submitJSON(values);
      const resp = await service.saveDraft(id, data);
      set({ current: resp });
    } catch (e) { }
  },

  submit: async (id: string, values: any) => {
    try {
      const data = modelReview.submitJSON(values);
      const resp = await service.submit(id, data);
      set({ current: resp });
    } catch (e) { }
  },

  deleteRecord: async (id: string) => {
    await service.deleteRecord(id);
  },

});

const devstore = devtools(store);
export const useReview = create(devstore);
