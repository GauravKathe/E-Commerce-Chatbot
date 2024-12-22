import { jwtDecode } from 'jwt-decode';
import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      return true;
    }
    throw new Error(response.data.message || 'Login failed');
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}; 