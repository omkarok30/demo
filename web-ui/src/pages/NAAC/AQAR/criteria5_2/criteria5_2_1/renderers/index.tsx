import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacCriteria521 } from '@/store/NAAC/Criteria5_2/useNaacCriteria5_2_1';
import { useStudentInfo } from '@/store/admissions/useStudentInfo';
import { useProgramDetails } from '@/store/settings/useProgramDetails';

export const useCustomDataHook = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { placementRecord, getAllPlacementsRecords } = useNaacCriteria521((state: any) => ({
    placementRecord: state.placementRecord,
    getAllPlacementsRecords: state.getAllPlacementsRecords,
  }));

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getAllPlacementsRecords(yearFirstOption);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    getAllPlacementsRecords(value);
    setYearOption(value);
  };

  return {
    yearOption,
    handleAQARChange,
    placementRecord,
    optionsAcademicYear,
  };
};

export const usePlacementHook = (yearId) => {
  const [year] = useState(yearId);

  const { current, currRecord, getPlacementData, getAllPlacementsRecords } = useNaacCriteria521((state: any) => ({
    current: state.current,
    currRecord: state.currRecord,
    getPlacementData: state.getPlacementData,
    getAllPlacementsRecords: state.getAllPlacementsRecords,
  }));

  useEffect(() => {
    getPlacementData(year);
    getAllPlacementsRecords(Number(year));
  }, [year]);

  return {
    currRecord, current, getPlacementData,
  };
};

export const useCustomStudentHook = (yearId, studentId) => {
  const [year] = useState(yearId);
  const [id] = useState((studentId).split(','));

  const { getPlacementStudents, studentsData } = useNaacCriteria521((state: any) => ({
    studentsData: state.studentsData,
    getPlacementStudents: state.getPlacementStudents,
  }));

  useEffect(() => {
    getPlacementStudents(year, id);
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
