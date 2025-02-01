import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, message, Spin } from 'antd';
import ProjectDetailsSection from '../components/ProjectDetailsSection';
import TicketsSection from '../components/TicketsSection';
import FabricsSection from '../components/FabricsSection';

const ProjectPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [editedProject, setEditedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch('/sample_project.json');
        const project = await response.json();
        setProject(project);
        setEditedProject(project);
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

  const handleBulkTicketStatusChange = (selectedIds, newStatus) => {
    const newTickets = editedProject.tickets.map(ticket => {
      if (selectedIds.includes(ticket.id)) {
        return { ...ticket, status: newStatus };
      }
      return ticket;
    });
    setEditedProject({ ...editedProject, tickets: newTickets });
  };

  const handleBulkFabricStatusChange = (selectedIds, newStatus) => {
    const newFabrics = editedProject.fabrics.map(fabric => {
      if (selectedIds.includes(fabric.id)) {
        return { ...fabric, status: newStatus };
      }
      return fabric;
    });
    setEditedProject({ ...editedProject, fabrics: newFabrics });
  };

  const handleUpdateProject = async () => {
    setIsLoading(true);
    try {
    //   const response = await fetch('/api/projects/' + projectId, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(editedProject),
    //   });
      
    //   if (!response.ok) {
    //     throw new Error('Failed to update project');
    //   }
      await new Promise(resolve => setTimeout(resolve, 3000));
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
        <ProjectDetailsSection project={project} />
        
        <TicketsSection 
          tickets={editedProject.tickets}
          onTicketChange={handleTicketChange}
          onBulkStatusChange={handleBulkTicketStatusChange}
        />
        
        <FabricsSection 
          fabrics={editedProject.fabrics}
          onFabricChange={handleFabricChange}
          onBulkStatusChange={handleBulkFabricStatusChange}
        />

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

export default ProjectPage;