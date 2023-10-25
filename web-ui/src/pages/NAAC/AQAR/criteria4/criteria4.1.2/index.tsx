import { useEffect, useMemo, useState } from 'react';
import { Card, Divider, Typography } from 'antd';
import _ from 'lodash';

import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { isEmptyValue } from '@/utils/object';
import Review from '@/pages/NAAC/review/list';
import EditorApp from '@/components/QLMCriteria';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';

function NACCCAQARFourOneTwo() {
  const mainTitle = '4.1 Physical Facilities';
  const subTitle
    = '4.1.2. The Institution has adequate facilities for cultural activities, sports, games (indoor, outdoor), gymnasium, yoga etc.';

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
          title="Describe the adequacy of facilities for cultural activities, sports, games and cultural activities which include specification about area/size, year of establishment and user rate:"
          criteriaNumber="4.1.2"
          assessmentType="aqar"
          year={selectYear}
          characterLimit="100"
        ></EditorApp>
        <FileDescriptionList criteria="4.1.2" title={subTitle} year={selectYear}></FileDescriptionList>
        <Review criteria="4.1.2" reviewType="Internal" title={subTitle} year={selectYear}></Review>
        <Review criteria="4.1.2" reviewType="External" title={subTitle} year={selectYear}></Review>
      </Card>
    </div>
  );
}

export default NACCCAQARFourOneTwo;
