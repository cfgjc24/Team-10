import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AdminPage from './pages/AdminPage.jsx'
import ManagerPage from './pages/ManagerPage.jsx'
import EmployeePage from './pages/EmployeePage.jsx'
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar.jsx'
import SubmitForm from './pages/SubmitForm.jsx'
import Chatbot from './components/Chatbot.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Navbar/>
        <Chatbot className="chatbot-container" />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/manager" element={<ManagerPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/submitform" element={<SubmitForm />} />

        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
