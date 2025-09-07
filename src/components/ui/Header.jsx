import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onMenuToggle, isMenuOpen = false }) => {
  const location = useLocation();
  const [notificationCount] = useState(3);

  const navigationItems = [
    { path: '/admin-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/event-management', label: 'Events', icon: 'Calendar' },
    { path: '/student-registration', label: 'Students', icon: 'Users' },
    { path: '/attendance-tracking', label: 'Attendance', icon: 'CheckSquare' },
    { path: '/analytics-dashboard', label: 'Analytics', icon: 'BarChart3' },
  ];

  const moreItems = [
    { path: '/student-profiles', label: 'Student Profiles', icon: 'UserCircle' },
    { path: '/settings', label: 'Settings', icon: 'Settings' },
    { path: '/help', label: 'Help', icon: 'HelpCircle' },
  ];

  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section - Logo and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuToggle}
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={20} />
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">CampusEvents Pro</h1>
            </div>
          </div>
        </div>

        {/* Center Section - Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <a
              key={item?.path}
              href={item?.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-standard ${
                isActiveRoute(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </a>
          ))}
          
          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="flex items-center space-x-1"
            >
              <Icon name="MoreHorizontal" size={16} />
              <span>More</span>
            </Button>
            
            {showMoreMenu && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-elevation-2 py-1 z-50">
                {moreItems?.map((item) => (
                  <a
                    key={item?.path}
                    href={item?.path}
                    className={`flex items-center space-x-2 px-3 py-2 text-sm transition-standard ${
                      isActiveRoute(item?.path)
                        ? 'bg-accent text-accent-foreground'
                        : 'text-popover-foreground hover:bg-muted'
                    }`}
                    onClick={() => setShowMoreMenu(false)}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Quick Actions */}
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center space-x-2"
            onClick={() => console.log('Create event')}
          >
            <Icon name="Plus" size={16} />
            <span>New Event</span>
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationClick}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {notificationCount}
                </span>
              )}
            </Button>
          </div>

          {/* Profile Menu */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleProfileClick}
            className="rounded-full"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background border-t border-border z-40">
          <nav className="p-4 space-y-2">
            {[...navigationItems, ...moreItems]?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium transition-standard ${
                  isActiveRoute(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
                onClick={onMenuToggle}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;