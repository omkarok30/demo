import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/NAAC/Criteria6_3/criteria6_3_4';

export const store = (set: any, _get: any) => ({
  current: {},
  FacultyRecord: [],
  currFaculty: [],
  staffData: [],

  getAllFacultyRecords: async (year: number) => {
    try {
      const res = await service.getAllFacultyByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['academicYear'], ['desc']);
      const currDataByYear = sortData?.find((item: any) => item.academicYear === year);
      set({ FacultyRecord: sortData, current: currDataByYear });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getFacultyData: async (year: number) => {
    try {
      const res = await service.getFacultyDataByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['academicYear'], ['desc']);
      set({ currFaculty: sortData });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getFacultyStaff: async (year: number, id: string[]) => {
    const staffIds = id.map(ids => Number(ids));
    try {
      const res = await service.getFacultyStaffRecord(year);

      const data: any = res;
      const filterData = data?.records?.filter((list: any) => {
        return staffIds ? staffIds.includes(list.id) : list;
      });
      set({ currFaculty: filterData });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useNaacCriteria634 = create(devstore);
