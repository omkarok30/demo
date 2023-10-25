import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Table, Upload } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useMemo } from 'react';
import * as modelCriteria522 from '@/models/NAAC/criteria5_2/criteria5_2_2';
import { useSettings } from '@/store/settings/useSettings';

const ModalTitle = () => {
  return (
    <><div>Upload Document</div>
      <div>5.2.2. Number of students progressing to higher education during the year</div></>
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

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria522.columnsProgression(settings);
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
        <Button key="submit" type="primary" onClick={props.onModalSubmit}>
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
      <Table bordered columns={columns} dataSource={props.currStudent} />
    </Modal>
  );
};

export default ModalUploadDocs;
