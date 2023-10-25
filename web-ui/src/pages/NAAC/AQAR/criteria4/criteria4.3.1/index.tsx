import { useEffect, useMemo, useState } from 'react';
import { Card, Divider, Typography } from 'antd';
import _ from 'lodash';

import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { isEmptyValue } from '@/utils/object';
import Review from '@/pages/NAAC/review/list';
import EditorApp from '@/components/QLMCriteria';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';

function NACCCAQARFourThreeOne() {
  const mainTitle = '4.3. IT Infrastructure';
  const subTitle = '4.3.1. Institution frequently updates its IT facilities including Wi-Fi.';

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
        <YearOptionAndRatings
          yearOption={academicYearLabel} optionsAcademicYear={optionsAcademicYear} handleAQARChange={setAcademicYear} />
        <Divider />

        <EditorApp
          title="Describe IT facilities including Wi-Fi with date and nature of updating within a maximum of 200 words:"
          criteriaNumber="4.3.1"
          assessmentType="aqar"
          year={selectYear}
          characterLimit="100"
        ></EditorApp>
        <FileDescriptionList criteria="4.3.1" title={subTitle} year={selectYear}></FileDescriptionList>
        <Review
          criteria="4.3.1"
          reviewType="Internal"
          title={subTitle}
          year={selectYear}
        ></Review>
        <Review
          criteria="4.3.1"
          reviewType="External"
          title={subTitle}
          year={selectYear}
        ></Review>
      </Card>
    </div>
  );
}

export default NACCCAQARFourThreeOne;
