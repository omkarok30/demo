import React, { useState } from 'react';
import {
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  notification,
} from 'antd';
import { useParams } from 'react-router-dom';
import { When } from 'react-if';

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
import AdmissionDetails from '@/pages/studentcenter/studentprofile/AddmisionDetails';
import EducationsDetails from '@/pages/studentcenter/studentprofile/Educationdetails/form';
import ContactDetails from '@/pages/studentcenter/studentprofile/contactDetails/form';
import { useProgramNomenclatureDetails } from '@/store/settings/useProgramNomenclatureDetails';

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

  const storeBasicDetails = useBasicDetails((state: any) => ({
    getRecord: state.getRecords,
    current: state.current,
  }));

  const storeProgramDetails = useProgramDetails((state: any) => ({
    getRecords: state.getRecords,
    optionsAllPrograms: state.optionsAllPrograms,
    allRecords: state.allRecords,
  }));
  const storeProgramnomenclatureDetails = useProgramNomenclatureDetails(
    (state: any) => ({
      getNomenclature: state.getNomenclature,
      nomenClatureData: state.nomenclatureData,
    }),
  );
  let nomenclatureName = 'PRN.No';
  if (!isEmptyValue(storeProgramnomenclatureDetails.nomenClatureData)) {
    nomenclatureName = storeProgramnomenclatureDetails.nomenClatureData[0].name;
  }

  React.useEffect(() => {
    settings.fetchSettings();
    storeProgramDetails.getRecords();
    // storeAcademicYear.asOptions();
  }, []);

  const [readOnly, setReadOnly] = useState(true);
  const [optionsCaste, setOptionsCaste] = useState([{}]);
  const [isFreezeModalOpen, setIsFreezeModalOpen] = React.useState(false);
  const [isUnFreezeModalOpen, setIsUnFreezeModalOpen] = React.useState(false);

  const [saveProgress, setSaveProgress] = useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  const [form] = Form.useForm();
  const { TextArea } = Input;

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
  }, [storeBasicDetails.current]);

  // React.useEffect(() => {
  //   storeAcademicYear.getAcademicYearDetails();
  // }, [storeAcademicYear.getAcademicYearDetails]);

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
      <Card bordered={false} title="Personal Details"></Card>
      <Form form={form} layout="vertical">
        <Card bordered={false}>
          <Row className="justify-center">
            <Col className="gutter-row" span={10}>
              <Form.Item
                name="enrolmentNumber"
                label={nomenclatureName}
                rules={schemaRules}
              >
                <Input readOnly={readOnly} />
              </Form.Item>
            </Col>
            <Divider type="vertical" />

            <Col className="gutter-row" span={10}>
              <Form.Item
                name="admissionProcess"
                label="Type of Admission"
                rules={schemaRules}
              >
                <Input readOnly={readOnly} />
              </Form.Item>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col className="gutter-row" span={10}>
              <Form.Item name="dateOfBirth" label="Date of Birth">
                <DatePicker
                  className="w-100%"
                  format={global.displayDateFormat}
                />
              </Form.Item>
            </Col>
            <Divider type="vertical" />

            <Col className="gutter-row" span={10}>
              <Form.Item
                name="fatherName"
                label="Father's Name"
                rules={schemaRules}
              >
                <Input readOnly={readOnly} />
              </Form.Item>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col className="gutter-row" span={10}>
              <Form.Item
                name="motherName"
                label="Mother's Name"
                rules={schemaRules}
              >
                <Input readOnly={readOnly} />
              </Form.Item>
            </Col>
            <Divider type="vertical" />

            <Col className="gutter-row" span={10}>
              <Form.Item name="gender" label="Gender" rules={schemaRules}>
                <Input readOnly={readOnly} />
              </Form.Item>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col className="gutter-row" span={10}>
              <Form.Item name="email" label="Student Email" rules={schemaRules}>
                <Input readOnly={readOnly} />
              </Form.Item>
            </Col>
            <Divider type="vertical" />

            <Col className="gutter-row" span={10}>
              <Form.Item
                name="mobileNo"
                label="Mobile Number"
                rules={schemaRules}
              >
                <Input readOnly={readOnly} />
              </Form.Item>
            </Col>
          </Row>

          <Divider type="vertical" />
          <Row className="justify-center">
            <Col className="gutter-row" span={10}>
              <Form.Item
                name="tenthSchoolName"
                label="10th School Name"
                rules={schemaRules}
              >
                <Input readOnly={readOnly} />
              </Form.Item>
            </Col>
            <Divider type="vertical" />

            <Col className="gutter-row" span={10}>
              <Form.Item
                name="address1"
                label="Permanent/Parent's Address Details"
                rules={schemaRules}
              >
                <TextArea rows={4} readOnly={readOnly} />
              </Form.Item>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col className="gutter-row" span={10}>
              <Form.Item
                name="identityImage"
                label="Identity Image"
                rules={schemaRules}
              >
                <Input readOnly={readOnly} />
              </Form.Item>
            </Col>
            <Divider type="vertical" />

            <Col className="gutter-row" span={10}>
              <Form.Item
                name="twelthSchoolName"
                label="12th School/College Name"
                rules={schemaRules}
              >
                <Input readOnly={readOnly} />
              </Form.Item>
            </Col>
          </Row>
          <Row className="justify-center">
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
                name="presentAddress1"
                label="Present Address Details"
                rules={schemaRules}
              >
                <TextArea rows={4} readOnly={readOnly} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
      <AdmissionDetails />
      <EducationsDetails />
      <ContactDetails />
    </div>
  );
};

export default BasicDetails;
