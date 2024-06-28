import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './components/screens/TodoList/TodoList';
import TodoCalendar from './components/screens/TodoСalendar/TodoСalendar';
import Home from './components/screens/Home/Home';
import Navbar from './components/navigation/Navbar';
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import EditProfile from './components/screens/UserProfile/EditProfile'

const App = () => {
    return (
      <AuthProvider>
        <Router>
          <div className='flex'>
            <Navbar />
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/list" element={
                <ProtectedRoute>
                  <TodoList />
                </ProtectedRoute>
              } />
              <Route path="/grap" element={
                <ProtectedRoute>
                  <TodoCalendar />
                </ProtectedRoute>
              } />
              <Route path="/edit-profile" element={
                <ProtectedRoute>
                   <EditProfile />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    );
  }

export default App;
