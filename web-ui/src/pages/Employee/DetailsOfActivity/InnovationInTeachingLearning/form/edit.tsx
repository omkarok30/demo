import React from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, DatePicker, Radio, Row, Modal, Upload, Select, notification, Tabs, Descriptions, Tag } from 'antd';
import { When } from 'react-if';
import Meta from 'antd/lib/card/Meta';
import * as modelInnovationInTeachingLearning from '@/models/Employee/DetailsOfActivity/InnovationInTeachingLearning/InnovationInTeachingLearning';
import { useSettings } from '@/store/settings/useSettings';
import { useInnovationInTeachingLearningList } from '@/store/employee/DetailsOfActivity/InnovationInTeachingLearning/useInnovationInTeachingLearning';
import { UploadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';
const yesNo = todoLookUps.getState().yesNo;
const gender = todoLookUps.getState().gender;
const salutation = todoLookUps.getState().salutation;
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
const levelOfEducation = todoLookUps.getState().levelOfEducation;
const graduationYear = todoLookUps.getState().graduationYear;
const level = todoLookUps.getState().level;
const academicYear = todoLookUps.getState().academicYear;
const qualityPaper = todoLookUps.getState().qualityPaper;
const levelOfConference = todoLookUps.getState().levelOfConference;
import { UploadFileStatus } from 'antd/lib/upload/interface';
import MainHeader from '@/pages/Employee/MainHeader';
import _ from 'lodash';
export interface ActivityModalType {
  id: any;
  studentId: any;
  open: boolean;
  handleOk: Function;
  handleCancel: Function;
}
const InnovationInTeachingLearningEdit = ({
  id,
  studentId,
  open,
  handleOk,
  handleCancel,
}: ActivityModalType) => {
  const { empId } = useParams();
  const isNew = id === 'new';

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
  const schemaRules = React.useMemo(() => schemaValidator(modelInnovationInTeachingLearning.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
  };


  const storeInnovationInTeachingLearningList = useInnovationInTeachingLearningList(
    (state: any) => ({
      getRecord: state.getRecord,
      current: state.current,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
    }),
  );

  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();

  React.useEffect(() => {
    storeInnovationInTeachingLearningList.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  const storeEmployeeInfo = useEmployeeDetails((state: any) => ({
    getRecords: state.getRecords,
    optionsstudents: state.optionsstudents,
  }));
  React.useEffect(() => {
    if (storeInnovationInTeachingLearningList.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeInnovationInTeachingLearningList.current);
  }, [storeInnovationInTeachingLearningList.current]);

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
          const record = await storeInnovationInTeachingLearningList.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.technology}` });
          }
        }
        else {
          const record = await storeInnovationInTeachingLearningList.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.technology}` });
          }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  const headerLabel = isNew ? 'Add Innovation In Teaching And Learning' : 'Update Innovation In Teaching And Learning';

  const getFile = (e: UploadFileStatus) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    //  return e && e.fileList;
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
        <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
          <Row className="justify-center">
            <Col className='w-md'>
              <When condition={!isNew}>
                {() => (<>
                  <Form.Item name="year" label="Academic Year" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Select style={{ textTransform: 'uppercase' }}
                      placeholder="Select a option and change input text above"
                      allowClear
                      options={academicYear} />
                  </Form.Item>
                  <Form.Item name="title" label="Innovation Title" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <Form.Item name="description" label="Short Description" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <Form.Item name="uploadDocument" label="Upload Detailed Description" getValueFromEvent={getFile} rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Upload>
                      <Button icon={<UploadOutlined />}>Choose File</Button>
                    </Upload>
                  </Form.Item>
                </>)}
              </When>

              <When condition={isNew}>
                <Form.Item name="year" label="Academic Year" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Select style={{ textTransform: 'uppercase' }}
                    placeholder="Select a option and change input text above"
                    allowClear
                    options={academicYear} />
                </Form.Item>
                <Form.Item name="title" label="Innovation Title" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} />
                </Form.Item>
                <Form.Item name="description" label="Short Description" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} />
                </Form.Item>
                <Form.Item name="uploadDocument" label="Upload Detailed Description" getValueFromEvent={getFile} rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Upload>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </When>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>);
};

export default InnovationInTeachingLearningEdit;
