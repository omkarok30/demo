import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacCriteria623 } from '@/store/NAAC/Criteria6_2/useNaacCriteria6_2_3';

export const useCustomDataHook = (yearIdParam) => {
  const navigate = useNavigate();
  const [year] = useState(yearIdParam);
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { currentSelected, getEgovernanceList } = useNaacCriteria623((state: any) => ({
    currentSelected: state.currentSelected,
    getEgovernanceList: state.getEgovernanceList,
  }));

  const [yearOption, setYearOption] = useState<any>('');

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  useEffect(() => {
    if (yearFirstOption) {
      // Set the current selected year after editing answer else set the first year option
      if (year) {
        setYearOption(Number(year));
        getEgovernanceList(Number(year));
        // After assign year replace the query params (remove year value =>'?year="2022"')
        navigate('../list', { replace: true });
      }
      else {
        setYearOption((yearFirstOption));
        getEgovernanceList(yearFirstOption);
      }
    }
  }, [yearFirstOption]);

  const handleAQARChange = (value) => {
    setYearOption(value);
    getEgovernanceList(value);
  };

  return {
    yearOption,
    currentSelected,
    optionsAcademicYear,
    handleAQARChange,
  };
};

export const useCustomOperationHook = (yearId) => {
  const [year] = useState(yearId);

  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { currentSelected, getEgovernanceCurrYear, updateEgovernanceOption } = useNaacCriteria623((state: any) => ({
    currentSelected: state.currentSelected,
    getEgovernanceCurrYear: state.getEgovernanceCurrYear,
    updateEgovernanceOption: state.updateEgovernanceOption,
  }));

  useEffect(() => {
    getAcademicYearDetails();
    getEgovernanceCurrYear(year);
  }, [year]);

  const optionsAcademicYear = comboByName;
  const yearOption = _.find(optionsAcademicYear, { value: Number(year) });
  const yearLabel = _.get(yearOption, ['label'], '');

  return {
    yearLabel,
    updateEgovernanceOption,
    currentSelected,
  };
};

export const useCustomeAreaHook = (yearId) => {
  const [year] = useState(yearId);

  const { areaRecords, getAllAreaGovernance } = useNaacCriteria623((state: any) => ({
    areaRecords: state.areaRecords,
    getAllAreaGovernance: state.getAllAreaGovernance,
  }));

  useEffect(() => {
    getAllAreaGovernance(year);
  }, [year]);

  return {
    areaRecords,
    getAllAreaGovernance,
  };
};
