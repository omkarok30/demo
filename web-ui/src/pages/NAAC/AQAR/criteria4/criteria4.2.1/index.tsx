import { useEffect, useMemo, useState } from 'react';
import { Card, Divider, Select, Typography } from 'antd';
import _ from 'lodash';

import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { isEmptyValue } from '@/utils/object';
import Review from '@/pages/NAAC/review/list';
import EditorApp from '@/components/QLMCriteria';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';

function NACCCAQARFourTwoOne() {
  const mainTitle = '4.2 Library as a learning Resource';
  const subTitle = '4.2.1. Library is automated using Integrated Library Management System (ILMS).';

  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const automationOptions: any = [
    { value: '0', label: 'FULLY AUTOMATED' },
    { value: '1', label: 'PARTIALLY AUTOMATED' },
    { value: '2', label: 'NOT AUTOMATED' },
  ];

  const firstAutomation = _.first(automationOptions);
  const firstAutomationOption = _.get(firstAutomation, ['value'], '');

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

  const handleAutomationOption = (value) => { };

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
        <div>
          <div style={{ marginBottom: '10px' }}>
            <span>Library Automation:</span>
          </div>
          <Select
            style={{ width: 300 }}
            options={automationOptions}
            value={firstAutomationOption}
            onChange={value => handleAutomationOption(value)}
          ></Select>
        </div>
        <EditorApp
          title="Describe:"
          criteriaNumber="4.2.1"
          assessmentType="aqar"
          year={selectYear}
          characterLimit="100"
        ></EditorApp>
        <FileDescriptionList
          criteria="4.2.1"
          title={subTitle}
          year={selectYear}
        ></FileDescriptionList>
        <Review
          criteria="4.2.1"
          reviewType="Internal"
          title={subTitle}
          year={selectYear}
        ></Review>
        <Review
          criteria="4.2.1"
          reviewType="External"
          title={subTitle}
          year={selectYear}
        ></Review>
      </Card>
    </div>
  );
}

export default NACCCAQARFourTwoOne;
