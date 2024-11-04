import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { NotificationProvider } from '@/components/notifications/notification-provider';
import { ErrorBoundary } from '@/components/layout/error-boundary';
import { App } from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" storageKey="sustania-ui-theme">
        <QueryClientProvider client={queryClient}>
          <JotaiProvider>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </JotaiProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);