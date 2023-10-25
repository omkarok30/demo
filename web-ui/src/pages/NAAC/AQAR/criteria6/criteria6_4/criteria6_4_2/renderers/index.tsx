import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacCriteria642 } from '@/store/NAAC/Criteria6_4/useNaacCriteria6_4_2';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { current, FundsGrantRecord, getAllFundsGrantRecords } = useNaacCriteria642((state: any) => ({
    FundsGrantRecord: state.FundsGrantRecord,
    current: state.current,
    getAllFundsGrantRecords: state.getAllFundsGrantRecords,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getAllFundsGrantRecords(yearFirstOption);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getAllFundsGrantRecords(value);
    setYearOption(value);
  };

  return {
    yearOption,
    current,
    handleAQARChange,
    FundsGrantRecord,
    optionsAcademicYear,
  };
};

export const useCustomFundsHook = (yearId) => {
  const [year] = useState(yearId);
  const { current, currFundsGrant, getAllFundsGrantRecords, getFundsGrantData } = useNaacCriteria642((state: any) => ({
    current: state.current,
    currFundsGrant: state.currFundsGrant,
    getAllFundsGrantRecords: state.getAllFundsGrantRecords,
    getFundsGrantData: state.getFundsGrantData,
  }));

  useEffect(() => {
    getFundsGrantData(year);
    getAllFundsGrantRecords(Number(year));
  }, [year]);

  return {
    current, currFundsGrant, getFundsGrantData,
  };
};

export const useCustomFundsIdHook = (yearId, staffId) => {
  const [year] = useState(yearId);
  const [id] = useState((staffId).split(','));

  const { getFundsGrantById, currFundsGrant } = useNaacCriteria642((state: any) => ({
    currFundsGrant: state.currFundsGrant,
    getFundsGrantById: state.getFundsGrantById,
  }));

  useEffect(() => {
    getFundsGrantById(year, id);
  }, [year, id]);

  return {
    currFundsGrant,
  };
};
