import { Button, Form, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const ModalUpdateDocs = (props) => {
  const { currData, totalSeats } = props;

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

  const normFile = (e: any) => {
    // eslint-disable-next-line no-console
    console.log('Upload event:', e);
    // if (Array.isArray(e)) {
    //   return e;
    // }
    // return e?.fileList;
  };

  return (
    <Modal
      open={props.open}
      // title={currDataType === 'classrooms' ? 'You can add/update Total number of classrooms & seminar halls' : currDataType === 'computers' ? 'You can add/update Number of computers' : 'You can add/update Total expenditure excluding salary (INR in lakhs)'}
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
      width={1000}
    >
      <Form form={form}>
        <table style={{ border: 0 }}>
          <tbody className="ant-table-tbody">
            <tr>
              <td style={{ border: 0 }}><b>Academic Year</b></td>
              <td style={{ border: 0 }}><YearAsText value={currData?.academicYear} /></td>
            </tr>
            <tr>
              <td style={{ border: 0 }} width={400}>
                <b>Number of seats earmarked for reserved category as per GOI/State Govt rule</b>
              </td>
              <td style={{ border: 0 }}>{totalSeats || 0}</td>
            </tr>
            <tr>
              <td style={{ border: 0 }}>
                <b>Link for supporting document</b>
              </td>
              <td style={{ border: 0 }}>
                <Link target='_blank' to={`/${currData?.link}`}>{currData?.link}</Link>
              </td>
            </tr>
            <tr>
              <td style={{ border: 0 }}>
                <b>Number of seats earmarked for reserved category as per GOI/State Govt rule</b>
              </td>
              <td style={{ border: 0 }}>
                <Form.Item
                  name="document"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  style={{ marginBottom: 0 }}
                  rules={[{ message: 'Please select an Document!' }]}
                >
                  <Upload name="logo" action="/" listType="picture">
                    <Button icon={<UploadOutlined />}>
                      Click to upload Document
                    </Button>
                  </Upload>
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </Modal >
  );
};

export default ModalUpdateDocs;
