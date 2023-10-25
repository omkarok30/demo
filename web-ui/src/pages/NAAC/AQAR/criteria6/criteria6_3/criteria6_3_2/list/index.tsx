import { useMemo } from 'react';

import { Button, Card, Col, Divider, Input, Row, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { DownloadOutlined, EditFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { useCustomDataHook } from '../renderers';
import * as modelCriteria632 from '@/models/NAAC/criteria6/criteria6_3_2';
import { useSettings } from '@/store/settings/useSettings';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import TableTooltipIcon from '@/components/Naac/TableTooltipIcon';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import calcPercentage from '@/utils/calculatePercent';
import { attachRenderer } from '@/utils/tableExtras';

const renderers = {
  academicYear: (value: string) => <YearAsText value={value} />,
};

const NaacCriteria632 = () => {
  const settings = useSettings((state: any) => state.byKeys);

  const { yearOption, FInancialRecord, handleAQARChange, optionsAcademicYear } = useCustomDataHook();
  const pageTitle = '6.3. Faculty Empowerment Strategies';
  const Criteria634Title = '6.3.2. Number of teachers provided with financial support to attend conferences/ workshops and towards membership fee of professional bodies during the year';
  const Criteria634SubTitle = '6.3.2.1. Number of teachers provided with financial support to attend conferences/ workshops and towards membership fee of professional bodies year wise during the year';

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelCriteria632.columns(settings);
    cols[1] = {
      dataIndex: 'professional_details$count',
      title: 'Number of of teachers provided with financial support to attend conferences/workshops and towards membership fee of professional bodies',
      width: 300,
      render: (_, record) => record.professional_details$count ? [<Input value={record.professional_details$count} style={{ width: '40px' }} />, <Link style={{ marginLeft: '0.5rem' }} to={`../edit/?year=${record.academicYear}`} title='Edit/View'><EditFilled /></Link>, <Button type='link' icon={<DownloadOutlined title='Dowwnload' />} />] : '-',
    };
    cols.push({
      title: <TableTooltipIcon columnTitle='Percentage per year' textContent='Percentage per Year = (Number of teachers provided with financial support to attend conferences/workshopsand towards membership fee of professional bodies) / (Number of Full time Teachers)*100'><ExclamationCircleFilled /></TableTooltipIcon>,
      key: 'percentage',
      render: (_, record) => calcPercentage(record.professional_details$count, record.faculty_fulltime$count),
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <h2>{pageTitle}</h2>
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{Criteria634Title}</h3>
          <h3 style={{ margin: 0 }}>{Criteria634SubTitle}</h3>
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />

        <Row>
          <Col span={24}>
            <b>Year-wise Data</b>
            {FInancialRecord && <NaacDataTable downloadBtn={false} columns={columns} dataSource={FInancialRecord?.slice(0, 5)} />}
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='6.3.2' title={Criteria634Title} year={yearOption}></FileDescriptionList>
            <Divider />
            <Review criteria="6.3.2" reviewType="Internal" title={Criteria634Title} year={yearOption}></Review>
            <Divider />
            <Review criteria="6.3.2" reviewType="External" title={Criteria634Title} year={yearOption}></Review>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria632;
