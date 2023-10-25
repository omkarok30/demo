import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Modal,
  Space,
  Table,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import * as modelFileDescription from '@/models/NAAC/fileDescription/fileDescription';
import { useSettings } from '@/store/settings/useSettings';

const DeleteRecordModal = (props) => {
  const settings = useSettings((state: any) => state.byKeys);
  const { open, title, deleteRecord, onHide, onModalSubmit, year } = props;
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [form] = Form.useForm();

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelFileDescription.columns(settings);
    if (deleteRecord?.type === 'record') {
      cols.push({ dataIndex: 'linkdocument', title: 'Link to Document' });
    }
    cols.push({ dataIndex: 'uploadPath', title: 'Document' });
    return cols;
  }, [deleteRecord]);

  useEffect(() => {
    form.resetFields();
    return () => {
      form.resetFields();
      setComponentDisabled(false);
    };
  }, [open]);

  return (
    <>
      <Modal
        title={deleteRecord?.type === 'record' ? 'Delete Record' : 'Delete Document'}
        open={open}
        onCancel={onHide}
        width={700}
        footer={[
          <Button key="submit" type="primary" onClick={onModalSubmit} disabled={!componentDisabled}>
            Confirm
          </Button>,
          <Button
            key="link"
            onClick={onHide}
          >
            Close
          </Button>,
        ]}
      >
        <h4>{title}</h4>

        <h4><Space>Year: <YearAsText value={Number(year)} /></Space></h4>

        <Table columns={columns} dataSource={[deleteRecord.record]} pagination={false} />

        <Form form={form}>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <h4 style={{ marginBottom: 0 }}>"Once the record is deleted, it cannot be restored from the software."</h4>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="confirm"
            >
              <Checkbox
                checked={componentDisabled}
                onChange={e => setComponentDisabled(e.target.checked)}
              >
                I confirm to delete the selected record.
              </Checkbox>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default DeleteRecordModal;
