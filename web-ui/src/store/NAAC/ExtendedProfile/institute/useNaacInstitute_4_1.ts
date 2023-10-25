import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/NAAC/ExtendedProfile/institute/institute_4_1';

export const store = (set: any, _get: any) => ({
  current: {},
  teachersData: [],

  getAllTeacherRecords: async (year: number) => {
    try {
      const res = await service.getAllInstitutionByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['academicYear'], ['desc']);
      const currDataByYear = sortData?.find((item: any) => item.academicYear === Number(year));
      set({ teachersData: sortData, current: currDataByYear });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

});

const devstore = devtools(store);
export const useNaacInstitute41 = create(devstore);
