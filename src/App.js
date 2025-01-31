
import './App.css';
import FetchData from './pages/TicketsPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
const Blogs = () => {
  return (
    <div>
      <h1>Blogs</h1>
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
      <Routes>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="tickets" element={<FetchData />} />
          <Route path="*" element={<NoPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
