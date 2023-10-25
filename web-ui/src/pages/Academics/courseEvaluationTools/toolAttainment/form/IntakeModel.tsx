import React from 'react';
import _ from 'lodash';
import { Card, Checkbox, Col, Form, Input, Modal, Radio, Row, Select, notification } from 'antd';

import { When } from 'react-if';
import * as Toolattainment from '@/models/Academics/Courseeval/';
import { useToolAttainment } from '@/store/Academics/Courseevall/useToolAttainment';
import { useSettings } from '@/store/settings/useSettings';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { schemaValidator } from '@/utils/validate';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';

export interface IntakeModalType {
  id: any;
  program: any;
  open: boolean;
  handleOk: Function;
  handleCancel: Function;
}

const yesNo = todoLookUps.getState().yesNo;

const IntakeModal = ({ id, program, open, handleOk, handleCancel }: IntakeModalType) => {
  const isNew = id === 'new';
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
  const storeAcademicYear = useAcademicYear(
    (state: any) => ({
      asOptions: state.asOptions,
      asYearOptions: state.comboByName,
    }),
  );
  const storeToolattainment = useToolAttainment(
    (state: any) => ({
      getRecord: state.getRecord,
      current: state.current,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
    }),
  );

  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();
  const schemaRules = React.useMemo(() => schemaValidator(Toolattainment.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
  const [isBatchToYear, setIsBatchToYear] = React.useState(true);
  const [isAdditionalDivision, setIsAdditionalDivision] = React.useState(false);
  const [isToYear, setIsToYear] = React.useState(true);

  React.useEffect(() => {
    storeAcademicYear.asOptions();
  }, []);

  React.useEffect(() => {
    storeToolattainment.getRecord(program, id);
    return () => {
      form.setFieldsValue({});
    };
  }, [program, id]);

  React.useEffect(() => {
    if (storeToolattainment.current.id !== id) {
      return;
    }
    setIsAdditionalDivision(storeToolattainment.current.additionalDivision);
    if (!isEmptyValue(storeToolattainment.current.batchToYear)) {
      setIsToYear(false);
    }
    else {
      setIsToYear(true);
    }
    form.setFieldsValue(storeToolattainment.current);
  }, [storeToolattainment.current]);

  React.useEffect(() => {
    if (id === 'new') {
      form.setFieldsValue({});
      return;
    }
    form.setFieldsValue(storeToolattainment.current);
  }, [storeToolattainment.current]);

  const changeAdditionalDivision = (event: any) => {
    setIsAdditionalDivision(event.target.value);
  };

  const doOK = () => {
    if (saveProgress.disableSubmit) {
      return;
    }
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        let record = { ...values };
        if (isNew) {
          record = await storeToolattainment.addRecord(program, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.intake}` });
          }
        }
        else {
          record = await storeToolattainment.updateRecord(program, id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.intake}` });
          }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });

        if (_.isFunction(handleOk)) {
          handleOk(program, record);
        }
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  const doCancel = () => {
    if (_.isFunction(handleCancel)) {
      handleCancel(program);
    }
  };

  if (open !== true) {
    return null;
  }

  const headerLabel = isNew ? 'Add Intake Information' : 'Edit Intake Information';

  return (
    <Modal
      title={headerLabel}
      open={open}
      onOk={doOK}
      onCancel={doCancel}
      closable
    >
      <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
        <Card
          bordered={false}
        >
          <Row className="justify-center">
            <Col className='w-md'>
              <Form.Item name="intake" label="Registration Year Batch Sanctioned Intake" rules={schemaRules} required>
                <Input />
              </Form.Item>
              <Form.Item name="lateralIntake" label="Lateral Entry Sanctioned Intake" rules={schemaRules} required>
                <Input />
              </Form.Item>
              <Form.Item name="additionalDivision" label="Additional Division" rules={schemaRules} required>
                <Radio.Group options={yesNo} onChange={changeAdditionalDivision} />
              </Form.Item>
              <When condition={isAdditionalDivision}>
                <Form.Item name="additionalIntake" label="Additional Division Sanctioned Intake" rules={schemaRules} required>
                  <Input />
                </Form.Item>
              </When>
              <Form.Item name="batchFromYear" label="Batch Starting Year From" rules={schemaRules} required>
                <Select options={storeAcademicYear.asYearOptions} />
              </Form.Item>

              <When condition={isNew}>
                <When condition={isBatchToYear !== true}>
                  <Form.Item name="batchToYear" label="Batch Starting Year To" rules={schemaRules} required>
                    <Select options={storeAcademicYear.asYearOptions} />
                  </Form.Item>
                </When>
                <Form.Item >
                  <Checkbox onChange={e => setIsBatchToYear(e.target.checked)} checked={isBatchToYear}>Intake data is the same for the current batch.</Checkbox>
                </Form.Item>
              </When>

              <When condition={!isNew}>
                <When condition={isToYear !== true}>
                  <Form.Item name="batchToYear" label="Batch Starting Year To" rules={schemaRules} required>
                    <Select options={storeToolattainment.asYearOptions} />
                  </Form.Item>
                </When>
                <When condition={isEmptyValue(storeToolattainment.current.batchToYear)}>
                  <Form.Item >
                    <Checkbox onChange={e => setIsToYear(e.target.checked)} checked={isToYear}>Intake data is the same for the current batch.</Checkbox>
                  </Form.Item>
                </When>
              </When>

            </Col>
          </Row>
        </Card>
      </Form>
    </Modal>
  );
};

export default IntakeModal;