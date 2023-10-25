import { Card, Col, Divider, Row, Space } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import EditorApp from '@/components/QLMCriteria';

const criteria721Title = '7.2. Best Practices';
const criteria721SubTitle = '7.2.1. Describe two best practices successfully implemented by the Institution as per NAAC format provided in the Manual';

const divMargin = {
  marginBottom: '1rem',
};

const NaacCriteria721 = () => {
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
      <h2>{criteria721Title}</h2>
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{criteria721SubTitle}</h3>
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />

        <EditorApp
          title="Description:"
          criteriaNumber="7.2.1"
          assessmentType="aqar"
          year={yearOption}
          characterLimit="100"
        />

        <h4>Format for Presentation of Best Practices</h4>
        <div style={divMargin}>
          <b>1. Title of the Practice</b>
          <p>This title should capture the keywords that describe the practice.</p>
        </div>
        <div style={divMargin}>
          <b>2. Objectives of the Practice</b>
          <p>What are the objectives / intended outcomes of this “best practice” and what are the underlying principles or concepts of this practice (in about 100 words)?</p>
        </div>
        <div style={divMargin}>
          <b>3. The Context</b>
          <p>What were the contextual features or challenging issues that needed to be addressed in designing and implementing this practice (in about 150 words)?</p>
        </div>
        <div style={divMargin}>
          <b>4. The Practice</b>
          <p>Describe the practice and its uniqueness in the context of India higher education. What were the constraints / limitations, if any, faced (in about 400 words)?</p>
        </div>
        <div style={divMargin}>
          <b>5. Evidence of Success</b>
          <p>Provide evidence of success such as performance against targets and benchmarks, review/results. What do these results indicate? Describe in about 200 words.</p>
        </div>
        <div style={divMargin}>
          <b>6. Problems Encountered and Resources Required</b>
          <p>Please identify the problems encountered and resources required to implement the practice (in about 150 words).</p>
        </div>
        <div style={divMargin}>
          <b>7. Notes (Optional)</b>
          <p>Please add any other information that may be relevant for adopting/ implementing the Best Practice in other Institutions (in about150 words).</p>
        </div>
        <div style={divMargin}>
          <p>Any other information regarding Institutional Values and Best Practices which the university would like to include.</p>
        </div>
        <Divider />

        <Row>
          <Col span={24}>
            <FileDescriptionList criteria='7.2.1' title={criteria721SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="7.2.1" reviewType="Internal" title={criteria721SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="7.2.1" reviewType="External" title={criteria721SubTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria721;
