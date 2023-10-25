import { useMemo } from 'react';

import { Button, Card, Col, Divider, Input, Row, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { DownloadOutlined, EditFilled } from '@ant-design/icons';
import { useCustomDataHook } from '../renderers';
import * as modelCriteria533 from '@/models/NAAC/criteria5_3/criteria5_3_3';
import { useSettings } from '@/store/settings/useSettings';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import { attachRenderer } from '@/utils/tableExtras';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';

const renderers = {
  academicYear: (value: string) => <YearAsText value={value} />,
};

const NaacCriteria533 = () => {
  const settings = useSettings((state: any) => state.byKeys);

  const { yearOption, eventsRecord, handleAQARChange, optionsAcademicYear } = useCustomDataHook();

  const Criteria533Title = '5.3. Student Participation and Activities';
  const Criteria533SubTitle = '5.3.3. Number of sports and cultural events/ competitions in which students of the Institution participated during the year (organized by the institution/ other institutions)';

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelCriteria533.columns(settings);
    cols[1] = {
      dataIndex: 'events$count',
      title: 'Number of sports and cultural events/competitions in which students of the Institution participated during the year',
      width: 300,
      render: (_, record) => record.events$count ? [<Input value={record.events$count} style={{ width: '40px' }} />, <Link style={{ marginLeft: '0.5rem' }} to={`../edit/?year=${record.academicYear}`} title='Edit/View'><EditFilled /></Link>, <Button type='link' icon={<DownloadOutlined title='Dowwnload' />} />] : '-',
    };
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <h2>{Criteria533Title}</h2>
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{Criteria533SubTitle}</h3>
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />

        <Row>
          <Col span={24}>
            <b>Year-wise Data</b>
            {eventsRecord && <NaacDataTable downloadBtn={false} columns={columns} dataSource={eventsRecord?.slice(0, 5)} />}
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='5.3.3' title={Criteria533SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="5.3.3" reviewType="Internal" title={Criteria533SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="5.3.3" reviewType="External" title={Criteria533SubTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria533;
