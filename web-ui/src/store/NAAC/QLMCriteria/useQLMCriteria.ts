import create from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/NAAC/QLMCriteria/QLMCriteria';
import * as modelQLMCriteria from '@/models/NAAC/QLMCriteria';

const store = (set: any, get: any) => ({
  current: {},
  descriptionData: {},

  clearRecord: async () => {
    set({ current: {} });
  },

  addRecord: async (values: any) => {
    const data = modelQLMCriteria.submitJSON(values);
    const res = await service.add(data);
    set({ allRecords: [values] });
    return res;
  },

  asOptions: () => {
    const options = _.map(get().allRecords, record => ({
      value: record.yearAt,
      label: record.year,
    }));
    return options;
  },

  getDescriptionData: async (year, criteriaNum: string, assessmentType) => {
    try {
      const res = await service.getDescriptionByYear(year);
      const data: any = res;
      const currData: any = data?.records?.find((item: any) => item.criteriaNumber === criteriaNum && item.assessmentType === assessmentType);
      set({ descriptionData: currData });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useQLMCriteria = create(devstore);
