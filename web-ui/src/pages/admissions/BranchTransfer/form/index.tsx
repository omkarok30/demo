import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
  notification,
} from 'antd';
import { When } from 'react-if';
import { UploadOutlined } from '@ant-design/icons';
import * as modelBranchTransfer from '@/models/admissions/BranchTransfer';
import { useBranchTransfer } from '@/store/admissions/BranchTransfer/useBranchTransfer';
import { useSettings } from '@/store/settings/useSettings';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { todoLookUps } from '@/store/todoLookUps';
import { DisplaySelect } from '@/components/FormItem/DisplaySelect';
import { useProgramDetails } from '@/store/settings/useProgramDetails';

const classNameOptions = todoLookUps.getState().className;

const BranchTransferEdit = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const isNew = id === 'new';
  const { isNewTransfer } = state;
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const { getAcademicYearDetails } = useAcademicYear((state: any) => ({
    allAcademicYearDetails: state.allRecords,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const schemaRules = useMemo(
    () =>
      schemaValidator(modelBranchTransfer.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const storeBranchTransfer = useBranchTransfer((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
    getStudents: state.getStudents,
    students: state.students,
    getStudentDetails: state.getStudentDetails,
    studentDetail: state.studentDetail,
    programs: state.programs,
    getPrograms: state.getPrograms,
    getNewStudentCode: state.getNewStudentCode,
    studId: state.studId,
  }));

  const storeProgramDetails = useProgramDetails((state: any) => ({
    getRecords: state.getRecords,
    optionsAllPrograms: state.optionsAllPrograms,
    allRecords: state.allRecords,

  }));

  const [saveProgress, setSaveProgress] = useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });

  useEffect(() => {
    storeBranchTransfer.getRecord(id);
    storeProgramDetails.getRecords();

    storeBranchTransfer.getStudentDetails(id);
    form.setFieldsValue(storeBranchTransfer.studentDetail);

    return () => {
      form.setFieldsValue({});
    };
  }, [id]);
  const [programsoptions, setProgramOptions] = React.useState([{}]);

  useEffect(() => {
    /* if (storeBranchTransfer.current.studentId !== id) {
      return;
    } */

    form.setFieldsValue(storeBranchTransfer.current);
    form.setFieldsValue(storeBranchTransfer.current);
    form.setFieldValue('oldStudentCode', storeBranchTransfer.studentDetail?.scholarNumber);
    form.setFieldValue('oldProgramName', storeBranchTransfer.studentDetail?.programId);
    form.setFieldValue('className', storeBranchTransfer.studentDetail?.className);
    const optionsPrograms = storeProgramDetails.optionsAllPrograms?.filter((item: any) => item.value !== storeBranchTransfer.studentDetail?.programId);
    setProgramOptions(optionsPrograms);
    form.setFieldValue('studentName', `${storeBranchTransfer.studentDetail?.firstName} ${storeBranchTransfer.studentDetail?.middleName} ${storeBranchTransfer.studentDetail?.lastName}`);
  }, [storeBranchTransfer.current]);

  useEffect(() => {
    getAcademicYearDetails();
    storeBranchTransfer.getPrograms();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      preStudCode: storeBranchTransfer?.studentDetail?.scholarNumber,
      preProgramId: storeBranchTransfer?.studentDetail?.programId,
      classId: storeBranchTransfer?.studentDetail?.class_name,
    });
  }, [storeBranchTransfer?.studentDetail]);

  useEffect(() => {
    form.setFieldsValue({
      studId: storeBranchTransfer?.studId,
    });
  }, [storeBranchTransfer?.studId]);

  const getNewStudentCode = (programId: any) => {
    const prevStudId = storeBranchTransfer?.studentDetail?.preStudCode;
    if (programId && prevStudId) {
      storeBranchTransfer.getNewStudentCode(programId, prevStudId);
    }
  };

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeBranchTransfer.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: 'Branch transfered successfully',
            });
          }
        }
        else {
          values.id = id;
          const record = await storeBranchTransfer.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: 'Branch updated successfully ',
            });
          }
        }
        setSaveProgress({
          saving: false,
          disableSubmit: true,
          disableForm: true,
        });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({
          saving: false,
          disableSubmit: false,
          disableForm: false,
        });
      });
  };
  const goBack = () => {
    navigate('../list');
  };

  const headerLabel = isNewTransfer ? 'Apply Branch Transfer' : 'Branch Transfer';

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
        <Card
          bordered={false}
          title={headerLabel}
          actions={[,
          ]}
        >
          <Row className="justify-center">
            <Col className="w-md">
              <>
                <Form.Item
                  name="registrationYear"
                  label="Admission Year"
                  required={true}
                >
                  <Input readOnly={true} />
                </Form.Item>
                <Form.Item
                  name="studentName"
                  label="Student Name"
                  required={true}
                >
                  <Input readOnly={true} />
                </Form.Item>
                <Form.Item
                  name="oldStudentCode"
                  label="Current Student Code"
                  required={true}
                >
                  <Input readOnly={true} />
                </Form.Item>
                <Form.Item
                  name="oldProgramName"
                  label="Current Program"
                  required={true}
                >
                  <DisplaySelect options={storeProgramDetails.optionsAllPrograms}></DisplaySelect>
                </Form.Item>
                <When condition={isNewTransfer}>
                  <Form.Item name="className" label="Class">
                    <DisplaySelect options={classNameOptions} ></DisplaySelect>
                  </Form.Item>

                  <Form.Item
                    name="programName"
                    label="New Program"
                    rules={schemaRules}
                    required
                  >
                    <Select
                      options={programsoptions}
                      onChange={value => getNewStudentCode(value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="studentId"
                    label="New Student Code"
                    rules={schemaRules}
                    required
                  >
                    <Input readOnly={true} />
                  </Form.Item>
                </When>
                <Form.Item
                  name="transferDate"
                  label="Date of Branch Transfer"
                  rules={schemaRules}
                  required={true}
                >
                  <DatePicker
                    className="w-100%"
                    format={global.displayDateFormat}
                  />
                </Form.Item>
                <Form.Item name="path" label="Upload Approved Application">
                  <Upload name="path">
                    <Button icon={<UploadOutlined />}>Choose Files</Button>
                  </Upload>
                </Form.Item>
                <When condition={isNewTransfer}>
                  <span>
                    Once the branch transfer process is completed, it cannot be
                    reversed.
                  </span>
                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(new Error('required')),
                      },
                    ]}
                  >
                    <Checkbox>I confirm to add the above record.</Checkbox>
                  </Form.Item>
                </When>

              </>
            </Col>
          </Row>
          <Row className="justify-center">
            <Space size={'small'}>
          <Form.Item>
                <Button type="primary" onClick={onFormSubmit} style={{ marginRight: '10px' }}>
                  Submit
                </Button>

                <Button type="default" onClick={goBack}>
                  Back
                </Button>
              </Form.Item>
              </Space>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default BranchTransferEdit;
