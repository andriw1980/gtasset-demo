import React, { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff } from 'lucide-react';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const {
    user,
    login,
    isLoading
  } = useAuth();
  const location = useLocation();
  if (user) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    const success = await login(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-xl">
        <CardHeader className="space-y-1 text-center bg-primary/5 rounded-t-lg">
          <div className="flex justify-center mb-4">
            <img src="/lovable-uploads/ef965f01-bf50-42a9-b0f3-fbb537bd67f4.png" alt="GAMATECHNO Logo" className="h-16 w-auto" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Eoviz Asset</CardTitle>
          <CardDescription className="text-primary/80">Asset Management System</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-primary font-medium">Username</Label>
              <Input id="username" type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} disabled={isLoading} className="border-primary/20 focus:border-primary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary font-medium">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} className="border-primary/20 focus:border-primary" />
                <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-primary" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>}

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="text-center">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot your password?
              </Link>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-primary/20">
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium text-primary">Demo Credentials:</p>
              <p>Admin: admin / admin123</p>
              <p>Staff: staff / staff123</p>
              <p>Auditor: auditor / auditor123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default Login;