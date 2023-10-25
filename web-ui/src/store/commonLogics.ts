import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { upperCase } from 'lodash';
import * as service from '@/services/settings/programDetails';
import * as modelprogramdetails from '@/models/settings/ProgramDetails';
import { convertValues } from '@/utils/cast';

const store = (set: any, get: any) => ({
  current: {},
  classNames: [],
  semester: [],

  getProgramRecord: async (id = 'new') => {
    const res = await service.getProgramDetail(id);
    const data = convertValues(res, modelprogramdetails.allColumns);
    const duration = data.programDuration;
    const isFyApplicable = data.isFyApplicable;
    const pattern = data.examinationPattern;
    const classNames = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
    let classNameval = 0;
    if (isFyApplicable === true) {
      classNameval = 1;
    }
    const classrecord = [{}];
    const semesterrecords = [{}];

    for (let i = classNameval; i <= duration; i++) {
      const classValue = classNames[classNameval];
      const classLabel = upperCase(`${classValue} year`);
      classNameval++;
      classrecord.push({ value: classValue, label: classLabel });
    }
    if (data.examinationPattern === 'annual') {
      semesterrecords.push({ value: '1', label: 'Semester I' });
    }
    else if (data.examinationPattern === 'semester') {
      semesterrecords.push({ value: '1', label: 'Semester I' });
      semesterrecords.push({ value: '2', label: 'Semester II' });
    }
    else if (data.examinationPattern === 'trimester') {
      semesterrecords.push({ value: '1', label: 'Term I' });
      semesterrecords.push({ value: '2', label: 'Term II' });
      semesterrecords.push({ value: '3', label: 'Term III' });
    }
    classrecord.shift();
    semesterrecords.shift();

    set({ classNames: classrecord, pattern, semester: semesterrecords, current: data });
  },

});

const devstore = devtools(store);
export const commonLogics = create(devstore);
function strtoupper(arg0: string) {
  throw new Error('Function not implemented.');
}
