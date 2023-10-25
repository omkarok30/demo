import { Button, Form, Input, Modal } from 'antd';
import { useEffect } from 'react';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const ModalUpdatePosts = (props) => {
  const { currData } = props;
  const currDataToUpdate = currData.data[0];
  const currDataType = currData.type;

  const [form] = Form.useForm();
  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        // eslint-disable-next-line no-console
        console.log(values);
        props.onHide();
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('error', e);
      });
  };

  useEffect(() => {
    form.setFieldsValue({ [currDataType]: currDataToUpdate?.number });
    return () => {
      form.setFieldsValue({});
      form.resetFields();
    };
  }, [currData]);

  return (
    <Modal
      open={props.open}
      title={currDataType === 'classrooms' ? 'You can add/update Total number of classrooms & seminar halls' : currDataType === 'computers' ? 'You can add/update Number of computers' : 'You can add/update Total expenditure excluding salary (INR in lakhs)'}
      onCancel={props.onHide}
      footer={
        [
          <Button key="submit" type="primary" onClick={onFormSubmit}>
            Save
          </Button>,
          <Button
            key="link"
            onClick={props.onHide}
          >
            Cancel
          </Button>,
        ]}
      width={600}
    >
      <Form form={form}>
        <table style={{ border: 0 }}>
          <tbody className="ant-table-tbody">
            {currDataType === 'salary' && <tr>
              <td width={300} style={{ border: 0 }}><b>Academic Year</b></td>
              <td style={{ border: 0 }}><YearAsText value={currDataToUpdate?.academicYear} /></td>
            </tr>}
            <tr>
              <td style={{ border: 0 }} width={300}>
                <b>{currDataType === 'classrooms' ? 'Total number of classrooms & seminar halls*' : currDataType === 'computers' ? 'Number of computers*' : 'Total expenditure excluding salary (INR in lakhs)*'}</b>
              </td>
              <td style={{ border: 0 }}>
                <Form.Item style={{ marginBottom: 0 }} name={currDataType} rules={[{ message: 'Please enter number', required: true },
                  () => ({
                    validator(_, value) {
                      if (!value) {
                        // eslint-disable-next-line prefer-promise-reject-errors
                        return Promise.reject();
                      }
                      if (isNaN(value) || value < 0) {
                        // eslint-disable-next-line prefer-promise-reject-errors
                        return Promise.reject('Please enter number greater or equal to zero');
                      }
                      return Promise.resolve();
                    },
                  })]}>
                  <Input />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </Modal >
  );
};

export default ModalUpdatePosts;
