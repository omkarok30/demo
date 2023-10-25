import { Button, Form, Input, Modal } from 'antd';
import { useEffect } from 'react';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const ModalUpdatePosts = (props) => {
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
    form.setFieldsValue({ posts: props?.currData?.numberOfPost, postsLink: props?.currData?.link });
    return () => {
      form.setFieldsValue({});
    };
  }, [props?.currData]);

  return (
    <Modal
      open={props.open}
      title={'You can add/update Number of sanctioned posts and Link for supporting document'}
      onCancel={props.onHide}
      footer={[
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
    >
      <Form form={form}>
        <table style={{ border: 0 }}>
          <tbody className="ant-table-tbody">
            <tr>
              <td width={300} style={{ border: 0 }}><b>Academic Year</b></td>
              <td style={{ border: 0 }}><YearAsText value={props.currData?.academicYear} /></td>
            </tr>
            <tr>
              <td style={{ border: 0 }} width={300}><b>Number of sanctioned posts</b></td>
              <td style={{ border: 0 }}>
                <Form.Item style={{ marginBottom: 0 }} name='posts' rules={[{ message: 'Please enter number', required: true },
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
            <tr>
              <td style={{ border: 0 }} width={300}><b>Link for supporting document</b></td>
              <td style={{ border: 0 }}>
                <Form.Item style={{ marginBottom: 0 }} name='postsLink' rules={[{ message: 'Please enter number', required: true },
                  () => ({
                    validator(_, value) {
                      if (!value) {
                      // eslint-disable-next-line prefer-promise-reject-errors
                        return Promise.reject();
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
    </Modal>
  );
};

export default ModalUpdatePosts;
