import React, { useEffect, useRef, useState } from 'react';
import { When } from 'react-if';
import { DeleteOutlined, EditOutlined, LoginOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import SearchForm from './searchForm';

interface Pagination {
  currentPage: number;
  pageSize: number;
}

interface IProps {
  data: any;
  columns: any;
  pagination: Pagination;
  allowSearch: Boolean;
  handleActionClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableContainer = ({ data, columns, pagination, allowSearch, handleActionClick }: IProps) => {
  const [tableData, setTableData] = useState([]);
  const [cols, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(pagination?.currentPage);
  const [pageSize, setPageSize] = useState(pagination?.pageSize);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: any,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ?.toString()
        ?.toLowerCase()
        ?.includes((value as string)?.toLowerCase()),
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: any) =>
      searchedColumn === dataIndex
        ? (<div
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />)
        : (text),
  });

  const getActionColumns = (columns: any, handleClick: any) => {
    const colIndex = columns?.columns?.length - 1;
    const col = columns.columns[colIndex];

    if (!Object.hasOwn(col, 'render') && (col.dataIndex === 'action' || col.dataIndex === 'aytype')) {
      col.render = (text: any, row: any) => {
        return (
          <>
            {col.buttons.map((button: any) => (
              <>
                {button === 'Edit'
                  ? (
                    <EditOutlined
                      onClick={() => {
                        handleClick({ action: 'edit', id: row[col.primaryKey] });
                      }}
                    />
                    )
                  : (
                      ''
                    )}
                {button === 'Delete'
                  ? (
                    <DeleteOutlined
                      onClick={() => {
                        handleClick({ action: 'delete', id: row[col.primaryKey] });
                      }}
                      style={{ color: 'red', marginLeft: 10 }}
                    />
                    )
                  : (
                      ''
                    )}
                {button === 'Activate'
                  ? (
                    <LoginOutlined
                      onClick={() => {
                        handleClick({ action: 'activate', id: row[col.primaryKey] });
                      }}
                      style={{ color: 'blue', marginLeft: 10 }}
                    />
                    )
                  : (
                      ''
                    )}
                {button === 'togglechange'
                  ? (

                    <p>{row.aytype}
                      <ReloadOutlined
                        onClick={() => {
                          handleClick({ action: 'changetype', id: row[col.primaryKey] });
                        }}
                        style={{ color: 'black', font: 'bold', marginLeft: 10 }}
                      /></p>

                    )
                  : (
                      ''
                    )}
              </>
            ))}
          </>
        );
      };
    }
    return columns;
  };

  // sortingFiltering
  const getSortedFilteredColumns = (data: any) => {
    if (data?.columns) {
      // we can add further sorting and filtering logic based on type and ant table's sorting and filtering options
      for (const col in data.columns) {
        const c = data.columns[col].dataIndex;
        if (data.columns[col].sorting?.isSort) {
          data.columns[col].sorter = (a: any, b: any) => a[c].length - b[c].length;
        }
        if (data.columns[col].filtering?.isFilter) {
          const searchProps = getColumnSearchProps(c);
          data.columns[col] = {
            ...searchProps,
            ...data.columns[col],
          };
        }
      }
      return data.columns;
    }
  };
  const handleSearchClick = (values: any) => {
    setTableData(values);
  };

  useEffect(() => {
    setLoading(true);
    if (columns?.columns?.length && cols?.length === 0) {
      const sortedFilteredColumn = getSortedFilteredColumns(getActionColumns(columns, handleActionClick));
      setColumns(sortedFilteredColumn);
    }
    setTableData(data);
    setLoading(false);
  }, [data, columns]);

  return (<>
    <When condition={allowSearch === true}>
      <SearchForm
        searchFormInputs={columns?.searchFormInputs}
        data={data}
        handleSearchClick={handleSearchClick}
      />
      <div className="p-2"></div>
    </When>
    <Table
      columns={cols}
      dataSource={tableData}
      loading={loading}
      pagination={{
        current: page,
        pageSize,
        onChange: (page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
          // Make the api call here for server side pagination using page and page size
        },
      }}
    />
  </>
  );
};

export default TableContainer;
