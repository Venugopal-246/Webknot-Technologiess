import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingEventsList = ({ events, onViewEvent, onEditEvent }) => {
  const getEventTypeColor = (type) => {
    const colors = {
      'Workshop': 'bg-blue-100 text-blue-800',
      'Seminar': 'bg-green-100 text-green-800',
      'Hackathon': 'bg-purple-100 text-purple-800',
      'Fest': 'bg-orange-100 text-orange-800'
    };
    return colors?.[type] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Upcoming Events</h2>
          <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left">
            View Calendar
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {events?.map((event) => (
          <div key={event?.id} className="p-4 hover:bg-muted/50 transition-standard">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-medium text-foreground truncate">{event?.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event?.type)}`}>
                    {event?.type}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{formatDate(event?.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{formatTime(event?.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{event?.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="Users" size={14} />
                    <span>{event?.registrations}/{event?.capacity} registered</span>
                  </div>
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event?.registrations / event?.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  onClick={() => onViewEvent(event?.id)}
                >
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Edit"
                  onClick={() => onEditEvent(event?.id)}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="Plus" iconPosition="left">
          Create New Event
        </Button>
      </div>
    </div>
  );
};

export default UpcomingEventsList;