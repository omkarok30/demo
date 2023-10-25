import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/NAAC/ExtendedProfile/program/program_1_2';

export const store = (set: any, _get: any) => ({
  current: {},
  programmeCounts: [],
  programmeData: [],

  getAllProgrammeRecords: async (year: number) => {
    try {
      const res = await service.getAllProgrammeByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['academicYear'], ['desc']);
      const currDataByYear = sortData?.find((item: any) => item.academicYear === Number(year));
      set({ programmeCounts: sortData, current: currDataByYear });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getProgrammeRecord: async (year: number) => {
    try {
      const res = await service.getProgrammeRecordByYear(year);

      const data: any = res;
      set({ programmeData: data?.records });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useNaacProgram12 = create(devstore);
