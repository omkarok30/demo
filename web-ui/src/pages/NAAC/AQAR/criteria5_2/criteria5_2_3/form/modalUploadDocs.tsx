import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Table, Upload } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useMemo } from 'react';
import * as modelCriteria523 from '@/models/NAAC/criteria5_2/criteria5_2_3';
import { useSettings } from '@/store/settings/useSettings';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const ModalTitle = () => {
  return (
    <><div>Upload Document</div>
      <div>5.2.3. Number of students qualifying in state/ national/ international level examinations during the year (eg: JAM/ CLAT/ GATE/ GMAT/ CAT/ GRE/ TOEFL/ Civil Services/ State government examinations)</div></>
  );
};

const ModalUploadDocs = (props) => {
  const yearOption = Number(props.year);
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
    const cols = modelCriteria523.columnsExamination(settings);
    cols.push(
      {
        title: 'Document',
        dataIndex: 'document',
        key: 'document',
        render: (_, _record) => {
          return <Form.Item
            name="document"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ message: 'Please select an Document!' }]}
          >
            <Upload name="logo" action="/" listType="picture">
              <Button icon={<UploadOutlined />}>
                Click to upload Document
              </Button>
            </Upload>
          </Form.Item>;
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
      width={'90%'}
    >
      <h3 style={{ display: 'flex' }}><b>Year</b>: <YearAsText value={yearOption} /></h3>
      <Table bordered columns={columns} dataSource={props.currStudent} scroll={{ x: '90%' }} />
    </Modal>
  );
};

export default ModalUploadDocs;
