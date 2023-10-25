import { useEffect, useMemo, useRef, useState } from 'react';

import { Button, Card, Col, Divider, Input, Row, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { EditFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { useCustomDataHook } from '../renderers';
import ModalUpdatePosts from '../form/ModalUpdatePosts';
import * as modelNaacInstitute41 from '@/models/NAAC/extendedProfile/institute/institute_4_1';
import { useSettings } from '@/store/settings/useSettings';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import TableTooltipIcon from '@/components/Naac/TableTooltipIcon';

const renderers = {
  academicYear: (value: string) => <YearAsText value={value} />,
};

const NaacAcademic32 = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const [openModal, setOpenModal] = useState(false);
  const dataRef = useRef([]);
  const [editData, setEditData] = useState({
    data: [],
    type: '',
  });

  const { yearOption, teachersData, handleAQARChange, optionsAcademicYear, current } = useCustomDataHook();

  useEffect(() => {
    if (teachersData) {
      dataRef.current = teachersData;
    }
  }, [teachersData]);

  const programTitle = '4. Institution';

  const handleEditSalary = (id, type) => {
    const data = dataRef.current?.filter((post: any) => post.id === id && post.type === type);
    setEditData({ data, type });
    setOpenModal(true);
  };

  const handleEditNumbers = (type) => {
    const data = dataRef.current?.filter((post: any) => post.academicYear === yearOption && post.type === type);
    setEditData({ data, type });
    setOpenModal(true);
  };

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelNaacInstitute41.columns(settings);
    cols.push({
      dataIndex: 'number',
      title: 'Total expenditure excluding salary (INR in lakhs)',
      width: 300,
      render: (_, record) => record.number ? [<Space size={12}><Input value={record?.number} style={{ width: '60px', textAlign: 'center' }} /><Button onClick={() => handleEditSalary(record.id, record.type)} icon={<EditFilled />} title='Edit' type='link' /></Space>] : '-',
    });
    cols = attachRenderer(cols, renderers);

    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <h2 style={{ margin: 0 }}>{programTitle}</h2>
      <Card bordered={false}>

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} hideRatings />

        <Divider />

        <div className='ant-card-bordered' style={{ padding: '0.5rem 1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
          <h4 style={{ margin: 0, marginRight: 16 }}><b>4.1</b> Total number of classrooms & seminar halls</h4>
          <Space size={4}>
            <b>{teachersData?.filter((item: any) => item.type === 'classrooms' && item.academicYear === yearOption)[0]?.number || 'N/A'}</b>
            <Button type='text' onClick={() => handleEditNumbers('classrooms')}><EditFilled style={{ fontSize: '1rem' }} title='Edit' role={'button'} /></Button>
          </Space>
        </div>

        <div className='ant-card-bordered' style={{ padding: '0.5rem 1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
          <h4 style={{ margin: 0, marginRight: 16 }}><b>4.2</b> Total expenditure excluding salary during the year(INR in lakhs)</h4>
          <Space size={4}>
            <b>{current?.number || 'N/A'}</b>
            <TableTooltipIcon columnTitle={' '} textContent={'Total of Year'}><ExclamationCircleFilled /></TableTooltipIcon>
          </Space>
        </div>

        <Row>
          <Col span={24}>
            <b>Year-wise Data</b>
            {teachersData && <NaacDataTable
              downloadBtn={false}
              columns={columns}
              dataSource={teachersData?.filter((item: any) => item.type === 'salary').slice(0, 5)}
            />}
          </Col>

          <div className='ant-card-bordered' style={{ padding: '0.5rem 1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <h4 style={{ margin: 0, marginRight: 16 }}><b>4.3 Number of Computers</b></h4>
            <Space size={2}>
              <b>{teachersData?.filter((item: any) => item.type === 'computers' && item.academicYear === yearOption)[0]?.number || 'N/A'}</b>
              <Button type='text' onClick={() => handleEditNumbers('computers')}><EditFilled style={{ fontSize: '1rem' }} title='Edit' role={'button'} /></Button>
            </Space>
          </div>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='4.1' title={programTitle} year={yearOption} />
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
