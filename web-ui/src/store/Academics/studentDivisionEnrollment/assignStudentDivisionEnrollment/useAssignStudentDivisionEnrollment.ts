import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import _ from 'lodash';
import { useGlobalState } from '@/store/global';
import * as service from '@/services/Academics/courseManagement/StudentDivision';
import * as modelStudentDivision from '@/models/Academics/studentEnrollment/StudentDivision';
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
  addRecord: async (
    year: string,
    className: string,
    programmeId: string,
    division: number,
    semester: number,
    selectedUser: [],
  ) => {
    try {
      const values = {
        year,
        className,
        division,
        semester,
        selectedUser,
        programmeId,
      };

      const data = modelStudentDivision.submitJSON(values);
      const res = await service.add(data);
      set({ allRecords: [] });
      return res;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  getAssignRecords: async (
    year: string,
    programId: number,
    className: string,
    semester: number,
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
        modelStudentDivision.allColumns,
        global,
      );
      records.push(record);
    });

    set({ allRecords: records });
  },
});

const devstore = devtools(store);
export const useAssignStudentDivisionEnrollment = create(devstore);
