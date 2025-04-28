import { AuthProvider } from '../src/context/auth/AuthProvider';
import { AppRouter } from '../src/router/AppRouter';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
