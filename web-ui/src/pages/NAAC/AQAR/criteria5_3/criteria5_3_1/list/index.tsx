import { useMemo } from 'react';

import { Button, Card, Col, Divider, Input, Row, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { DownloadOutlined, EditFilled } from '@ant-design/icons';
import { useCustomDataHook } from '../renderers';
import * as modelCriteria531 from '@/models/NAAC/criteria5_3/criteria5_3_1';
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

const NaacCriteria531 = () => {
  const settings = useSettings((state: any) => state.byKeys);

  const { yearOption, awardsRecord, handleAQARChange, optionsAcademicYear } = useCustomDataHook();

  const Criteria531Title = '5.3. Student Participation and Activities';
  const Criteria531SubTitle = '5.3.1. Number of awards/medals for outstanding performance in sports/cultural activities at university/state/national / international level (award for a team event should be counted as one) during the year';

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelCriteria531.columns(settings);
    cols[1] = {
      dataIndex: 'award$count',
      title: 'Number of awards/medals for outstanding performance in sports/cultural activities at university/state/national / international level',
      width: 300,
      render: (_, record) => record.award$count ? [<Input value={record.award$count} style={{ width: '40px' }} />, <Link style={{ marginLeft: '0.5rem' }} to={`../edit/?year=${record.academicYear}`} title='Edit/View'><EditFilled /></Link>, <Button type='link' icon={<DownloadOutlined title='Dowwnload' />} />] : '-',
    };
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <h2>{Criteria531Title}</h2>
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{Criteria531SubTitle}</h3>
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />

        <Row>
          <Col span={24}>
            <b>Year-wise Data</b>
            {awardsRecord && <NaacDataTable downloadBtn={false} columns={columns} dataSource={awardsRecord?.slice(0, 5)} />}
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='5.3.1' title={Criteria531SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="5.3.1" reviewType="Internal" title={Criteria531SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="5.3.1" reviewType="External" title={Criteria531SubTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria531;
