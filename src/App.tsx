import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { LoginForm } from '@/components/auth/login-form';
import { RegisterForm } from '@/components/auth/register-form';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { DashboardView } from '@/components/dashboard/dashboard-view';
import { IrrigationView } from '@/components/irrigation/irrigation-view';
import { ForumView } from '@/components/forum/forum-view';
import { AnalyticsView } from '@/components/analytics/analytics-view';
import { NotFound } from '@/components/layout/not-found';
import { isAuthenticatedAtom } from '@/lib/store';
import { ROUTES } from '@/lib/constants';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}

export function App() {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  return (
    <Router>
      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.DASHBOARD} replace />
            ) : (
              <LoginForm />
            )
          }
        />
        <Route
          path={ROUTES.REGISTER}
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.DASHBOARD} replace />
            ) : (
              <RegisterForm />
            )
          }
        />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.IRRIGATION}
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <IrrigationView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.FORUM}
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ForumView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ANALYTICS}
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AnalyticsView />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}