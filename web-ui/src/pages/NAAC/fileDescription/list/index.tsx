import React, { useMemo, useState } from 'react';
import { DeleteFilled, DownloadOutlined, EditFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Space } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { When } from 'react-if';
import { Link } from 'react-router-dom';
import FileDescriptionEdit from '../edit';
import DeleteRecordModal from '../edit/DeleteRecordModal';
import style from '@/pages/NAAC/index.module.less';
import { useFileDescription } from '@/store/NAAC/FileDescription/useFileDescription';
import { useSettings } from '@/store/settings/useSettings';

import * as modelFileDescription from '@/models/NAAC/fileDescription/fileDescription';
import ModalUploadDocs from '@/components/Naac/modalUploadDocs';

const FileDescriptionList = (props) => {
  const settings = useSettings((state: any) => state.byKeys);
  const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
  const [selectedRecord, setRecordId] = useState('');
  const [deleteData, setDeleteData] = useState({});
  // const [confirmOpen, setConfirmOpen] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [form] = Form.useForm();

  const { allRecords, getRecords, deleteRecord, deleteLink } = useFileDescription((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    deleteRecord: state.deleteRecord,
    deleteLink: state.deleteLink,
  }));

  const upload = () => {
    setOpenUploadModal(true);
  };

  React.useEffect(() => {
    if (props.year) {
      getRecords(props.year, props.criteria);
    }
  }, [props.year]);

  const handleOk = () => {
    getRecords();
    setAddEditModalOpen(false);
    setRecordId('');
  };
  const handleCancel = () => {
    setAddEditModalOpen(false);
    setRecordId('');
  };

  const downloadFile = (record, filename) => {
    fetch(record.linkdocument).then((t) => {
      return t.blob().then((b) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(b);
        a.setAttribute('download', filename);
        a.click();
      });
    });
  };

  const addFileDescription = () => {
    setAddEditModalOpen(true);
    setRecordId('new');
  };

  const handleActionClick = (res) => {
    const { action, type, record } = res;
    if (type === 'link') {
      if (action === 'delete') {
        deleteLink(record.id);
      }
      if (action === 'download') {
        downloadFile(record, 'test');
      }
    } else {
      if (action === 'delete') {
        deleteRecord(record.id);
      }
      if (action === 'edit') {
        setRecordId(record.id);
        setAddEditModalOpen(true);
      }
    }
    setOpenDeleteModal(false);
  };

  const confirmation = (data) => {
    setDeleteData(data);
    if (data?.action !== 'download') {
      setOpenDeleteModal(true);
    }

    if (data?.action === 'download') {
      downloadFile(data?.record, 'test');
    }
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

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelFileDescription.columns(settings);
    cols.push({
      dataIndex: 'linkdocument',
      title: 'Link to the Document',
      render: (_, record) => [record?.linkdocument ? <Link to={`http://${record?.linkdocument}`} target='_blank'>{record?.linkdocument}</Link> : '-'],
    }, {
      title: 'Document',
      key: 'document',
      render: (_, record) => [
        <When condition={!record.uploadPath}>
          <Button type='primary' size='small' title="Upload document" onClick={() => upload()}>Upload</Button>
        </When>,
        <Space size={1}>
          <When condition={record.uploadPath}>
            <Button
              type='link'
              title='Download'
              onClick={() =>
                confirmation({ action: 'download', type: 'link', record })
              }
              icon={<DownloadOutlined />}
            />
          </When>
          <When condition={record.uploadPath}>
            <Button
              type='link'
              title='Delete file'
              onClick={() =>
                confirmation({ action: 'delete', type: 'link', record })
              }
              icon={<DeleteFilled />}
              danger
            />
          </When>
        </Space>,
      ],
    });
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <Space>
          <Button
            type='link'
            onClick={() =>
              handleActionClick({ action: 'edit', type: 'record', record })
            }
            title="Edit"
            icon={<EditFilled />}
          />
          <When condition={record.linkdocument}>
            <Button
              type='link'
              icon={<DeleteFilled />}
              danger
              onClick={() =>
                confirmation({ action: 'delete', type: 'record', record })
              }
            />
          </When>
        </Space>,
      ],
    });
    return cols;
  }, [settings]);

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <span className={style.text} style={{ marginRight: '10px' }}>
          File Description
        </span>
        <Button
          type="primary"
          style={{ borderRadius: '5px' }}
          onClick={() => addFileDescription()}
          icon={<PlusOutlined />}
        >
          Add Record
        </Button>
      </div>
      <Table
        bordered
        columns={columns}
        rowKey={record => record.id}
        dataSource={allRecords}
      />
      <When condition={isAddEditModalOpen === true}>
        {() => (
          <FileDescriptionEdit
            recordId={selectedRecord}
            recordData={allRecords?.find((list: any) => selectedRecord !== 'new' && list.id === selectedRecord)}
            open={isAddEditModalOpen}
            criteria={props.criteria}
            handleOk={handleOk}
            handleCancel={handleCancel}
            title={props.title}
            year={props.year}
          />
        )}
      </When>
      {
        useMemo(() =>
          <DeleteRecordModal
            open={openDeleteModal}
            title={props.title}
            onHide={() => setOpenDeleteModal(!openDeleteModal)}
            year={props?.year}
            onModalSubmit={() => handleActionClick(deleteData)}
            deleteRecord={deleteData}
          />,
        [openDeleteModal],
        )
      }
      {
        useMemo(() =>
          <ModalUploadDocs
            open={openUploadModal}
            title="Upload Document for File Description"
            onHide={() => setOpenUploadModal(!openUploadModal)}
            year={props?.year}
            onModalSubmit={onFormSubmit}
          />,
        [openUploadModal],
        )
      }
    </>
  );
};

export default FileDescriptionList;
