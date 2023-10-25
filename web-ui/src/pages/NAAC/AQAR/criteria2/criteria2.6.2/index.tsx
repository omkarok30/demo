import { useEffect, useMemo, useState } from 'react';
import { Card, Divider, Typography } from 'antd';
import _ from 'lodash';

import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { isEmptyValue } from '@/utils/object';
import EditorApp from '@/components/QLMCriteria';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';

const NACCAQARTwoSixTwo = () => {
  const mainTitle = '2.6. Student Performance and Learning Outcomes';
  const subTitle
    = '2.6.2. Attainment of programme outcomes and course outcomes are evaluated by the institution';

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

  return (
    <div className='layout-main-content'>
      <h2>{mainTitle}</h2>
      <Card>
        <Typography.Text>
          <b>{subTitle}</b>
        </Typography.Text>
        <Divider />
        <YearOptionAndRatings yearOption={academicYearLabel} optionsAcademicYear={optionsAcademicYear} handleAQARChange={setAcademicYear} />
        <Divider />
        <EditorApp
          criteriaNumber="2.6.2"
          assessmentType="aqar"
          year={selectYear}
          characterLimit="100"
          title="Describe the method of measuring the level of attainment of POs, PSOs and COs:"
        ></EditorApp>
        <FileDescriptionList
          criteria="2.6.2"
          title={subTitle}
          year={selectYear}
        ></FileDescriptionList>
        <Review
          criteria="2.6.2"
          reviewType="Internal"
          title={subTitle}
          year={selectYear}
        ></Review>
        <Review
          criteria="2.6.2"
          reviewType="External"
          title={subTitle}
          year={selectYear}
        ></Review>
      </Card>
    </div>
  );
};

export default NACCAQARTwoSixTwo;
