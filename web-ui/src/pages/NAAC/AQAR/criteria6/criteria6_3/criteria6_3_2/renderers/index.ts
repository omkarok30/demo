import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacCriteria632 } from '@/store/NAAC/Criteria6_3/useNaacCriteria6_3_2';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { current, FInancialRecord, getAllFInancialReport } = useNaacCriteria632((state: any) => ({
    FInancialRecord: state.FInancialRecord,
    current: state.current,
    getAllFInancialReport: state.getAllFInancialReport,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getAllFInancialReport(`${yearFirstOption}`);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getAllFInancialReport(value);
    setYearOption(value);
  };

  return {
    yearOption,
    current,
    handleAQARChange,
    FInancialRecord,
    optionsAcademicYear,
  };
};

export const useCustomFInancialHook = (yearId) => {
  const [year] = useState(yearId);
  const { current, currFInancial, getAllFInancialReport, getFInancialReportData } = useNaacCriteria632((state: any) => ({
    current: state.current,
    currFInancial: state.currFInancial,
    getAllFInancialReport: state.getAllFInancialReport,
    getFInancialReportData: state.getFInancialReportData,
  }));

  useEffect(() => {
    getFInancialReportData(year);
    getAllFInancialReport(Number(year));
  }, [year]);

  return {
    current, currFInancial,
  };
};
