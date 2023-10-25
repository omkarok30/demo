import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Typography } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';

import React from 'react';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { When } from 'react-if';
import { useCOTargets } from '@/store/Academics/courseManagement/coTargets/useCOTargets';
import * as modelCoTargets from '@/models/Academics/coTargets/coTarget';
import AcademicsBasicDetails from '@/components/AcademicsBasicDetails';
import CoRelation from '@/components/CoRelation';
import { isEmptyValue } from '@/utils/object';
import { useSettings } from '@/store/settings/useSettings';
import { todoLookUps } from '@/store/todoLookUps';

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

const EditCOTargets = () => {
  const { year, program, className, semester, division, courseId, id } = useParams();
  const targetOptions = todoLookUps.getState().targetOptions;
  const [form] = Form.useForm();
  const [addition, setaddition] = React.useState([{ cocode: '', index: '', value: '' }]);

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
  const [internalAddition, setInternalAddition] = React.useState([]);

  React.useEffect(() => {
    storeCOTargets.getCORecord(1);
    storeCOTargets.getInternalRecords();
    setexternalweight(storeCOTargets.externalWeight);
    seInternalweight(storeCOTargets.internalWeight);

    const recordary = [];

    _.forEach(storeCOTargets.coursecos, (item, key) => {
      const rec = {};
      _.forEach(storeCOTargets.internalData, (covalue, key1) => {
        if (item.coCode === covalue[item.coCode]) {
          rec.cocode = item.coCode;
          rec.index = covalue;
          rec.value = covalue[item.coCode];
          recordary.push(rec);
        }
      });
    });
  }, [settings]);

  const handleSum = (event, cocode) => {
    // const a = document.querySelector('input[className=internalvalue${cocode}]`).value;

    const lengthofrecord = storeCOTargets.internalData.length;

    for (let i = 0; i < lengthofrecord; i++) {
      _.forEach(storeCOTargets.coursecos, (value, key) => {
        const cocode = value.coCode;

        const courseMethod = form.getFieldValue('abc');
        console.log(courseMethod);
        let creadits: any = 0;
        let hoursPerWeek: any = 0;
        courseMethod.forEach((element) => {
          if (element.creadits) {
            creadits += parseInt(element.creadits);
          }
          if (element.hoursPerWeek) {
            hoursPerWeek += parseInt(element.hoursPerWeek);
          }
        });
        const input1 = document.getElementById(
          `internalValue${cocode}${i}`,
        ) as HTMLInputElement | null;
      });
    }
  };

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelCoTargets.internalexternalCols(settings);
    const datalength = storeCOTargets.internalData.length - 1;
    const aryofvalues = [];
    _.forEach(storeCOTargets.coursecos, (value, key) => {
      const cocode = value.coCode;
      cols.push({
        title: `${value.coCode}`,
        dataIndex: `${value.coCode}`,
        render: (value, row, index) => {
          if (index === datalength) {
            return (<Input type="text" defaultValue={value} style={{ width: '50%' }}>

             </Input>);
          }
          else {
            return (<><Select options={targetOptions} id={`internalValue${value.coCode}${index}`} defaultValue={value} onChange={event => handleSum(event, value)} style={{ width: '50%' }}>

              </Select></>);
          }
        },
      });
    });

    return cols;
  }, [settings]);
  const navigate = useNavigate();

  const navigateToUpdate = () => {
    navigate(`../edit/${year}/${program}/${className}/${semester}/${division}`);
  };
  const backtopage = () => {
    navigate(`../view/${year}/${program}/${className}/${semester}/${division}/${courseId}/${id}`);
  };

  const title = `${storeCOTargets.courseName} CO Targets`;
  const calculateExternalWeight = (event) => {
    const extweight = parseInt(100) - parseInt(event);
    setexternalweight(extweight);
  };
  console.log(storeCOTargets.internalData);
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
<Form form={form} layout="vertical">

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

<Row justify={'center'}>
<Button type="primary" onClick={navigateToUpdate} style={{ borderRadius: '5px', alignContent: 'center' }}>
             Submit
            </Button>
            <Button type="default" onClick={backtopage} style={{ borderRadius: '5px', alignContent: 'center' }}>
             Back
            </Button>

</Row>
</Form>

      </Card>
    </div>
  );
};

export default EditCOTargets;
