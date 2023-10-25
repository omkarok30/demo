import { useMemo } from 'react';

import { Button, Card, Col, Divider, Row, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { DownloadOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { useCustomDataHook } from '../renderers';
import * as modelCriteria511 from '@/models/NAAC/criteria5_1/criteria5_1_1';
import { useSettings } from '@/store/settings/useSettings';
import TableTooltipIcon from '@/components/Naac/TableTooltipIcon';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import calcPercentage from '@/utils/calculatePercent';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';

const pageTitlle = '5.1. Student Support';
const NaacCriteria511 = () => {
  const settings = useSettings((state: any) => state.byKeys);

  const { yearOption, scholarsData, handleAQARChange, optionsAcademicYear } = useCustomDataHook();

  const Criteria511Title = '5.1.1. Number of students benefited by scholarships and free ships provided by the Government during the year';
  const Criteria511SubTitle = '5.1.1.1. Number of students benefited by scholarships and free ships provided by the Government during the year';

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria511.columns(settings);
    cols[1] = {
      dataIndex: 'studentBeneiciaryDetails$count',
      title: 'Number of students benefited by scholarships and freeships provided by the Government',
      width: 300,
      render: (_, record) => record.studentBeneiciaryDetails$count ? [<Link to={`../edit/?year=${record.yearAt}`}>{record.studentBeneiciaryDetails$count}</Link>, <Button type='link' icon={<DownloadOutlined title='Dowwnload' />} />] : '-',
    };
    cols.push({
      title: <TableTooltipIcon columnTitle='Percentage per year' textContent='Percentage per year = (Number of students benefited by scholarships and free ships provided by the Government during the year) / (Total number of students) * 100'><ExclamationCircleFilled /></TableTooltipIcon>,
      key: 'percentage',
      render: (_, record) => calcPercentage(record.studentBeneiciaryDetails$count, record.studentPromotionMap$count),
    });
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <h2>{pageTitlle}</h2>
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{Criteria511Title}</h3>
          {Criteria511SubTitle && <h3 style={{ margin: 0 }}>{Criteria511SubTitle}</h3>}
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />

        <Row>
          <Col span={24}>
            <b>Year-wise Data</b>
            {scholarsData && <NaacDataTable downloadBtn={false} columns={columns} dataSource={scholarsData?.slice(0, 5)} />}
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='5.1.1' title={Criteria511Title} year={yearOption} />
            <Divider />
            <Review criteria="5.1.1" reviewType="Internal" title={Criteria511Title} year={yearOption} />
            <Divider />
            <Review criteria="5.1.1" reviewType="External" title={Criteria511Title} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria511;
