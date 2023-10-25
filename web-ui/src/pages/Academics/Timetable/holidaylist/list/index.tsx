import React, { useState } from 'react';
import _, { set } from 'lodash';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Row,
  Select,
  Space,
  Table,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { useHolidayList } from '@/store/Academics/timeTable/useHolidaylist';
import * as modelHolidayList from '@/models/Academics/Timetableandattendance/HolidayList';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useSettings } from '@/store/settings/useSettings';
import { isEmptyValue } from '@/utils/object';
const HolidayList = () => {
  const navigate = useNavigate();

  const storeHolidayList = useHolidayList((state: any) => ({
    allRecords: state.allRecords,
    holidaylist: state.holidaylist,
    deleteRecord: state.deleteRecord,
    getRecords: state.getRecords,
    getHolidayList: state.getHolidayList,
    allHolidayList: state.allHolidayList,
    allCheck: state.allCheck,
  }));

  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    allRecords: state.allRecords,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const optionsAcademicYear = React.useMemo(
    () => storeAcademicYear.comboByName || [],
    [storeAcademicYear.comboByName],
  );
  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      // getHOlidaylist(record?.id);
      navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
    }
    else if (action === 'delete') {
      storeHolidayList.deleteRecord(record.id);
    }
    else if (action === 'checkbox') {
      storeHolidayList.allCheck(record.id);
    }
  };
  const [selectAcademicyear, setAcademicyear] = React.useState('');
  const [isdisabled, setIsdisabled] = React.useState(true);
  const [allcheckedKeys, setallcheckedKeys] = useState([{}]);
  const [checkAll, setcheckAll] = useState(false);
  const [isAdddisabled, setisAdddisabled] = React.useState(false);

  React.useEffect(() => {
    fetchSettings();
  }, []);
  const handleOptionChange = (value: string) => {
    const data = storeAcademicYear.allRecords?.filter((academicYear: any) => academicYear.yearAt === value);
    let isActiveyear = 'false';
    if (data.length === 0) {
      isActiveyear = data[0].isActive;
    }
    if (isActiveyear === true) {
      setisAdddisabled(false);
    }
    else {
      setisAdddisabled(true);
    }
    storeHolidayList.getRecords(value);
    storeAcademicYear.getAcademicYearDetails();
    setAcademicyear(value);
  };

  React.useEffect(() => {
    if (isEmptyValue(selectAcademicyear)) {
      const yearFirst = _.first(optionsAcademicYear);
      const yearFirstOption = _.get(yearFirst, ['value'], '');

      storeHolidayList.getRecords(yearFirstOption);
    }
  }, [storeAcademicYear.comboByName]);
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelHolidayList.columns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <Button
          type="link"
          onClick={() => handleActionClick({ action: 'edit', record })}
        >
          Edit
        </Button>,
        <Button
          type="link"
          style={{ color: 'red' }}
          onClick={() => handleActionClick({ action: 'delete', record })}
        >
          Delete
        </Button>,
      ],
    });
    return cols;
  }, [settings]);

  // code for Select All Checbox for table rows
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleSelect = (record, selected) => {
    if (selected) {
      setIsdisabled(false);
      setSelectedRowKeys(keys => [...keys, record.key]);
    }
    else {
      setSelectedRowKeys((keys) => {
        const index = keys.indexOf(record.key);
        return [...keys.slice(0, index), ...keys.slice(index + 1)];
      });
    }
  };

  const toggleSelectAll = () => {
    setIsdisabled(false);
    setSelectedRowKeys(keys =>
      keys.length === storeHolidayList.allRecords.length ? [] : storeHolidayList.allRecords.map(r => r.id),
    );
    set;
  };

  const headerCheckbox = (
    <Checkbox
      checked = {selectedRowKeys.length}
      indeterminate={
        selectedRowKeys.length > 0 && selectedRowKeys.length < storeHolidayList.allRecords.length
      }
      onChange={toggleSelectAll}
    />
  );

  const rowSelection = {
    selectedRowKeys,
    type: 'checkbox',
    fixed: true,
    onSelect: handleSelect,
    columnTitle: headerCheckbox,
    // onSelectAll: this.handleSelectAll
  };
  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Holiday List">
        <Row className="justify-center">
          <Col>
            <Space>
              Academic Year:
              <Select
                style={{ width: 400 }}
                options={optionsAcademicYear}
                defaultValue={yearFirstOption}
                onChange={(value: string) => handleOptionChange(value)}
              ></Select>
            </Space>
          </Col>
        </Row>
        <Row justify="end" key="holidaylist-header">
          <Col>
            <Button type="primary" disabled={isAdddisabled}
 onClick={navigateToNewForm}>
              Add Holiday
            </Button>
          </Col>
        </Row>
        <Divider orientation="left" plain></Divider>
        <Row justify="start">
          <Col>
            <Button
              type="primary"
              style={{ background: 'red', color: 'white' }}
              disabled={isdisabled}
            >
              Delete
            </Button>
          </Col>
        </Row>

        <Table
          rowSelection={rowSelection}
          rowKey={record => record.id}
          bordered
          columns={columns}
          dataSource={storeHolidayList.allRecords}
        />
      </Card>
    </div>
  );
};

export default HolidayList;
