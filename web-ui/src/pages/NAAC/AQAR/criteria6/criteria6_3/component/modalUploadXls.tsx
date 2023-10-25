import { Button, Form, Modal, Upload } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';

const ModalUploadXls = (props) => {
  const normFile = (e: any) => {
    // eslint-disable-next-line no-console
    console.log('Upload event:', e);
    // if (Array.isArray(e)) {
    //   return e;
    // }
    // return e?.fileList;
  };

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
      open={props.open}
      title={props.title}
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
      <Form form={form}
        labelWrap
        labelCol={{ flex: '250px' }}
        labelAlign="left"
      >
        <Form.Item
          label="Download the Excel File"
          name="placementCount"
        >
          <Button type='primary' shape='round' style={{ width: '50%' }} icon={<DownloadOutlined />} />
        </Form.Item>
        <Form.Item
          name="document"
          label="Upload the Excel file"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Please select an Excel file!' }]}
          required
        >
          <Upload name="logo" action="/" listType="picture">
            <Button icon={<UploadOutlined />}>
              Click to upload Excel file
            </Button>
          </Upload>
        </Form.Item>
      </Form >
    </Modal>
  );
};

export default ModalUploadXls;
