import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/NAAC/Criteria5_3/criteria5_3_3';

export const store = (set: any, _get: any) => ({
  current: {},
  eventsRecord: [],
  studentsData: [],

  getAllEventsRecords: async (year: number) => {
    try {
      const res = await service.getAllEventsByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['academicYear'], ['desc']);
      const currDataByYear = sortData?.find((item: any) => item.academicYear === year);
      set({ eventsRecord: sortData, current: currDataByYear });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getEventStudents: async (year: number) => {
    try {
      const res = await service.getEventStudentsRecord(year);

      const data: any = res;
      set({ studentsData: data?.records });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useNaacCriteria533 = create(devstore);
