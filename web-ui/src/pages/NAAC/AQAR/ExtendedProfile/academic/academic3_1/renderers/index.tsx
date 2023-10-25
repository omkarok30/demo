import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacAcademic31 } from '@/store/NAAC/ExtendedProfile/academic/useNaacAcademic_3_1';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { teacherCounts, getAllTeacherRecords } = useNaacAcademic31((state: any) => ({
    teacherCounts: state.teacherCounts,
    getAllTeacherRecords: state.getAllTeacherRecords,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getAllTeacherRecords(`${yearFirstOption}`);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getAllTeacherRecords(value);
    setYearOption(value);
  };

  return {
    yearOption,
    handleAQARChange,
    teacherCounts,
    optionsAcademicYear,
  };
};

export const useCustomTeacherHook = (yearId) => {
  const [year] = useState(yearId);
  const { current, teachersData, getTeacherRecord, getAllTeacherRecords } = useNaacAcademic31((state: any) => ({
    current: state.current,
    teachersData: state.teachersData,
    getTeacherRecord: state.getTeacherRecord,
    getAllTeacherRecords: state.getAllTeacherRecords,
  }));

  useEffect(() => {
    getAllTeacherRecords(year);
    getTeacherRecord(year);
  }, [year]);

  return {
    current, teachersData,
  };
};
