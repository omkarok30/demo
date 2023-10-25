import React, { useState } from 'react';
import { Button, Card, Col, Row, Select, Space, Table, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import { useSettings } from '@/store/settings/useSettings';
import { useDayFormat } from '@/store/Academics/timeTable/dayFormat/useDayFormat';
import * as modelDayFormat from '@/models/Academics/timeTable/dayFormat/DayFormat';
import { todoLookUps } from '@/store/todoLookUps';
import { isEmptyValue } from '@/utils/object';

const DayFormatList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeDayFormat = useDayFormat((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    sessionsallRecords: state.sessionsallRecords,
    getSessionsRecords: state.getSessionsRecords,
    activeSessionsRecord: state.activeSessionsRecord,
    inactiveSessionsRecord: state.inactiveSessionsRecord,
    inActivateSessions: state.inActivateSessions,
    comboByName: state.comboByName,
    asOptions: state.asOptions,
    comboByNameactive: state.comboByNameactive,
    comboByNameinactive: state.comboByNameinactive,
    getRecord: state.getRecord,
    current: state.current,
  }));

  React.useEffect(() => {
    fetchSettings();
    storeDayFormat.getRecords();
    storeDayFormat.getSessionsRecords();
  }, []);

  const optionsnameofFormat = storeDayFormat.comboByName;
  const optionweekoff = todoLookUps.getState().weekoff;
  const optionsactive = storeDayFormat.comboByNameactive;
  const optionsinactive = storeDayFormat.comboByNameinactive;
  const [activeweekoffValue, setactiveweekoffValue] = React.useState('');
  const [weekoffValue, setweekoffValue] = useState('');

  const [nameofFormatValue, setnameofFormatValue] = useState('');
  const [activeValue, setactiveValue] = React.useState('');

  const [inactiveValue, setinactiveValue] = useState('');
  const first = _.first(optionweekoff);
  const weekoffFirstOption = _.get(first, ['value'], '');
  const nameofFormatFirst = _.first(optionsnameofFormat);
  const nameofFormatFirstOption = _.get(nameofFormatFirst, ['value'], '');
  React.useEffect(() => {
    setnameofFormatValue(nameofFormatFirstOption);
  }, [optionweekoff]);
  React.useEffect(() => {}, [nameofFormatValue]);
  React.useEffect(() => {}, [weekoffValue]);
  const handleOnChange = (event: any) => {
    const data = storeDayFormat.allRecords?.filter(
      (sessions: any) => sessions.id === event,
    );
    let weekoffdata = '';
    data[0].weekoff.map((element) => {
      weekoffdata += element;
    });

    setweekoffValue(weekoffdata);
    setnameofFormatValue(event);
    storeDayFormat.getSessionsRecords(event);
  };

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = ({ action }) => {
    if (action === 'inactivate') {
      const data = { inactive: true };
      storeDayFormat.inActivateSessions(activeValue, data);
    }
    else if (action === 'activate') {
      const data = { inactive: false };
      storeDayFormat.inActivateSessions(inactiveValue, data);
    }
  };

  React.useEffect(() => {
    if (isEmptyValue(activeValue)) {
      const first = _.first(optionsactive);
      const val = _.get(first, ['value'], '');
      setactiveValue(val);
    }
  }, [optionsactive]);
  React.useEffect(() => {
    storeDayFormat.getSessionsRecords(activeValue);
    storeDayFormat.getRecord(activeValue);
    let weekoffdata = '';

    if (!isEmptyValue(storeDayFormat.current)) {
      if (!isEmptyValue(storeDayFormat.current.weekoff)) {
        storeDayFormat.current.weekoff.map((element) => {
          weekoffdata += element;
        });
      }
    }

    setactiveweekoffValue(weekoffdata);
  }, [activeValue]);
  React.useEffect(() => {
    if (isEmptyValue(inactiveValue)) {
      const first = _.first(optionsinactive);
      const val = _.get(first, ['value'], '');
      setinactiveValue(val);
    }
  }, [optionsinactive]);

  React.useEffect(() => {
    storeDayFormat.getSessionsRecords(inactiveValue);
    storeDayFormat.getRecord(inactiveValue);
    let weekoffdata = '';
    if (!isEmptyValue(storeDayFormat.current)) {
      if (!isEmptyValue(storeDayFormat.current.weekoff)) {
        storeDayFormat.current.weekoff.map((element) => {
          weekoffdata += element;
        });
      }
    }

    setweekoffValue(weekoffdata);
  }, [inactiveValue]);

  const activecolumns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelDayFormat.columns(settings);
    /* cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <span>
          <Button
            type="link"
            onClick={() => handleActionClick({ action: 'inactivate', record })}
            style={{ color: 'red' }}
          >
            Deactivate
          </Button>
        </span>,
      ],
    }); */
    return cols;
  }, [settings]);

  const inactiveColumns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelDayFormat.columns(settings);
    /* cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <span>
          <Button
            type="link"
            onClick={() => handleActionClick({ action: 'activate', record })}
          >
            Activate
          </Button>
        </span>,
      ],
    }); */
    return cols;
  }, [settings]);

  const tabPages = [
    {
      label: 'Active Sessions',
      key: 'active-sessions',
      children: (
        <div>
          <Row justify="start">
            <Col>
              <Space>
                Day Format:
                <Select
                  style={{ width: 400 }}
                  options={optionsactive}
                  value={activeValue}
                  onChange={(event) => {
                    setactiveValue(event);
                  }}
                />
              </Space>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button></Button>
            </Col>
          </Row>
          <Row justify="start">
            <Col>
              <Space>
                Week Off:
                {activeweekoffValue}
              </Space>
            </Col>
          </Row>
          <Table
            bordered
            columns={activecolumns}
            dataSource={storeDayFormat.sessionsallRecords}
          />
          <Row className='justify-center'> <Button
            size='small'
            type="primary"
            onClick={() => handleActionClick({ action: 'inactivate' })}
            style={{ background: 'red', color: 'white' }}
          >
            Deactivate
          </Button></Row>

        </div>
      ),
    },

    {
      label: 'Inactive Sessions',
      key: 'inactive-sessions',
      children: (
        <div>
          <Row justify="start">
            <Col>
              <Space>
                Day Format:
                <Select
                  style={{ width: 400 }}
                  options={optionsinactive}
                  value={inactiveValue}
                  onChange={(event) => {
                    setinactiveValue(event);
                  }}
                />
              </Space>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button></Button>
            </Col>
          </Row>
          <Row justify="start">
            <Col>
              <Space>
                Week Off:
                {weekoffValue}
              </Space>
            </Col>
          </Row>

          <Table
            bordered
            columns={inactiveColumns}
            dataSource={storeDayFormat.sessionsallRecords}
          />
            <Row className='justify-center'> <Button
            size='small'
            type="primary"
            onClick={() => handleActionClick({ action: 'activate' })}
            style={{ background: 'green', color: 'white' }}
          >
            Activate
          </Button></Row>
        </div>
      ),
    },
  ];

  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Day Format">
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add Day Format
            </Button>
          </Col>
        </Row>

        <Tabs items={tabPages} tabPosition="top" />
      </Card>
    </div>
  );
};

export default DayFormatList;
