import React from 'react';
import { Card, Typography, Tag, Descriptions } from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;

const ProjectDetailsSection = ({ project }) => {
  return (
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
  );
};

export default ProjectDetailsSection;