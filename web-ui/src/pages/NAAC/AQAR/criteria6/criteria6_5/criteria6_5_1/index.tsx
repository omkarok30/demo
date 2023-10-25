import { Card, Col, Divider, Row, Space } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import EditorApp from '@/components/QLMCriteria';

const criteria651Title = '6.5. Internal Quality Assurance System';
const criteria651SubTitle = '6.5.1. Internal Quality Assurance Cell (IQAC) has contributed significantly for institutionalizing the quality assurance strategies and processes';

const NaacCriteria651 = () => {
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
      <h2>{criteria651Title}</h2>
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{criteria651SubTitle}</h3>
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />

        <EditorApp
          title="Describe two practices institutionalized as a result of IQAC initiatives:"
          criteriaNumber="6.5.1"
          assessmentType="aqar"
          year={yearOption}
          characterLimit="100"
        />

        <Divider />

        <Row>
          <Col span={24}>
            <FileDescriptionList criteria='6.5.1' title={criteria651SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="6.5.1" reviewType="Internal" title={criteria651SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="6.5.1" reviewType="External" title={criteria651SubTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria651;
