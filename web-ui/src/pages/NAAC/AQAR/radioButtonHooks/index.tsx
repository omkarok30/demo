import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacRadioButton } from '@/store/NAAC/RadioButton/useNaacRadioButton';

export const useCustomRadioHook = (criteriaNum: string) => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { currentSelected, getSkillsOptionList } = useNaacRadioButton((state: any) => ({
    currentSelected: state.currentSelected,
    getSkillsOptionList: state.getSkillsOptionList,
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
      setYearOption((yearFirstOption));
      getSkillsOptionList(yearFirstOption, criteriaNum);
    }
  }, [yearFirstOption]);

  const handleAQARChange = (value) => {
    setYearOption(value);
    getSkillsOptionList(value, criteriaNum);
  };

  return {
    yearOption,
    currentSelected,
    optionsAcademicYear,
    handleAQARChange,
  };
};

export const useCustomSkillsHook = (yearId, criteriaNum: string) => {
  const [year] = useState(yearId);

  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { currentSelected, getSkillsByYear, updateSkillOption } = useNaacRadioButton((state: any) => ({
    currentSelected: state.currentSelected,
    getSkillsByYear: state.getSkillsByYear,
    updateSkillOption: state.updateSkillOption,
  }));

  useEffect(() => {
    getAcademicYearDetails();
    getSkillsByYear(Number(year), criteriaNum);
  }, [year]);

  const optionsAcademicYear = comboByName;
  const yearOption = _.find(optionsAcademicYear, { value: Number(year) });
  const yearLabel = _.get(yearOption, ['label'], '');

  return {
    yearLabel,
    updateSkillOption,
    currentSelected,
  };
};
