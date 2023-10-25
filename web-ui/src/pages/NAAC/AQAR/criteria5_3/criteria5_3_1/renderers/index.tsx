import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacCriteria531 } from '@/store/NAAC/Criteria5_3/useNaacCriteria5_3_1';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { awardsRecord, getAllAwardsRecords } = useNaacCriteria531((state: any) => ({
    awardsRecord: state.awardsRecord,
    getAllAwardsRecords: state.getAllAwardsRecords,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getAllAwardsRecords(yearFirstOption);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getAllAwardsRecords(value);
    setYearOption(value);
  };

  return {
    yearOption,
    handleAQARChange,
    awardsRecord,
    optionsAcademicYear,
  };
};

export const useCustomAwardHook = (yearId) => {
  const [year] = useState(yearId);

  const { current, studentsData, getAwardsStudents, getAllAwardsRecords } = useNaacCriteria531((state: any) => ({
    studentsData: state.studentsData,
    current: state.current,
    getAwardsStudents: state.getAwardsStudents,
    getAllAwardsRecords: state.getAllAwardsRecords,
  }));

  useEffect(() => {
    getAwardsStudents(year);
    getAllAwardsRecords(Number(year));
  }, [year]);
  return {
    studentsData, current,
  };
};
