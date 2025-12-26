
// ///////////////////////////////////////////////////////////////////////////////////////////////////

// // import React, { createContext, useReducer, useContext } from 'react';

// // interface User {
// //   id: string;
// //   name: string;
// //   email: string;
// //   role: 'customer' | 'agent' | 'admin';
// // }

// // interface AuthState {
// //   token: string | null;
// //   user: User | null;
// //   isAuthenticated: boolean;
// //   loading: boolean;
// //   error: string | null;
// // }

// // type AuthAction = 
// //   | { type: 'LOGIN_START' }
// //   | { type: 'LOGIN_SUCCESS'; payload: { token: string; user: User } }
// //   | { type: 'LOGIN_ERROR'; payload: string }
// //   | { type: 'LOGOUT' };

// // const AuthContext = createContext<any>(null);

// // const authReducer = (state: AuthState, action: AuthAction): AuthState => {
// //   switch (action.type) {
// //     case 'LOGIN_START':
// //       return { ...state, loading: true, error: null };
// //     case 'LOGIN_SUCCESS':
// //       return {
// //         token: action.payload.token,
// //         user: action.payload.user,
// //         isAuthenticated: true,
// //         loading: false,
// //         error: null
// //       };
// //     case 'LOGIN_ERROR':
// //       return { ...state, loading: false, error: action.payload, isAuthenticated: false };
// //     case 'LOGOUT':
// //       return { token: null, user: null, isAuthenticated: false, loading: false, error: null };
// //     default:
// //       return state;
// //   }
// // };

// // export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
// //   const [state, dispatch] = useReducer(authReducer, {
// //     token: localStorage.getItem('authToken'),
// //     user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
// //     isAuthenticated: !!localStorage.getItem('authToken'),
// //     loading: false,
// //     error: null
// //   });

// //   const login = (token: string, user: User) => {
// //     localStorage.setItem('authToken', token);
// //     localStorage.setItem('user', JSON.stringify(user));
// //     dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
// //   };

// //   const logout = () => {
// //     localStorage.clear();
// //     dispatch({ type: 'LOGOUT' });
// //   };

// //   return (
// //     <AuthContext.Provider value={{ 
// //       token: state.token,
// //       user: state.user,
// //       userId: state.user?.id,
// //       userRole: state.user?.role,
// //       userName: state.user?.name,
// //       userEmail: state.user?.email,
// //       isAuthenticated: state.isAuthenticated,
// //       loading: state.loading,
// //       error: state.error,
// //       login, 
// //       logout 
// //     }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within AuthProvider');
// //   }
// //   return context;
// // };

// //////////////////////////////////////////////////////////////////////////////////////////
// // import React, { createContext, useReducer, useContext, useEffect } from 'react';
// // import axios from 'axios';

// // interface User { id: number; name: string; email: string; role: string; }
// // interface AuthState { token: string | null; user: User | null; isAuthenticated: boolean; }
// // type AuthAction = | { type: 'LOGIN_SUCCESS'; payload: { token: string; user: User } } | { type: 'LOGOUT' };

// // const AuthContext = createContext<any>(null);

// // const authReducer = (state: AuthState, action: AuthAction): AuthState => {
// //   switch (action.type) {
// //     case 'LOGIN_SUCCESS':
// //       return { token: action.payload.token, user: action.payload.user, isAuthenticated: true };
// //     case 'LOGOUT':
// //       return { token: null, user: null, isAuthenticated: false };
// //     default: return state;
// //   }
// // };

// // export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
// //   const [state, dispatch] = useReducer(authReducer, {
// //     token: localStorage.getItem('authToken'), // רק הטוקן נשמר פה [cite: 28]
// //     user: null,
// //     isAuthenticated: !!localStorage.getItem('authToken'),
// //   });

// //   // שליפת נתוני משתמש מהשרת לפי הטוקן הקיים (בלי לשמור את המשתמש בסטורג')
// //   useEffect(() => {
// //     if (state.token && !state.user) {
// //       axios.get('http://localhost:4000/auth/me', { headers: { Authorization: `Bearer ${state.token}` } })
// //         .then(res => dispatch({ type: 'LOGIN_SUCCESS', payload: { token: state.token!, user: res.data } }))
// //         .catch(() => logout());
// //     }
// //   }, [state.token]);

// //   const login = (token: string, user: User) => {
// //     localStorage.setItem('authToken', token); // רק הטוקן נשמר [cite: 29]
// //     dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
// //   };

// //   const logout = () => {
// //     localStorage.removeItem('authToken');
// //     dispatch({ type: 'LOGOUT' });
// //   };

// //   return (
// //     <AuthContext.Provider value={{ 
// //       token: state.token, 
// //       userId: state.user?.id, 
// //       userRole: state.user?.role, 
// //       isAuthenticated: state.isAuthenticated, 
// //       login, logout 
// //     }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);












// import React, { createContext, useReducer, useContext, useEffect } from 'react';
// import axios from 'axios';

// interface User { id: number; name: string; email: string; role: string; }
// interface AuthState { token: string | null; user: User | null; isAuthenticated: boolean; }
// type AuthAction = | { type: 'LOGIN_SUCCESS'; payload: { token: string; user: User } } | { type: 'LOGOUT' };

// const AuthContext = createContext<any>(null);

// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case 'LOGIN_SUCCESS':
//       return { 
//         token: action.payload.token, 
//         user: action.payload.user, 
//         isAuthenticated: true 
//       };
//     case 'LOGOUT':
//       return { token: null, user: null, isAuthenticated: false };
//     default: return state;
//   }
// };

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     token: localStorage.getItem('authToken'),
//     user: null,
//     isAuthenticated: !!localStorage.getItem('authToken'),
//   });

//   // שליפת נתונים מהשרת רק אם יש טוקן אבל אין אובייקט יוזר (קורה רק בריענון דף)
//   useEffect(() => {
//     if (state.token && !state.user) {
//       axios.get('http://localhost:4000/auth/me', { 
//         headers: { Authorization: `Bearer ${state.token}` } 
//       })
//       .then(res => {
//         dispatch({ type: 'LOGIN_SUCCESS', payload: { token: state.token!, user: res.data } });
//       })
//       .catch(() => logout());
//     }
//   }, [state.token]);

//   // const login = (token: string, user: User) => {
//   //   // 1. שמירת הטוקן בלבד בסטורג'
//   //   localStorage.setItem('authToken', token); 
    
//   //   // 2. עדכון מיידי של הסטייט עם אובייקט המשתמש שקיבלנו מהשרת בלוגין
//   //   dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
//   // };

// const login = async (token: string, user: User) => {
//   localStorage.setItem('authToken', token);
//   // ה-dispatch מעדכן את הזיכרון של האפליקציה
//   await dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
//   return true; // מחזיר אישור שהכל עודכן
// };

//   const logout = () => {
//     localStorage.removeItem('authToken');
//     dispatch({ type: 'LOGOUT' });
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       token: state.token, 
//       userId: state.user?.id, 
//       userRole: state.user?.role, // המידע הזה יהיה זמין מיד אחרי הדיספאץ'
//       isAuthenticated: state.isAuthenticated, 
//       login, logout 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


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

  // שליפת נתונים מהשרת רק בריענון דף (F5) כשיש טוקן אבל הזיכרון התנקה
  useEffect(() => {
    if (state.token && !state.user) {
      axios.get('http://localhost:4000/auth/me', { 
        headers: { Authorization: `Bearer ${state.token}` } 
      })
      .then(res => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: { token: state.token!, user: res.data } });
      })
      .catch(() => logout());
    }
  }, [state.token]);

  const login = async (token: string, user: User) => {
    // שמירת הטוקן בלבד כפי שביקשת
    localStorage.setItem('authToken', token);
    
    // עדכון ה-State בזיכרון - זה מה שגורם לכפתור להופיע מיד
    dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
    
    return true; 
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