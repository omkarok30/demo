import { Card, Col, Divider, Row, Space } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import EditorApp from '@/components/QLMCriteria';

const criteria612Title = '6.1. Institutional Vision and Leadership';
const criteria612SubTitle = '6.1.2. The effective leadership is visible in various institutional practices such as decentralization and participative management';

const NaacCriteria611 = () => {
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
      <h2>{criteria612Title}</h2>
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{criteria612SubTitle}</h3>
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />

        <EditorApp
          title="Describe a case study showing decentralization and participative management in the institution in practice:"
          criteriaNumber="6.1.2"
          assessmentType="aqar"
          year={yearOption}
          characterLimit="100"
        />

        <Divider />

        <Row>
          <Col span={24}>
            <FileDescriptionList criteria='6.1.2' title={criteria612SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="6.1.2" reviewType="Internal" title={criteria612SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="6.1.2" reviewType="External" title={criteria612SubTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria611;
