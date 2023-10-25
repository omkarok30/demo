import React, { useEffect, useMemo, useState } from 'react';

import { Card, Col, Divider, Row, Select, Space, Table, Tooltip, Typography } from 'antd';
import _ from 'lodash';
import { ColumnsType } from 'antd/lib/table';
import { ExclamationCircleFilled } from '@ant-design/icons';
import * as modelCriteria512 from '@/models/NAAC/criteria5_1/criteria5_1_2';
import { useNaacCriteria512 } from '@/store/NAAC/Criteria5/useNaacCriteria5_1_2';
import { useSettings } from '@/store/settings/useSettings';
import { useAcademicYear } from '@/store/settings/useAcademicYear';

const Criteria512Title = '5.1.2. Number of students benefitted by scholarships, freeships etc. provided by the institution/ non- government bodies, industries, individuals, philanthropists during the year';

const IconComponent = () => {
  return <>Percentage per year <Tooltip placement="top" title={'Percentage per year = (Number of students benefitted by scholarships, freeships etc. provided by the institution / non-government) / (Total number of students) * 100) / (Total number of students) * 100'}>
    <ExclamationCircleFilled />
  </Tooltip ></>;
};

const NaacCriteria512 = () => {
  const settings = useSettings((state: any) => state.byKeys);

  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const naac_version = React.useMemo(() => settings.get('naac_version') || [], [settings]);
  let Criteria512Title1 = '';
  let Criteria512Title2 = '';

  if (naac_version === 'version4') {
  //this criteria is totally different
  }
  else {
    Criteria512Title1 = `5.1.2 Number of students benefitted by scholarships and freeships provided by the institution and non-government agencies during the year';
    Average percentage of students benefitted by scholarships, freeships
    etc. provided by the institution / non- government agencies during the
    last five years`;
    Criteria512Title2 = `5.1.2.1 Total number of students benefited by scholarships, freeships, etc
    provided by the institution / non- government agencies year wise during
    last five years`;
  }
  const { instituteSholarRecords, getNonGovtScholarRecords } = useNaacCriteria512((state: any) => ({
    instituteSholarRecords: state.instituteSholarRecords,
    getNonGovtScholarRecords: state.getNonGovtScholarRecords,
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
      getNonGovtScholarRecords(yearFirstOption);
    }
  }, [yearFirstOption]);

  useEffect(() => {
    if (instituteSholarRecords) {
      setScholarShipData(instituteSholarRecords);
    }
  }, [instituteSholarRecords]);

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria512.columns(settings);

    cols.push({
      title: <IconComponent />,
      key: 'percentage',
      render: (_, record) => record.studentBeneiciaryDetails$count ? ((Number(record.studentBeneiciaryDetails$count) / Number(record.studentPromotionMap$count)) * 100).toFixed(2) : '-',
    });
    return cols;
  }, [settings]);

  const handlessrChange = (value) => {
    getNonGovtScholarRecords(value);
    setYearOption(value);
  };

  return (
    <div className="layout-main-content">
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h4>{Criteria512Title1}</h4>
          <h4>{Criteria512Title2}</h4>

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

export default NaacCriteria512;
