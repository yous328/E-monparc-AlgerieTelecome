// src/App.tsx
import { AuthProvider } from './context/auth/AuthProvider';
import { AppRouter } from './router/AppRouter';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster 
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: '#10B981',
              color: 'white',
              padding: '16px',
              borderRadius: '8px',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: '#EF4444',
              color: 'white',
              padding: '16px',
              borderRadius: '8px',
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;