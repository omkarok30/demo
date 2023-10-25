import React from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Table,
} from 'antd';
import { useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { When } from 'react-if';
import MainProgramModal from '../form/MainProgramModal';
import { useEmployeeMainProgram } from '@/store/employee/useEmployeeMainProgram';
import * as modelMainProgram from '@/models/Employee/EmployeeMainProgram';
import { useSettings } from '@/store/settings/useSettings';
import { attachRenderer } from '@/utils/tableExtras';
import { EditIcon } from '@/components/Icons/EditIcon';
import { ProgramAsText } from '@/components/Renderers/ProgramAsText';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
const renderers = {
  programId: (value: string) => <ProgramAsText value={value} />,
  fromYear: (value: string) => <YearAsText value={value} />,
  toYear: (value: string) => <YearAsText value={value} />,

};
const MainProgram = () => {
  const { id } = useParams();


  const storeMainProgram = useEmployeeMainProgram((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
    deleteRecords: state.deleteRecords,
    allowNew: state.allowNew,
  }));

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);


  const [mainProgramProps, setmainProgramProps] = React.useState({
    open: false,
    program: '',
    id: '',
  });

  const intakeOk = (_values: any) => {
    setmainProgramProps({ ...mainProgramProps, open: false, id: '' });
  };
  const intakeCancel = () => {
    setmainProgramProps({ ...mainProgramProps, open: false, id: '' });
  };

  const editIntake = (record: any) => {
    setmainProgramProps({
      ...mainProgramProps,
      open: true,
      id: record?.id,
    });
  };

  React.useEffect(() => {
    fetchSettings();
    storeMainProgram.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelMainProgram.columns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
          <Button
            type="link"
            onClick={() => {
              editIntake(record);
            }}
          >
            <EditIcon></EditIcon>
          </Button>,
      ],
    });
    cols = attachRenderer(cols, renderers);
    return cols;
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card
          bordered={false}

        >
          <Table
            bordered
            columns={columns}
            dataSource={storeMainProgram.allRecords}
            scroll={{ x: true }}
            title={() => (
              <Row justify="end">
                <Col>
                  <Button
                    type="primary"
                    disabled={!storeMainProgram.allowNew}
                    onClick={() => {
                      setmainProgramProps({
                        ...mainProgramProps,
                        open: true,
                        id: 'new',
                      });
                    }}
                    style={{ borderRadius: '5px' }}
                  >
                    Add Main Program
                  </Button>
                </Col>
              </Row>
            )}
          />
           <When condition={mainProgramProps.open === true}>
        {() => (
          <MainProgramModal
            {...mainProgramProps}
            handleOk={intakeOk}
            handleCancel={intakeCancel}
          />
        )}
      </When>
        </Card>

    </div>
  );
};

export default MainProgram;
