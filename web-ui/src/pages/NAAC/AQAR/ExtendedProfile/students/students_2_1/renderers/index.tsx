import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacStudent21 } from '@/store/NAAC/ExtendedProfile/student/useNaacStudent_2_1';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { studRecordsCounts, getAllStudentsRecords } = useNaacStudent21((state: any) => ({
    studRecordsCounts: state.studRecordsCounts,
    getAllStudentsRecords: state.getAllStudentsRecords,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getAllStudentsRecords(`${yearFirstOption}`);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getAllStudentsRecords(value);
    setYearOption(value);
  };

  return {
    yearOption,
    handleAQARChange,
    studRecordsCounts,
    optionsAcademicYear,
  };
};

export const useStudentCourseHook = (yearId) => {
  const [year] = useState(yearId);
  const { current, studentsData, getStudentsRecord, getAllStudentsRecords } = useNaacStudent21((state: any) => ({
    current: state.current,
    studentsData: state.studentsData,
    getStudentsRecord: state.getStudentsRecord,
    getAllStudentsRecords: state.getAllStudentsRecords,
  }));

  useEffect(() => {
    getAllStudentsRecords(year);
    getStudentsRecord(year);
  }, [year]);

  return {
    current, studentsData,
  };
};
