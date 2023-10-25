import React from 'react';
import { Alert, Button, Col, Empty, Form, Input, Modal, Row, Select, Table, Typography, notification } from 'antd';
import { Case, Default, Switch, When } from 'react-if';
import _ from 'lodash';
import { PlusCircleOutlined } from '@ant-design/icons';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import * as modelLookups from '@/models/settings/Lookups';
import { arrayToValueObject, modelLookupsItem } from '@/models/settings/lookup';
import { useLookups } from '@/store/settings/useLookups';
import { useSettings } from '@/store/settings/useSettings';
import { useModal } from '@/hooks/useModal';

const LookupsFrom = ({ isNew, lookupSelected, lookupsItemModel, modalProps }) => {
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
  const storeLookups = useLookups(
    (state: any) => ({
      updateRecord: state.updateRecord,
    }),
  );
  const schemaRules = React.useMemo(() => schemaValidator(lookupsItemModel.schemaRules, { settings: settings.byKeys }), [lookupsItemModel, settings.byKeys]);

  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();
  const formFields = React.useMemo(() => {
    if (!_.isFunction(lookupsItemModel.formNew)) {
      return {};
    }
    const tmp = lookupsItemModel.formNew(settings);
    return isEmptyValue(tmp) ? {} : tmp;
  }, [lookupsItemModel]);

  React.useEffect(() => {
    setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
    if (!isEmptyValue(modalProps.extraData?.record)) {
      form.setFieldsValue(modalProps.extraData.record);
    } else {
      form.resetFields();
    }
  }, [modalProps.visible]);

  const handleOk = (e) => {
    modalProps.onOk?.(e);
  };

  const onFormSubmit = (e) => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        const record = await storeLookups.updateRecord(modalProps.extraData.action, lookupSelected, modalProps.extraData.record, values);
        if (!isEmptyValue(record)) {
          notification.success({ message: 'Saved Successfully!', description: `Updated record for ${lookupSelected.name}` });
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
        handleOk(e);
      }, errorInfo => notification.error({ message: 'Validations failed', description: errorInfo.message }))
      .catch((e) => {
        console.log({ message: 'Request failed', description: e.message });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      }).finally(() => setSaveProgress({ saving: false, disableSubmit: false, disableForm: false }));
  };

  const headerLabel = _.get(modalProps, ['extraData', 'action'], 'add') === 'add' ? `Add ${lookupSelected?.name}` : `Update ${lookupSelected?.name}`;

  const fieldInputs = React.useMemo(() => {
    return _.map(formFields, (field, key) => {
      switch (field.input) {
        case 'input': {
          return (<Form.Item name={key} label={field.title} rules={schemaRules} required>
            <Input />
          </Form.Item>);
        }
        case 'select': {
          return (<Form.Item name={key} label={field.title} rules={schemaRules} required>
            <Select options={field.values} />
          </Form.Item>);
        }
      }
    });
  }, [formFields]);

  // const { show, modalProps } = useModal();
  return (<Modal
    {...modalProps}
    title={headerLabel}
    onOk={onFormSubmit}
    // onCancel={handleCancel}
    footer={[
      <Button key="back" onClick={modalProps.onCancel}>
        Cancel
      </Button>,
      <Button key="submit" type="primary" onClick={onFormSubmit} disabled={saveProgress.disableSubmit} loading={saveProgress.saving}>
        Submit
      </Button>,
    ]}>
    <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
      {/* <Card
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
      > */}
      <Row className="justify-center">
        <Col className='w-md'>
          <When condition={!isNew}>
            {() => (<>
              {fieldInputs}
            </>)}
          </When>

          <When condition={isNew}>
            {() => (<>
              {fieldInputs}
            </>)}
          </When>
        </Col>
      </Row>
      {/* </Card> */}
    </Form>
  </Modal>);
};

const LookupsDetail = () => {
  // const { id } = useParams();
  // const isNew = id === 'new';

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
  const schemaRules = React.useMemo(() => schemaValidator(modelLookups.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const storeLookups = useLookups(
    (state: any) => ({
      getRecord: state.getRecord,
      lookupSelected: state.lookupSelected,
      getLookupValue: state.getLookupValue,
      // addRecord: state.addRecord,
      // updateRecord: state.updateRecord,
    }),
  );
  const lookupsId = React.useMemo(() => _.get(storeLookups.lookupSelected, ['id']), [storeLookups.lookupSelected]);
  const lookupsType = React.useMemo(() => _.get(storeLookups.lookupSelected, ['type']), [storeLookups.lookupSelected]);
  const lookupsItemModel = React.useMemo(() => {
    const tmp = modelLookupsItem(lookupsType);
    return tmp;
  }, [lookupsType]);
  const lookupsValue = React.useMemo(() => {
    let values = storeLookups.getLookupValue(lookupsType);
    // return arrayToValueObject(values);
    values = arrayToValueObject(values);
    if (_.size(values) !== 0) {
      const value = values[0];
      values = _.sortBy(values, _.keys(value));
    }
    return values;
  }, [storeLookups.getLookupValue(lookupsType)]);

  React.useEffect(() => {
    if (isEmptyValue(lookupsId)) {
      return;
    }
    storeLookups.getRecord(lookupsId);
  }, [lookupsId]);

  const { show, close, modalProps, setExtraData } = useModal();
  modalProps.onOk = (e) => {
    close();
  };

  return (
    <Switch>
      <Case condition={isEmptyValue(lookupsId)}>
        <Empty />
      </Case>
      <Default>
        <Row wrap={false}>
          <Col flex="auto">
            <Typography.Title level={5}>{storeLookups.lookupSelected?.name}</Typography.Title>
          </Col>
        </Row>
        <Row wrap={false}>
          <Col flex="auto">
            {/* <div className="w-100% overflow-x-scroll">
              <span>{JSON.stringify(storeLookups.lookupSelected)}</span>
            </div> */}
            <When condition={() => isEmptyValue(lookupsItemModel)}>
              <Alert
                message="Error"
                description={`Definition not for "${lookupsType}"`}
                type="error"
                showIcon
              />
            </When>
            <When condition={() => !isEmptyValue(lookupsItemModel)}>
              {() => (
                <Table bordered columns={lookupsItemModel.columns(settings)} dataSource={lookupsValue}
                  onRow={(record, _rowIndex) => {
                    return {
                      onClick: () => {
                        setExtraData({ action: 'update', record });
                        show();
                      }, // click row
                    };
                  }}
                  title={() => (
                    <Row justify="start">
                      <Col>
                        <Button
                          type="default"
                          icon={<PlusCircleOutlined />}
                          disabled={false}
                          onClick={() => {
                            setExtraData({ action: 'add', record: null });
                            show();
                          }}
                        >
                          Add
                        </Button>
                      </Col>
                    </Row>
                  )}
                />
              )}
            </When>
          </Col>
        </Row>
        <LookupsFrom isNew={true} lookupSelected={storeLookups.lookupSelected} lookupsItemModel={lookupsItemModel} modalProps={{ ...modalProps }} />
      </Default>
    </Switch>
  );
};

export default LookupsDetail;
