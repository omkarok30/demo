import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { Button, Col, Row, Space, Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { useIndustrialTrainingDetails } from '@/store/admissions/useIndustrialTrainingDetails';
import { useSettings } from '@/store/settings/useSettings';
import * as modelIndustrialTrainingDetails from '@/models/admissions/studentRecords/IndustrialTrainingDetails';
import { isEmptyValue } from '@/utils/object';
import { attachRenderer } from '@/utils/tableExtras';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import { When } from 'react-if';
import IndustrialTrainingDetailsForm from '../form';
import { EditIcon } from '@/components/Icons/EditIcon';
import { DeleteIcon } from '@/components/Icons/DeleteIcon';

const renderers = {
  academicYear: (value: string) => <YearAsText value={value} />,
};
const IndustrialTrainingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeIndustrialTrainingDetails = useIndustrialTrainingDetails(
    (state: any) => ({
      allRecords: state.allRecords,
      getRecords: state.getRecords,
      deleteRecord: state.deleteRecord,
    })
  );

  const navigateToNewForm = () => {
    navigate(`../co-curricular/industrial_training_details/new/${id}`);
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(
        `../co-curricular/industrial_training_details/${record?.id}/${id}`,
        {
          state: { id: record?.id },
        }
      );
    } else if (action === 'delete') {
      storeIndustrialTrainingDetails.deleteRecord(record.id);
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeIndustrialTrainingDetails.getRecords(id);
  }, []);
  const [technicalprops, setTechnicalprops] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });
  const technicalOk = (studentId: string, _values: any) => {
    setTechnicalprops({ ...technicalprops, open: false, id: '', studentId: '' });
  };
  const technicalCancel = () => {
    setTechnicalprops({ ...technicalprops, open: false, id: '', studentId: '' });
  };

  const editdetails = (editid: any) => {
    setTechnicalprops({
      ...technicalprops,
      open: true,
      studentId: `${id}`,
      id: editid,
    });
  };
  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelIndustrialTrainingDetails.columns(settings);
    cols.push({
      title: 'Document',
      dataIndex: 'document',
      render: (_, record) =>
        isEmptyValue(record.document)
          ? [
              <span>
                <Button
                  type='link'
                  onClick={() => {
                    alert('Not provided');
                  }}
                >
                  NA
                </Button>
              </span>,
            ]
          : [
              <span>
                <a href={record.paperDocument}>
                  <DownloadOutlined />
                </a>
              </span>,
            ],
    });
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <span>
          <Button
            type='link'
            onClick={() => editdetails(`${record?.id}`)}
          >
            <EditIcon/>
          </Button>
          <Button
            type='link'
            style={{ color: 'red' }}
            onClick={() => handleActionClick({ action: 'delete', record })}
          >
            <DeleteIcon/>
          </Button>
        </span>,
      ],
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);
  return (
    <div className='layout-main-content'>
      <Space> Industrial Training/Internship Details</Space>
      <Row justify='end' key='publication-details'>
        <Col>
        </Col>
      </Row>
      <Table
        bordered
        columns={columns}
        dataSource={storeIndustrialTrainingDetails.allRecords}
        scroll={{ x: 300 }}
      />
       <When condition={technicalprops.open === true}>
        {() => (
          <IndustrialTrainingDetailsForm
            {...technicalprops}
            handleOk={technicalOk}
            handleCancel={technicalCancel}
          />
        )}
      </When>
    </div>
  );
};

export default IndustrialTrainingDetails;
