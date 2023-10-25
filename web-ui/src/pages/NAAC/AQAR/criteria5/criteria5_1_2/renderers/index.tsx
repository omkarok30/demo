import { useEffect, useState } from "react";
import _ from "lodash";
import { useAcademicYear } from "@/store/settings/useAcademicYear";
import { useNaacCriteria512 } from "@/store/NAAC/Criteria5/useNaacCriteria5_1_2";

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { instituteData, getNonGovtScholarRecords } = useNaacCriteria512((state: any) => ({
    instituteData: state.instituteData,
    getNonGovtScholarRecords: state.getNonGovtScholarRecords,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption)
      getNonGovtScholarRecords(yearFirstOption + '');
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getNonGovtScholarRecords(value);
    setYearOption(value);
  };

  return {
    yearOption,
    instituteData,
    optionsAcademicYear, handleAQARChange
  }
}

export const useCustomScholarHook = (yearId) => {
  const [year] = useState(yearId)
  const { current, instituteData, getAllInstituteData, getNonGovtScholarRecords } = useNaacCriteria512((state: any) => ({
    current: state.current,
    instituteData: state.instituteData,
    getAllInstituteData: state.getAllInstituteData,
    getNonGovtScholarRecords: state.getNonGovtScholarRecords
  }));

  useEffect(() => {
    getNonGovtScholarRecords(year)
    getAllInstituteData(year)
  }, [year])

  return {
    current, instituteData
  }
}

export const useCustomStudentHook = (yearId) => {
  const [year] = useState(yearId)

  const { current, getNonGovtScholarRecords, getStudentsRecords, studentsData } = useNaacCriteria512((state: any) => ({
    current: state.current,
    studentsData: state.studentsData,
    getNonGovtScholarRecords: state.getNonGovtScholarRecords,
    getStudentsRecords: state.getStudentsRecords,
  }));

  useEffect(() => {
    getNonGovtScholarRecords(year)
    getStudentsRecords(year)
  }, [year])


  return {
    current, studentsData
  }
}
