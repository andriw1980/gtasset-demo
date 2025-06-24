
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Shield, LayoutDashboard, Package, Users, Building2, Truck, FileText, Settings, LogOut, User, PlusCircle, AlertTriangle, ClipboardList, FileCheck, TrendingDown, Wrench, Database } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">gtAsset Management System</span>
              </Link>
            </div>

            {/* Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/') ? 'bg-primary text-primary-foreground' : 'text-gray-700 hover:text-gray-900'}`}>
                      <LayoutDashboard className="h-4 w-4 mr-2 inline" />
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">
                    <Package className="h-4 w-4 mr-2" />
                    Assets
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-2">
                      <Link to="/asset-request">
                        <NavigationMenuLink className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100">
                          <ClipboardList className="h-4 w-4 mr-2 inline" />
                          Request Asset
                        </NavigationMenuLink>
                      </Link>
                      <Link to="/loss-report">
                        <NavigationMenuLink className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100">
                          <AlertTriangle className="h-4 w-4 mr-2 inline" />
                          Report Loss
                        </NavigationMenuLink>
                      </Link>
                      <Link to="/asset-depreciation">
                        <NavigationMenuLink className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100">
                          <TrendingDown className="h-4 w-4 mr-2 inline" />
                          Asset Depreciation
                        </NavigationMenuLink>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/preventive-maintenance">
                    <NavigationMenuLink className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/preventive-maintenance') ? 'bg-primary text-primary-foreground' : 'text-gray-700 hover:text-gray-900'}`}>
                      <Wrench className="h-4 w-4 mr-2 inline" />
                      Preventive Maintenance
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">
                    <Database className="h-4 w-4 mr-2" />
                    Master Data
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-2">
                      <Link to="/assets">
                        <NavigationMenuLink className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100">
                          <Package className="h-4 w-4 mr-2 inline" />
                          View All Assets
                        </NavigationMenuLink>
                      </Link>
                      <Link to="/vendors">
                        <NavigationMenuLink className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100">
                          <Truck className="h-4 w-4 mr-2 inline" />
                          Vendors
                        </NavigationMenuLink>
                      </Link>
                      <Link to="/buildings">
                        <NavigationMenuLink className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100">
                          <Building2 className="h-4 w-4 mr-2 inline" />
                          Buildings
                        </NavigationMenuLink>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">
                    <Settings className="h-4 w-4 mr-2" />
                    Management
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-2">
                      {user?.role === 'admin' && (
                        <Link to="/users">
                          <NavigationMenuLink className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100">
                            <Users className="h-4 w-4 mr-2 inline" />
                            User Management
                          </NavigationMenuLink>
                        </Link>
                      )}
                      <Link to="/insurance">
                        <NavigationMenuLink className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100">
                          <FileCheck className="h-4 w-4 mr-2 inline" />
                          Insurance
                        </NavigationMenuLink>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/reports">
                    <NavigationMenuLink className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/reports') ? 'bg-primary text-primary-foreground' : 'text-gray-700 hover:text-gray-900'}`}>
                      <FileText className="h-4 w-4 mr-2 inline" />
                      Reports
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.fullName}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {user?.role}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
