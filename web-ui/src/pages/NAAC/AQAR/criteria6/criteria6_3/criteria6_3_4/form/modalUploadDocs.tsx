import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Table, Upload } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useMemo } from 'react';
import * as modelCriteria634 from '@/models/NAAC/criteria6/criteria6_3_4';
import { useSettings } from '@/store/settings/useSettings';

const ModalTitle = () => {
  return (
    <><div>Upload Document</div>
      <div>6.3.4.Number of teachers undergoing online/ face-to-face Faculty development Programmes (FDP) during the year(Professional Development Programmes, Orientation/ Induction Programmes, Refresher Course, Short Term Course etc.)</div>
    </>
  );
};

const ModalUploadDocs = (props) => {
  const settings = useSettings((state: any) => state.byKeys);
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

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria634.columnsFaculty(settings);
    cols.push(
      {
        title: 'Document',
        dataIndex: 'document',
        key: 'document',
        render: (_, _record) => {
          return <Form>
            <Form.Item
              name="upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Please select an Document!' }]}

            >
              <Upload name="logo" action="/" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload Document</Button>
              </Upload>
            </Form.Item>
          </Form>;
        },
      });
    return cols;
  }, [settings]);

  return (
    <Modal
      open={props.open}
      title={<ModalTitle />}
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
      width={1000}
    >
      <Table bordered columns={columns} dataSource={props.currData} />
    </Modal>
  );
};

export default ModalUploadDocs;
