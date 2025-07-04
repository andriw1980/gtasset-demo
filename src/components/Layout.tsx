import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Home, 
  Package, 
  Users, 
  Building, 
  FileText, 
  Settings, 
  LogOut, 
  Wrench,
  TrendingDown,
  UserPlus,
  Menu,
  X,
  Shield,
  BarChart3
} from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuSections = [
    {
      title: 'Main',
      items: [
        { name: 'Dashboard', icon: Home, path: '/dashboard' },
      ]
    },
    {
      title: 'Asset Transaction',
      items: [
        { name: 'Asset Request', icon: UserPlus, path: '/asset-request' },
        { name: 'Asset Transfer', icon: FileText, path: '/asset-transfer' },
        { name: 'Asset Write Off', icon: FileText, path: '/asset-write-off' },
        { name: 'Asset Auction', icon: FileText, path: '/asset-auction' },
      ]
    },
    {
      title: 'Asset Maintenance',
      items: [
        { name: 'Preventive Maintenance', icon: Settings, path: '/preventive-maintenance' },
        { name: 'Corrective Maintenance', icon: Wrench, path: '/corrective-maintenance' },
      ]
    },
    {
      title: 'Master Data',
      items: [
        { name: 'Assets', icon: Package, path: '/assets' },
        { name: 'Vendors', icon: Building, path: '/vendors' },
        { name: 'Buildings', icon: Building, path: '/buildings' },
        { name: 'Insurance', icon: FileText, path: '/insurance' },
      ]
    },
    {
      title: 'Reports',
      items: [
        { name: 'Reports & Analytics', icon: BarChart3, path: '/reports' },
        { name: 'Asset Depreciation', icon: TrendingDown, path: '/asset-depreciation' },
      ]
    },
    {
      title: 'System',
      items: [
        { name: 'Users', icon: Users, path: '/users' },
        { name: 'Roles', icon: Shield, path: '/roles' },
      ]
    }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#096284] text-white">
      <div className="p-4 lg:p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#fccc19] rounded-lg flex items-center justify-center">
            <Package className="h-4 w-4 lg:h-5 lg:w-5 text-[#096284]" />
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-bold">GTAsset</h1>
            <p className="text-xs lg:text-sm text-white/70">Asset Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 lg:px-4 py-4 space-y-4">
        {menuSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <h3 className="px-3 text-xs font-semibold text-white/70 uppercase tracking-wider">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm lg:text-base transition-all duration-200 ${
                      isActive
                        ? 'bg-[#fccc19] text-[#096284] font-medium shadow-lg'
                        : 'text-white hover:bg-white/10 hover:text-[#fccc19]'
                    }`}
                  >
                    <item.icon className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 lg:p-6 border-t border-white/20">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/10 hover:text-[#fccc19] text-sm lg:text-base"
        >
          <LogOut className="h-4 w-4 lg:h-5 lg:w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 xl:w-72 flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64 bg-[#096284]">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-[#096284]">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </Sheet>
          
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-[#fccc19] rounded flex items-center justify-center">
              <Package className="h-3 w-3 text-[#096284]" />
            </div>
            <h1 className="text-lg font-bold text-[#096284]">GTAsset</h1>
          </div>

          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="text-[#096284] hover:bg-[#096284]/10"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 xl:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
