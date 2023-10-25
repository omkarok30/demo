import { useMemo, useState } from 'react';

import { Button, Card, Col, Divider, Input, Row, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { CheckCircleTwoTone, EditFilled, ExclamationCircleFilled } from '@ant-design/icons';
import _ from 'lodash';
import { useCustomDataHook } from '../renderers';
import ModalUpdateContibution from '../form/modalUpdateContibution';
import * as modelCriteria542 from '@/models/NAAC/criteria5_4/criteria5_4_2';
import { useSettings } from '@/store/settings/useSettings';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import { attachRenderer } from '@/utils/tableExtras';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import TableTooltipIcon from '@/components/Naac/TableTooltipIcon';

const renderers = {
  academicYear: (value: string) => <YearAsText value={value} />,
};

const options = [
  {
    id: 1,
    option: 'A',
    minValue: 5,
    maxValue: Infinity,
    optionText: '≥ 5 Lakhs',
  }, {
    id: 2,
    option: 'B',
    minValue: 4,
    maxValue: 5,
    optionText: '4 Lakhs - 5 Lakhs',
  }, {
    id: 3,
    option: 'C',
    minValue: 3,
    maxValue: 4,
    optionText: '3 Lakhs - 4 Lakhs',
  }, {
    id: 4,
    option: 'D',
    minValue: 1,
    maxValue: 3,
    optionText: '1 Lakhs - 3 Lakhs',
  }, {
    id: 5,
    option: 'E',
    minValue: 0,
    maxValue: 1,
    optionText: '<1 Lakhs',
  },
];

const NaacCriteria542 = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const [openModal, setOpenModal] = useState(false);

  const { yearOption, contributionRecord, handleAQARChange, optionsAcademicYear, current } = useCustomDataHook();

  const Criteria542Title = '5.4. Alumni Engagement';
  const Criteria542SubTitle = '5.4.2. Alumni contribution during the year (INR in Lakhs)';

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelCriteria542.columns(settings);
    cols[1] = {
      dataIndex: 'contribution',
      title: 'Alumni Contribution (INR in Lakhs)',
      width: 300,
      render: (_, record) => record.contribution ? [<Input value={record.contribution} style={{ width: '40px' }} />, <Button type='link' onClick={() => setOpenModal(true)} icon={<EditFilled title='Edit' />} />] : '-',
    };
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <h2>{Criteria542Title}</h2>
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{Criteria542SubTitle}</h3>
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <table style={{ border: '2px solid #f0f0f0' }}>
          <tbody className="ant-table-tbody">
            <tr>
              <td width={300}><b>{'Alumni contribution during the year (INR in Lakhs)'}</b></td>
              <td>{current?.contribution}</td>
              <td><TableTooltipIcon columnTitle={' '} textContent={'Total of the year'}><ExclamationCircleFilled /></TableTooltipIcon></td>
            </tr>
          </tbody>
        </table>

        <Divider />

        <Row>
          <Col span={24}>
            <b>Year-wise Data</b>
            {contributionRecord && <NaacDataTable downloadBtn={false} columns={columns} dataSource={contributionRecord?.slice(0, 5)} />}

            <h4><b>Alumni contribution during the year (INR in Lakhs)</b></h4>
            <Card>
              <ul style={{ paddingLeft: '0', margin: 0, listStyle: 'none' }}>
                {options.map((list: any) => <li key={list.id}>{list.option}. {list.optionText} {_.inRange(current?.contribution, list.minValue, list.maxValue) ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : null}</li>)}

              </ul>
              <Divider style={{ margin: '1rem 0' }} />

              <Typography.Text strong>Note: Data Requirement for year (year wise):</Typography.Text>
              <ol style={{ padding: 14, margin: 0 }}>
                <li>Alumni association / Name of the alumnus.</li>
                <li>Quantum of contribution</li>
                <li>Audited Statement of account of the institution reflecting the receipts.</li>
              </ol>
            </Card>
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='5.4.2' title={Criteria542SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="5.4.2" reviewType="Internal" title={Criteria542SubTitle} year={yearOption} />
            <Divider />
            <Review criteria="5.4.2" reviewType="External" title={Criteria542SubTitle} year={yearOption} />
          </Col>
        </Row>
        {
          useMemo(() =>
            <ModalUpdateContibution
              onHide={() => setOpenModal(false)}
              openModal={openModal}
              count={current?.contribution}
            />,
          [openModal],
          )
        }
      </Card>
    </div>
  );
};

export default NaacCriteria542;
