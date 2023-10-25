import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Table, Upload } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useMemo } from 'react';
import * as modelCriteria531 from '@/models/NAAC/criteria5_3/criteria5_3_1';
import { useSettings } from '@/store/settings/useSettings';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const ModalTitle = () => {
  return (
    <><div>Upload Document</div>
      <div>5.3.1. Number of awards/medals for outstanding performance in sports/cultural activities at university/state/national / international level (award for a team event should be counted as one) during the year</div></>
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
    const cols = modelCriteria531.columnsAward(settings);
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
      <h3 style={{ display: 'flex' }}><b>Year</b>: <YearAsText value={Number(props.year)} /></h3>
      <Table bordered columns={columns} dataSource={props.currStudent} />
    </Modal>
  );
};

export default ModalUploadDocs;
