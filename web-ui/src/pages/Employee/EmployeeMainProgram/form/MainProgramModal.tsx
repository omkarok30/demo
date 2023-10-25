import React from 'react';
import _ from 'lodash';
import { Card, Checkbox, Col, Form, Input, Modal, Row, Select, notification } from 'antd';

import { When } from 'react-if';
import * as modelEmployeeMainProgram from '@/models/Employee/EmployeeMainProgram';
import { useEmployeeMainProgram } from '@/store/employee/useEmployeeMainProgram';
import { useSettings } from '@/store/settings/useSettings';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { schemaValidator } from '@/utils/validate';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';
import { useProgramDetails } from '@/store/settings/useProgramDetails';

export interface IntakeModalType {
  id: any;
  open: boolean;
  handleOk: Function;
  handleCancel: Function;
}

const yesNo = todoLookUps.getState().yesNo;

const IntakeModal = ({ id, open, handleOk, handleCancel }: IntakeModalType) => {
  const isNew = id === 'new';
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
  const storeAcademicYear = useAcademicYear(
    (state: any) => ({
      getAcademicYearDetails: state.getAcademicYearDetails,
      asYearOptions: state.comboByName,
    }),
  );
  const storeMainProgram = useEmployeeMainProgram(
    (state: any) => ({
      getRecord: state.getRecord,
      current: state.current,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
    }),
  );
  const storeProgramDetails = useProgramDetails((state: any) => ({
    optionsAllPrograms: state.optionsAllPrograms,
    getRecords: state.getRecords,
  }));
  const optionsPrograms = storeProgramDetails.optionsAllPrograms;
  const optionsAcademicYear = storeAcademicYear.asYearOptions;

  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeMainProgram.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
  const [isAdditionalDivision, setIsAdditionalDivision] = React.useState(false);
  const [isToYear, setisToYear] = React.useState(true);

  React.useEffect(() => {
    storeAcademicYear.getAcademicYearDetails();
    storeProgramDetails.getRecords();
  }, []);

  React.useEffect(() => {
    storeMainProgram.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeMainProgram.current.id !== id) {
      return;
    }
    setIsAdditionalDivision(storeMainProgram.current.additionalDivision);
    if (!isEmptyValue(storeMainProgram.current.toYear)) {
      setisToYear(false);
    }
    else {
      setisToYear(true);
    }
    form.setFieldsValue(storeMainProgram.current);
  }, [storeMainProgram.current]);

  React.useEffect(() => {
    if (id === 'new') {
      form.setFieldsValue({});
      return;
    }
    console.log(storeMainProgram.current);
    form.setFieldsValue(storeMainProgram.current);
  }, [storeMainProgram.current]);

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
          record = await storeMainProgram.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.intake}` });
          }
        }
        else {
          record = await storeMainProgram.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.intake}` });
          }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });

        if (_.isFunction(handleOk)) {
          handleOk(record);
        }
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  const doCancel = () => {
    if (_.isFunction(handleCancel)) {
      handleCancel();
    }
  };

  if (open !== true) {
    return null;
  }

  const headerLabel = isNew ? 'Add Main Program' : 'Edit Main Program';

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
              <Form.Item name="programId" label="Main Program" rules={schemaRules} required>
                <Select options={optionsPrograms} />
              </Form.Item>

              <Form.Item name="fromYear" label="From Year" rules={schemaRules} required>
                <Select options={optionsAcademicYear} />
              </Form.Item>

              <When condition={isNew}>
                <When condition={isToYear !== true}>
                  <Form.Item name="toYear" label="To Year" rules={schemaRules} required>
                    <Select options={storeAcademicYear.asYearOptions} />
                  </Form.Item>
                </When>
                <Form.Item name="checktoyear" >
                  <Checkbox onChange={e => setisToYear(e.target.checked)} checked={isToYear}>Main program is same for the current Year.</Checkbox>
                </Form.Item>
              </When>

              <When condition={!isNew}>
                <When condition={isToYear !== true}>
                  <Form.Item name="toYear" label="To Year" rules={schemaRules} required>
                    <Select options={storeAcademicYear.asYearOptions} />
                  </Form.Item>
                </When>
                <When condition={isEmptyValue(storeMainProgram.current.toYear)}>
                  <Form.Item name="checktoyear" >
                    <Checkbox onChange={e => setisToYear(e.target.checked)} checked={isToYear}>Main program is same for the current Year.</Checkbox>
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
