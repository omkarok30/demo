import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacInstitute41 } from '@/store/NAAC/ExtendedProfile/institute/useNaacInstitute_4_1';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { teachersData, getAllTeacherRecords, current } = useNaacInstitute41((state: any) => ({
    current: state.current,
    teachersData: state.teachersData,
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
    teachersData,
    optionsAcademicYear,
    current,
  };
};
