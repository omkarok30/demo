import React from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, Row, Select, notification } from 'antd';
import { When } from 'react-if';

import * as modelAcademicDept from '@/models/settings/AcademicDept';
import { useSettings } from '@/store/settings/useSettings';
import { useAcademicDepartment } from '@/store/settings/useAcademicDepartment';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { DisplaySelect } from '@/components/FormItem/DisplaySelect';
import { DisplayInput } from '@/components/FormItem/DisplayInput';
import { isEmptyValue } from '@/utils/object';

const AcademicDepartmentEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
  const storeAcademicYear = useAcademicYear(
    (state: any) => ({
      asOptions: state.asOptions,
      asYearOptions: state.comboByName,
    }),
  );

  const optionsLevelOfEducation = React.useMemo(() => settings.asSelect('level_of_education') || [], [settings.byKeys]);
  const optionsFacultyStudy = React.useMemo(() => settings.asSelect('faculty_study') || [], [settings.byKeys]);

  const schemaRules = React.useMemo(() => schemaValidator(modelAcademicDept.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const [isDeptActive, setIsDeptActive] = React.useState(true);

  const storeAcademicDepartment = useAcademicDepartment(
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
    storeAcademicYear.asOptions();
  }, []);

  React.useEffect(() => {
    storeAcademicDepartment.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeAcademicDepartment.current.id !== id) {
      return;
    }
    setIsDeptActive(!!isEmptyValue(storeAcademicDepartment.current.endYear));
    form.setFieldsValue(storeAcademicDepartment.current);
  }, [storeAcademicDepartment.current]);

  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeAcademicDepartment.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.degreeName}` });
          }
        }
        else {
          values.id = id;
          const record = await storeAcademicDepartment.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.degreeName}` });
          }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  const headerLabel = isNew ? 'Edit Academic Department' : 'Add Academic Department';

  return (<div className='layout-main-content'>
    <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
      <Card
        bordered={false}
        title={headerLabel}
        actions={[
          <Affix offsetBottom={12}>
            <Form.Item>
              <Button type="primary" onClick={onFormSubmit}>
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
                <Form.Item name="degreeName" label="Department Name" rules={schemaRules} required>
                  <Input />
                </Form.Item>
                <Form.Item name="degreeCode" label="Department Code" rules={schemaRules}>
                  <DisplayInput />
                </Form.Item>
                <Form.Item name="levelOfEducation" label="Level of Education" rules={schemaRules}>
                  <DisplayInput />
                </Form.Item>
                <Form.Item name="startYear" label="Commencement Year" rules={schemaRules}>
                  <DisplaySelect options={storeAcademicYear.asYearOptions} />
                </Form.Item>
                <When condition={isDeptActive !== true}>
                  <Form.Item name="endYear" label="Closure Year" rules={schemaRules} required>
                    <Select options={storeAcademicYear.asYearOptions} />
                  </Form.Item>
                </When>
                <Form.Item>
                  <Checkbox onChange={e => setIsDeptActive(e.target.checked)} checked={isDeptActive}>Department is currently active.</Checkbox>
                </Form.Item>
              </>)}
            </When>

            <When condition={isNew}>
              <Form.Item name="degreeName" label="Department Name" rules={schemaRules} required>
                <Input />
              </Form.Item>
              <Form.Item name="degreeCode" label="Department Code" rules={schemaRules} required>
                <Input />
              </Form.Item>
              <Form.Item name="facultyOfStudy" label="Faculty of Study" rules={schemaRules} required>
                <Select options={optionsFacultyStudy} />
              </Form.Item>
              <Form.Item name="levelOfEducation" label="Level of Education" rules={schemaRules} required>
                <Select options={optionsLevelOfEducation} />
              </Form.Item>
              <Form.Item name="startYear" label="Commencement Year" rules={schemaRules} required>
                <Select options={storeAcademicYear.asYearOptions} />
              </Form.Item>
              <When condition={isDeptActive !== true}>
                <Form.Item name="endYear" label="Closure Year" rules={schemaRules}>
                  <Select options={storeAcademicYear.asYearOptions} />
                </Form.Item>
              </When>
              <Form.Item>
                <Checkbox onChange={e => setIsDeptActive(e.target.checked)} checked={isDeptActive}>Department is currently active.</Checkbox>
              </Form.Item>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('Should confirm updates.')),
                  },
                ]}
              >
                <Checkbox>I confirm to add the above record.</Checkbox>
              </Form.Item>
            </When>

          </Col>
        </Row>
      </Card>
    </Form>
  </div >);
};

export default AcademicDepartmentEdit;
