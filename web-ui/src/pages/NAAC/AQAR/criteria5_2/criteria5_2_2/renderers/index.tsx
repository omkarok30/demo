import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacCriteria522 } from '@/store/NAAC/Criteria5_2/useNaacCriteria5_2_2';
import { useStudentInfo } from '@/store/admissions/useStudentInfo';
import { useProgramDetails } from '@/store/settings/useProgramDetails';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { progressRecord, getAllProgressRecords } = useNaacCriteria522((state: any) => ({
    progressRecord: state.progressRecord,
    getAllProgressRecords: state.getAllProgressRecords,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getAllProgressRecords(yearFirstOption);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getAllProgressRecords(value);
    setYearOption(value);
  };

  return {
    yearOption,
    handleAQARChange,
    progressRecord,
    optionsAcademicYear,
  };
};

export const useCustomProgressHook = (yearId) => {
  const [year] = useState(yearId);

  const { current, currProgression, getProgressionData, getAllProgressRecords } = useNaacCriteria522((state: any) => ({
    current: state.current,
    currProgression: state.currProgression,
    getProgressionData: state.getProgressionData,
    getAllProgressRecords: state.getAllProgressRecords,
  }));

  useEffect(() => {
    getProgressionData(year);
    getAllProgressRecords(Number(year));
  }, [year]);

  return {
    currProgression, current, getProgressionData,
  };
};

export const useCustomStudentHook = (yearId, studentId) => {
  const [year] = useState(yearId);
  const [id] = useState((studentId).split(','));

  const { getProgressionStudents, studentsData } = useNaacCriteria522((state: any) => ({
    studentsData: state.studentsData,
    getProgressionStudents: state.getProgressionStudents,
  }));

  useEffect(() => {
    getProgressionStudents(year, id);
  }, [year, id]);

  return {
    studentsData,
  };
};

export const useCustomStudentInfoHook = () => {
  const { getStudentRecords, allRecords, optionsstudents } = useStudentInfo((state: any) => ({
    allRecords: state.allRecords,
    optionsstudents: state.optionsstudents,
    getStudentRecords: state.getRecords,
  }));

  const { getRecords, optionsAllPrograms } = useProgramDetails((state: any) => ({
    getRecords: state.getRecords,
    optionsAllPrograms: state.optionsAllPrograms,
  }));

  const [studentRow, setValue] = useState<any>({
    rowId: '',
    progValue: '',
  });
  const [studentProgram, setStudentPromgram] = useState<any[]>([]);

  useEffect(() => {
    getRecords();
    getStudentRecords();
  }, []);

  useEffect(() => {
    if (studentRow.progValue) {
      const r = _.find(optionsAllPrograms, { value: studentRow.progValue });
      const progVal = _.get(r, ['label'], { value: studentRow.progValue });

      setStudentPromgram((prevState: any) => {
        const studentIndex = prevState.findIndex((item: any) => item.id === studentRow.rowId);
        if (studentIndex > -1) {
          return prevState.map((item: any) => {
            return item.id === studentRow.rowId ? { ...item, progName: progVal } : item;
          },
          );
        }
        else {
          return ([...prevState, { id: studentRow.rowId, progName: progVal }]);
        }
      });
    }
  }, [studentRow.progValue, studentRow.rowId, optionsAllPrograms]);

  return {
    allRecords,
    optionsstudents,
    studentProgram,
    setValue,
  };
};
