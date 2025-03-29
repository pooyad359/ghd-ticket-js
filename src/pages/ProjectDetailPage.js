// **************************************************************************
// This component is not used in the current version of the app.
// **************************************************************************

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Table,
  Typography,
  Tag,
  Space,
  Descriptions,
  Button,
  Input,
  Select,
  DatePicker,
  message,
  Spin
} from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

const url = 'https://8ap1z6w9bb.execute-api.ap-southeast-1.amazonaws.com/prod/projects/'
const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [editedProject, setEditedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch project data from JSON file
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // const response = await fetch('/sample_project.json');
        const response = await fetch(url + projectId);
        if (!response.ok) {
          throw new Error('Invalid response from server');
        }
        const project = await response.json();
        setProject(project);
        setEditedProject(project); // Initialize edited version
      } catch (error) {
        message.error('Failed to load project details');
      }
    };

    fetchProject();
  }, [projectId]);

  const handleTicketChange = (key, value, record) => {
    const newTickets = editedProject.tickets.map(ticket => {
      if (ticket.id === record.id) {
        return { ...ticket, [key]: value };
      }
      return ticket;
    });
    setEditedProject({ ...editedProject, tickets: newTickets });
  };

  const handleFabricChange = (key, value, record) => {
    const newFabrics = editedProject.fabrics.map(fabric => {
      if (fabric.id === record.id) {
        return { ...fabric, [key]: value };
      }
      return fabric;
    });
    setEditedProject({ ...editedProject, fabrics: newFabrics });
  };

  // Ticket columns configuration with only status editable
  const ticketColumns = [
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
      render: (text, record) => (
        <DatePicker
          value={text ? dayjs(text) : null}
          onChange={(date, dateString) => handleTicketChange('due_date', dateString, record)}
        />
      ),
    },
  ];

  // Fabric columns configuration with only status editable
  const fabricColumns = [
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
  ];

  const handleUpdateProject = async () => {
    setIsLoading(true);
    try {
      // Replace with your actual API endpoint
      // const response = await fetch('/api/projects/' + projectId, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(editedProject),
      // });
      await new Promise(resolve => setTimeout(resolve, 3000));
      if (!response.ok) {
        throw new Error('Failed to update project');
      }
      
      setProject(editedProject);
      message.success('Project updated successfully');
    } catch (error) {
      message.error('Failed to update project');
    } finally {
      setIsLoading(false);
    }
  };

  if (!project || !editedProject) {
    return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>;
  }

  return (
    <Spin spinning={isLoading}>
      <div style={{ padding: '24px' }}>
        {/* Project Details Section */}
        <Card style={{ marginBottom: '24px' }}>
          <Title level={4}>Project Details</Title>
          <Descriptions bordered>
            <Descriptions.Item label="Project Name">{project.name}</Descriptions.Item>
            <Descriptions.Item label="Client">{project.client}</Descriptions.Item>
            <Descriptions.Item label="Project ID">{project.id}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={project.is_active ? 'green' : 'red'}>
                {project.is_active ? 'Active' : 'Inactive'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Last Updated">
              {dayjs(project.updated_at).format('YYYY-MM-DD HH:mm')}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Tickets Section */}
        <Card style={{ marginBottom: '24px' }}>
          <Title level={4}>Tickets</Title>
          <Table
            columns={ticketColumns}
            dataSource={editedProject.tickets}
            rowKey="id"
            scroll={{ x: true }}
          />
        </Card>

        {/* Fabrics Section */}
        <Card style={{ marginBottom: '24px' }}>
          <Title level={4}>Fabrics</Title>
          <Table
            columns={fabricColumns}
            dataSource={editedProject.fabrics}
            rowKey="id"
            scroll={{ x: true }}
          />
        </Card>

        {/* Update Button */}
        <div style={{ textAlign: 'right', marginTop: '24px' }}>
          <Button 
            type="primary" 
            onClick={handleUpdateProject}
            loading={isLoading}
          >
            Update Project
          </Button>
        </div>
      </div>
    </Spin>
  );
};

export default ProjectDetailPage;