import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { LoginForm } from '@/components/auth/login-form';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { isAuthenticatedAtom } from '@/lib/store';
import { ROUTES } from '@/lib/constants';

// Lazy load components
const RegisterForm = lazy(() => import('@/components/auth/register-form').then(m => ({ default: m.RegisterForm })));
const DashboardView = lazy(() => import('@/components/dashboard/dashboard-view').then(m => ({ default: m.DashboardView })));
const IrrigationView = lazy(() => import('@/components/irrigation/irrigation-view').then(m => ({ default: m.IrrigationView })));
const ForumView = lazy(() => import('@/components/forum/forum-view').then(m => ({ default: m.ForumView })));
const WeatherView = lazy(() => import('@/components/weather/weather-view').then(m => ({ default: m.WeatherView })));
const AnalyticsView = lazy(() => import('@/components/analytics/analytics-view').then(m => ({ default: m.AnalyticsView })));
const SupportView = lazy(() => import('@/components/support/support-view').then(m => ({ default: m.SupportView })));
const ProfileView = lazy(() => import('@/components/profile/profile-view').then(m => ({ default: m.ProfileView })));
const AboutView = lazy(() => import('@/components/about/about-view').then(m => ({ default: m.AboutView })));
const NotFound = lazy(() => import('@/components/layout/not-found').then(m => ({ default: m.NotFound })));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    }>
      {children}
    </Suspense>
  );
}

export function App() {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  return (
    <Router>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={
            <SuspenseWrapper>
              <AboutView />
            </SuspenseWrapper>
          }
        />
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
              <SuspenseWrapper>
                <RegisterForm />
              </SuspenseWrapper>
            )
          }
        />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SuspenseWrapper>
                  <DashboardView />
                </SuspenseWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.IRRIGATION}
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SuspenseWrapper>
                  <IrrigationView />
                </SuspenseWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.FORUM}
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SuspenseWrapper>
                  <ForumView />
                </SuspenseWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.WEATHER}
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SuspenseWrapper>
                  <WeatherView />
                </SuspenseWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ANALYTICS}
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SuspenseWrapper>
                  <AnalyticsView />
                </SuspenseWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.SUPPORT}
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SuspenseWrapper>
                  <SupportView />
                </SuspenseWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SuspenseWrapper>
                  <ProfileView />
                </SuspenseWrapper>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <SuspenseWrapper>
              <NotFound />
            </SuspenseWrapper>
          }
        />
      </Routes>
    </Router>
  );
}