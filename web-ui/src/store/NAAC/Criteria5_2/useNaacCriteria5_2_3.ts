import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import * as service from '@/services/NAAC/Criteria5_2/criteria5_2_3';

export const store = (set: any, _get: any) => ({
  current: {},
  ExamRecord: [],
  currExamData: [],
  studentsData: [],

  getAllExamRecords: async (year: number) => {
    try {
      const res = await service.getAllExamByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['year'], ['desc']);
      const currDataByYear = sortData?.find((item: any) => item.year === year);
      set({ ExamRecord: sortData, current: currDataByYear });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getNationalIntExamData: async (year: number) => {
    try {
      const res = await service.getNationalIntExamDataByYear(year);
      const data: any = res;
      const sortData = _.orderBy(data?.records, ['academicYear'], ['desc']);
      set({ currExamData: sortData });
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  },

  getNationalIntStudents: async (year: number, id: string[]) => {
    const studentIds = id.map(ids => Number(ids));
    try {
      const res = await service.getNationalIntStudentsRecord(year);

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
export const useNaacCriteria523 = create(devstore);
