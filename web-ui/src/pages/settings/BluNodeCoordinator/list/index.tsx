import React from 'react';
import { Button, Card, Col, Divider, Modal, Row, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import * as modelBluNodeCoordinator from '@/models/settings/BluNodeCoordinator';
import { useBluNodeCoordinator } from '@/store/settings/useBluNodeCoordinator';

import { useSettings } from '@/store/settings/useSettings';
import { EditIcon } from '@/components/Icons/EditIcon';
import { attachRenderer } from '@/utils/tableExtras';
import { BluNodeCoordinatorCategoryAsText } from '@/components/Lookups/renderers/BluNodeCoordinatorCategoryAsText';
import { DeleteIcon } from '@/components/Icons/DeleteIcon';
const renderers = {
  category: (value: string) => (
    <BluNodeCoordinatorCategoryAsText value={value} />
  ),
};
const bluNodeCoordinator = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeBluNodeCoordinator = useBluNodeCoordinator((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    overallCoordinatorsRecord: state.overallCoordinatorsRecord,
    getOverAllCoordinatorsRecords: state.getOverAllCoordinatorsRecords,
    deleteRecord: state.deleteRecord,
  }));

  const navigateToNewForm = () => {
    navigate('../edit/other/new');
  };
  const navigateToNewFormOverall = () => {
    navigate('../edit/overall/new');
  };

  const handleActionClick = ({ action, record, category }) => {
    if (action === 'edit') {
      navigate(`../edit/${category}/${record?.id}`, {
        state: { id: record?.id },
      });
    }
  };
  const { confirm } = Modal;

  const showConfirm = (record) => {
    confirm({
      title: 'Do you want to delete these record?',
      content: '',
      async onOk() {
        try {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            storeBluNodeCoordinator.deleteRecord();
          });
        }
        catch (e) {
          return console.log('error!');
        }
      },
      onCancel() {},
    });
  };

  React.useEffect(() => {
    fetchSettings();
    storeBluNodeCoordinator.getRecords();
    storeBluNodeCoordinator.getOverAllCoordinatorsRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelBluNodeCoordinator.columns(settings);
    cols.unshift({
      title: 'Name',
      key: 'name',
      render: (_, record) => [
        <span>
          {`${record.employee_info$firstName} ${record.employee_info$middleName} ${record.employee_info$lastName}`}
        </span>,
      ],
    });

    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        [
          <>
            <Button
              type="link"
              onClick={() =>
                handleActionClick({ action: 'edit', record, category: 'other' })
              }
            >
              <EditIcon></EditIcon>
            </Button>
            <Button type="link" onClick={() => showConfirm({ record })}>
              <DeleteIcon></DeleteIcon>
            </Button>
          </>,
        ],
      ],
    });
    cols = attachRenderer(cols, renderers);

    return cols;
  }, [settings]);

  const overallcolumns: ColumnsType<any> = React.useMemo(() => {
    let cols = [{}];

    cols.push({
      title: 'Name',
      key: 'name',
      render: (_, record) => [
        <span>
          {`${record.employee_info$firstName} ${record.employee_info$middleName} ${record.employee_info$lastName}`}
        </span>,
      ],
    });

    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        [
          <>
            <Button
              type="link"
              onClick={() =>
                handleActionClick({
                  action: 'edit',
                  record,
                  category: 'overall',
                })
              }
            >
              <EditIcon></EditIcon>
            </Button>
            <Button type="link" onClick={() => showConfirm({ record })}>
              <DeleteIcon></DeleteIcon>
            </Button>
          </>,
        ],
      ],
    });
    cols.shift();
    cols = attachRenderer(cols, renderers);

    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card bordered={false} title="BluNode Coordinators">
        <Row justify="end" key="blunodecoordinator">
          <Col>
            <Button
              type="primary"
              onClick={navigateToNewFormOverall}
              style={{ borderRadius: '5px' }}
            >
              Add Overall Coordinators
            </Button>
          </Col>
        </Row>

        <div style={{ marginTop: '10px' }}>
          <Divider orientation="left">Overall Coordinators</Divider>
        </div>
        <Table
          bordered
          columns={overallcolumns}
          dataSource={storeBluNodeCoordinator.overallCoordinatorsRecord}
        />
        <Row justify="end" key="blunodecoordinator">
          <Col>
            <Button
              type="primary"
              onClick={navigateToNewForm}
              style={{ borderRadius: '5px' }}
            >
              Add Other Coordinators
            </Button>
          </Col>
        </Row>
        <div style={{ marginTop: '10px' }}>
          <Divider orientation="left">Other Coordinators</Divider>
        </div>
        <Table
          bordered
          columns={columns}
          dataSource={storeBluNodeCoordinator.allRecords}
        />
      </Card>
    </div>
  );
};

export default bluNodeCoordinator;
