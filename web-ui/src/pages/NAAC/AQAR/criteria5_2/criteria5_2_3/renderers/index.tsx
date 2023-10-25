import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacCriteria523 } from '@/store/NAAC/Criteria5_2/useNaacCriteria5_2_3';
import { useStudentInfo } from '@/store/admissions/useStudentInfo';
import { useProgramDetails } from '@/store/settings/useProgramDetails';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { ExamRecord, getAllExamRecords } = useNaacCriteria523((state: any) => ({
    ExamRecord: state.ExamRecord,
    getAllExamRecords: state.getAllExamRecords,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getAllExamRecords(yearFirstOption);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getAllExamRecords(value);
    setYearOption(value);
  };

  return {
    yearOption,
    handleAQARChange,
    ExamRecord,
    optionsAcademicYear,
  };
};

export const useCustomProgressHook = (yearId) => {
  const [year] = useState(yearId);

  const { current, currExamData, getNationalIntExamData, getAllExamRecords } = useNaacCriteria523((state: any) => ({
    current: state.current,
    currExamData: state.currExamData,
    getNationalIntExamData: state.getNationalIntExamData,
    getAllExamRecords: state.getAllExamRecords,
  }));

  useEffect(() => {
    getNationalIntExamData(Number(year));
    getAllExamRecords(Number(year));
  }, [year]);

  return {
    currExamData, current, getNationalIntExamData,
  };
};

export const useCustomStudentHook = (yearId, studentId) => {
  const [year] = useState(yearId);
  const [id] = useState((studentId).split(','));

  const { getNationalIntStudents, studentsData } = useNaacCriteria523((state: any) => ({
    studentsData: state.studentsData,
    getNationalIntStudents: state.getNationalIntStudents,
  }));

  useEffect(() => {
    getNationalIntStudents(year, id);
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
