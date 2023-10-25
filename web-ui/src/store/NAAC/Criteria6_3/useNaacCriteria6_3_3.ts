import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/NAAC/Criteria6_3/criteria6_3_3';

export const store = (set: any, _get: any) => ({
  current: {},
  ProfessionalRecord: [],
  currProfessional: [],
  staffData: [],

  getAllProfessionalRecords: async (year: number) => {
    try {
      const res = await service.getAllProfessionalByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['academicYear'], ['desc']);
      const currDataByYear = sortData?.find((item: any) => item.academicYear === year);
      set({ ProfessionalRecord: sortData, current: currDataByYear });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getProfessionalData: async (year: number) => {
    try {
      const res = await service.getProfessionalDataByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['academicYear'], ['desc']);
      set({ currProfessional: sortData });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getProfessionalStaff: async (year: number, id: string[]) => {
    const staffIds = id.map(ids => Number(ids));
    try {
      const res = await service.getProfessionalStaffRecord(year);

      const data: any = res;
      const filterData = data?.records?.filter((list: any) => {
        return staffIds ? staffIds.includes(list.id) : list;
      });
      set({ currProfessional: filterData });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useNaacCriteria633 = create(devstore);
