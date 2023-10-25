import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/NAAC/Criteria5_2/criteria5_2_1';

export const store = (set: any, _get: any) => ({
  current: {},
  placementRecord: [],
  currRecord: [],
  studentsData: [],
  comboByName: [],

  getAllPlacementsRecords: async (year: number) => {
    try {
      const res = await service.getAllPlacementsByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['academicYear'], ['desc']);
      const currDataByYear = sortData?.find((item: any) => item.academicYear === year);
      set({ placementRecord: sortData, current: currDataByYear });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getPlacementData: async (year: number) => {
    try {
      const res = await service.getPlacementDataByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['yearAt'], ['desc']);
      set({ currRecord: sortData });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getPlacementStudents: async (year: number, id: string[]) => {
    const studentIds = id.map(ids => Number(ids));
    try {
      const res = await service.getPlacementStudentsRecord(year);

      const data: any = res;
      const filterData = data?.records?.filter((list: any) => {
        return studentIds ? studentIds.includes(list.id) : list;
      });
      set({ studentsData: filterData });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useNaacCriteria521 = create(devstore);
