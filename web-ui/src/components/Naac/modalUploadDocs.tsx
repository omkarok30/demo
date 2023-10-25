import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Upload } from 'antd';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const ModalUploadDocs = (props) => {
  const [form] = Form.useForm();
  const normFile = (e: any) => {
    // eslint-disable-next-line no-console
    console.log('Upload event:', e);
    // if (Array.isArray(e)) {
    //   return e;
    // }
    // return e?.fileList;
  };
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
          label="Year"
          name="year"
        >
          <div style={{ color: 'rgba(0, 0, 0, 0.25)', padding: '4px 11px', background: '#f5f5f5', border: '1px solid #D9D9D9', width: '50%' }}>
            <YearAsText value={Number(props.year)} />
          </div>
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload Document"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Please select an Document!' }]}

        >
          <Upload name="logo" action="/" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload Document</Button>
          </Upload>
        </Form.Item></Form>
    </Modal>
  );
};

export default ModalUploadDocs;
