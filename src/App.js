
import './App.css';
import FetchData from './pages/TicketsPage';
import ProjectsPage from './pages/Projects';
import ProjectPage from './pages/ProjectPage';
import AppLayout from './components/AppLayout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

const Contact = () => {
  return (
    <div>
      <h1>Contact</h1>
    </div>
  );
}
const NoPage = () => {
  return (
    <div>
      <h1>404 Page</h1>
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
          <AppLayout >
      <Routes>
          <Route index element={<Home />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="tickets" element={<FetchData />} />
          <Route path="projects/:projectId" element={<ProjectPage />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
          </AppLayout >
    </BrowserRouter>
  );
}

export default App;
