import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Building, 
  Users, 
  FileText, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  LogOut,
  Home,
  Settings
} from 'lucide-react';

const AdminNavigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { path: '/admin', label: 'Dashboard', icon: BarChart3 },
    { path: '/admin/officials', label: 'Officials', icon: Users },
    { path: '/admin/documents', label: 'Documents', icon: FileText },
    { path: '/admin/hearings', label: 'Hearings', icon: Calendar },
    { path: '/admin/announcements', label: 'Announcements', icon: MessageSquare },
    { path: '/admin/committees', label: 'Committees', icon: Building },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const isActivePath = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link to="/admin" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
              CMS
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Content Management System</p>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Navigation Links - Mobile Dropdown */}
          <div className="lg:hidden">
            {/* Mobile menu implementation can be added here */}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">View Site</span>
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user?.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-foreground"
              >
                <LogOut className="w-4 h-4" />
                <span className="ml-1 hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;