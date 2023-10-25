import { useMemo } from 'react';

import { Button, Card, Col, Divider, Input, Row, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { DownloadOutlined, EditFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { useCustomDataHook } from '../renderers';
import * as modelCriteria521 from '@/models/NAAC/criteria5_2/criteria5_2_1';
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
  academicYear: (value: string) => <YearAsText value={value} />,
};

const NaacCriteria521 = () => {
  const settings = useSettings((state: any) => state.byKeys);

  const { yearOption, placementRecord, handleAQARChange, optionsAcademicYear } = useCustomDataHook();

  const Criteria521Title = '5.2. Student Progression';
  const Criteria521SubTitle = '5.2.1. Number of placement of outgoing students during the year';

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelCriteria521.columns(settings);
    cols[1] = {
      dataIndex: 'placement$count',
      title: 'Number of outgoing students placed',
      width: 300,
      render: (_, record) => record.placement$count ? [<Input value={record.placement$count} style={{ width: '40px' }} />, <Link style={{ marginLeft: '0.5rem' }} to={`../edit/?year=${record.academicYear}`} title='Edit/View'><EditFilled /></Link>, <Button type='link' icon={<DownloadOutlined title='Dowwnload' />} />] : '-',
    };
    cols.push({
      title: <TableTooltipIcon columnTitle='Percentage per year' textContent='Percentage per year = (Number of outgoing students placed)  / (Number of outgoing Students)*100'><ExclamationCircleFilled /></TableTooltipIcon>,
      key: 'percentage',
      render: (_, record) => calcPercentage(record.placement$count, record.studentPromotionMap$count),
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <h2>{Criteria521Title}</h2>
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{Criteria521SubTitle}</h3>
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />

        <Row>
          <Col span={24}>
            <b>Year-wise Data</b>
            {placementRecord && <NaacDataTable downloadBtn={false} columns={columns} dataSource={placementRecord?.slice(0, 5)} />}
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='5.2.1' title={Criteria521SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="5.2.1" reviewType="Internal" title={Criteria521SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="5.2.1" reviewType="External" title={Criteria521SubTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria521;
