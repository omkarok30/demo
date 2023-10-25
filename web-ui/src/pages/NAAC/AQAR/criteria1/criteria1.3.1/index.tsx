import { Card, Divider, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';

import { isEmptyValue } from '@/utils/object';
import Review from '@/pages/NAAC/review/list';
import { useFileDescription } from '@/store/NAAC/FileDescription/useFileDescription';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import EditorApp from '@/components/QLMCriteria';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';

const NACCAQAROneThreeOne = () => {
  const storeFileDescription = useFileDescription((state: any) => ({
    fileDescriptionRecords: state.allRecords,
    getRecords: state.getRecords,
  }));
  const mainTitle = '1.3 Curriculum Enrichment (30)';
  const subTitle
    = '1.3.1 Institution integrates crosscutting issues relevant to Professional Ethics, Gender, Human Values, Environment and Sustainability into the Curriculum';
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
    storeFileDescription.getRecords('1.3.1.');
    storeAcademicYear.getAcademicYearDetails();
  }, []);

  return (
    <div className='layout-main-content'>
      <h2>{mainTitle}</h2>
      <Card>
        <Typography.Text>
          <b>{subTitle}</b>
        </Typography.Text>
        <Divider></Divider>
        <YearOptionAndRatings yearOption={academicYearLabel} optionsAcademicYear={optionsAcademicYear} handleAQARChange={setAcademicYear} />
        <Divider></Divider>
        <EditorApp
          title="Description:"
          criteriaNumber="1.3.1"
          assessmentType="aqar"
          year={selectYear}
          characterLimit="100"
        ></EditorApp>

        <FileDescriptionList
          criteria="1.3.1"
          title={subTitle}
          year={selectYear}
        ></FileDescriptionList>
        <Review
          criteria="1.3.1"
          reviewType="Internal"
          title={subTitle}
          year={selectYear}
        ></Review>
        <Review
          criteria="1.3.1"
          reviewType="External"
          title={subTitle}
          year={selectYear}
        ></Review>
      </Card>
    </div>
  );
};

export default NACCAQAROneThreeOne;
