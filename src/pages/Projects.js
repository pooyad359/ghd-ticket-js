import React, { useState } from 'react';
import { Card, Input, Col, Row, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

// Sample data - replace with your actual data source
const sampleProjects = [
  {
    id: 'proj-001',
    name: 'Website Redesign',
    client: 'TechCorp Inc',
    image: 'https://picsum.photos/id/1001/400'
  },
  {
    id: 'proj-002',
    name: 'Mobile App Development',
    client: 'StartupX',
    image: 'https://picsum.photos/id/1002/400'
  },
  {
    id: 'proj-003',
    name: 'Brand Identity',
    client: 'Fashion House',
    image: 'https://picsum.photos/id/1003/400'
  },
  {
    id: 'proj-004',
    name: 'E-commerce Platform',
    client: 'Retail Solutions',
    image: 'https://picsum.photos/id/1004/400'
  },
  {
    id: 'proj-005',
    name: 'Marketing Campaign',
    client: 'Global Foods',
    image: 'https://picsum.photos/id/1005/400'
  },
  {
    id: 'proj-006',
    name: 'Data Analytics Dashboard',
    client: 'Tech Analytics',
    image: 'https://picsum.photos/id/1006/400'
  }
];

const ProjectCard = ({ project, onClick }) => (
  <Card
    hoverable
    cover={<img alt={project.name} src={project.image} style={{ height: 200, objectFit: 'cover' }} />}
    onClick={() => onClick(project.id)}
  >
    <Meta 
      title={project.name}
      description={project.client}
    />
  </Card>
);

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Filter projects based on search query
  const filteredProjects = sampleProjects.filter(project => {
    const searchLower = searchQuery.toLowerCase();
    return (
      project.name.toLowerCase().includes(searchLower) ||
      project.client.toLowerCase().includes(searchLower)
    );
  });

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Search Bar */}
      <div style={{ maxWidth: '500px', margin: '0 auto 24px' }}>
        <Input
          placeholder="Search projects..."
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="large"
        />
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <Row gutter={[16, 16]}>
          {filteredProjects.map(project => (
            <Col 
              xs={12}  // 2 cards per row on mobile (24/12 = 2)
              md={8}   // 3 cards per row on tablet (24/8 = 3)
              xl={4}   // 6 cards per row on desktop (24/4 = 6)
              key={project.id}
            >
              <ProjectCard
                project={project}
                onClick={handleProjectClick}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty 
          description="No projects found matching your search"
          style={{ margin: '48px 0' }}
        />
      )}
    </div>
  );
};

export default ProjectsPage;