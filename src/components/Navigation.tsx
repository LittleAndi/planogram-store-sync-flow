
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building2, BarChart3, RefreshCw, Home } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/lifecycle', label: 'Lifecycle Management', icon: RefreshCw },
  ];

  return (
    <nav className="bg-card border-b border-border p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Planogram Manager</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <Button 
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
