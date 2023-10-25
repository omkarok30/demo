import { useEffect, useState } from "react";
import _ from "lodash";
import { useAcademicYear } from "@/store/settings/useAcademicYear";
import { useNaacCriteria514 } from "@/store/NAAC/Criteria5/useNaacCriteria5_1_4";

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { counsellingRecords, getCounsellingRecords } = useNaacCriteria514((state: any) => ({
    counsellingRecords: state.counsellingRecords,
    getCounsellingRecords: state.getCounsellingRecords,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');


  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getCounsellingRecords(yearFirstOption + "");
    }
  }, [yearFirstOption]);

  const handleAQARChange = (value) => {
    setYearOption(value);
  };

  return {
    yearOption,
    handleAQARChange,
    counsellingRecords,
    optionsAcademicYear
  }
}

export const useCustomCounselHook = (yearId) => {
  const [year] = useState(yearId)
  const { getAcademicYearDetails } = useAcademicYear((state: any) => ({
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { current, getCounselCurrYear, updatePlacements } = useNaacCriteria514((state: any) => ({
    current: state.current,
    getCounselCurrYear: state.getCounselCurrYear,
    updatePlacements: state.updatePlacements,
    uploadDocument: state.uploadDocument,
  }));

  useEffect(() => {
    getAcademicYearDetails();
    getCounselCurrYear(year)
  }, [yearId])

  return {
    current,
    updatePlacements,
  }
} 