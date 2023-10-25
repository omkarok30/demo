import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Typography,
  Upload,
  notification,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import _ from 'lodash';
import { UploadOutlined } from '@ant-design/icons';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { isEmptyValue } from '@/utils/object';
import { schemaValidator } from '@/utils/validate';
import * as modelFileDescription from '@/models/NAAC/fileDescription/fileDescription';
import { useFileDescription } from '@/store/NAAC/FileDescription/useFileDescription';
import { useSettings } from '@/store/settings/useSettings';

export interface IFileDescriptionEditType {
  recordId: any;
  open: boolean;
  criteria: string;
  title: string;
  handleOk: Function;
  handleCancel: Function;
  year: string;
  recordData: any;
}

const FileDescriptionEdit = ({
  recordId,
  open,
  criteria,
  title,
  handleOk,
  handleCancel,
  year,
  recordData,
}: IFileDescriptionEditType) => {
  const [form] = Form.useForm();

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const schemaRules = useMemo(
    () =>
      schemaValidator(modelFileDescription.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const { getRecord, addRecord, updateRecord } = useFileDescription((state: any) => ({
    getRecord: state.getRecord,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));

  const [saveProgress, setSaveProgress] = useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });

  useEffect(() => {
    getRecord(recordId);
    return () => {
      form.setFieldsValue({});
    };
  }, [recordId]);

  useEffect(() => {
    if (recordData?.id !== recordId) {
      return;
    }
    form.setFieldsValue({
      filedescription: recordData.filedescription || '',
      linkdocument: recordData.linkdocument,
    });
  }, []);

  const storeAcademicYear = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
  }));

  const optionsAcademicYear = useMemo(
    () => storeAcademicYear.comboByName || [],
    [storeAcademicYear.comboByName],
  );

  const onFormSubmit = () => {
    if (saveProgress.disableSubmit) {
      return;
    }
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (recordId === 'new') {
          const record = await addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.fileDescription}`,
            });
          }
        } else {
          const record = await updateRecord(recordId, values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Updated record for ${record.fileDescription}`,
            });
          }
        }
        setSaveProgress({
          saving: false,
          disableSubmit: true,
          disableForm: true,
        });
        if (_.isFunction(handleOk)) {
          handleOk();
        }
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({
          saving: false,
          disableSubmit: false,
          disableForm: false,
        });
      });
  };

  const doCancel = () => {
    if (_.isFunction(handleCancel)) {
      handleCancel();
    }
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
    <>
      <Modal
        title="File Description"
        open={open}
        onOk={onFormSubmit}
        onCancel={doCancel}
        width={700}
        okText="Save"
      >
        <Typography.Text>
          <b>{title}</b>
        </Typography.Text>
        <Form
          form={form}
          layout="vertical"
          disabled={saveProgress.disableForm}
          name="basic"
        >
          <Card bordered={false}>
            <Form.Item label="Academic year">
              <Select
                disabled
                style={{ width: 300 }}
                value={year}
                options={optionsAcademicYear}
              ></Select>
            </Form.Item>
            <Form.Item
              label="File name and description"
              name="filedescription"
              rules={schemaRules}
            >
              <TextArea
                disabled={recordData?.hardcode}
                rows={4}
              />
            </Form.Item>
            <Form.Item
              label="Link to the document"
              name="linkdocument"
              rules={schemaRules}
            >
              <Input value={recordData?.documentLink} />
            </Form.Item>
            {recordId === 'new' && (
              <>
                <Form.Item
                  name="document"
                  label="Document"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[{ message: 'Please select an Document!' }]}
                >
                  <Upload name="logo" action="/" listType="picture">
                    <Button icon={<UploadOutlined />}>
                      Click to upload Document
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{ offset: 8, span: 16 }}
                ></Form.Item>
              </>
            )}
          </Card>
        </Form>
      </Modal>
    </>
  );
};

export default FileDescriptionEdit;
