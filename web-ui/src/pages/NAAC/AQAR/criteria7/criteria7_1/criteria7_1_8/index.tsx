import { Card, Col, Divider, Row, Space } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import EditorApp from '@/components/QLMCriteria';

const criteria718Title = '7.1. Institutional Values and Social Responsibilities';
const criteria718SubTitle = '7.1.8. Describe the Institutional efforts/initiatives in providing an inclusive environment i.e., tolerance and harmony towards cultural, regional, linguistic, communal socioeconomic and other diversities';

const NaacCriteria718 = () => {
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));
  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  const [yearOption, setYearOption] = useState('');

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  const handleAQARChange = (value) => {
    setYearOption(value);
  };

  return (
    <div className="layout-main-content">
      <h2>{criteria718Title}</h2>
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{criteria718SubTitle}</h3>
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />

        <EditorApp
          title="Describe the Institutional efforts/initiatives:"
          criteriaNumber="7.1.8"
          assessmentType="aqar"
          year={yearOption}
          characterLimit="100"
        />

        <Divider />

        <Row>
          <Col span={24}>
            <FileDescriptionList criteria='7.1.8' title={criteria718SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="7.1.8" reviewType="Internal" title={criteria718SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="7.1.8" reviewType="External" title={criteria718SubTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria718;
