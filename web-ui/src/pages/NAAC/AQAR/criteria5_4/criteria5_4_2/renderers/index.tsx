import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacCriteria542 } from '@/store/NAAC/Criteria5_4/useNaacCriteria5_4_2';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { current, contributionRecord, getAllContributionRecords } = useNaacCriteria542((state: any) => ({
    current: state.current,
    contributionRecord: state.contributionRecord,
    getAllContributionRecords: state.getAllContributionRecords,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getAllContributionRecords(yearFirstOption);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getAllContributionRecords(value);
    setYearOption(value);
  };

  return {
    yearOption,
    handleAQARChange,
    contributionRecord,
    optionsAcademicYear,
    current,
  };
};
