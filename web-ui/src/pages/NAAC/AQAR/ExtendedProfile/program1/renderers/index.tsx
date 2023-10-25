import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacProgram1 } from '@/store/NAAC/ExtendedProfile/program/useNaacProgram_1';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { courseRecordsCounts, getAllCourseRecords } = useNaacProgram1((state: any) => ({
    courseRecordsCounts: state.courseRecordsCounts,
    getAllCourseRecords: state.getAllCourseRecords,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getAllCourseRecords(`${yearFirstOption}`);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getAllCourseRecords(value);
    setYearOption(value);
  };

  return {
    yearOption,
    handleAQARChange,
    courseRecordsCounts,
    optionsAcademicYear,
  };
};

export const useCustomCourseHook = (yearId) => {
  const [year] = useState(yearId);
  const { current, courseData, getCourseRecord, getAllCourseRecords } = useNaacProgram1((state: any) => ({
    current: state.current,
    courseData: state.courseData,
    getCourseRecord: state.getCourseRecord,
    getAllCourseRecords: state.getAllCourseRecords,
  }));

  useEffect(() => {
    getAllCourseRecords(year);
    getCourseRecord(year);
  }, [year]);

  return {
    current, courseData,
  };
};
