import { useMemo, useState } from 'react';

import { Button, Card, Col, Divider, Input, Row, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { DownloadOutlined, EditFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useCustomDataHook } from '../renderers';
import ModalUpdatePosts from '../form/ModalUpdatePosts';
import * as modelNaacAcademic32 from '@/models/NAAC/extendedProfile/academic/academic_3_2';
import { useSettings } from '@/store/settings/useSettings';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import { attachRenderer } from '@/utils/tableExtras';

const renderers = {
  academicYear: (value: string) => <YearAsText value={value} />,
};

const NaacAcademic32 = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const { yearOption, PostCounts, handleAQARChange, optionsAcademicYear } = useCustomDataHook();

  const programTitle = '3.2. Number of Sanctioned posts during the year';

  const handleEdit = (record) => {
    setEditData(record);
    setOpenModal(true);
  };

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelNaacAcademic32.columns(settings);
    cols.push({
      dataIndex: 'numberOfPost',
      title: 'Number of sanctioned posts',
      width: 300,
      render: (_, record) => record.numberOfPost ? [<Space><Input value={record.numberOfPost} style={{ width: '60px', textAlign: 'center' }} /><Button onClick={() => handleEdit(record)} icon={<EditFilled />} title='Edit' type='link' /><Button type='link' icon={<DownloadOutlined title='Dowwnload' />} /></Space>] : '-',
    },
    {
      dataIndex: 'link',
      title: 'Link for supporting document',
      width: 300,
      render: (_, record) => record.link ? [<Link type='link' to={`http://${record.link}`}>{record.link}</Link>] : '-',
    });
    cols = attachRenderer(cols, renderers);

    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{programTitle}</h3>
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} hideRatings />

        <Divider />

        <Row>
          <Col span={24}>
            <b>Year-wise Data</b>
            {PostCounts && <NaacDataTable downloadBtn={false} columns={columns} dataSource={PostCounts?.slice(0, 5)} />}
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='3.2' title={programTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>
      {
        useMemo(() => {
          return <ModalUpdatePosts
            open={openModal}
            currData={editData}
            onHide={() => setOpenModal(false)}
          />;
        }, [openModal, editData])
      }
    </div>
  );
};

export default NaacAcademic32;
