import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Affix,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  notification,
} from 'antd';
import { When } from 'react-if';
import moment from 'moment';
import * as modelHolidayList from '@/models/Academics/Timetableandattendance/HolidayList';
import { useSettings } from '@/store/settings/useSettings';
import { useHolidayList } from '@/store/Academics/timeTable/useHolidaylist';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';

const HolidayListEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));
  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelHolidayList.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const storeHolidayList = useHolidayList((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    updateRecord: state.updateRecord,
  }));

  const defaultPickerValue: moment.Moment | null = React.useMemo(() => {}, [
    useHolidayList?.yearAt,
  ]);
  const [form] = Form.useForm();

  React.useEffect(() => {
    storeHolidayList.getRecord(id);
    // console.log(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeHolidayList.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeHolidayList.current);
  }, [storeHolidayList.current]);

  const onFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        values.id = id;
        storeHolidayList.updateRecord(id, values);
      })
      .catch(() => {
        notification.error({
          message: 'Validations failed',
        });
      });
  };

  const headerLabel = isNew ? 'Add Holiday List' : 'Edit Holiday List';

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical">
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
            <Col className="w-md">
              <When condition={!isNew}>
                {() => (
                  <>
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={schemaRules}
                      required
                    >
                      <Input required />
                    </Form.Item>
                    <Form.Item
                      name="description"
                      label="Description"
                      rules={schemaRules}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item name="date" label="Date" rules={schemaRules}>
                      <DatePicker
                        className="w-100%"
                        format={global.displayDateFormat}
                        defaultPickerValue={defaultPickerValue}
                        rules={schemaRules}
                        required
                      />
                    </Form.Item>
                  </>
                )}
              </When>
              <When condition={isNew}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={schemaRules}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="date" label="Date" rules={schemaRules}>
                  <DatePicker
                    className="w-100%"
                    format={global.displayDateFormat}
                    defaultPickerValue={defaultPickerValue}
                    rules={schemaRules}
                    required
                  />
                </Form.Item>

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                            new Error('Should confirm updates.'),
                          ),
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
    </div>
  );
};

export default HolidayListEdit;
