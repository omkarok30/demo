import { Card, Col, Divider, Row, Space } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import EditorApp from '@/components/QLMCriteria';

const criteria652Title = '6.5. Internal Quality Assurance System';
const criteria652SubTitle = '6.5.2. The institution reviews its teaching learning process, structures & methodologies of operations and learning outcomes at periodic intervals through IQAC set up as per norms and recorded the incremental improvement in various activities';

const NaacCriteria652 = () => {
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
      <h2>{criteria652Title}</h2>
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{criteria652SubTitle}</h3>
        </Space.Compact>
        <Divider />

        <h3>( For first cycle - Incremental improvements made for the preceding year with regard to quality.
          For second and subsequent cycles - Incremental improvements made for the preceding year with regard to quality and post accreditation quality initiatives.)</h3>

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />

        <EditorApp
          title="Describe any two examples of institutional reviews and implementation of teaching learning reforms facilitated by the IQAC within a maximum of 200 words each:"
          criteriaNumber="6.5.2"
          assessmentType="aqar"
          year={yearOption}
          characterLimit="100"
        />

        <Divider />

        <Row>
          <Col span={24}>
            <FileDescriptionList criteria='6.5.2' title={criteria652SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="6.5.2" reviewType="Internal" title={criteria652SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="6.5.2" reviewType="External" title={criteria652SubTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria652;
