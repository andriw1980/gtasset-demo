import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { LayoutDashboard, Package, Users, Building2, Truck, FileText, Settings, LogOut, User, AlertTriangle, ClipboardList, FileCheck, TrendingDown, Wrench, Database, ArrowLeftRight, FileX, Gavel } from 'lucide-react';

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

  const AppSidebar = () => (
    <Sidebar className="bg-primary">
      <SidebarHeader className="p-4 bg-primary border-b border-primary-foreground/10">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/ef965f01-bf50-42a9-b0f3-fbb537bd67f4.png" 
            alt="GAMATECHNO Logo" 
            className="h-8 w-auto" 
          />
          <span className="text-lg font-bold text-white">gtAsset v1.0.4</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="bg-primary">
        {/* Dashboard */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/')}
                  className="text-white hover:bg-accent hover:text-primary data-[active=true]:bg-accent data-[active=true]:text-primary"
                >
                  <Link to="/">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Asset Transaction */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-accent font-semibold text-sm">Asset Transaction</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/asset-request')}
                  className="text-white hover:bg-accent hover:text-primary data-[active=true]:bg-accent data-[active=true]:text-primary"
                >
                  <Link to="/asset-request">
                    <ClipboardList className="h-4 w-4" />
                    <span>Request Asset</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/asset-transfer')}
                  className="text-white hover:bg-accent hover:text-primary data-[active=true]:bg-accent data-[active=true]:text-primary"
                >
                  <Link to="/asset-transfer">
                    <ArrowLeftRight className="h-4 w-4" />
                    <span>Transfer/Mutation</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/asset-writeoff')}
                  className="text-white hover:bg-accent hover:text-primary data-[active=true]:bg-accent data-[active=true]:text-primary"
                >
                  <Link to="/asset-writeoff">
                    <FileX className="h-4 w-4" />
                    <span>Write Off</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/asset-auction')}
                  className="text-white hover:bg-accent hover:text-primary data-[active=true]:bg-accent data-[active=true]:text-primary"
                >
                  <Link to="/asset-auction">
                    <Gavel className="h-4 w-4" />
                    <span>Auction</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Maintenance */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-accent font-semibold text-sm">Maintenance</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/preventive-maintenance')}
                  className="text-white hover:bg-accent hover:text-primary data-[active=true]:bg-accent data-[active=true]:text-primary"
                >
                  <Link to="/preventive-maintenance">
                    <Wrench className="h-4 w-4" />
                    <span>Preventive Maintenance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/corrective-maintenance')}
                  className="text-white hover:bg-accent hover:text-primary data-[active=true]:bg-accent data-[active=true]:text-primary"
                >
                  <Link to="/corrective-maintenance">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Corrective Maintenance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Master Data */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-accent font-semibold text-sm">Master Data</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/assets')}
                  className="text-white hover:bg-accent hover:text-primary data-[active=true]:bg-accent data-[active=true]:text-primary"
                >
                  <Link to="/assets">
                    <Package className="h-4 w-4" />
                    <span>View All Assets</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/vendors')}
                  className="text-white hover:bg-accent hover:text-primary data-[active=true]:bg-accent data-[active=true]:text-primary"
                >
                  <Link to="/vendors">
                    <Truck className="h-4 w-4" />
                    <span>Vendors</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/buildings')}
                  className="text-white hover:bg-accent hover:text-primary data-[active=true]:bg-accent data-[active=true]:text-primary"
                >
                  <Link to="/buildings">
                    <Building2 className="h-4 w-4" />
                    <span>Buildings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/insurance')}
                  className="text-white hover:bg-accent hover:text-primary data-[active=true]:bg-accent data-[active=true]:text-primary"
                >
                  <Link to="/insurance">
                    <FileCheck className="h-4 w-4" />
                    <span>Insurance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Analysis */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-accent font-semibold text-sm">Analysis</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/asset-depreciation')}
                  className="text-white hover:bg-accent hover:text-primary data-[active=true]:bg-accent data-[active=true]:text-primary"
                >
                  <Link to="/asset-depreciation">
                    <TrendingDown className="h-4 w-4" />
                    <span>Asset Depreciation</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/reports')}
                  className="text-white hover:bg-accent hover:text-primary data-[active=true]:bg-accent data-[active=true]:text-primary"
                >
                  <Link to="/reports">
                    <FileText className="h-4 w-4" />
                    <span>Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-accent font-semibold text-sm">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {user?.role === 'admin' && (
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive('/users')}
                    className="text-white hover:bg-accent hover:text-primary data-[active=true]:bg-accent data-[active=true]:text-primary"
                  >
                    <Link to="/users">
                      <Users className="h-4 w-4" />
                      <span>User Management</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 bg-primary border-t border-primary-foreground/10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white/20">
              <User className="h-4 w-4 mr-2" />
              {user?.fullName}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white">
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
      </SidebarFooter>
    </Sidebar>
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        {/* Header */}
        <div className="flex-1">
          <header className="bg-white shadow-sm border-b border-primary/20 h-16 flex items-center px-4">
            <SidebarTrigger className="text-primary" />
            <div className="ml-4">
              <span className="text-sm text-primary/80 font-medium">
                Welcome, {user?.fullName} ({user?.role})
              </span>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
