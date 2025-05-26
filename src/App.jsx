import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContextProvider";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
