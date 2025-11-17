
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from './router/Router';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isSecondLoginOpen, setIsSecondLoginOpen] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: "", secretKey: "" });

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleCredentialChange = (key: string, value: string) => {
    setCredentials((prev) => ({ ...prev, [key]: value }));
  };

  const handleAdminCredentialChange = (key: string, value: string) => {
    setAdminCredentials((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = () => {
    console.log("User Login:", credentials);
    setIsLoginOpen(false);
  };

  const handleAdminLogin = () => {
    console.log("Admin Login:", adminCredentials);
    setIsSecondLoginOpen(false);
  };

  return (
      <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
