import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { Button, Col, Row, Space, Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { When } from 'react-if';
import TechnicalDetailsForm from '../form';
import { useTechnicalDetails } from '@/store/admissions/useTechnicalDetails';
import { useSettings } from '@/store/settings/useSettings';
import * as modelTechnicalDetails from '@/models/admissions/studentRecords/TechnicalDetails';
import { isEmptyValue } from '@/utils/object';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import {
  CountryAsText,
  EventLevelAsText,
  ParticipationTypeAsText,
} from '@/pages/admissions/StudentRecord/CoCurricularActivity/TechnicalDetails/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { EditIcon } from '@/components/Icons/EditIcon';
import { DeleteIcon } from '@/components/Icons/DeleteIcon';

const renderers = {
  academicYear: (value: string) => <YearAsText value={value} />,
  eventLevel: (value: string) => <EventLevelAsText value={value} />,
  participationType: (value: string) => (
    <ParticipationTypeAsText value={value} />
  ),
  country: (value: string) => <CountryAsText value={value} />,
};
const TechnicalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeTechnicalDetails = useTechnicalDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    deleteRecord: state.deleteRecord,
  }));

  const navigateToNewForm = () => {
    navigate(`../co-curricular/technical_details/new/${id}`);
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../co-curricular/technical_details/${record?.id}/${id}`, {
        state: { id: record?.id },
      });
    }
    else if (action === 'delete') {
      storeTechnicalDetails.deleteRecord(record.id);
    }
  };

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
  React.useEffect(() => {
    fetchSettings();
    storeTechnicalDetails.getRecords(id);
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelTechnicalDetails.columns(settings);
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
                <a href={record.document}>
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
      <Space> Technical Event Details</Space>
      <Row justify='end' key='technical-details'>
        <Col>
        </Col>
      </Row>
      <Table
        bordered
        columns={columns}
        dataSource={storeTechnicalDetails.allRecords}
        scroll={{ x: 300 }}
      />

<When condition={technicalprops.open === true}>
        {() => (
          <TechnicalDetailsForm
            {...technicalprops}
            handleOk={technicalOk}
            handleCancel={technicalCancel}
          />
        )}
      </When>
    </div>
  );
};

export default TechnicalDetails;
