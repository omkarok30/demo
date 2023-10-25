import { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Divider, Row, Space } from 'antd';
import _ from 'lodash';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { DownloadOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { useNaacCriteria121 } from '@/store/NAAC/Criteria1/useNaacCriteria1_2_1';
import * as modelCriteria121 from '@/models/NAAC/criteria1/criteria1_2_1';
import TableTooltipIcon from '@/components/Naac/TableTooltipIcon';
import calcPercentage from '@/utils/calculatePercent';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { isEmptyValue } from '@/utils/object';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';

const NAACAQRYearWiseData = () => {
  const mainTitle = '1.2. Academic Flexibility';
  const Criteria121Title
    = '1.2.1. Number of Programmes in which Choice Based Credit System (CBCS)/ elective course system has been implemented';
  const Criteria121SubTitle
    = '1.2.1.1 Number of Programmes in which CBCS/ Elective course system implemented.';

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria121.columns();
    cols[2] = {
      dataIndex: 'degree_programme$cbcs$count',
      title: 'Total Number of Programs',
      width: 300,
      render: (_, record) =>
        record.degree_programme$count
          ? [
            <Link to={`../programDetails?year=${record.yearAt}`}>
              {record.degree_programme$count}
            </Link>,
            <Button
              type="link"
              icon={<DownloadOutlined title="Dowwnload" />}
            />,
            ]
          : '-',
    };
    cols.push({
      title: (
        <TableTooltipIcon
          columnTitle="Percentage"
          textContent="Percentage = (Number of programs with CBSC/Elective course system) / (Total number of students) * 100"
        >
          <ExclamationCircleFilled />
        </TableTooltipIcon>
      ),
      key: 'percentage',
      render: (_, record) =>
        calcPercentage(
          record.degree_programme$cbcs$count,
          record.degree_programme$count,
        ),
    });
    return cols;
  }, []);

  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const optionsAcademicYear = useMemo(
    () => storeAcademicYear.comboByName || [],
    [storeAcademicYear.comboByName],
  );

  const [selectYear, setYear] = useState();
  const [academicYearLabel, setacademicYearLabel] = useState('');

  useEffect(() => {
    if (isEmptyValue(selectYear)) {
      const first = _.first(optionsAcademicYear);
      const value = _.get(first, ['value'], '');
      const label = _.get(first, ['label'], '');
      setYear(value);
      setacademicYearLabel(label);
    }
  }, [storeAcademicYear.comboByName]);

  const setAcademicYear = (event) => {
    setYear(event);
    const value = event;
    const yearOptions = _.find(optionsAcademicYear, { value });
    const label = _.get(yearOptions, ['label'], '');
    setacademicYearLabel(label);
  };

  const storeProgramDetails = useProgramDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));

  const storeCriteria121 = useNaacCriteria121((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));

  useEffect(() => {
    storeProgramDetails.getRecords();
    storeCriteria121.getRecords();
    storeAcademicYear.getAcademicYearDetails();
  }, []);

  return (
    <div className="layout-main-content">
      <Card title={mainTitle} bordered={false}>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{Criteria121Title}</h3>
          {Criteria121SubTitle && (
            <h3 style={{ margin: 0 }}>{Criteria121SubTitle}</h3>
          )}
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={academicYearLabel} optionsAcademicYear={optionsAcademicYear} handleAQARChange={setAcademicYear} />

        <Divider />

        <Row>
          <Col span={24}>
            <b>Year-wise Data</b>
            {storeCriteria121.allRecords && (
              <NaacDataTable
                downloadBtn={false}
                columns={columns}
                dataSource={storeCriteria121.allRecords?.slice(0, 5)}
              />
            )}
          </Col>
          <Divider />
          <Col span={24}>
            <FileDescriptionList
              criteria="1.2.1"
              title={Criteria121Title}
              year={selectYear}
            ></FileDescriptionList>
            <Divider />
            <Review
              criteria="1.2.1"
              reviewType="Internal"
              title={Criteria121Title}
              year={selectYear}
            ></Review>
            <Divider />
            <Review
              criteria="1.2.1"
              reviewType="External"
              title={Criteria121Title}
              year={selectYear}
            ></Review>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NAACAQRYearWiseData;
