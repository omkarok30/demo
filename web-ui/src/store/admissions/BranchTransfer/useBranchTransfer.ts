/* eslint-disable no-console */
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import moment from 'moment';
import * as modelBranchTransfer from '@/models/admissions/BranchTransfer';
import * as service from '@/services/admissions/BranchTransfer/index';
import * as studentsservice from '@/services/admissions/studentInfo';


export const store = (set: any, get: any) => ({
  current: {},
  allRecords: [],
  layout: 'vertical',
  students: [],
  studentDetail: [],
  programs: [],
  studId: '',
  getRecords: async (academicYear: string) => {
    try {
      const res = await service.getAllDetails();
      let data: any = res;

      data = data.filter((student: any) => {
        return student.student_info$registrationYear
        === academicYear;
      });

      set({ allRecords: data });
    }
    catch (e) {
      console.log(e);
    }
  },

  clearRecord: async () => {
    set({ current: {} });
  },

  getRecord: async (id = 'new') => {
    if (id === 'new') {
      set({ current: {} });
      return;
    }
    const res = await service.getRecord(id);
    res.transferDate = moment(res.transferDate);
    set({ current: res });
  },

  addRecord: async (values: any) => {
    const data = modelBranchTransfer.submitJSON(values);
    await service.add(data);
    set({ allRecords: [...get().allRecords, values] });
  },

  updateRecord: async (id: string, values: any) => {
    try {
      values.id = id;
      const data = modelBranchTransfer.submitJSON(values);
      const res = await service.update(id, data);
      set({ allRecords: [] });
      return res;
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  },

  getStudents: async (academicYear: string) => {
    try {
      const res = await service.getStudents();
      let data: any = res;
      data = data
        .filter((student: any) => student.registrationYear === academicYear)
        .map((student: any, index: number) => {
          return {
            label: student.studentName,
            value: student.studentId,
            key: index,
          };
        });
      set({ students: data });
    }
    catch (e) {
      console.log(e);
    }
  },

  getStudentDetails: async (id: string) => {
    try {
      const res = await studentsservice.getStudent(id);
      let data: any = res;
    
      set({ studentDetail: data });
    }
    catch (e) {
      console.log(e);
    }
  },

  getPrograms: async () => {
    try {
      const res = await service.getStudents();
      let data: any = res;
      const key = 'program_id';
      const unique = [
        ...new Map(data.map((item: any) => [item[key], item])).values(),
      ];
      data = unique.map((program: any, index: number) => {
        return {
          label: program.program_name,
          value: program.program_id,
          key: index,
        };
      });
      set({ programs: data });
    }
    catch (e) {
      console.log(e);
    }
  },
  getNewStudentCode: async (studId: number) => {
    try {
      set({ studId: `T${studId}` });
    }
    catch (e) {
      console.log(e);
    }
  },
});

const devstore = devtools(store);
export const useBranchTransfer = create(devstore);
