import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications, onMarkAsRead, onMarkAllAsRead, onViewAll }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const unreadCount = notifications?.filter(n => !n?.isRead)?.length;
  const displayNotifications = isExpanded ? notifications : notifications?.slice(0, 3);

  const getNotificationIcon = (type) => {
    const icons = {
      'alert': 'AlertTriangle',
      'info': 'Info',
      'success': 'CheckCircle',
      'warning': 'AlertCircle',
      'error': 'XCircle'
    };
    return icons?.[type] || 'Bell';
  };

  const getNotificationColor = (type) => {
    const colors = {
      'alert': 'text-orange-600 bg-orange-100',
      'info': 'text-blue-600 bg-blue-100',
      'success': 'text-green-600 bg-green-100',
      'warning': 'text-yellow-600 bg-yellow-100',
      'error': 'text-red-600 bg-red-100'
    };
    return colors?.[type] || 'text-gray-600 bg-gray-100';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-medium">
                {unreadCount}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              onClick={() => console.log('Notification settings')}
            />
          </div>
        </div>
      </div>
      <div className="divide-y divide-border max-h-80 overflow-y-auto">
        {displayNotifications?.length > 0 ? (
          displayNotifications?.map((notification) => (
            <div 
              key={notification?.id} 
              className={`p-4 hover:bg-muted/50 transition-standard cursor-pointer ${
                !notification?.isRead ? 'bg-muted/30' : ''
              }`}
              onClick={() => onMarkAsRead(notification?.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${getNotificationColor(notification?.type)}`}>
                  <Icon name={getNotificationIcon(notification?.type)} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`text-sm font-medium ${
                      !notification?.isRead ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {notification?.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(notification?.timestamp)}
                      </span>
                      {!notification?.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification?.message}
                  </p>
                  
                  {notification?.actionRequired && (
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="xs">
                        {notification?.actionText || 'Take Action'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <Icon name="Bell" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No notifications</h3>
            <p className="text-sm text-muted-foreground">
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        )}
      </div>
      {notifications?.length > 3 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show Less' : `Show ${notifications?.length - 3} More`}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onViewAll}
            >
              View All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;