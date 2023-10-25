import React from 'react';
import { Affix, Button, Card, Col, DatePicker, Form, Input, Row, Select, Upload, UploadProps, notification } from 'antd';
import { useParams } from 'react-router-dom';
import { When } from 'react-if';
import { useState } from 'react';

import * as modelAdmissionDetails from '@/models/admissions/studentRecords/AdmissionDetails';
import { useAdmissionDetails } from '@/store/admissions/useAdmissionDetails';
import { useBasicDetails } from '@/store/admissions/useBasicDetails';

import { schemaValidator } from '@/utils/validate';
import { useSettings } from '@/store/settings/useSettings';
import { isEmptyValue } from '@/utils/object';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { todoLookUps } from '@/store/todoLookUps';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { DisplaySelect } from '@/components/FormItem/DisplaySelect';
import { useGlobalState } from '@/store/global';
import { DisplayInput } from '@/components/FormItem/DisplayInput';
import { useProgramNomenclatureDetails } from '@/store/settings/useProgramNomenclatureDetails';

const classNameOptions = todoLookUps.getState().className;
const optionsReligions = todoLookUps.getState().religion;
const optionAdmissionCategory = todoLookUps.getState().admissionCategory;
const optionAdmissionProcess = todoLookUps.getState().admissionProcess;
const AdmissionDetails = () => {
  const { id } = useParams();

  const global = useGlobalState((state: any) => state.default);

  const settings = useSettings((state: any) => ({
    fetchSettings: state.fetchSettings,
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
  }));

  const storeAdmissionDetails = useAdmissionDetails((state: any) => ({
    getRecord: state.getRecords,
    current: state.current,
  }),
  );
  const storeBasicDetails = useBasicDetails((state: any) => ({
    getBasicRecord: state.getRecords,
    basicDetailsCurrentRecord: state.current,
  }),
  );
  const programId = storeBasicDetails.basicDetailsCurrentRecord.programId;
  const RegisterYear = storeBasicDetails.basicDetailsCurrentRecord.registrationYear;
  const storeProgramDetails = useProgramDetails((state: any) => ({
    getRecords: state.getRecords,
    optionsAllPrograms: state.optionsAllPrograms,
    allRecords: state.allRecords,
  }));
  const storeProgramnomenclatureDetails = useProgramNomenclatureDetails((state: any) => ({
    getNomenclature: state.getNomenclature,
    nomenClatureData: state.nomenclatureData,
  }));
  let nomenclatureName = 'PRN.No';
  if (!isEmptyValue(storeProgramnomenclatureDetails.nomenClatureData)) {
    nomenclatureName = storeProgramnomenclatureDetails.nomenClatureData[0].name;
  }
  React.useEffect(() => {
    settings.fetchSettings();
    storeAcademicYear.asOptions();
    storeProgramDetails.getRecords();
    storeProgramnomenclatureDetails.getNomenclature(programId, RegisterYear);
  }, []);

  const [saveProgress, setSaveProgress] = useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();

  React.useEffect(() => {
    storeAdmissionDetails.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeAdmissionDetails.current.id !== id) {
      form.setFieldsValue(storeBasicDetails.basicDetailsCurrentRecord);

      return;
    }
    form.setFieldsValue(storeAdmissionDetails.current);
    form.setFieldValue('className',storeBasicDetails.basicDetailsCurrentRecord.className);
    form.setFieldValue('className',storeBasicDetails.basicDetailsCurrentRecord.registrationYear);
    const caste = todoLookUps.getState().caste.find(obj => obj[storeAdmissionDetails.current.leavingReligion]);
    setOptionsCaste(caste[storeAdmissionDetails.current.leavingReligion]);
 
    const processby = optionAdmissionProcess.find(obj => obj.value === storeAdmissionDetails.current.admissionProcess)?.subprocess;
    setAdmissionProcessBy(todoLookUps.getState().admissionSubProcess.find(obj => obj.value === processby)?.label)
  }, [storeAdmissionDetails.current]);

  const optionsAcademicYear = React.useMemo(() => (storeAcademicYear.comboByName || []), [storeAcademicYear.comboByName]);

  const [optionsCaste, setOptionsCaste] = useState([{}]);
  const [admissionProcessBy, setAdmissionProcessBy] = useState();

  const onReligionChange = (event: any) => {
    const caste = todoLookUps.getState().caste.find(obj => obj[event]);
    setOptionsCaste(caste[event]);
  };
  const onAdmissionProcessChange = (event: any) => {
    const subprocess = optionAdmissionProcess.find(obj => obj.value === event);
    setAdmissionProcessBy(todoLookUps.getState().admissionSubProcess.find(obj => obj.value === subprocess?.subprocess)?.label);
  };
  const schemaRules = React.useMemo(() => schemaValidator(modelAdmissionDetails.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);


  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        const record = await storeAdmissionDetails.updateRecord(id, values);
        if (!isEmptyValue(record)) {
          notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.degreeName}` });
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  return (<div className='layout-main-content'>
    <Form form={form} layout="vertical">
      <Card
        bordered={false}
        actions={[
          <Affix offsetBottom={12}>
            <Form.Item>
                <Button type="primary" onClick={onFormSubmit}>Submit</Button>
            </Form.Item>
          </Affix>,
        ]}
      >
        <Row className="justify-center">
          <Col className="w-md">
            <Form.Item name="generalRegisterNumber" label="General Register No." rules={schemaRules} >
              <Input/>
            </Form.Item>
            <Form.Item name="prn" label={nomenclatureName} rules={schemaRules}>
              <Input />
            </Form.Item>
            <Form.Item name="className" label="Register In" rules={schemaRules} >
              <DisplaySelect options={classNameOptions} ></DisplaySelect>
            </Form.Item>
            <Form.Item name="registrationYear" label="Registration Year" rules={schemaRules} >
              <DisplaySelect options={optionsAcademicYear} />
            </Form.Item>
            <Form.Item name="dateOfRegistration" label="Date of Registration" rules={schemaRules}>
            <DatePicker className="w-100%" format={global.displayDateFormat} />
            </Form.Item>
            <Form.Item name="admissionCategory" label="Admission Category" rules={schemaRules} >
              <Select options={optionAdmissionCategory} />
            </Form.Item>
            <Form.Item name="admissionProcess" label="Admission Process" rules={schemaRules} >
              <Select options={optionAdmissionProcess} onChange={onAdmissionProcessChange} />
            </Form.Item>
            <Form.Item name="admissionProcessBy" label="Admission Process By" rules={schemaRules} >
             {admissionProcessBy}
            </Form.Item>
            <Form.Item name="leavingReligion" label="Religion as per the LC/TC" rules={schemaRules} required>
             <Select options={optionsReligions} onChange={onReligionChange} />
            </Form.Item>
            <Form.Item name="leavingCast" label="Caste as per the LC/TC" rules={schemaRules} required>
              <Select options={optionsCaste} />
            </Form.Item>
            <Form.Item name="leavingSubcast" label="Sub-Caste as per the LC/TC" rules={schemaRules}>
              <Input />
            </Form.Item>
            <Form.Item name="lastInstitute" label="Institute Last Attended" rules={schemaRules}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  </div>);
};

export default AdmissionDetails;
