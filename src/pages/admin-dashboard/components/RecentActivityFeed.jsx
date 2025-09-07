import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'registration': 'UserPlus',
      'checkin': 'CheckCircle',
      'feedback': 'MessageSquare',
      'event_created': 'Calendar',
      'event_cancelled': 'XCircle'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      'registration': 'text-blue-600',
      'checkin': 'text-green-600',
      'feedback': 'text-purple-600',
      'event_created': 'text-orange-600',
      'event_cancelled': 'text-red-600'
    };
    return colors?.[type] || 'text-gray-600';
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
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="RefreshCw" size={14} />
            <span>Live updates</span>
          </div>
        </div>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="p-4 hover:bg-muted/50 transition-standard">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-muted ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">
                    {activity?.title}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {activity?.description}
                </p>
                
                {activity?.metadata && (
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    {activity?.metadata?.event && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>{activity?.metadata?.event}</span>
                      </div>
                    )}
                    {activity?.metadata?.student && (
                      <div className="flex items-center space-x-1">
                        <Icon name="User" size={12} />
                        <span>{activity?.metadata?.student}</span>
                      </div>
                    )}
                    {activity?.metadata?.college && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Building" size={12} />
                        <span>{activity?.metadata?.college}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-standard">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivityFeed;