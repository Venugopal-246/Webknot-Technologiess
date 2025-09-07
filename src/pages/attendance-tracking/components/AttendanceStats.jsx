import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceStats = ({ eventData, attendanceData }) => {
  const attendancePercentage = eventData?.totalRegistrations > 0 
    ? Math.round((attendanceData?.checkedInCount / eventData?.totalRegistrations) * 100) 
    : 0;

  const capacityPercentage = eventData?.capacity > 0 
    ? Math.round((attendanceData?.checkedInCount / eventData?.capacity) * 100) 
    : 0;

  const stats = [
    {
      label: 'Total Registered',
      value: eventData?.totalRegistrations,
      icon: 'Users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Checked In',
      value: attendanceData?.checkedInCount,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Pending',
      value: eventData?.totalRegistrations - attendanceData?.checkedInCount,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Capacity',
      value: `${attendanceData?.checkedInCount}/${eventData?.capacity}`,
      icon: 'Building',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Attendance Overview</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat, index) => (
          <div key={index} className={`${stat?.bgColor} rounded-lg p-4`}>
            <div className="flex items-center space-x-3">
              <div className={`${stat?.color} p-2 rounded-md bg-white/50`}>
                <Icon name={stat?.icon} size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
                <p className="text-sm text-muted-foreground">{stat?.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Progress Bars */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Attendance Rate</span>
            <span className="text-sm text-muted-foreground">{attendancePercentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-300"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Capacity Usage</span>
            <span className="text-sm text-muted-foreground">{capacityPercentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                capacityPercentage > 90 ? 'bg-error' : 
                capacityPercentage > 75 ? 'bg-warning' : 'bg-primary'
              }`}
              style={{ width: `${capacityPercentage}%` }}
            />
          </div>
        </div>
      </div>
      {/* Alert Messages */}
      {capacityPercentage > 90 && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <Icon name="AlertTriangle" size={16} className="text-error" />
          <span className="text-sm text-error font-medium">
            Venue capacity nearly reached! Consider overflow management.
          </span>
        </div>
      )}
      {attendancePercentage < 30 && eventData?.status === 'active' && (
        <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <Icon name="Info" size={16} className="text-warning" />
          <span className="text-sm text-warning font-medium">
            Low attendance rate. Consider sending reminder notifications.
          </span>
        </div>
      )}
    </div>
  );
};

export default AttendanceStats;