import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

interface User { id: number; name: string; email: string; role: string; }
interface AuthState { token: string | null; user: User | null; isAuthenticated: boolean; }
type AuthAction = | { type: 'LOGIN_SUCCESS'; payload: { token: string; user: User } } | { type: 'LOGOUT' };

const AuthContext = createContext<any>(null);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { 
        token: action.payload.token, 
        user: action.payload.user, 
        isAuthenticated: true 
      };
    case 'LOGOUT':
      return { token: null, user: null, isAuthenticated: false };
    default: return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    token: localStorage.getItem('authToken'),
    user: null,
    isAuthenticated: !!localStorage.getItem('authToken'),
  });

  useEffect(() => {
    if (state.token) {
      axios.get('http://localhost:4000/auth/me', { 
        headers: { Authorization: `Bearer ${state.token}` } 
      })
      .then(res => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: { token: state.token!, user: res.data } });
      })
      .catch(() => logout());
    }
  }, [state.token, state.user]);

  const login = (token: string, user: User) => {
    localStorage.setItem('authToken', token);
    
    dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ 
      token: state.token, 
      userId: state.user?.id, 
      userRole: state.user?.role, 
      isAuthenticated: state.isAuthenticated, 
      login, logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);