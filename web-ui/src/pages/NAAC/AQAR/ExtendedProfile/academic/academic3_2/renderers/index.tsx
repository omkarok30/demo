import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacAcademic32 } from '@/store/NAAC/ExtendedProfile/academic/useNaacAcademic_3_2';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { PostCounts, getAllPostRecords } = useNaacAcademic32((state: any) => ({
    PostCounts: state.PostCounts,
    getAllPostRecords: state.getAllPostRecords,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getAllPostRecords(`${yearFirstOption}`);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getAllPostRecords(value);
    setYearOption(value);
  };

  return {
    yearOption,
    handleAQARChange,
    PostCounts,
    optionsAcademicYear,
  };
};
