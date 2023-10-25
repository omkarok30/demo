import React, { useEffect, useMemo, useState } from 'react';

import { Card, Col, Divider, Row, Select, Space, Table, Tooltip, Typography } from 'antd';
import _ from 'lodash';
import { ColumnsType } from 'antd/lib/table';
import { ExclamationCircleFilled } from '@ant-design/icons';
import * as modelCriteria511 from '@/models/NAAC/criteria5_1/criteria5_1_1';
import { useNaacCriteria511 } from '@/store/NAAC/Criteria5/useNaacCriteria5_1_1';
import { useSettings } from '@/store/settings/useSettings';
import { useAcademicYear } from '@/store/settings/useAcademicYear';

const IconComponent = () => {
  return <>Percentage per year <Tooltip placement="top" title={'Percentage per year = (Number of students benefited by scholarships and free ships provided by the Government during the year) / (Total number of students) * 100'}>
    <ExclamationCircleFilled />
  </Tooltip ></>;
};

const NaacCriteria511 = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const naac_version = React.useMemo(() => settings.get('naac_version') || [], [settings]);
  let Criteria511Title = '';
  let Criteria511Title1 = '';
  if (naac_version === 'version4') {
    Criteria511Title1 = `5.1.1. Percentage of students benefited by scholarships and freeships provided
    by the Government and Non-Government agencies during last five years`;
    Criteria511Title = `5.1.1.1. Number of students benefited by scholarships and freeships provided
    by the Government and Non-Government agencies year wise during last five
    years`;
  }
  else {
    Criteria511Title1 = `5.1.1. Average percentage of students benefited by scholarships and
    freeships provided by the Government during last five years`;
    Criteria511Title = `5.1.1.1. Number of students benefited by scholarships and freeships
    provided by the Government year wise during last five years`;
  }
  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { govtScholarRecords, getGovtScholarRecords } = useNaacCriteria511((state: any) => ({
    govtScholarRecords: state.govtScholarRecords,
    getGovtScholarRecords: state.getGovtScholarRecords,
  }));

  const [yearOption, setYearOption] = useState<number | null>(null);
  const [scholarData, setScholarShipData] = useState<[]>([]);

  const optionsAcademicYear = comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');

  useEffect(() => {
    getAcademicYearDetails();
  }, []);

  useEffect(() => {
    if (yearFirstOption) {
      setYearOption(yearFirstOption);
      getGovtScholarRecords(yearFirstOption);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    if (govtScholarRecords) {
      setScholarShipData(govtScholarRecords);
    }
  }, [govtScholarRecords]);

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria511.columns(settings);
    cols.push({
      title: <IconComponent />,
      key: 'percentage',
      render: (_, record) => record.studentBeneiciaryDetails$count ? ((Number(record.studentBeneiciaryDetails$count) / Number(record.studentPromotionMap$count)) * 100).toFixed(2) : '-',
    });
    return cols;
  }, [settings]);

  const handlessrChange = (value) => {
    getGovtScholarRecords(value);
    setYearOption(value);
  };
  return (
    <div className="layout-main-content">
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h4>{Criteria511Title1}</h4>
          <h4>{Criteria511Title}</h4>

        </Space.Compact>
        <Divider />
        <Row justify={'end'}>
          <Col span={12}>
            <Space direction="vertical" size={1}>
              <Typography.Text><b>Internal Rating:-</b></Typography.Text>
              <Typography.Text><b>External Rating:-</b></Typography.Text>
            </Space>
          </Col>

        </Row>
        <Row>
          <Col span={8} style={{ margin: '1rem 0 1.5rem 0' }}>
            <Space>
              <b>ssr Year:</b>
              <Select
                style={{ width: 200 }}
                value={yearOption}
                options={optionsAcademicYear.slice(0, 5)}
                defaultValue={yearOption}
                onChange={value => handlessrChange(value)}
              />
            </Space>
          </Col>

          <Col span={24}>
            <b>Year-wise Data</b>
            <Table bordered columns={columns} dataSource={scholarData} pagination={false} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria511;
