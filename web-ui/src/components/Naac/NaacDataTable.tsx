import { DownloadOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';

const NaacDataTable = ({ columns, dataSource, downloadBtn }) => {
  return (
    <>
      {downloadBtn && <div style={{ display: "flex", justifyContent: "flex-end", margin: '1rem 0' }}>
        <Button type="primary" icon={<DownloadOutlined />} shape="round" >Download Report</Button>
      </div>}

      <Table bordered columns={columns} dataSource={dataSource} />
    </>
  )
}

export default NaacDataTable