import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EventDetailsPanel = ({ event, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!event) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Select an Event</h3>
        <p className="text-muted-foreground">Choose an event from the list to view details and manage settings.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'registrations', label: 'Registrations', icon: 'Users' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'completed':
        return 'bg-secondary text-secondary-foreground';
      case 'cancelled':
        return 'bg-error text-error-foreground';
      case 'draft':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const registrationStats = [
    { label: 'Total Registrations', value: event?.registrations, icon: 'Users', color: 'text-primary' },
    { label: 'Capacity', value: event?.capacity, icon: 'MapPin', color: 'text-secondary' },
    { label: 'Available Spots', value: event?.capacity - event?.registrations, icon: 'UserPlus', color: 'text-success' },
    { label: 'Waitlist', value: event?.waitlist || 0, icon: 'Clock', color: 'text-warning' }
  ];

  const recentRegistrations = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@college.edu', time: '2 hours ago', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@college.edu', time: '4 hours ago', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: 3, name: 'Emily Davis', email: 'emily.d@college.edu', time: '6 hours ago', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: 4, name: 'James Wilson', email: 'james.w@college.edu', time: '8 hours ago', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Event Image */}
      {event?.image && (
        <div className="aspect-video rounded-lg overflow-hidden">
          <Image
            src={event?.image}
            alt={event?.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Event Description */}
      <div>
        <h4 className="font-medium text-foreground mb-2">Description</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {event?.description}
        </p>
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">{formatDate(event?.date)}</div>
              <div className="text-xs text-muted-foreground">{formatTime(event?.date)}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="MapPin" size={16} className="text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">{event?.venue}</div>
              <div className="text-xs text-muted-foreground">{event?.location}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Building" size={16} className="text-muted-foreground" />
            <div className="text-sm">{event?.college}</div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Icon name="User" size={16} className="text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">{event?.organizer}</div>
              <div className="text-xs text-muted-foreground">Event Organizer</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Mail" size={16} className="text-muted-foreground" />
            <div className="text-sm">{event?.contact}</div>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="DollarSign" size={16} className="text-muted-foreground" />
            <div className="text-sm">{event?.fee ? `$${event?.fee}` : 'Free'}</div>
          </div>
        </div>
      </div>

      {/* Registration Statistics */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Registration Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {registrationStats?.map((stat, index) => (
            <div key={index} className="bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name={stat?.icon} size={16} className={stat?.color} />
                <span className="text-xs text-muted-foreground">{stat?.label}</span>
              </div>
              <div className="text-lg font-semibold text-foreground">{stat?.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* QR Code */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Check-in QR Code</h4>
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center">
            <Icon name="QrCode" size={64} className="text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Students can scan this QR code to check in to the event
          </p>
          <Button variant="outline" size="sm" iconName="Download">
            Download QR Code
          </Button>
        </div>
      </div>
    </div>
  );

  const renderRegistrations = () => (
    <div className="space-y-6">
      {/* Registration Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {registrationStats?.map((stat, index) => (
          <div key={index} className="bg-muted rounded-lg p-4 text-center">
            <Icon name={stat?.icon} size={24} className={`${stat?.color} mx-auto mb-2`} />
            <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
            <div className="text-xs text-muted-foreground">{stat?.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Registrations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground">Recent Registrations</h4>
          <Button variant="outline" size="sm" iconName="ExternalLink">
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {recentRegistrations?.map((registration) => (
            <div key={registration?.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Image
                src={registration?.avatar}
                alt={registration?.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground">{registration?.name}</div>
                <div className="text-sm text-muted-foreground truncate">{registration?.email}</div>
              </div>
              <div className="text-xs text-muted-foreground">{registration?.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Actions */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" iconName="UserPlus">
          Add Registration
        </Button>
        <Button variant="outline" iconName="Download">
          Export List
        </Button>
        <Button variant="outline" iconName="Mail">
          Send Notification
        </Button>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="text-center py-8">
        <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h4 className="font-medium text-foreground mb-2">Analytics Dashboard</h4>
        <p className="text-muted-foreground mb-4">
          Detailed analytics and insights for this event will be displayed here.
        </p>
        <Button variant="outline" iconName="ExternalLink">
          View Full Analytics
        </Button>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="text-center py-8">
        <Icon name="Settings" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h4 className="font-medium text-foreground mb-2">Event Settings</h4>
        <p className="text-muted-foreground mb-4">
          Configure event settings, notifications, and permissions.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="outline" iconName="Edit">
            Edit Event
          </Button>
          <Button variant="outline" iconName="Copy">
            Duplicate Event
          </Button>
          <Button variant="destructive" iconName="Trash2">
            Cancel Event
          </Button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'registrations':
        return renderRegistrations();
      case 'analytics':
        return renderAnalytics();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold text-foreground truncate">{event?.name}</h2>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event?.status)}`}>
                {event?.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{event?.college}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mt-6 bg-muted rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-standard ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default EventDetailsPanel;