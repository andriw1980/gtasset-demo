
import React, { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Sign up form fields
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    fullName: '',
    position: '',
    unit: '',
    workArea: ''
  });

  const { user, login, signup, isLoading } = useAuth();
  const location = useLocation();

  if (user) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const result = await login(email, password);
    if (result.error) {
      setError(result.error);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!signUpData.email || !signUpData.password || !signUpData.username || !signUpData.fullName) {
      setError('Please fill in all required fields');
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (signUpData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const result = await signup(signUpData.email, signUpData.password, {
      username: signUpData.username,
      fullName: signUpData.fullName,
      position: signUpData.position,
      unit: signUpData.unit,
      workArea: signUpData.workArea
    });

    if (result.error) {
      setError(result.error);
    } else {
      setError('');
      // Show success message or redirect
      alert('Registration successful! Please check your email to verify your account.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-xl">
        <CardHeader className="space-y-1 text-center bg-primary/5 rounded-t-lg">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/ef965f01-bf50-42a9-b0f3-fbb537bd67f4.png" 
              alt="GAMATECHNO Logo" 
              className="h-16 w-auto" 
            />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Eoviz Asset</CardTitle>
          <CardDescription className="text-primary/80">Asset Management System</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-primary font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-primary font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="border-primary/20 focus:border-primary"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-primary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>

                <div className="text-center">
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-primary font-medium">Email *</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Email address"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                      disabled={isLoading}
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-username" className="text-primary font-medium">Username *</Label>
                    <Input
                      id="signup-username"
                      type="text"
                      placeholder="Username"
                      value={signUpData.username}
                      onChange={(e) => setSignUpData({...signUpData, username: e.target.value})}
                      disabled={isLoading}
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-fullname" className="text-primary font-medium">Full Name *</Label>
                  <Input
                    id="signup-fullname"
                    type="text"
                    placeholder="Your full name"
                    value={signUpData.fullName}
                    onChange={(e) => setSignUpData({...signUpData, fullName: e.target.value})}
                    disabled={isLoading}
                    className="border-primary/20 focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-position" className="text-primary font-medium">Position</Label>
                    <Input
                      id="signup-position"
                      type="text"
                      placeholder="Job position"
                      value={signUpData.position}
                      onChange={(e) => setSignUpData({...signUpData, position: e.target.value})}
                      disabled={isLoading}
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-unit" className="text-primary font-medium">Unit</Label>
                    <Input
                      id="signup-unit"
                      type="text"
                      placeholder="Department/Unit"
                      value={signUpData.unit}
                      onChange={(e) => setSignUpData({...signUpData, unit: e.target.value})}
                      disabled={isLoading}
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-workarea" className="text-primary font-medium">Work Area</Label>
                  <Input
                    id="signup-workarea"
                    type="text"
                    placeholder="Work location"
                    value={signUpData.workArea}
                    onChange={(e) => setSignUpData({...signUpData, workArea: e.target.value})}
                    disabled={isLoading}
                    className="border-primary/20 focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-primary font-medium">Password *</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                      disabled={isLoading}
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm" className="text-primary font-medium">Confirm Password *</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="Confirm password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({...signUpData, confirmPassword: e.target.value})}
                      disabled={isLoading}
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
