import { Button, Card, Col, InputNumber, Row, Typography } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';

import React from 'react';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { When } from 'react-if';
import { ColumnType } from 'antd/lib/list';
import { useCOTargets } from '@/store/Academics/courseManagement/coTargets/useCOTargets';
import * as modelCoTargets from '@/models/Academics/coTargets/coTarget';
import AcademicsBasicDetails from '@/components/AcademicsBasicDetails';
import CoRelation from '@/components/CoRelation';
import { isEmptyValue } from '@/utils/object';
import { useSettings } from '@/store/settings/useSettings';

const { Title } = Typography;

interface ICOTargetData {
  id: number;
  coTargetId: number;
  coCode: string;
  toolId: string;
  coValue: number;
  tools_repository$toolName: string;
  tools_repository$toolType: string;
}

const ViewCOTargets = () => {
  const { year, program, className, semester, division, id, courseId } = useParams();

  const storeCOTargets = useCOTargets(
    (state: any) => ({
      getInternalRecords: state.getInternalRecords,
      internalColumns: state.internacols,
      internalData: state.internalData,
      externalData: state.externalData,
      courseName: state.courseName,
      getCORecord: state.getCORecord,
      coursecos: state.coursecos,
      overallTarget: state.overallTarget,
      internalWeight: state.internalWeight,
      externalWeight: state.externalWeight,
    }),
  );

  // useEffect(() => {
  //   console.log("internalCOTarget: ", internalCOTarget);
  // }, [internalCOTarget]);

  const settings = useSettings((state: any) => state.byKeys);

  const affiliationType = settings.get('affiliation_type');

  const [externalweight, setexternalweight] = React.useState(0);
  const [internalweight, seInternalweight] = React.useState(0);

  React.useEffect(() => {
    storeCOTargets.getCORecord(1);
    storeCOTargets.getInternalRecords();
    setexternalweight(storeCOTargets.externalWeight);
    seInternalweight(storeCOTargets.internalWeight);
  }, [settings]);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelCoTargets.internalexternalCols(settings);
    _.forEach(storeCOTargets.coursecos, (value, key) => {
      cols.push({
        title: `${value.coCode}`,
        dataIndex: `${value.coCode}`,
      });
    });

    return cols;
  }, [program]);
  const overallColumns: ColumnType<any> = React.useMemo(() => {
    const cols = modelCoTargets.overallTargetColumns(settings);
    _.forEach(storeCOTargets.coursecos, (value, key) => {
      cols.push({
        title: `${value.coCode}`,
        dataIndex: `${value.coCode}`,
      });
    });

    return cols;
  }, [program]);
  const navigate = useNavigate();

  const navigateToUpdate = () => {
    navigate(`../edit/${year}/${program}/${className}/${semester}/${division}/${courseId}/${id}`);
  };
  const backtopage = () => {
    navigate('../list');
  };

  const title = `${storeCOTargets.courseName} CO Targets`;
  const calculateExternalWeight = (event) => {
    const extweight = parseInt(100) - parseInt(event);
    setexternalweight(extweight);
  };
  return (
    <div className="layout-main-content">
      <Card bordered={false} title={title}>
        <AcademicsBasicDetails year={year}
        program={program}
        className={className}
        semester={semester}
        division={division}
 ></AcademicsBasicDetails>
 <CoRelation></CoRelation>
 {/*
<When condition={affiliationType!=="Tier II"}>
<Title level={5}>Semester End Examination Tool Information</Title>
        <Table
          columns={columns}
          dataSource={storeCOTargets.externalData}
        />
        <Row style={{ marginBottom: 20 }}>
          <Col span={3}>Semester End Examination Tool Weightage
</Col>
          <Col span={3}>
            <When condition={isEmptyValue(storeCOTargets.internalData)}>
            <InputNumber min={0} max={100} value={100} readOnly />
            </When>
            <When condition={!isEmptyValue(storeCOTargets.internalData)}>
            <InputNumber min={0} max={100} value={storeCOTargets.externalWeight} onChange={event => calculateExternalWeight(event)} />
            </When>
          </Col>
        </Row>
        <Title level={5}>Cumulative Internal Examinations Assessment Information
</Title>
        <Table
          columns={columns}
          dataSource={storeCOTargets.internalData}
        />
        <Row style={{ marginBottom: 20 }}>
          <Col span={3}>Cumulative Internal Examinations Assessment Weightage (%)
</Col>
          <Col span={3}>
            <When condition={isEmptyValue(storeCOTargets.externalData)}>
            <InputNumber min={0} max={100} value={100} readOnly />
            </When>
            <When condition={!isEmptyValue(storeCOTargets.externalData)}>
            <InputNumber min={0} max={100} value={internalweight} readOnly />
            </When>
          </Col>
        </Row>
</When>
*/}
{/* <When condition={affiliationType==="Tier II"}> */}
<Title level={5}>Internal Tool Information</Title>
        <Table
          columns={columns}
          dataSource={storeCOTargets.internalData}
        />
        <Row style={{ marginBottom: 20 }}>
          <Col span={3}>Internal Tool Weightage *</Col>
          <Col span={3}>
            <When condition={isEmptyValue(storeCOTargets.externalData)}>
            <InputNumber min={0} max={100} value={100} readOnly />
            </When>
            <When condition={!isEmptyValue(storeCOTargets.externalData)}>
            <InputNumber min={0} max={100} value={storeCOTargets.internalWeight} onChange={event => calculateExternalWeight(event)} />
            </When>
          </Col>
        </Row>
        <Title level={5}>External Tool Information</Title>
        <Table
          columns={columns}
          dataSource={storeCOTargets.externalData}
        />
        {/* <Table columns={externalCols} /> */}
        <Row style={{ marginBottom: 20 }}>
          <Col span={3}>External Tool Weightage *</Col>
          <Col span={3}>
            <When condition={isEmptyValue(storeCOTargets.internalData)}>
            <InputNumber min={0} max={100} value={100} readOnly />
            </When>
            <When condition={!isEmptyValue(storeCOTargets.internalData)}>
            <InputNumber min={0} max={100} value={externalweight} readOnly />
            </When>
          </Col>
        </Row>
{/* </When> */}

        <Title level={5}>Overall CO Targets</Title>
        { <Table columns={overallColumns} dataSource={storeCOTargets.overallTarget} /> }
<Row justify={'center'}>
<Button type="primary" onClick={navigateToUpdate} style={{ borderRadius: '5px', alignContent: 'center' }}>
             Update
            </Button>
            <Button type="default" onClick={backtopage} style={{ borderRadius: '5px', alignContent: 'center' }}>
             Back
            </Button>

</Row>

      </Card>
    </div>
  );
};

export default ViewCOTargets;
