import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacCriteria533 } from '@/store/NAAC/Criteria5_3/useNaacCriteria5_3_3';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { eventsRecord, getAllEventsRecords } = useNaacCriteria533((state: any) => ({
    eventsRecord: state.eventsRecord,
    getAllEventsRecords: state.getAllEventsRecords,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getAllEventsRecords(yearFirstOption);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getAllEventsRecords(value);
    setYearOption(value);
  };

  return {
    yearOption,
    handleAQARChange,
    eventsRecord,
    optionsAcademicYear,
  };
};

export const useCustomEventHook = (yearId) => {
  const [year] = useState(yearId);

  const { current, studentsData, getEventStudents, getAllEventsRecords } = useNaacCriteria533((state: any) => ({
    studentsData: state.studentsData,
    current: state.current,
    getEventStudents: state.getEventStudents,
    getAllEventsRecords: state.getAllEventsRecords,
  }));

  useEffect(() => {
    getEventStudents(year);
    getAllEventsRecords(Number(year));
  }, [year]);
  return {
    studentsData, current,
  };
};
