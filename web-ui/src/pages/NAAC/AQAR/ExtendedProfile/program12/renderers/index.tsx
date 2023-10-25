import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacProgram12 } from '@/store/NAAC/ExtendedProfile/program/useNaacProgram_1_2';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { programmeCounts, getAllProgrammeRecords, getProgrammeRecord, programmeData } = useNaacProgram12((state: any) => ({
    programmeCounts: state.programmeCounts,
    programmeData: state.programmeData,
    getAllProgrammeRecords: state.getAllProgrammeRecords,
    getProgrammeRecord: state.getProgrammeRecord,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getAllProgrammeRecords(`${yearFirstOption}`);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getAllProgrammeRecords(value);
    setYearOption(value);
  };

  return {
    yearOption,
    handleAQARChange,
    programmeCounts,
    optionsAcademicYear,
    getProgrammeRecord,
    programmeData,
  };
};
