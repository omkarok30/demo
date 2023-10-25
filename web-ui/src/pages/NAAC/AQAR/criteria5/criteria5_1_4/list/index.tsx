import { useMemo } from 'react';

import { Card, Col, Divider, Row, Space } from 'antd';
import { Link } from 'react-router-dom';
import { DownloadOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { useCustomDataHook } from '../renderer';
import * as modelCriteria514 from '@/models/NAAC/criteria5_1/criteria5_1_4';
import { useSettings } from '@/store/settings/useSettings';
import TableTooltipIcon from '@/components/Naac/TableTooltipIcon';
import calcPercentage from '@/utils/calculatePercent';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';

const Criteria514Title = () => {
  return (
    <Space.Compact direction="vertical">
      <h3 style={{ margin: 0 }}>5.1.4. Number of students benefitted by guidance for competitive examinations and career counseling offered by the Institution during the year</h3>
      <h3 style={{ margin: 0 }}>5.1.4.1. Number of students benefitted by guidance for competitive examinations and career counselling offered by the institution year wise during  year </h3>
    </Space.Compact>
  );
};

const pageTitlle = '5.1. Student Support';

const NaacCriteria514 = () => {
  const settings = useSettings((state: any) => state.byKeys);

  const {
    yearOption,
    handleAQARChange,
    counsellingRecords,
    optionsAcademicYear,
  } = useCustomDataHook();

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria514.columns(settings);

    cols.push({
      title: 'Number of students benefited by guidance for competitive examinations and career counselling offered by the Institution',
      key: 'studentBeneiciaryDetails$count',
      width: 300,
      render: (_, record) => {
        return record.download ? <><Link to={`../edit/?year=${record.yearAt}`}>{record.studentBeneiciaryDetails$count} </Link> <DownloadOutlined title='download' /></> : record.studentBeneiciaryDetails$count;
      },
    }, {
      title: 'Total number of Students',
      key: 'studentPromotionMap$count',
      render: (_, record) => {
        return record.studentPromotionMap$count ? record.studentPromotionMap$count : '-';
      },
    }, {
      title: <TableTooltipIcon columnTitle='Percentage per year' textContent='Percentage per year = (Number of students benefitted by guidance for competitive examinations and career counselling offered by the institution ) / (Total number of Students) * 100'><ExclamationCircleFilled /></TableTooltipIcon>,
      key: 'percentage',
      render: (_, record) => calcPercentage(record.studentBeneiciaryDetails$count, record.studentPromotionMap$count),
    });
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <h2>{pageTitlle}</h2>
      <Card bordered={false}>
        <Criteria514Title />
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />
        <Row>
          <Col span={24}>
            <b>Year-wise Data</b>
            {counsellingRecords && <NaacDataTable downloadBtn={false} columns={columns} dataSource={counsellingRecords?.slice(0, 5)} />}
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='5.1.4' title={'5.1.4. Number of students benefitted by guidance for competitive examinations and career counseling offered by the Institution during the year'} year={yearOption}></FileDescriptionList>
            <Divider />
            <Review criteria="5.1.4" reviewType="Internal" title={'5.1.4. Number of students benefitted by guidance for competitive examinations and career counseling offered by the Institution during the year'} year={yearOption}></Review>
            <Divider />
            <Review criteria="5.1.4" reviewType="External" title={'5.1.4. Number of students benefitted by guidance for competitive examinations and career counseling offered by the Institution during the year'} year={yearOption}></Review>
          </Col>
        </Row>
      </Card>
    </div >
  );
};

export default NaacCriteria514;
