import { useMemo } from 'react';

import { Button, Card, Col, Divider, Input, Row, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { DownloadOutlined, EditFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { useCustomDataHook } from '../renderers';
import * as modelCriteria523 from '@/models/NAAC/criteria5_2/criteria5_2_3';
import { useSettings } from '@/store/settings/useSettings';
import TableTooltipIcon from '@/components/Naac/TableTooltipIcon';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import calcPercentage from '@/utils/calculatePercent';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import { attachRenderer } from '@/utils/tableExtras';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';

const renderers = {
  year: (value: string) => <YearAsText value={value} />,
};

const NaacCriteria523 = () => {
  const settings = useSettings((state: any) => state.byKeys);

  const { yearOption, ExamRecord, handleAQARChange, optionsAcademicYear } = useCustomDataHook();

  const Criteria523Title = '5.2. Student Progression';
  const Criteria523SubTitle = '5.2.3. Number of students qualifying in state/ national/ international level examinations during the year (eg: JAM/ CLAT/ GATE/ GMAT/ CAT/ GRE/ TOEFL/ Civil Services/ State government examinations)';
  const modalTitle = '5.2.3. Average percentage of students qualifying in state/national/ international level examinations during the last five years (eg: JAM/ NET/SLET/GATE/ GMAT/CAT/GRE/ TOEFL/ Civil Services/State government examinations, etc.) (5)\n5.2.3.1. Number of students qualifying in state/ national/ international level examination 5.2.3.2. Number of students appearing in state/ national/ international level examination';

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelCriteria523.columns(settings);
    cols[1] = {
      dataIndex: 'national_international_exam$count',
      title: '5.2.3.1. Number of students qualifying in state/ national/ international level examinations (eg: JAM/CLAT/NET/ SLET/ GATE/ GMAT/CAT/GRE/ TOEFL/ Civil Services/ State government examinations) during the year',
      width: 300,
      render: (_, record) => record.national_international_exam$count ? [<Input value={record.national_international_exam$count} style={{ width: '40px' }} />, <Link style={{ marginLeft: '0.5rem' }} to={`../edit/?year=${record.year}`} title='Edit/View'><EditFilled /></Link>, <Button type='link' icon={<DownloadOutlined title='Dowwnload' />} />] : '-',
    };
    cols.push({
      title: <TableTooltipIcon columnTitle='Percentage per year' textContent='Percentage per Year = (Number of students qualifying in state/ national/ international level examination)/ (Number of students appeared in state/ national/ international level examination)*100'><ExclamationCircleFilled /></TableTooltipIcon>,
      key: 'percentage',
      render: (_, record) => calcPercentage(record.national_international_exam$count, record.student_appearing_exam$count),
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <h2>{Criteria523Title}</h2>
      <Card bordered={false} className='multiline_test'>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{Criteria523SubTitle}</h3>
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />

        <Row>
          <Col span={24}>
            <b>Year-wise Data</b>
            {ExamRecord && <NaacDataTable downloadBtn={false} columns={columns} dataSource={ExamRecord?.slice(0, 5)} />}
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='5.2.3' title={Criteria523SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="5.2.3" reviewType="Internal" title={modalTitle} year={yearOption} />
            <Divider />
            <Review criteria="5.2.3" reviewType="External" title={modalTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria523;
