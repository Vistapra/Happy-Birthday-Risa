import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import Viewer from './components/Viewer';
import AdminDashboard from './screens/Admin/AdminDashboard';
import EditScreen from './screens/Admin/EditScreen';

// Main App Wrapper
const App: React.FC = () => {
  return (
    <ContentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Viewer />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/edit/:slug" element={<EditScreen />} />
        </Routes>
      </Router>
    </ContentProvider>
  );
};

export default App;