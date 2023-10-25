import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacStudent22 } from '@/store/NAAC/ExtendedProfile/student/useNaacStudent_2_2';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { seatsRecord, getAllSeatsRecords } = useNaacStudent22((state: any) => ({
    seatsRecord: state.seatsRecord,
    getAllSeatsRecords: state.getAllSeatsRecords,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getAllSeatsRecords(`${yearFirstOption}`);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getAllSeatsRecords(value);
    setYearOption(value);
  };

  return {
    yearOption,
    handleAQARChange,
    seatsRecord,
    optionsAcademicYear,
  };
};

export const useStudentSeatsHook = (yearId) => {
  const [year] = useState(yearId);
  const { current, seatsRecord, seatsLinkRecord, getAllSeatsRecords } = useNaacStudent22((state: any) => ({
    current: state.current,
    seatsRecord: state.seatsRecord,
    seatsLinkRecord: state.seatsLinkRecord,
    getAllSeatsRecords: state.getAllSeatsRecords,
  }));

  useEffect(() => {
    getAllSeatsRecords(year);
  }, [year]);

  return {
    current, seatsRecord, seatsLinkRecord,
  };
};
