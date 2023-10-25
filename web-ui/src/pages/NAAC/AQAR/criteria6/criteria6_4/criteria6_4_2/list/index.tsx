import { useMemo } from 'react';

import { Button, Card, Col, Divider, Input, Row, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { DownloadOutlined, EditFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { useCustomDataHook } from '../renderers';
import * as modelCriteria642 from '@/models/NAAC/criteria6/criteria6_4_2';
import { useSettings } from '@/store/settings/useSettings';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import TableTooltipIcon from '@/components/Naac/TableTooltipIcon';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import { attachRenderer } from '@/utils/tableExtras';

const renderers = {
  academicYear: (value: string) => <YearAsText value={value} />,
};

function NaacCriteria633() {
  const settings = useSettings((state: any) => state.byKeys);

  const { yearOption, current, FundsGrantRecord, handleAQARChange, optionsAcademicYear } = useCustomDataHook();
  const pageTitle = '6.4. Financial Management and Resource Mobilization';
  const Criteria633Title = '6.4.2. Funds/ Grants received from non-government bodies, individuals, philanthropers during the year (not covered in Criterion III)';

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelCriteria642.columns(settings);
    cols.push({
      dataIndex: 'funds_details$count',
      title: 'Total funds / Grants received from non-government bodies, individuals, philanthropers (INR In Lakhs)',
      width: 300,
      render: (_, record) => record.funds_details$count ? [<Input value={record.funds_details$count} style={{ width: '40px' }} />, <Link style={{ marginLeft: '0.5rem' }} to={`../edit/?year=${record.academicYear}`} title='Edit/View'><EditFilled /></Link>, <Button type='link' icon={<DownloadOutlined title='Dowwnload' />} />] : '-',
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <h2>{pageTitle}</h2>
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{Criteria633Title}</h3>
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <table style={{ border: '2px solid #f0f0f0', marginTop: 16 }}>
          <tbody className="ant-table-tbody">
            <tr>
              <td width={222} style={{ borderRight: '1px solid #f0f0f0' }}><b>Total funds / Grants received from non-government bodies, individuals, philanthropers during the year (INR In Lakhs)</b></td>
              <td>{current?.funds_details$count || 0}<TableTooltipIcon columnTitle='' textContent='Formula =  Σ Grant received of the year'><ExclamationCircleFilled /></TableTooltipIcon></td>
            </tr>
          </tbody>
        </table>

        <Divider />

        <Row>
          <Col span={24}>
            <b>Year-wise Data</b>
            {FundsGrantRecord && <NaacDataTable downloadBtn={false} columns={columns} dataSource={FundsGrantRecord?.slice(0, 5)} />}
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='6.3.3' title={Criteria633Title} year={yearOption}></FileDescriptionList>
            <Divider />
            <Review criteria="6.3.3" reviewType="Internal" title={Criteria633Title} year={yearOption}></Review>
            <Divider />
            <Review criteria="6.3.3" reviewType="External" title={Criteria633Title} year={yearOption}></Review>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default NaacCriteria633;
