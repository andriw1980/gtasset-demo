
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'staff' | 'auditor';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  fullName: string;
  position: string;
  unit: string;
  workArea: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for prototype
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    email: 'admin@company.com',
    role: 'admin',
    fullName: 'John Administrator',
    position: 'IT Manager',
    unit: 'IT Department',
    workArea: 'Head Office'
  },
  {
    id: '2',
    username: 'staff',
    password: 'staff123',
    email: 'staff@company.com',
    role: 'staff',
    fullName: 'Jane Staff',
    position: 'Asset Coordinator',
    unit: 'Operations',
    workArea: 'Building A'
  },
  {
    id: '3',
    username: 'auditor',
    password: 'auditor123',
    email: 'auditor@company.com',
    role: 'auditor',
    fullName: 'Mike Auditor',
    position: 'Internal Auditor',
    unit: 'Audit Department',
    workArea: 'Head Office'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
