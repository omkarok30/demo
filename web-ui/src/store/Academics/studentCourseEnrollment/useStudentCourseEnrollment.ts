import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/Academics/courseManagement/StudentCourse';
import * as modelStudentCourse from '@/models/Academics/studentEnrollment/StudentCourseEnrollment';
import { convertForDisplay } from '@/utils/cast';

const departmentType = 'academic';

export const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  programId: 0,
  programName: '',
  classId: '',
  className: '',
  semesterId: '',
  semesterName: '',
  divisionId: '',
  divisionName: '',
  year: '',

  setProgram: async (programId: string) => {
    set({ programId });
  },
  setYear: async (year: string) => {
    set({ year });
  },

  setClassId: async (classId: string) => {
    set({ classId });
  },

  setSemesterId: async (semesterId: string) => {
    set({ semesterId });
  },
  setDivisionId: async (divisionId: string) => {
    set({ divisionId });
  },
  setProgramName: async (programName: string) => {
    set({ programName });
  },
  setClassName: async (className: string) => {
    set({ className });
  },

  setDivisionName: async (divisionName: string) => {
    set({ divisionName });
  },
  setSemesterName: async (semesterName: string) => {
    set({ semesterName });
  },

  getRecords: async (
    year: string,
    programId: string,
    className: string,
    semester: string,
    divisionId: number,
  ) => {
    const global = useGlobalState.getState().default;
    const res = await service.getAssignRecords(
      year,
      className,
      programId,
      divisionId,
      semester,
    );

    const data: any = res.records;

    const records: any = [];
    _.each(data, (item) => {
      const record = convertForDisplay(
        item,
        modelStudentCourse.allColumns,
        global,
      );
      records.push(record);
    });
    set({ allRecords: records });
  },
});

const devstore = devtools(store);
export const useStudentCourseEnrollment = create(devstore);
