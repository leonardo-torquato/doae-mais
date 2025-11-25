import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Importar AuthProvider
import CleanLayout from "./components/UI/CleanLayout";

// Páginas
import Home from "./pages/Home";
import DonorArea from "./pages/DonorArea";
import AdminArea from "./pages/AdminArea";
import Needs from "./pages/Needs";
import Login from "./pages/Login";

// Componente de Proteção
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <CleanLayout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/donor" component={DonorArea} />
            <Route path="/needs" component={Needs} />
            
            {/* Rota Pública de Login */}
            <Route path="/login" component={Login} />
            
            {/* Rota Protegida de Admin */}
            <ProtectedRoute path="/admin" component={AdminArea} />
          </Switch>
        </CleanLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;