import Toast from '@linen/ui/Toast';
import { SessionProvider } from '@linen/auth/client';
import { baseAuth, env } from '@/config';
import { UsersContext } from '@linen/contexts/Users';
import Router from '@/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PostHogProvider } from 'posthog-js/react';

const queryClient = new QueryClient();

function App() {
  return (
    <PostHogProvider
      apiKey={env.REACT_APP_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: env.REACT_APP_PUBLIC_POSTHOG_HOST,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <SessionProvider basePath={baseAuth}>
          <UsersContext>
            <Toast.ToastContext
              containerStyle={{ bottom: '2rem', left: '2rem' }}
              position="bottom-left"
            />
            <Router />
          </UsersContext>
        </SessionProvider>
      </QueryClientProvider>
    </PostHogProvider>
  );
}

export default App;
