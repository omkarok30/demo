import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/NAAC/ExtendedProfile/student/student_2_2';

export const store = (set: any, _get: any) => ({
  current: {},
  seatsRecord: [],
  seatsLinkRecord: [],
  studentsData: [],

  getAllSeatsRecords: async (year: number) => {
    try {
      const res = await service.getAllSeatsByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['academicYear'], ['desc']);
      const sortLinkData = _.orderBy(data?.linksRecord, ['academicYear'], ['desc']);
      const currDataByYear = sortData?.find((item: any) => item.academicYear === Number(year));
      const currLink = sortLinkData?.find((item: any) => item.academicYear === Number(year));
      set({ seatsRecord: sortData, current: currDataByYear, seatsLinkRecord: currLink });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getStudentsRecord: async (year: number) => {
    try {
      const res = await service.getStudentsRecordByYear(year);

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
export const useNaacStudent22 = create(devstore);
