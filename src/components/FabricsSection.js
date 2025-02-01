import React, { useState } from 'react';
import { Card, Typography, Table, Button, Space } from 'antd';
import { getFabricColumns } from './tableColumns';

const { Title } = Typography;

const FabricsSection = ({ fabrics, onFabricChange, onBulkStatusChange }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const columns = getFabricColumns(onFabricChange);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const handleBulkStatusUpdate = (newStatus) => {
    onBulkStatusChange(selectedRowKeys, newStatus);
    setSelectedRowKeys([]); // Clear selection after update
  };

  const bulkActions = [
    { label: 'Set Received', status: 'Received', color: 'green' },
    { label: 'Set Pending', status: 'Pending', color: 'orange' },
    { label: 'Set Ordered', status: 'Ordered', color: 'blue' },
  ];

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>Fabrics</Title>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={fabrics}
        rowKey="id"
        scroll={{ x: true }}
      />
      {selectedRowKeys.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <Space>
            {bulkActions.map(action => (
              <Button
                key={action.status}
                type="primary"
                style={{ backgroundColor: action.color }}
                onClick={() => handleBulkStatusUpdate(action.status)}
              >
                {action.label} ({selectedRowKeys.length} selected)
              </Button>
            ))}
          </Space>
        </div>
      )}
    </Card>
  );
};

export default FabricsSection;