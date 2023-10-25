import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacCriteria653 } from '@/store/NAAC/Criteria6_5/useNaacCriteria6_5_3';

export const useCustomQualityHook = (yearId) => {
  const [year] = useState(yearId);

  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { currentSelected, getQualityCurrYear, updateQualityOption } = useNaacCriteria653((state: any) => ({
    currentSelected: state.currentSelected,
    getQualityCurrYear: state.getQualityCurrYear,
    updateQualityOption: state.updateQualityOption,
  }));

  useEffect(() => {
    getAcademicYearDetails();
    getQualityCurrYear(year);
  }, [year]);

  const optionsAcademicYear = comboByName;
  const yearOption = _.find(optionsAcademicYear, { value: Number(year) });
  const yearLabel = _.get(yearOption, ['label'], '');

  return {
    yearLabel,
    updateQualityOption,
    currentSelected,
  };
};

export const useCustomeInternalQualityHook = (yearId) => {
  const [year] = useState(yearId);

  const { initiativeRecords, getAllQuality } = useNaacCriteria653((state: any) => ({
    initiativeRecords: state.initiativeRecords,
    getAllQuality: state.getAllQuality,
  }));

  useEffect(() => {
    getAllQuality(year);
  }, [year]);

  return {
    initiativeRecords,
    getAllQuality,
  };
};
