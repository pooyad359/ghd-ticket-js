import React, { useState } from 'react';
import { Card, Typography, Table, Button, Space } from 'antd';
import { getTicketColumns } from './tableColumns';

const { Title } = Typography;

const TicketsSection = ({ tickets, onTicketChange, onBulkStatusChange }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const columns = getTicketColumns(onTicketChange);

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
    { label: 'Set Packed', status: 'Packed', color: 'green' },
    { label: 'Set In Progress', status: 'In Progress', color: 'blue' },
    { label: 'Set Pending', status: 'Pending', color: 'orange' },
  ];

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>Tickets</Title>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tickets}
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

export default TicketsSection;