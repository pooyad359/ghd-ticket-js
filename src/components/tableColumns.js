import { Tag, Select } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

export const getTicketColumns = (handleTicketChange) => [
  {
    title: 'Package No',
    dataIndex: 'package_no',
    key: 'package_no',
  },
  {
    title: 'Piece No',
    dataIndex: 'piece_no',
    key: 'piece_no',
  },
  {
    title: 'Room',
    dataIndex: 'room',
    key: 'room',
  },
  {
    title: 'Window',
    dataIndex: 'window',
    key: 'window',
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Fabric',
    dataIndex: 'fabric',
    key: 'fabric',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => (
      <Select
        value={text}
        onChange={value => handleTicketChange('status', value, record)}
        style={{ width: '100%' }}
      >
        <Option value="Packed">Packed</Option>
        <Option value="In Progress">In Progress</Option>
        <Option value="Pending">Pending</Option>
      </Select>
    ),
  },
  {
    title: 'Due Date',
    dataIndex: 'due_date',
    key: 'due_date',
    render: (text) => text ? dayjs(text).format('MM/DD/YYYY') : '',
  },
];

export const getFabricColumns = (handleFabricChange) => [
  {
    title: 'Design',
    dataIndex: 'design',
    key: 'design',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'Colour',
    dataIndex: 'colour',
    key: 'colour',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Width',
    dataIndex: 'width',
    key: 'width',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => (
      <Select
        value={text}
        onChange={value => handleFabricChange('status', value, record)}
        style={{ width: '100%' }}
      >
        <Option value="Received">Received</Option>
        <Option value="Pending">Pending</Option>
        <Option value="Ordered">Ordered</Option>
      </Select>
    ),
  },
  {
    title: 'ETA',
    dataIndex: 'eta',
    key: 'eta',
  },
];