import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Irrigation } from './pages/Irrigation';
import { Analytics } from './pages/Analytics';
import { Weather } from './pages/Weather';
import { Forum } from './pages/Forum';
import { Support } from './pages/Support';
import { Profile } from './pages/Profile';
import { Layout } from './components/Layout';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="irrigation" element={<Irrigation />} />
          <Route path="weather" element={<Weather />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="forum" element={<Forum />} />
          <Route path="support" element={<Support />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}