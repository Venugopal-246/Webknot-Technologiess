import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationStats = ({ stats, onBulkImport, onBulkExport, onManageWaitlist }) => {
  const statCards = [
    {
      title: 'Total Students',
      value: stats?.totalStudents,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Registered',
      value: stats?.registeredStudents,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Waitlisted',
      value: stats?.waitlistedStudents,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Not Registered',
      value: stats?.notRegisteredStudents,
      icon: 'Circle',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Registration Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          {statCards?.map((stat) => (
            <div key={stat?.title} className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg ${stat?.bgColor}`}>
                  <Icon name={stat?.icon} size={16} className={stat?.color} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat?.title}</p>
                  <p className="text-lg font-semibold text-foreground">{stat?.value?.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Registration Progress */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Registration Progress</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Registration Rate</span>
            <span className="font-medium text-foreground">
              {((stats?.registeredStudents / stats?.totalStudents) * 100)?.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-success h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(stats?.registeredStudents / stats?.totalStudents) * 100}%`
              }}
            />
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Waitlist Rate</span>
            <span className="font-medium text-foreground">
              {((stats?.waitlistedStudents / stats?.totalStudents) * 100)?.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-warning h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(stats?.waitlistedStudents / stats?.totalStudents) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
      {/* Event Capacity Overview */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Event Capacity</h3>
        <div className="space-y-3">
          {stats?.eventCapacity?.map((event) => (
            <div key={event?.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground truncate">
                  {event?.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {event?.registered}/{event?.capacity}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    event?.registered >= event?.capacity ? 'bg-error' :
                    event?.registered >= event?.capacity * 0.8 ? 'bg-warning' : 'bg-success'
                  }`}
                  style={{
                    width: `${Math.min((event?.registered / event?.capacity) * 100, 100)}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Bulk Operations */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Bulk Operations</h3>
        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={onBulkImport}
            iconName="Upload"
            iconPosition="left"
            iconSize={16}
            fullWidth
          >
            Import Students
          </Button>

          <Button
            variant="outline"
            onClick={onBulkExport}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
            fullWidth
          >
            Export Data
          </Button>

          <Button
            variant="secondary"
            onClick={onManageWaitlist}
            iconName="Clock"
            iconPosition="left"
            iconSize={16}
            fullWidth
          >
            Manage Waitlists
          </Button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Mail"
            iconPosition="left"
            iconSize={14}
            fullWidth
            className="justify-start"
          >
            Send Registration Reminders
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="FileText"
            iconPosition="left"
            iconSize={14}
            fullWidth
            className="justify-start"
          >
            Generate Registration Report
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            iconPosition="left"
            iconSize={14}
            fullWidth
            className="justify-start"
          >
            Registration Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationStats;