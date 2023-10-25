import { Button, Form, Input, Modal } from 'antd';

const ModalUpdateContibution = (props) => {
  const [form] = Form.useForm();
  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        // eslint-disable-next-line no-console
        console.log(values);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('error', e);
      });
  };
  return (
    <Modal
      open={props.openModal}
      title="You can add/update Alumni Contribution (INR in Lakhs)"
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
      width={620}
    >
      <Form form={form}
        labelWrap
        labelCol={{ flex: '250px' }}
        labelAlign="left"
      >
        <Form.Item
          label="Alumni Contribution (INR in Lakhs)*"
          name="contribution"
          rules={[{ required: true, message: 'Please enter number' },
            () => ({
              validator(_, value) {
                if (!value) {
                // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject();
                }
                if (isNaN(value) || value < 0) {
                // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject('Value has to be a number greater or equal to 0.');
                }
                return Promise.resolve();
              },
            })]}
          initialValue={props.count}
          required
        >
          <Input style={{ width: '100px' }} />
        </Form.Item>
      </Form >
    </Modal>
  );
};

export default ModalUpdateContibution;
