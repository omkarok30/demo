import React from 'react';
import _ from 'lodash';
import { Card, Checkbox, Col, Form, Input, Modal, Radio, Row, Select, notification } from 'antd';
import { When } from 'react-if';

import { isEmptyValue } from '@/utils/object';
import { useSettings } from '@/store/settings/useSettings';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { schemaValidator } from '@/utils/validate';
import * as ProgramNomenclatureDetails from '@/models/settings/ProgramNomenclatureDetails';
import { useProgramNomenclatureDetails } from '@/store/settings/useProgramNomenclatureDetails';
import { todoLookUps } from '@/store/todoLookUps';

export interface NomenclatureModalType {
  id: any;
  program: any;
  open: boolean;
  handleOk: Function;
  handleCancel: Function;
}

const yesNo = todoLookUps.getState().yesNo;

const NomenclatureModal = ({ id, program, open, handleOk, handleCancel }: NomenclatureModalType) => {
  const isNew = id === 'new';

  const storeAcademicYear = useAcademicYear(
    (state: any) => ({
      asOptions: state.asOptions,
      asYearOptions: state.comboByName,
    }),
  );
  const storeProgramNomenclature = useProgramNomenclatureDetails(
    (state: any) => ({
      getRecord: state.getRecord,
      current: state.current,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
    }),
  );

  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();
  const yearSettings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
  const schemaRules = React.useMemo(() => schemaValidator(ProgramNomenclatureDetails.schemaRules, { settings: yearSettings.byKeys }), [yearSettings.byKeys]);
  const [isBatchToYear, setIsBatchToYear] = React.useState(true);
  const [isToYear, setIsToYear] = React.useState(true);

  React.useEffect(() => {
    storeAcademicYear.asOptions();
  }, []);

  React.useEffect(() => {
    storeProgramNomenclature.getRecord(program, id);
    return () => {
      form.setFieldsValue({});
    };
  }, [program, id]);

  React.useEffect(() => {
    if (storeProgramNomenclature.current.id !== id) {
      return;
    }
    if (!isEmptyValue(storeProgramNomenclature.current.toYear)) {
      setIsToYear(false);
    }
    else {
      setIsToYear(true);
    }
    form.setFieldsValue(storeProgramNomenclature.current);
  }, [storeProgramNomenclature.current]);

  const doOK = () => {
    if (saveProgress.disableSubmit) {
      return;
    }
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        let record = { ...values };
        if (isNew) {
          record = await storeProgramNomenclature.addRecord(program, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.name}` });
          }
        }
        else {
          record = await storeProgramNomenclature.updateRecord(program, id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.name}` });
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

  const headerLabel = isNew ? 'Add Nomenclature Information' : 'Edit Nomenclature Information';

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
              <Form.Item name="name" label="Nomenclature for University/Board Enrollment No. of Students" rules={schemaRules} required>
                <Input />
              </Form.Item>
              <Form.Item name="sameasstudentcode" label="Is the value of Enrollment No. the same as that of Student Code?" rules={schemaRules} required>
                <Radio.Group options={yesNo} />
              </Form.Item>
              <Form.Item name="fromYear" label="Batch Starting Year From" rules={schemaRules} required>
                <Select options={storeAcademicYear.asYearOptions} />
              </Form.Item>

              <When condition={isNew}>
                <When condition={isBatchToYear !== true}>
                  <Form.Item name="toYear" label="Batch Starting Year To" rules={schemaRules} required>
                    <Select options={storeAcademicYear.asYearOptions} />
                  </Form.Item>
                </When>
                <Form.Item >
                  <Checkbox onChange={e => setIsBatchToYear(e.target.checked)} checked={isBatchToYear} >Nomenclature data is the same for the current Batch.</Checkbox>
                </Form.Item>
              </When>

              <When condition={!isNew}>
                <When condition={isToYear !== true}>
                  <Form.Item name="toYear" label="Batch Starting Year To" rules={schemaRules} required>
                    <Select options={storeAcademicYear.asYearOptions} />
                  </Form.Item>
                </When>
                <When condition={isEmptyValue(storeProgramNomenclature.current.toYear)}>
                  <Form.Item >
                    <Checkbox onChange={e => setIsToYear(e.target.checked)} checked={isToYear}>Nomenclature data is the same for the current Batch.</Checkbox>
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

export default NomenclatureModal;
