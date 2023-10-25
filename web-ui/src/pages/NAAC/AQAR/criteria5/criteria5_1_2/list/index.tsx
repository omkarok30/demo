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

const NaacCriteria512 = () => {
  const settings = useSettings((state: any) => state.byKeys);

  const { yearOption, instituteData, handleAQARChange, optionsAcademicYear } = useCustomDataHook();

  const Criteria512Title = '5.1.2. Number of students benefitted by scholarships, freeships etc. provided by the institution/ non- government bodies, industries, individuals, philanthropists during the year ';
  const Criteria512SubTitle = '5.1.2.1 Total number of students benefited by scholarships, freeships, etc provided by the institution / non- government agencies year wise during year';

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria511.columns(settings);
    cols[1] = {
      dataIndex: 'studentBeneiciaryDetails$count',
      title: 'Number of students benefited by scholarships, freeships etc. provided by the institution / non-government agencies',
      width: 300,
      render: (_, record) => record.studentBeneiciaryDetails$count ? [<Link to={`../edit/?year=${record.yearAt}`}>{record.studentBeneiciaryDetails$count}</Link>, <Button type='link' icon={<DownloadOutlined title='Dowwnload' />} />] : '-',
    };
    cols.push({
      title: <TableTooltipIcon columnTitle='Percentage per year' textContent='Percentage per year = (Number of students benefitted by scholarships, freeships etc. provided by the institution / non-government) / (Total number of students) * 100'><ExclamationCircleFilled /></TableTooltipIcon>,
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
          <h4 style={{ margin: 0 }}>{Criteria512Title}</h4>
          {Criteria512SubTitle && <h4 style={{ margin: 0 }}>{Criteria512SubTitle}</h4>}
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />

        <Row>
          <Col span={24}>
            <b>Year-wise Data</b>
            {instituteData && <NaacDataTable downloadBtn={false} columns={columns} dataSource={instituteData?.slice(0, 5)} />}
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='5.1.2' title={Criteria512Title} year={yearOption} />
            <Divider />
            <Review criteria="5.1.2" reviewType="Internal" title={Criteria512Title} year={yearOption} />
            <Divider />
            <Review criteria="5.1.2" reviewType="External" title={Criteria512Title} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria512;
