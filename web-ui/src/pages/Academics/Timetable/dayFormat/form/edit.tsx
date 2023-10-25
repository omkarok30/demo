import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  TimePicker,
  Typography,
  notification,
} from 'antd';
import { When } from 'react-if';
import * as yup from 'yup';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from 'moment';
import * as modelDayFormat from '@/models/Academics/timeTable/dayFormat/DayFormat';
import { useSettings } from '@/store/settings/useSettings';
import { useDayFormat } from '@/store/Academics/timeTable/dayFormat/useDayFormat';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';

import { todoLookUps } from '@/store/todoLookUps';

const optionweekoff = todoLookUps.getState().weekoff;

dayjs.extend(customParseFormat);

const onChange = (time: Dayjs, timeString: string) => {
  console.log(time, timeString);
};

<Space direction="vertical">
  <TimePicker status="error" />
  <TimePicker status="warning" />
  <TimePicker.RangePicker status="error" />
  <TimePicker.RangePicker status="warning" />
</Space>;

const DayFormatEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelDayFormat.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const storeDayFormat = useDayFormat((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    getRecords: state.getRecords,
    updateRecord: state.updateRecord,
    getSessionsRecords: state.getSessionsRecords,
  }));

  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  const [form] = Form.useForm();

  React.useEffect(() => {
    storeDayFormat.getRecords();
    storeDayFormat.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeDayFormat.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeDayFormat.current);
  }, [storeDayFormat.current]);

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeDayFormat.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.dayFormat}`,
            });
          }
        }
        else {
          values.id = id;
          const record = await storeDayFormat.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Updated record for ${record.dayFormat}`,
            });
          }
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

  const [sessioncnt, setsessioncnt] = React.useState(1);
  const [recesscnt, setrecesscnt] = React.useState(0);
  const [dynamicFields, setDynamicFields] = React.useState([
    { session: 1, type: 'session', fromTime: moment('HH"mm'), toTime: moment('HH:mm') },
  ]);
  const [showRemoveButton, setshowRemoveButton] = React.useState(false);

  const handleFromTimeChange = (event, cnt, type, index) => {
    const a = dynamicFields?.filter((record: any) => record.session === cnt);

    const fromTime = moment(event, 'HH:mm');

    const newInputObj = {
      session: cnt,
      type,
      fromTime,
      toTime: moment(`${a[0].toTime}`, 'HH:mm'),
    };
    dynamicFields.splice(index, 1, newInputObj);
    setDynamicFields([...dynamicFields]);
  };
  const handleToTimeChange = (event, cnt, type, index) => {
    const a = dynamicFields?.filter((record: any) => record.session === cnt);
    const hr = moment(event).hours();
    const minute = moment(event).minutes();

    // const toTime = `${hr}:${minute}`;
    const toTime = moment(event, 'HH:mm');
    const newInputObj = {
      session: cnt,
      type,
      fromTime: moment(`${a[0].fromTime}`, 'HH:mm'),
      toTime,
    };
    dynamicFields.splice(index, 1, newInputObj);
    setDynamicFields([...dynamicFields]);
  };
  const addDynamicFields = () => {
    const oldsessioncnt = sessioncnt;
    const oldrecescnt = recesscnt;
    const oldcount = oldsessioncnt + oldrecescnt;
    let oldcnt = sessioncnt;
    const newcnt = ++oldcnt;
    const newfieldscnt = newcnt + recesscnt;
    let toTime = moment('HH:mm');
    dynamicFields.map((item: any, index) => {
      if (index === oldcount - 1) {
        toTime = item.toTime;
      }
    });
    if (moment(toTime, 'HH:mm').isValid() === false) {
      alert('please fill "To Time" field');
    }
    else {
      const newInputObj = { session: newcnt, type: 'session', fromTime: moment(toTime, 'HH:mm') };
      dynamicFields.splice(newfieldscnt, 0, newInputObj);
      setDynamicFields([...dynamicFields]);

      setsessioncnt(newcnt);
      setshowRemoveButton(true);
    }
  };
  const addRecessDynamicFields = () => {
    const oldsessioncnt = sessioncnt;
    const oldrecescnt = recesscnt;
    const oldcount = oldsessioncnt + oldrecescnt;
    let oldcnt = recesscnt;
    const newcnt = ++oldcnt;
    const newfieldscnt = newcnt + sessioncnt;
    let toTime = moment('HH:mm');
    dynamicFields.map((item: any, index) => {
      if (index === oldcount - 1) {
        toTime = item.toTime;
      }
    });
    if (moment(toTime, 'HH:mm').isValid() === false) {
      alert('please fill "To Time" field');
    }
    else {
      const newInputObj = { session: newcnt, type: 'recess', fromTime: moment(toTime, 'HH:mm') };
      dynamicFields.splice(newfieldscnt, 0, newInputObj);
      setDynamicFields([...dynamicFields]);

      setrecesscnt(newcnt);
      setshowRemoveButton(true);
    }
  };
  const removeDynamicFields = () => {
    const cntoffield = dynamicFields.length;

    if (dynamicFields.length !== 1) {
      if (dynamicFields[cntoffield - 1].type === 'session') {
        const newcnt = sessioncnt - 1;
        setsessioncnt(newcnt);
      }
      else {
        const newcnt = recesscnt - 1;
        setrecesscnt(newcnt);
      }
      dynamicFields.splice(-1);
      setDynamicFields([...dynamicFields]);
      setshowRemoveButton(true);
    }
    else {
      setshowRemoveButton(false);
    }
  };
  const format = 'HH:mm';

  const renderFormElements = () =>
    dynamicFields.map((item: any, index) => {
      const oldfields = dynamicFields[index - 1];

      const intexcnt = index;
      const recesscnt = item.session;
      const fromtimefield = `fromTime${index}`;
      const totimefield = `toTime${index}`;

      let previousTotime = moment('00:00', 'HH:mm');

      let isdisabled = true;
      if (index === 0) {
        isdisabled = false;
      }
      else {
        previousTotime = moment(oldfields.toTime, 'HH:mm');
      }
      return (
        <>
          <Input.Group>
            <When condition={item.type === 'session'}>
              <Typography.Text strong>Session {recesscnt}</Typography.Text>
            </When>
            <When condition={item.type === 'recess'}>
              <Typography.Text strong>Recess {recesscnt}</Typography.Text>
            </When>
            <Row gutter={8}>
              <Col span={12}>
              <When condition={index === 0}>
              <Form.Item
                  name={`fromTime${index}`}
                  label="From Time"
                   rules={schemaValidator(
                     yup.object().shape({
                       [fromtimefield]: yup.string().required('required'),
                     }),
                     {
                       settings: settings.byKeys,
                     },
                   )}
                   required
                >

                  <TimePicker
                    className="w-100%"
                    format={format}
                    disabled={isdisabled}
                    onChange={event =>
                      handleFromTimeChange(event, recesscnt, item.type, index)
                    }
                  />
                </Form.Item>
              </When>
              <When condition={index !== 0}>
              <Form.Item
                  name={`fromTime${index}`}
                  label="From Time"
                  required

                >

                  <TimePicker
                    className="w-100%"
                    format={format}
                    defaultValue={moment(previousTotime, 'HH:mm')}
                    disabled={isdisabled}

                    onChange={event =>
                      handleFromTimeChange(event, recesscnt, item.type, index)
                    }
                  />
                </Form.Item>
              </When>

              </Col>
              <Col span={12}>
                <Form.Item
                  name={`toTime${index}`}
                  label="To Time"
                  rules={schemaValidator(
                    yup.object().shape({
                      // [totimefield]: yup.string().required('required'),
                      [totimefield]: yup.mixed().when(['$formValues', '$settings'], (formValues, settings, schema) => {
                        if (moment(formValues[totimefield], 'HH:mm').isBefore(moment(formValues[fromtimefield], 'HH:mm'))) {
                          return schema.test(
                            'failed',
                            'should be greater than from time',
                            // eslint-disable-next-line no-empty-pattern
                            (_value: any, {}: any) => {
                              return false;
                            },
                          );
                        }
                        else {
                          return yup.string().required('required');
                        }
                      }),
                    }),
                    {
                      settings: settings.byKeys,
                    },
                  )}
                  required
                >
                  <TimePicker
                    className="w-100%"
                    format={format}
                    onChange={event =>
                      handleToTimeChange(event, recesscnt, item.type, index)
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </Input.Group>
        </>
      );
    });

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelDayFormat.proceedcolumns(settings);
    cols.push({
      title: 'From Time',
      dataIndex: 'fromTime',
      render: (_, record) => [<span>
        {

`${moment(`${record.fromTime}`).hours()}: ${moment(`${record.fromTime}`).minutes()}`

        }
      </span>,
      ],
    });
    cols.push({
      title: 'To Time',
      dataIndex: 'toTime',
      render: (_, record) => [<span>
        {

        `${moment(`${record.toTime}`).hours()}: ${moment(`${record.toTime}`).minutes()}`

        }
      </span>,
      ],
    });
    return cols;
  }, [settings]);
  const [openmodal, setopenmodal] = React.useState(false);

  const showModal = () => {
    form
      .validateFields()
      .then(async (values) => {
        setopenmodal(true);
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
  const goBack = () => {
    navigate('../list');
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        storeToolAttainment.updateCommonAttainment(
          selectYear,
          selectProgram,
          values,
        );
        setopenmodal(false);
      })
      .catch(() => {
        notification.error({
          message: 'Validations failed',
        });
      });
  };

  const handleCancel = () => {
    setopenmodal(false);
  };
  type LayoutType = Parameters<typeof Form>[0]['layout'];

  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };
  const formItemLayout
    = formLayout === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 40 },
        }
      : null;
  const buttonItemLayout
    = formLayout === 'horizontal'
      ? {
          wrapperCol: { span: 30, offset: 4 },
        }
      : null;
  const [formatlabel, setformatlabel] = React.useState();

  const headerLabel = isNew ? 'Edit Day Format' : 'Add Day Format';

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
        <Card
          bordered={false}
          title={headerLabel}
          actions={[
            <Form.Item>
              <Button type="primary" onClick={showModal}>
                Proceed
              </Button>
              <Button type="default" onClick={goBack} style={{marginLeft:"10px"}}>
                Back
              </Button>
            </Form.Item>,
          ]}
        >
          <Row className="justify-center">
            <Col className="w-md">
              <When condition={!isNew}>
                {() => (
                  <>
                    <Form.Item
                      name="nameofFormat"
                      label="Name of Format"
                      rules={schemaRules}
                      required
                    >
                      <Input
                        onChange={(event) => {
                          setformatlabel(event.target.value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="weekoff"
                      label="Weekoff"
                      rules={schemaRules}
                      required
                    >
                      <Select mode="multiple" options={optionweekoff} />
                    </Form.Item>
                    {renderFormElements()}

                    <Form.Item>
                      <Button
                        size="small"
                        style={{
                          background: 'green',
                          color: 'white',
                          borderRadius: '5px',
                        }}
                        onClick={addDynamicFields}
                      >
                        Add Session
                      </Button>
                      <Space></Space>
                      <Button
                        size="small"
                        style={{
                          background: 'green',
                          color: 'white',
                          borderRadius: '5px',
                        }}
                        onClick={addRecessDynamicFields}
                      >
                        Add Recess
                      </Button>
                      <Space></Space>
                      <When condition={showRemoveButton}>
                        <Button
                          onClick={removeDynamicFields}
                          size="small"
                          style={{
                            background: 'red',
                            color: 'white',
                            borderRadius: '5px',
                          }}
                        >
                          Remove
                        </Button>
                      </When>
                    </Form.Item>
                  </>
                )}
              </When>
            </Col>
          </Row>
          <Modal
            title="Day Format"
            open={openmodal}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form form={form} layout="vertical">
              <label>
                <b>Name of Format: {formatlabel}</b>
              </label>

              <Divider></Divider>
              <Table columns={columns} dataSource={dynamicFields}></Table>

              <Form.Item label="" name="confirmcheckbox">
                <b>"Once a day format is created, it cannot be deleted or updated.</b>
                <br></br>
                <Checkbox /> I confirm to submit above day format.
              </Form.Item>
              <Form.Item {...buttonItemLayout}></Form.Item>
            </Form>
          </Modal>
        </Card>
      </Form>
    </div>
  );
};
export default DayFormatEdit;
function setshowRemoveButton(arg0: boolean) {
  throw new Error('Function not implemented.');
}
