import React from 'react';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Typography,
} from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { CheckOutlined } from '@ant-design/icons';
import * as yup from 'yup';
import { createYupSchema } from './schemaCreator';
// import './index.less';
// import NotNetwork from "../ErrorMessage/";

const { Title } = Typography;
type LayoutType = Parameters<typeof Form>[0]['layout'];
interface IProps {
  formInputs: any;
  formValues: {};
  // formHeader: string;
  formLayout: LayoutType;
  onFormSubmit: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormContainer = ({
  formInputs,
  formValues,
  // formHeader,
  formLayout,
  onFormSubmit,
}: IProps) => {
  const yepSchema = formInputs?.reduce(createYupSchema, {});
  const validationSchema = yup.object().shape(yepSchema);
  const yupSync = {
    async validator({ field }: any, value: any) {
      await validationSchema.validateSyncAt(field, { [field]: value });
    },
  };
  const [form] = Form.useForm();
  const [checked, setChecked] = React.useState(false);
  const [levelofedu, setLevelofedu] = React.useState();
  const [facultyofstudy, setfacultyofstudy] = React.useState();
  const [showfyacademics, setfyacademics] = React.useState(false);
  const [cbcsimplyear, setcbcsimpl] = React.useState(false);
  const [relevantdoc, setrelevantdoc] = React.useState(false);
  const [adddivisionIntake, setadddivisionIntake] = React.useState(false);

  const toggleChecked = () => {
    setChecked(!checked);
  };
  const onChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
  };
  const onFinish = (values: any) => {
    onFormSubmit(values);
  };
  function onOptionChange(event: any, id: any) {
    if (id === 'levelOfEducation') {
      setLevelofedu(event);
      if (event === 'UG' && facultyofstudy === 'Engineering') {
        setfyacademics(true);
      }
      else {
        setfyacademics(false);
      }
    }
    else if (id === 'facultyOfProgram') {
      setfacultyofstudy(event);
      if (levelofedu === 'UG' && event === 'Engineering') {
        setfyacademics(true);
      }
      else {
        setfyacademics(false);
      }
    }
    else if (id === 'cbcsimpl') {
      if (event === 'Yes') {
        setcbcsimpl(true);
        setrelevantdoc(true);
      }
      else if (event === 'No') {
        setcbcsimpl(false);
        setrelevantdoc(false);
      }
    }
    else if (id === 'adddivision') {
      if (event.target.value === 'Yes') {
        setadddivisionIntake(true);
      }
      else if (event.target.value === 'No') {
        setadddivisionIntake(false);
      }
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  React.useEffect(() => {
    form.setFieldsValue(formValues);
  }, [formValues]);

  const renderFormElements = () =>
    formInputs?.map((item: any) => {
      if (item.type === 'text') {
        if (item.id === 'adddivisionIntake') {
          return (adddivisionIntake
            && <Col span={formLayout === 'horizontal' ? 24 : 8} key={item.id}>
              <Form.Item name={item.id} label={item.label} rules={[yupSync]} key={item.id}>
                <Input placeholder={item.placeholder} />
              </Form.Item>
            </Col>
          );
        }
        else if (item.id === 'relevantdoc') {
          return (relevantdoc
            && <Col span={formLayout === 'horizontal' ? 24 : 8} key={item.id}>
              <Form.Item name={item.id} label={item.label} rules={[yupSync]} key={item.id}>
                <Input placeholder={item.placeholder} />
              </Form.Item>
            </Col>
          );
        }
        else {
          return (
            <Col span={formLayout === 'horizontal' ? 24 : 8} key={item.id}>
              <Form.Item name={item.id} label={item.label} rules={[yupSync]} key={item.id}>
                <Input placeholder={item.placeholder} disabled={item.isDisabled} />
              </Form.Item>
            </Col>
          );
        }
      }
      if (item.type === 'select') {
        if (item.id === 'cbcsimplyear') {
          return (cbcsimplyear
            && <Col span={formLayout === 'horizontal' ? 24 : 8} key={item.id}>
              <Form.Item name={item.id} rules={[yupSync]} label={item.label}>
                <Select id={item.id} options={item.options} mode={item.mode} placeholder={item.placeholder} onChange={event => onOptionChange(event, item.id)} />
              </Form.Item>
            </Col>
          );
        }
        else {
          return (
            <Col span={formLayout === 'horizontal' ? 24 : 8} key={item.id}>
              <Form.Item name={item.id} rules={[yupSync]} label={item.label}>
                <Select id={item.id}
                  options={item.options}
                  mode={item.mode}
                  placeholder={item.placeholder} onChange={event => onOptionChange(event, item.id)}
                  disabled={item.isDisabled}
                />
              </Form.Item>
            </Col>
          );
        }
      }
      if (item.type === 'radio-button') {
        if (item.id === 'fyacademics') {
          return (showfyacademics
            && <Col span={formLayout === 'horizontal' ? 24 : 8} key={item.id}>
              <Form.Item name={item.id} id={item.id} label={item.label} rules={[yupSync]}>
                <Radio.Group >
                  {item.options.map((option: { value: string; label: string }) => {
                    return <Radio value={option.value}>{option.label}</Radio>;
                  })}
                </Radio.Group>
              </Form.Item>
            </Col>
          );
        }
        else {
          return (
            <Col span={formLayout === 'horizontal' ? 24 : 8} key={item.id}>
              <Form.Item name={item.id} id={item.id} label={item.label} rules={[yupSync]}>
                <Radio.Group id={item.id} onChange={event => onOptionChange(event, item.id)} >
                  {item.options.map((option: { value: string; label: string }) => {
                    return (
                      <Radio value={option.value} disabled={item.isDisabled}>
                        {option.label}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            </Col>
          );
        }
      }
      if (item.type === 'DatePicker') {
        return (
          <>
            <Col span={formLayout === 'horizontal' ? 24 : 8} key={item.id}>
              <Form.Item name={item.id} label={item.label} key={item.id}>
                <DatePicker format={'YYYY-MM-DD'} disabled={item.isDisabled} />
              </Form.Item>
            </Col>
          </>
        );
      }
      if (item.type === 'message') {
        return (
          <>
            <Col span={formLayout === 'vertical' ? 24 : 8} key={item.id}>
              <Form.Item name={item.id} label="" key={item.id}>
                {item.label}
                {item.label1}
                <CheckOutlined></CheckOutlined>
                {item.label2}
              </Form.Item>
            </Col>
          </>
        );
      }
      if (item.type === 'Checkbox') {
        return (
          <>
            <Col span={formLayout === 'vertical' ? 24 : 8} key={item.id}>
              <Form.Item name={item.id} label="" key={item.id}>
                <Checkbox checked={checked} onChange={onChange} disabled={item.isDisabled}>
                  {item.label}
                </Checkbox>
              </Form.Item>
            </Col>
          </>
        );
      }
      return '';
    });

  const formItemLayout = formLayout === 'horizontal'
    ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }
    : null;

  return (
    <div className="form">
      <Form
        {...formItemLayout}
        autoComplete="off"
        // className="ant-form"
        form={form}
        layout={formLayout}
        name="custom-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* {formLayout === 'vertical'
          ? (<Row gutter={24} key="form-header">
            <Title level={4}>{formHeader}</Title>
          </Row>)
          : (<Title level={4}>{formHeader}</Title>)
        } */}
        {formLayout === 'vertical'
          ? (<Row gutter={24} key="form-wrapper">
            {renderFormElements()}
          </Row>)
          : (renderFormElements())
        }
        <Col
          key="form-footer"
          span={formLayout === 'horizontal' ? 18 : 24}
          style={{
            textAlign: 'right',
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Form>
    </div>
  );
};

export default FormContainer;
