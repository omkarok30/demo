import React from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Select, DatePicker, Upload, Modal, Checkbox, notification, Descriptions, Radio } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmptyValue } from '@/utils/object';
import { ColumnsType } from 'antd/lib/table';
import * as modelAssessmentEvaluationModeration from '@/models/Employee/DetailsOfActivity/AssessmentEvaluationModerationDetails/AssessmentEvaluationModerationDetails';
import { useEmployeeAssessmentEvaluation } from '@/store/employee/DetailsOfActivity/AssessmentEvaluationModerationDetails/useEmployeeAssessmentEvaluation';
import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { UploadOutlined } from '@ant-design/icons';
import { todoLookUps } from '@/store/todoLookUps';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { UploadFileStatus } from 'antd/lib/upload/interface';
import { useGlobalState } from '@/store/global';
import { schemaValidator } from '@/utils/validate';
import MainHeader from '@/pages/Employee/MainHeader';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { When } from 'react-if';
const academicYear = todoLookUps.getState().academicYear;
const EvaluationType = todoLookUps.getState().EvaluationType;
const EvaluationLevelOfProgram = todoLookUps.getState().EvaluationLevelOfProgram;
const relevantPo = todoLookUps.getState().relevantPo

const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />
};
import _ from 'lodash';
export interface ActivityModalType {
  id: any;
  studentId: any;
  open: boolean;
  handleOk: Function;
  handleCancel: Function;
}
const EmployeeAssessmentEvaluationModerationForm = ({
  id,
  studentId,
  open,
  handleOk,
  handleCancel,
}: ActivityModalType) => {
  const { empId } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [isCurrentlyHoldingThisPosition, setIsCurrentlyHoldingThisPosition] = React.useState(true)
  const [isHODPosition, setisHODPosition] = React.useState(false)
  const schemaRules = React.useMemo(() => schemaValidator(modelAssessmentEvaluationModeration.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const global = useGlobalState((state: any) => state.default);

  const storeEmployeeAssessmentEvaluation = useEmployeeAssessmentEvaluation((state: any) => ({
    // allRecords: state.allRecords,
    // getRecords: state.getRecords,
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));

  const headerLabel = isNew ? 'Add Assessment/Evaluation/Moderation Details' : 'Edit Assessment/Evaluation/Moderation Details';


  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const optionsAcademicYear = storeAcademicYear.comboByName;

  React.useEffect(() => {
    storeEmployeeAssessmentEvaluation.getRecord(id);
    storeAcademicYear.getAcademicYearDetails();
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);


  React.useEffect(() => {
    if (storeEmployeeAssessmentEvaluation.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeEmployeeAssessmentEvaluation.current);
  }, [storeEmployeeAssessmentEvaluation.current]);

  const nvaigateToPreviousPage = () => {
    // navigate(`/employee/employee_assessment_evaluation_moderation/edit/${empId}`, { state: { activeTab: 'positions'} });
  }
  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      console.log(`checked = ${e.target.checked}`);
      setIsCurrentlyHoldingThisPosition(true)
    } else {
      setIsCurrentlyHoldingThisPosition(false)
      console.log(`checked = ${e.target.checked}`);

    }
  };
  const getFile = (e: UploadFileStatus) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    //  return e && e.fileList;
  };
  const onPositionChange = () => {
    console.log(form.getFieldValue('positionName'));
    if (form.getFieldValue('positionName') === 'ASSISTANT HEAD OF THE DEPARTMENT') {
      setisHODPosition(true)
    } else {
      setisHODPosition(false)

    }
  };

  const doCancel = () => {
    if (_.isFunction(handleCancel)) {
      handleCancel(studentId);
    }
  };

  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeEmployeeAssessmentEvaluation.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.firstName}` });
          }
        }
        else {
          const record = await storeEmployeeAssessmentEvaluation.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.firstName}` });
          }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  return (
    <div className='layout-main-content'>
      <Modal
        title={headerLabel}
        open={open}
        onOk={onFormSubmit}
        onCancel={doCancel}
        closable
        width={1000}
        centered
        style={{ marginTop: 20, marginBottom: 20 }}>
        <MainHeader />
        <Row className='justify-center'>
          <Col span={12}>
            <Form
              form={form}
              layout="vertical"
              autoComplete="off" >
              <When condition={!isNew}>
                {() => (<>
                  <Form.Item name="academicYear" label="Academic Year" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Select onChange={onPositionChange} options={optionsAcademicYear} />
                  </Form.Item>
                  <Form.Item name="type" label="Type" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Select onChange={onPositionChange} options={EvaluationType} />
                  </Form.Item>
                  <Form.Item name="levelOfProgram" label="Level of Program" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Select onChange={onPositionChange} options={EvaluationLevelOfProgram} />
                  </Form.Item>
                  <Form.Item name="courseName" label="Course Name" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="certificateDocument" label="Upload Document" getValueFromEvent={getFile} rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Upload>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </>)}
              </When>

              <When condition={isNew}>
                <Form.Item name="academicYear" label="Academic Year" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Select onChange={onPositionChange} options={optionsAcademicYear} />
                </Form.Item>
                <Form.Item name="type" label="Type" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Select onChange={onPositionChange} options={EvaluationType} />
                </Form.Item>
                <Form.Item name="levelOfProgram" label="Level of Program" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Select onChange={onPositionChange} options={EvaluationLevelOfProgram} />
                </Form.Item>
                <Form.Item name="courseName" label="Course Name" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input />
                </Form.Item>
                <Form.Item name="certificateDocument" label="Upload Document" getValueFromEvent={getFile} rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Upload>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </When>
            </Form>
          </Col>
        </Row>
      </Modal>
    </div >
  );
};

export default EmployeeAssessmentEvaluationModerationForm;
