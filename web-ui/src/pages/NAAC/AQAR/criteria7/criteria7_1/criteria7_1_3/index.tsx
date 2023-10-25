import { Card, Col, Divider, Row, Space } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import EditorApp from '@/components/QLMCriteria';

const criteria713Title = '7.1. Institutional Values and Social Responsibilities';
const criteria713SubTitle = '7.1.3. Describe the facilities in the Institution for the management of the following types of degradable and non-degradable waste';

const NaacCriteria713 = () => {
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
      <h2>{criteria713Title}</h2>
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{criteria713SubTitle}</h3>
          <ul style={{ paddingLeft: 18, fontWeight: '600' }}>
            <li>Solid waste management</li>
            <li>Liquid waste management</li>
            <li>Biomedical waste management</li>
            <li>E-waste management</li>
            <li>Waste recycling system</li>
            <li>Hazardous chemicals and radioactive waste management</li>
          </ul>
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />

        <EditorApp
          title="Description:"
          criteriaNumber="7.1.3"
          assessmentType="aqar"
          year={yearOption}
          characterLimit="100"
        />

        <Divider />

        <Row>
          <Col span={24}>
            <FileDescriptionList criteria='7.1.3' title={criteria713SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="7.1.3" reviewType="Internal" title={criteria713SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="7.1.3" reviewType="External" title={criteria713SubTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria713;
