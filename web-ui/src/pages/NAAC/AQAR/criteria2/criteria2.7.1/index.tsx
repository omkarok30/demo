import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Select,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import _ from 'lodash';

import { When } from 'react-if';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { isEmptyValue } from '@/utils/object';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import InternalExternalReview from '@/pages/NAAC/internalExternalReview';
import { EditIcon } from '@/components/Icons/EditIcon';
import { DownloadIcon } from '@/components/Icons/DownloadIcon';
import { InfoIcon } from '@/components/Icons/InfoIcon';

function NACCAQARTwoSevenOne() {
  const mainTitle = '2.7. Student Satisfaction Survey';
  const subTitle
    = '2.7.1. Student Satisfaction Survey (SSS) on overall institutional performance (Institution may design its own questionnaire) (results and details need to be provided as a weblink)';

  const [studentCount, setStudentCount] = useState(2);

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
  const [academicYearLabel, setacademicYearLabel] = useState();

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

  useEffect(() => {
    storeAcademicYear.getAcademicYearDetails();
  }, []);

  const handleDownload = (record) => { };

  const handleEdit = (record) => { };

  const handleStudentCount = () => { };

  return (
    <>
      <Card title={mainTitle}>
        <Card>
          <Typography.Text>
            <b>{subTitle}</b>
          </Typography.Text>
          <Divider />
          <Row gutter={16} style={{ marginBottom: '10px' }}>
            <Col span={12}>
              <Space>
                <span>AQAR Year:</span>
                <Select
                  style={{ width: 300 }}
                  options={optionsAcademicYear}
                  value={selectYear}
                  onChange={value => setAcademicYear(value)}
                ></Select>
              </Space>
            </Col>
            <Col span={12}>
              <InternalExternalReview
                internalRating="2"
                externalRatings="2"
              ></InternalExternalReview>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: '10px' }}>
            <Col span={12}>
              <Space>
                <span>Number of Students : </span>
                <>
                  <When condition={studentCount === 0}>
                    <span> - </span>
                  </When>
                  <When condition={studentCount > 0}>
                    <span> {studentCount} </span>
                    <Button onClick={record => handleEdit(record)}>
                      <EditIcon></EditIcon>
                    </Button>
                    <Button onClick={record => handleDownload(record)}>
                      <DownloadIcon></DownloadIcon>
                    </Button>
                  </When>
                </>
                <Tooltip placement="top" title="Data of selected years">
                  <Button>
                    <InfoIcon></InfoIcon>
                  </Button>
                </Tooltip>
              </Space>
            </Col>
          </Row>
          <Divider />
          <FileDescriptionList
            criteria="2.7.1"
            title={subTitle}
            year={selectYear}
          ></FileDescriptionList>
          <Review
            criteria="2.7.1"
            reviewType="Internal"
            title={subTitle}
            year={selectYear}
          ></Review>
          <Review
            criteria="2.7.1"
            reviewType="External"
            title={subTitle}
            year={selectYear}
          ></Review>
        </Card>
      </Card>
    </>
  );
}

export default NACCAQARTwoSevenOne;
