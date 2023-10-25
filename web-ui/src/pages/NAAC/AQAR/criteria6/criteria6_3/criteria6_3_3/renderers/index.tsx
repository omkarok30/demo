import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacCriteria633 } from '@/store/NAAC/Criteria6_3/useNaacCriteria6_3_3';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { current, ProfessionalRecord, getAllProfessionalRecords } = useNaacCriteria633((state: any) => ({
    ProfessionalRecord: state.ProfessionalRecord,
    current: state.current,
    getAllProfessionalRecords: state.getAllProfessionalRecords,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getAllProfessionalRecords(`${yearFirstOption}`);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getAllProfessionalRecords(value);
    setYearOption(value);
  };

  return {
    yearOption,
    current,
    handleAQARChange,
    ProfessionalRecord,
    optionsAcademicYear,
  };
};

export const useCustomProfessionalHook = (yearId) => {
  const [year] = useState(yearId);
  const { current, currProfessional, getAllProfessionalRecords, getProfessionalData } = useNaacCriteria633((state: any) => ({
    current: state.current,
    currProfessional: state.currProfessional,
    getAllProfessionalRecords: state.getAllProfessionalRecords,
    getProfessionalData: state.getProfessionalData,
  }));

  useEffect(() => {
    getProfessionalData(year);
    getAllProfessionalRecords(Number(year));
  }, [year]);

  return {
    current, currProfessional, getProfessionalData,
  };
};

export const useCustomProfStaff = (yearId, staffId) => {
  const [year] = useState(yearId);
  const [id] = useState((staffId).split(','));

  const { getProfessionalStaff, currProfessional } = useNaacCriteria633((state: any) => ({
    currProfessional: state.currProfessional,
    getProfessionalStaff: state.getProfessionalStaff,
  }));

  useEffect(() => {
    getProfessionalStaff(year, id);
  }, [year, id]);

  return {
    currProfessional,
  };
};
