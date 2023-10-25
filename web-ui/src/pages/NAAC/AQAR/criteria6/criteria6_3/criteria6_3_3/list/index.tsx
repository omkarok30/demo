import { useMemo } from 'react';

import { Button, Card, Col, Divider, Input, Row, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { DownloadOutlined, EditFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { useCustomDataHook } from '../renderers';
import * as modelCriteria633 from '@/models/NAAC/criteria6/criteria6_3_3';
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

  const { yearOption, current, ProfessionalRecord, handleAQARChange, optionsAcademicYear } = useCustomDataHook();
  const pageTitle = '6.3. Faculty Empowerment Strategies';
  const Criteria633Title = '6.3.3. Number of professional development/ administrative training programs organized by the institution for teaching and non-teaching staff during the year';
  const Criteria633SubTitle = '6.3.3.1. Total number of professional development /administrative training Programmes organized by the institution for teaching and non teaching staff during the year';

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelCriteria633.columns(settings);
    cols.push({
      dataIndex: 'professional_details$count',
      title: 'Number of professional development /administrative training Programmes organized by the institution for teaching and non teaching staff',
      width: 300,
      render: (_, record) => record.professional_details$count ? [<Input value={record.professional_details$count} style={{ width: '40px' }} />, <Link style={{ marginLeft: '0.5rem' }} to={`../edit/?year=${record.academicYear}`} title='Edit/View'><EditFilled /></Link>, <Button type='link' icon={<DownloadOutlined title='Dowwnload' />} />] : '-',
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
          {Criteria633SubTitle && <h3 style={{ margin: 0 }}>{Criteria633SubTitle}</h3>}
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <table style={{ border: '2px solid #f0f0f0', marginTop: 16 }}>
          <tbody className="ant-table-tbody">
            <tr>
              <td width={222} style={{ borderRight: '1px solid #f0f0f0' }}><b>Total number of professional development /administrative training Programmes organized by the institution for teaching and non teaching staff during the year</b></td>
              <td>{current?.professional_details$count || 0}<TableTooltipIcon columnTitle='' textContent='Total of the year'><ExclamationCircleFilled /></TableTooltipIcon></td>
            </tr>
          </tbody>
        </table>

        <Divider />

        <Row>
          <Col span={24}>
            <b>Year-wise Data</b>
            {ProfessionalRecord && <NaacDataTable downloadBtn={false} columns={columns} dataSource={ProfessionalRecord?.slice(0, 5)} />}
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
