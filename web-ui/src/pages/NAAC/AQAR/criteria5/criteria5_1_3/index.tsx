import { useMemo } from 'react';

import { Card, Col, Divider, Row } from 'antd';
import { useLocation } from 'react-router-dom';
import { useCustomRadioHook } from '../../radioButtonHooks';
import NaacCriteria513Skills from './skillsEnhancement/list';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';

const pageTitlle = '5.1. Student Support';

const NaacCriteria513 = () => {
  const location = useLocation();
  const pathName = location.pathname.split('/');

  const { yearOption, currentSelected, optionsAcademicYear, handleAQARChange } = useCustomRadioHook('5.1.3');

  let Criteria513Title;
  if (pathName.includes('aqar')) {
    Criteria513Title = '5.1.3. Capacity building and skills enhancement initiatives taken by the institution include the following 1. Soft skills 2. Language and communication skills 3. Life skills (Yoga, physical fitness, health and hygiene) 4. ICT/computing skills';
  }
  else {
    Criteria513Title = '5.1.3. Capacity building and skills enhancement initiatives taken by the institution include the following 1. Soft skills 2. Language and communication skills 3. Life skills (Yoga, physical fitness, health and hygiene) 4. ICT/ computing skills (10) ';
  }

  const NaacType = useMemo(() => {
    const type = pathName.includes('aqar') ? 'AOAR' : 'SSR';
    return type as string;
  }, [location]);

  return (
    <div className="layout-main-content">
      <h2>{pageTitlle}</h2>
      <Card bordered={false}>
        <h3>{Criteria513Title}</h3>
        <Divider />

        <YearOptionAndRatings typeOfNaac={NaacType} yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />

        <Row>
          <Col span={24}>
            {<NaacCriteria513Skills currData={currentSelected} currYear={yearOption} />}
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='5.1.3' title={Criteria513Title} year={yearOption} />
            <Divider />
            <Review criteria="5.1.3" reviewType="Internal" title={Criteria513Title} year={yearOption} />
            <Divider />
            <Review criteria="5.1.3" reviewType="External" title={Criteria513Title} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria513;
