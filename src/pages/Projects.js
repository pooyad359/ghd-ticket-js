import React, { useState, useEffect } from 'react';
import { Card, Input, Col, Row, Empty, Spin, message , Tag} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const url = "https://8ap1z6w9bb.execute-api.ap-southeast-1.amazonaws.com/prod/projects";

const ProjectCard = ({ project, onClick }) => {
  const name = encodeURIComponent(project.name);
  const url = project.image || `https://api.dicebear.com/9.x/initials/svg?seed=${name}`;
  return <Card
    hoverable
    cover={<img alt={project.name} src={url} style={{ height: 200, objectFit: 'cover' }} onClick={() => onClick(project.id)}/>}
    
  >
    <Meta 
      title={project.name}
      description={project.client}
      extra={project.uid}
    />
    <Tag color={'gray'} style={{ marginTop: 8 }}>
      {project.uid}
    </Tag>
  </Card>
};

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        message.error("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on search query
  const filteredProjects = projects.filter(project => {
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

      {/* Projects Grid with Loading State */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : filteredProjects.length > 0 ? (
        <Row gutter={[16, 16]}>
          {filteredProjects.map(project => (
            <Col 
              xs={12}
              md={8}
              xl={4}
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
