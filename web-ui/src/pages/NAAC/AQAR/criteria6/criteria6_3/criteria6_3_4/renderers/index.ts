import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacCriteria634 } from '@/store/NAAC/Criteria6_3/useNaacCriteria6_3_4';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { current, FacultyRecord, getAllFacultyRecords } = useNaacCriteria634((state: any) => ({
    FacultyRecord: state.FacultyRecord,
    current: state.current,
    getAllFacultyRecords: state.getAllFacultyRecords,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getAllFacultyRecords(`${yearFirstOption}`);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getAllFacultyRecords(value);
    setYearOption(value);
  };

  return {
    yearOption,
    current,
    handleAQARChange,
    FacultyRecord,
    optionsAcademicYear,
  };
};

export const useCustomFacultyHook = (yearId) => {
  const [year] = useState(yearId);
  const { current, currFaculty, getAllFacultyRecords, getFacultyData } = useNaacCriteria634((state: any) => ({
    current: state.current,
    currFaculty: state.currFaculty,
    getAllFacultyRecords: state.getAllFacultyRecords,
    getFacultyData: state.getFacultyData,
  }));

  useEffect(() => {
    getFacultyData(year);
    getAllFacultyRecords(Number(year));
  }, [year]);

  return {
    current, currFaculty, getFacultyData,
  };
};
