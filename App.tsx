import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { MonitorDetail } from './pages/MonitorDetail';
import { RuleConfig } from './pages/RuleConfig';
import { ProcessConfig } from './pages/ProcessConfig';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/monitor" element={<MonitorDetail />} />
          <Route path="/rules" element={<RuleConfig />} />
          <Route path="/process" element={<ProcessConfig />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;