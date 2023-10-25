import React from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, Radio, Row, Select, notification } from 'antd';
import { When } from 'react-if';

import * as modelProgramDetails from '@/models/settings/ProgramDetails';
import { useSettings } from '@/store/settings/useSettings';
import { useBankDetails } from '@/store/settings/useBankDetails';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';
import { useProgramDetails } from '@/store/settings/useProgramDetails';

// TODO: move to lookups store on merging program details
const examinationPattern = [
  { value: 'Annaul', label: 'Annaul' },
  { value: 'Semester', label: 'Semester' },
  { value: 'Trimester', label: 'Trimester' },
];
const departmentOptions = [
  { value: 'Civil Engneering', label: 'Civil Engneering' },
  { value: 'Computer Engneering', label: 'Computer Engneering' },
];
const facultyOfStudy = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Pharmacy', label: 'Pharmacy' },
];
const LevelOfEducation = [
  { value: 'Diploma', label: 'Diploma' },
  { value: 'UG', label: 'UG' },
];
const affiliationType = [
  { value: 'TEIR II', label: 'TEIR II' }
];
const program = [
  { value: 'Diploma in Civil Engineering', label: 'Diploma in Civil Engineering' },
  { value: 'Diploma in Computer Engineering', label: 'Diploma in Computer Engineering' },
];
const programDurations = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
];
const yes_no_options = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' }
];
const commencementYears = [
  { value: '2022-23', label: '2022-23' },
  { value: '2021-22', label: '2021-22' },
  { value: '2020-21', label: '2020-21' },
];

const yesNo = todoLookUps.getState().yesNo;

const AllProgramEdit = () => {
  const { id } = useParams();
  const isNew = id !== 'new';

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
  const schemaRules = React.useMemo(() => schemaValidator(modelProgramDetails.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const storeProgramDetails = useProgramDetails(
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
    storeProgramDetails.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeProgramDetails.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeProgramDetails.current);
  }, [storeProgramDetails.current]);

  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeProgramDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.bankName}` });
          }
        }
        else {
          const record = await storeProgramDetails.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.bankName}` });
          }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };


  const headerLabel = isNew ? 'Add program' : 'Edit Program';

  return (<div className='layout-main-content'>
    <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
      <Card
        bordered={false}
        title={headerLabel}
        actions={[
          <Affix offsetBottom={12}>
            <Form.Item>
              <Button type="primary" onClick={onFormSubmit} disabled={saveProgress.disableSubmit} loading={saveProgress.saving}>
                Submit
              </Button>
            </Form.Item>
          </Affix>,
        ]}
      >
        <Row className="justify-center">
          <Col className='w-md'>
            <When condition={!isNew}>
              {() => (<>
              </>)}
            </When>

            <When condition={isNew}>
              <Form.Item name="levelOfEducation" label="Level of Education" rules={schemaRules} required>
                <Select options={LevelOfEducation} />
              </Form.Item>
              <Form.Item name="department" label="Department" rules={schemaRules} required>
                <Select options={departmentOptions} />
              </Form.Item>
              <Form.Item name="facultyOfStudy" label="Faculty of study" rules={schemaRules} required>
                <Select options={facultyOfStudy} />
              </Form.Item>
              <Form.Item name="affiliationType" label="Affiliation Type" rules={schemaRules} required>
                <Select options={affiliationType} />
              </Form.Item>
              <Form.Item name="programmeName" label="Program" rules={schemaRules} required>
                <Select options={program} />
              </Form.Item>
              <Form.Item name="programDuration" label="Program Durations(Years)" rules={schemaRules} required>
                <Select options={programDurations} />
              </Form.Item>
              <Form.Item name="examinationPattern" label="Examination Pattern" rules={schemaRules} required>
                <Select options={examinationPattern} />
              </Form.Item>
              <Form.Item name="commencement" label="Commencement Year" rules={schemaRules} required>
                <Select options={commencementYears} />
              </Form.Item>
              <Form.Item name="courseSystem" label="Implementation of CBCS/ Elective Course System" rules={schemaRules} required>
                <Input />
              </Form.Item>
              <Form.Item name="degree" label="Degree" rules={schemaRules} required>
                <Input />
              </Form.Item>
              <Form.Item name="intake" label="Registration Year Batch Sanctioned Intake" rules={schemaRules} required>
                <Input />
              </Form.Item>
              <Form.Item name="lateralIntake" label="Lateral Entry Sanctioned Intake" rules={schemaRules} required>
                <Input />
              </Form.Item>
              <Form.Item name="additionalDivision" label="Additional Division" rules={schemaRules} required>
                <Radio.Group options={yesNo} />
              </Form.Item>
              <Form.Item name="batchFromYear" label="Batch Starting year Form" rules={schemaRules} required>
                <Select options={commencementYears} />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('Should confirm intake data.')),
                  },
                ]}
              >
                <Checkbox>Intake data is the same for current batch.</Checkbox>
              </Form.Item>
            </When>
          </Col>
        </Row>
      </Card>
    </Form>
  </div>);
};

export default AllProgramEdit;
