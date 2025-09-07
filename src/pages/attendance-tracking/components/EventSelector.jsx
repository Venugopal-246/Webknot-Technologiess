import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const EventSelector = ({ events, selectedEvent, onEventChange, onRefresh }) => {
  const eventOptions = events?.map(event => ({
    value: event?.id,
    label: `${event?.name} - ${new Date(event.date)?.toLocaleDateString()}`,
    description: `${event?.type} • ${event?.venue} • ${event?.registrations} registered`
  }));

  const currentEvent = events?.find(event => event?.id === selectedEvent);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { color: 'text-success', bg: 'bg-green-100', icon: 'Play' },
      'upcoming': { color: 'text-blue-600', bg: 'bg-blue-100', icon: 'Clock' },
      'completed': { color: 'text-gray-600', bg: 'bg-gray-100', icon: 'CheckCircle' },
      'cancelled': { color: 'text-error', bg: 'bg-red-100', icon: 'X' }
    };

    const config = statusConfig?.[status] || statusConfig?.upcoming;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.color}`}>
        <Icon name={config?.icon} size={12} className="mr-1" />
        {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Event Selection</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Refresh
        </Button>
      </div>
      <div className="space-y-4">
        <Select
          label="Select Event"
          options={eventOptions}
          value={selectedEvent}
          onChange={onEventChange}
          placeholder="Choose an event to track attendance"
          searchable
          description="Select the event you want to manage attendance for"
        />

        {currentEvent && (
          <div className="p-4 bg-muted/50 rounded-lg space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{currentEvent?.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{currentEvent?.description}</p>
              </div>
              {getStatusBadge(currentEvent?.status)}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium text-foreground">
                    {new Date(currentEvent.date)?.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-medium text-foreground">
                    {currentEvent?.startTime} - {currentEvent?.endTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Venue</p>
                  <p className="font-medium text-foreground">{currentEvent?.venue}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Capacity</p>
                  <p className="font-medium text-foreground">
                    {currentEvent?.registrations}/{currentEvent?.capacity}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-2 border-t border-border">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Tag" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium text-foreground">{currentEvent?.type}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Building" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">College:</span>
                <span className="font-medium text-foreground">{currentEvent?.college}</span>
              </div>

              {currentEvent?.organizer && (
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="User" size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Organizer:</span>
                  <span className="font-medium text-foreground">{currentEvent?.organizer}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSelector;