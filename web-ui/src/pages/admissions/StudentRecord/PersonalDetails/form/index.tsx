import React, { useState } from 'react';
import {
  Affix,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  notification,
} from 'antd';
import { useParams } from 'react-router-dom';
import { When } from 'react-if';

import moment from 'moment';
import * as modelStudentInfo from '@/models/admissions/studentRecords/StudentInfo';
import { useBasicDetails } from '@/store/admissions/useBasicDetails';
import { schemaValidator } from '@/utils/validate';
import { useSettings } from '@/store/settings/useSettings';
import { isEmptyValue } from '@/utils/object';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { todoLookUps } from '@/store/todoLookUps';
// import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { DisplaySelect } from '@/components/FormItem/DisplaySelect';
import { useGlobalState } from '@/store/global';

const optionsYesNo = todoLookUps.getState().yesNo;
const optionsBloodGroup = todoLookUps.getState().bloodGroup;
const optionsReligions = todoLookUps.getState().religion;
const optionsMaritalStatus = todoLookUps.getState().maritalStatus;
const optionsMotherTongue = todoLookUps.getState().motherTongue;

const BasicDetails = () => {
  const { id } = useParams();

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({
    fetchSettings: state.fetchSettings,
    byKeys: state.byKeys,
  }));

  // const storeAcademicYear = useAcademicYear(
  //   (state: any) => ({
  //     getAcademicYearDetails: state.getAcademicYearDetails,
  //     asOptions: state.asOptions,
  //     comboByYear: state.comboByYear,
  //   }),
  // );

  const storeBasicDetails = useBasicDetails((state: any) => ({
    getRecord: state.getRecords,
    current: state.current,
  }));

  const storeProgramDetails = useProgramDetails((state: any) => ({
    getRecords: state.getRecords,
    optionsAllPrograms: state.optionsAllPrograms,
    allRecords: state.allRecords,
  }));

  React.useEffect(() => {
    settings.fetchSettings();
    storeProgramDetails.getRecords();
    // storeAcademicYear.asOptions();
  }, []);

  const [readOnly, setReadOnly] = useState(true);
  const [isSubmitButton, setIsSubmitButton] = useState(false);
  const [isUpdateButton, setIsUpdateButton] = useState(true);
  const [freezePersonalInfo, setFreezePersonalInfo] = useState(false);
  const [optionsCaste, setOptionsCaste] = useState([{}]);
  const [isFreezeModalOpen, setIsFreezeModalOpen] = React.useState(false);
  const [isUnFreezeModalOpen, setIsUnFreezeModalOpen] = React.useState(false);

  const [saveProgress, setSaveProgress] = useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  const [form] = Form.useForm();

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelStudentInfo.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  React.useEffect(() => {
    storeBasicDetails.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeBasicDetails.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeBasicDetails.current);
    if (storeBasicDetails.current.freezePersonalInfo === 'no') {
      setFreezePersonalInfo(false);
    }
    else {
      setFreezePersonalInfo(true);
    }
  }, [storeBasicDetails.current]);

  // React.useEffect(() => {
  //   storeAcademicYear.getAcademicYearDetails();
  // }, [storeAcademicYear.getAcademicYearDetails]);

  const disableFutureDates = (current) => {
    return current && current > moment().endOf('day');
  };
  const onReligionChange = (event: any) => {
    const caste = todoLookUps.getState().caste.find(obj => obj[event]);
    setOptionsCaste(caste[event]);
  };

  const openUnFreezeModal = () => {
    setIsUnFreezeModalOpen(true);
  };
  const openFreezeModel = () => {
    setIsFreezeModalOpen(true);
  };

  const handleOk = () => {
    setIsFreezeModalOpen(false);
  };

  const handleCancel = () => {
    setIsFreezeModalOpen(false);
  };
  const showButtons = (buttonname: any) => {
    if (buttonname === 'cancel') {
      setIsUpdateButton(true);
      setIsSubmitButton(false);
      setReadOnly(true);
    }
    if (buttonname === 'update') {
      setReadOnly(false);
      setIsSubmitButton(true);
      setIsUpdateButton(false);
    }
  };

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        const record = await storeBasicDetails.updateRecord(id, values);
        if (!isEmptyValue(record)) {
          notification.success({
            message: 'Saved Successfully!',
            description: `Updated record for ${record.degreeName}`,
          });
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

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical">
        <Card
          bordered={false}
          actions={[
            <Affix offsetBottom={12}>
              <Form.Item>
                <When condition={isSubmitButton}>
                  <Button type="primary" onClick={onFormSubmit}>
                    Submit
                  </Button>
                  <Button
                    type="default"
                    onClick={() => {
                      showButtons('cancel');
                    }}
                  >
                    Cancel
                  </Button>
                </When>

                <When condition={isUpdateButton}>
                  <When condition={freezePersonalInfo}>
                    <Button type="primary" onClick={openUnFreezeModal}>
                      UnFreeze
                    </Button>
                  </When>
                  <When condition={!freezePersonalInfo}>
                    <Button type="primary" onClick={openFreezeModel}>
                      Freeze
                    </Button>
                  </When>
                  <Button
                    type="primary"
                    onClick={() => {
                      showButtons('update');
                    }}
                  >
                    Update
                  </Button>
                </When>
              </Form.Item>
            </Affix>,
          ]}
        >
          <Row className="justify-center">
            <Col className="gutter-row" span={10}>
              <Form.Item name="dateOfBirth" label="Date of Birth" rules={schemaRules}>
                <DatePicker
                  className="w-100%"
                  format={global.displayDateFormat}
                  disabled={readOnly}
                  disabledDate={current => disableFutureDates(current)}
                />
              </Form.Item>
            </Col>
            <Divider type="vertical" />
            <Col className="gutter-row" span={10}>
              <Form.Item
                name="birthPlace"
                label="Place of Birth"
                rules={schemaRules}
              >
                <Input readOnly={readOnly} />
              </Form.Item>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col className="gutter-row" span={10}>
              <Form.Item
                name="fatherName"
                label="Father's Name"
                rules={schemaRules}
              >
                <Input readOnly={readOnly} />
              </Form.Item>
            </Col>
            <Divider type="vertical" />
            <Col className="gutter-row" span={10}>
              <Form.Item
                name="motherName"
                label="Mother's Name"
                rules={schemaRules}
              >
                <Input readOnly={readOnly} />
              </Form.Item>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col className="gutter-row" span={10}>
              <Form.Item
                name="grandfatherName"
                label="Grandfather's Name"
                rules={schemaRules}
              >
                <Input readOnly={readOnly} />
              </Form.Item>
            </Col>
            <Divider type="vertical" />
            <Col className="gutter-row" span={10}>
              <Form.Item
                name="bloodGroup"
                label="Blood Group"
                rules={schemaRules}
                required
              >
                <When condition={readOnly}>
                  <DisplaySelect
                    options={optionsBloodGroup}
                    value={storeBasicDetails.current.bloodGroup}
                  />
                </When>
                <When condition={!readOnly}>
                  <Select
                    options={optionsBloodGroup}
                    value={storeBasicDetails.current.bloodGroup}
                  />
                </When>
              </Form.Item>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col className="gutter-row" span={10}>
              <Form.Item
                name="maritalStatus"
                label="Marital Status"
                rules={schemaRules}
                required
              >
                <When condition={readOnly}>
                  <DisplaySelect
                    options={optionsMaritalStatus}
                    value={storeBasicDetails.current.maritalStatus}
                  />
                </When>
                <When condition={!readOnly}>
                  <Select
                    options={optionsMaritalStatus}
                    value={storeBasicDetails.current.maritalStatus}
                  />
                </When>
              </Form.Item>
            </Col>
            <Divider type="vertical" />
            <Col className="gutter-row" span={10}>
              <Form.Item
                name="leavingNationality"
                label="Nationality"
                rules={schemaRules}
              >
                <Input readOnly={readOnly} type="email" />
              </Form.Item>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col className="gutter-row" span={10}>
              <Form.Item
                name="motherTongue"
                label="Mother Tongue"
                rules={schemaRules}
                required
              >
                <When condition={readOnly}>
                  <DisplaySelect
                    options={optionsMotherTongue}
                    value={storeBasicDetails.current.motherTongue}
                  />
                </When>
                <When condition={!readOnly}>
                  <Select
                    options={optionsMotherTongue}
                    value={storeBasicDetails.current.motherTongue}
                  />
                </When>
              </Form.Item>
            </Col>
            <Divider type="vertical" />
            <Col className="gutter-row" span={10}>
              <Form.Item
                name="religion"
                label="Religion"
                rules={schemaRules}
                required
              >
                <When condition={readOnly}>
                  <DisplaySelect
                    options={optionsReligions}
                    value={storeBasicDetails.current.religion}
                  />
                </When>
                <When condition={!readOnly}>
                  <Select
                    options={optionsReligions}
                    value={storeBasicDetails.current.religion}
                    onChange={onReligionChange}
                  />
                </When>
              </Form.Item>
            </Col>
            </Row>

            <Row className="justify-center">
            <Col className="gutter-row" span={10}>
                <Form.Item
                  name="cast"
                  label="Caste"
                  rules={schemaRules}
                  required
                >
                  <When condition={readOnly}>
                    <DisplaySelect
                      options={optionsCaste}
                      value={storeBasicDetails.current.cast}
                    />
                  </When>
                  <When condition={!readOnly}>
                    <Select
                      options={optionsCaste}
                      value={storeBasicDetails.current.cast}
                    />
                  </When>
                </Form.Item>
              </Col>

              <Divider type="vertical" />
              <Col className="gutter-row" span={10}>
                <Form.Item name="subcast" label="Sub-Caste" rules={schemaRules}>
                  <Input readOnly={readOnly} />
                </Form.Item>
              </Col>
            </Row>

            <Row className="justify-center">
            <Col className="gutter-row" span={10}>
                <Form.Item
                  name="aadhar"
                  label="Aadhaar (UID) No"
                  rules={schemaRules}
                >
                  <Input readOnly={readOnly} type="email" />
                </Form.Item>
              </Col>

              <Divider type="vertical" />
              <Col className="gutter-row" span={10}>
                <Form.Item
                  name="isStudentNri"
                  label="Foreign Student?"
                  rules={schemaRules}
                  required
                >
                  <When condition={readOnly}>
                    <DisplaySelect
                      options={optionsYesNo}
                      value={storeBasicDetails.current.isStudentNri}
                    />
                  </When>
                  <When condition={!readOnly}>
                    <Select
                      options={optionsYesNo}
                      value={storeBasicDetails.current.isStudentNri}
                    />
                  </When>
                </Form.Item>
              </Col>
            </Row>

            <Row className="justify-center">
              <Col className="gutter-row" span={10}>
                <Form.Item
                  name="guardianName"
                  label="Guardian's Name"
                  rules={schemaRules}
                >
                  <Input readOnly={readOnly} />
                </Form.Item>
              </Col>
              <Divider type="vertical" />
              <Col className="gutter-row" span={10}>
                <Form.Item name="guardianDob" label="Guardian's Date of Birth" rules={schemaRules} >
                  <DatePicker
                    className="w-100%"
                    format={global.displayDateFormat}
                    disabled={readOnly}
                    disabledDate={current => disableFutureDates(current)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row className="justify-center">
              <Col className="gutter-row" span={10}>
                <Form.Item
                  name="relationToStudent"
                  label="Relation to Student"
                  rules={schemaRules}
                >
                  <Input readOnly={readOnly} />
                </Form.Item>
              </Col>
              <Divider type="vertical" />

              <Col className="gutter-row" span={10}>
                <Form.Item
                  name="responsiblePerson"
                  label="Responsible Person's Name"
                  rules={schemaRules}
                >
                  <Input readOnly={readOnly} />
                </Form.Item>
              </Col>
            </Row>
            <Row className="justify-center">
              <Col className="gutter-row" span={10}>
                <Form.Item
                  name="isHandicap"
                  label="Physically Handicapped"
                  rules={schemaRules}
                >
                  <When condition={readOnly}>
                    <DisplaySelect
                      options={optionsYesNo}
                      value={storeBasicDetails.current.isHandicap}
                    />
                  </When>
                  <When condition={!readOnly}>
                    <Select
                      options={optionsYesNo}
                      value={storeBasicDetails.current.isHandicap}
                    />
                  </When>
                </Form.Item>
              </Col>
              <Divider type="vertical" />

              <Col className="gutter-row" span={10}>
                <Form.Item
                  name="generalExcludingMinority"
                  label="General Excluding Minority"
                  rules={schemaRules}
                >
                  <When condition={readOnly}>
                    <DisplaySelect
                      options={optionsYesNo}
                      value={storeBasicDetails.current.generalExcludingMinority}
                    />
                  </When>
                  <When condition={!readOnly}>
                    <Select
                      options={optionsYesNo}
                      value={storeBasicDetails.current.generalExcludingMinority}
                    />
                  </When>
                </Form.Item>
              </Col>
            </Row>
            <Row className="justify-center">
            <Col className="gutter-row" span={10}>
              <Form.Item name="pioGender" label="PIO" rules={schemaRules}>
                <When condition={readOnly}>
                  <DisplaySelect
                    options={optionsYesNo}
                    value={storeBasicDetails.current.pioGender}
                  />
                </When>
                <When condition={!readOnly}>
                  <Select
                    options={optionsYesNo}
                    value={storeBasicDetails.current.pioGender}
                  />
                </When>
              </Form.Item>
            </Col>

            <Col className="gutter-row" span={10}>

            </Col>
          </Row>
        </Card>
      </Form>

      <Modal
        title="Freeze Personal details"
        open={isFreezeModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          "Once the record of the this student is freezed, the process cannot be
          reversed."
        </p>
        <p>
          <Checkbox>
            {' '}
            I confirm to freeze the record of the this student.
          </Checkbox>
        </p>
      </Modal>

      <Modal
        title="UnFreeze Personal details"
        open={isUnFreezeModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          <Checkbox>
            {' '}
            I confirm to unfreeze the record of the this student.
          </Checkbox>
        </p>
      </Modal>
    </div>
  );
};

export default BasicDetails;
