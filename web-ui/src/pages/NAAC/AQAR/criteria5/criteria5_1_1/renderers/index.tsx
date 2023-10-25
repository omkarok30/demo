import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacCriteria511 } from '@/store/NAAC/Criteria5/useNaacCriteria5_1_1';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { scholarsData, getGovtScholarRecords } = useNaacCriteria511((state: any) => ({
    scholarsData: state.scholarsData,
    getGovtScholarRecords: state.getGovtScholarRecords,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getGovtScholarRecords(`${yearFirstOption}`);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getGovtScholarRecords(value);
    setYearOption(value);
  };

  return {
    yearOption,
    handleAQARChange,
    scholarsData,
    optionsAcademicYear,
  };
};

export const useCustomScholarHook = (yearId) => {
  const [year] = useState(yearId);
  const { current, scholarsData, getAllScholarshipData, getGovtScholarRecords } = useNaacCriteria511((state: any) => ({
    current: state.current,
    scholarsData: state.scholarsData,
    getAllScholarshipData: state.getAllScholarshipData,
    getGovtScholarRecords: state.getGovtScholarRecords,
  }));

  useEffect(() => {
    getGovtScholarRecords(year);
    getAllScholarshipData(year);
  }, [year]);

  return {
    current, scholarsData,
  };
};

export const useCustomStudentHook = (yearId) => {
  const [year] = useState(yearId);

  const { current, getGovtScholarRecords, getStudentsRecords, studentsData } = useNaacCriteria511((state: any) => ({
    current: state.current,
    studentsData: state.studentsData,
    getGovtScholarRecords: state.getGovtScholarRecords,
    getStudentsRecords: state.getStudentsRecords,
  }));

  useEffect(() => {
    getGovtScholarRecords(year);
    getStudentsRecords(year);
  }, [year]);

  return {
    current, studentsData,
  };
};
