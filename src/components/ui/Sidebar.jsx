import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Select from './Select';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [notificationCount] = useState(5);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const collegeOptions = [
    { value: 'all', label: 'All Colleges' },
    { value: 'engineering', label: 'College of Engineering' },
    { value: 'business', label: 'Business School' },
    { value: 'arts', label: 'College of Arts & Sciences' },
    { value: 'medicine', label: 'School of Medicine' },
  ];

  const navigationItems = [
    {
      section: 'Overview',
      items: [
        { path: '/admin-dashboard', label: 'Dashboard', icon: 'LayoutDashboard', tooltip: 'System overview and key metrics' },
      ]
    },
    {
      section: 'Management',
      items: [
        { path: '/event-management', label: 'Events', icon: 'Calendar', tooltip: 'Create and manage events' },
        { path: '/student-registration', label: 'Students', icon: 'Users', tooltip: 'Student registration management' },
        { path: '/student-profiles', label: 'Profiles', icon: 'UserCircle', tooltip: 'Student profile administration' },
      ]
    },
    {
      section: 'Operations',
      items: [
        { path: '/attendance-tracking', label: 'Attendance', icon: 'CheckSquare', tooltip: 'Real-time attendance tracking' },
        { path: '/analytics-dashboard', label: 'Analytics', icon: 'BarChart3', tooltip: 'Reports and data visualization' },
      ]
    }
  ];

  const quickActions = [
    { label: 'New Event', icon: 'Plus', action: () => console.log('Create event') },
    { label: 'Import Students', icon: 'Upload', action: () => console.log('Import students') },
    { label: 'Export Data', icon: 'Download', action: () => console.log('Export data') },
  ];

  const notifications = [
    { id: 1, title: 'Event Registration Deadline', message: 'Tech Conference registration closes in 2 days', time: '2 hours ago', type: 'warning' },
    { id: 2, title: 'New Student Registered', message: 'John Smith registered for Spring Seminar', time: '4 hours ago', type: 'success' },
    { id: 3, title: 'Low Attendance Alert', message: 'Workshop attendance below 50%', time: '6 hours ago', type: 'error' },
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const handleCollegeChange = (value) => {
    setSelectedCollege(value);
    console.log('College changed to:', value);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 h-screen bg-card border-r border-border shadow-elevation-1 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-72'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Icon name="GraduationCap" size={20} color="white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">CampusEvents Pro</h1>
                  <p className="text-xs text-muted-foreground">Admin Portal</p>
                </div>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="shrink-0"
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
            </Button>
          </div>

          {/* College Selector */}
          {!isCollapsed && (
            <div className="p-4 border-b border-border">
              <Select
                label="College Context"
                options={collegeOptions}
                value={selectedCollege}
                onChange={handleCollegeChange}
                className="w-full"
              />
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {navigationItems?.map((section) => (
              <div key={section?.section}>
                {!isCollapsed && (
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    {section?.section}
                  </h3>
                )}
                <div className="space-y-1">
                  {section?.items?.map((item) => (
                    <div key={item?.path} className="relative group">
                      <a
                        href={item?.path}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-standard ${
                          isActiveRoute(item?.path)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        } ${isCollapsed ? 'justify-center' : ''}`}
                        title={isCollapsed ? item?.label : ''}
                      >
                        <Icon name={item?.icon} size={18} />
                        {!isCollapsed && <span>{item?.label}</span>}
                      </a>
                      
                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-elevation-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                          {item?.tooltip || item?.label}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Quick Actions */}
          {!isCollapsed && (
            <div className="p-4 border-t border-border">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {quickActions?.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={action?.action}
                    className="w-full justify-start"
                  >
                    <Icon name={action?.icon} size={16} />
                    <span className="ml-2">{action?.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Notifications */}
          <div className="p-4 border-t border-border">
            <div className="relative">
              <Button
                variant="ghost"
                size={isCollapsed ? "icon" : "sm"}
                onClick={handleNotificationClick}
                className={`relative ${isCollapsed ? 'w-full justify-center' : 'w-full justify-start'}`}
              >
                <Icon name="Bell" size={18} />
                {!isCollapsed && <span className="ml-2">Notifications</span>}
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {notificationCount}
                  </span>
                )}
              </Button>

              {/* Notifications Dropdown */}
              {showNotifications && !isCollapsed && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-popover border border-border rounded-md shadow-elevation-3 max-h-80 overflow-y-auto">
                  <div className="p-3 border-b border-border">
                    <h4 className="font-medium text-popover-foreground">Recent Notifications</h4>
                  </div>
                  <div className="py-2">
                    {notifications?.map((notification) => (
                      <div key={notification?.id} className="px-3 py-2 hover:bg-muted cursor-pointer">
                        <div className="flex items-start space-x-2">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification?.type === 'success' ? 'bg-success' :
                            notification?.type === 'warning' ? 'bg-warning' :
                            notification?.type === 'error' ? 'bg-error' : 'bg-primary'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-popover-foreground truncate">
                              {notification?.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification?.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification?.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <Button variant="ghost" size="sm" className="w-full">
                      View All Notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-border">
            <div className="relative">
              <Button
                variant="ghost"
                onClick={handleProfileClick}
                className={`w-full ${isCollapsed ? 'justify-center p-2' : 'justify-start'}`}
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <Icon name="User" size={16} color="white" />
                </div>
                {!isCollapsed && (
                  <div className="ml-3 text-left flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Admin User</p>
                    <p className="text-xs text-muted-foreground truncate">admin@campus.edu</p>
                  </div>
                )}
                {!isCollapsed && <Icon name="ChevronUp" size={16} />}
              </Button>

              {/* Profile Dropdown */}
              {showProfile && !isCollapsed && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-popover border border-border rounded-md shadow-elevation-3 py-2">
                  <a href="/profile" className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted">
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </a>
                  <a href="/preferences" className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted">
                    <Icon name="Settings" size={16} />
                    <span>Preferences</span>
                  </a>
                  <div className="border-t border-border my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-error hover:bg-muted w-full text-left"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
      {/* Backdrop for mobile */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;