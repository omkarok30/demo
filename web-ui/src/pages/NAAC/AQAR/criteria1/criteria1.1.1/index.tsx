import { useEffect, useMemo, useState } from 'react';
import { Card, Divider } from 'antd';
import _ from 'lodash';

import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { isEmptyValue } from '@/utils/object';
import EditorApp from '@/components/QLMCriteria';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';

const NACCCriteriaOneOne = () => {
  const mainTitle = '1.1 Curricular Planning and Implementation';
  const subTitle
    = '1.1.1 The Institution ensures effective curriculum delivery through a well planned and documented process';

  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const optionsAcademicYear = useMemo(
    () => storeAcademicYear.comboByName || [],
    [storeAcademicYear.comboByName],
  );

  const [selectYear, setYear] = useState();
  const [academicYearLabel, setacademicYearLabel] = useState('');

  useEffect(() => {
    if (isEmptyValue(selectYear)) {
      const first = _.first(optionsAcademicYear);
      const value = _.get(first, ['value'], '');
      const label = _.get(first, ['label'], '');
      setYear(value);
      setacademicYearLabel(label);
    }
  }, [storeAcademicYear.comboByName]);

  const setAcademicYear = (event) => {
    setYear(event);
    const value = event;
    const yearOptions = _.find(optionsAcademicYear, { value });
    const label = _.get(yearOptions, ['label'], '');
    setacademicYearLabel(label);
  };

  useEffect(() => {
    storeAcademicYear.getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    setAcademicYear(value);
  };

  return (
    <div className='layout-main-content'>
      <h2>{mainTitle}</h2>
      <Card title={subTitle}>

        <YearOptionAndRatings yearOption={academicYearLabel} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider></Divider>
        <EditorApp
          title="Description of initiatives:"
          criteriaNumber="1.1.1"
          assessmentType="aqar"
          year={selectYear}
          characterLimit="100"
        ></EditorApp>
        <FileDescriptionList
          criteria="1.1.1"
          title={subTitle}
          year={selectYear}
        ></FileDescriptionList>
        <Review
          criteria="1.1.1"
          reviewType="Internal"
          title={subTitle}
          year={selectYear}
        ></Review>
        <Review
          criteria="1.1.1"
          reviewType="External"
          title={subTitle}
          year={selectYear}
        ></Review>
      </Card>
    </div>
  );
};

export default NACCCriteriaOneOne;
