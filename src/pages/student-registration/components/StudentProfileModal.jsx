import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const StudentProfileModal = ({ isOpen, onClose, student, onUpdateProfile }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !student) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'events', label: 'Events', icon: 'Calendar' },
    { id: 'history', label: 'History', icon: 'Clock' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="flex items-start space-x-4">
        <Image
          src={student?.avatar}
          alt={`${student?.name} profile`}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground">{student?.name}</h3>
          <p className="text-muted-foreground">Student ID: {student?.studentId}</p>
          <p className="text-muted-foreground">{student?.college}</p>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="Mail" size={14} />
              <span>{student?.email}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="Phone" size={14} />
              <span>{student?.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Academic Year</p>
          <p className="text-sm text-muted-foreground">{student?.academicYear || 'Not specified'}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Department</p>
          <p className="text-sm text-muted-foreground">{student?.department || 'Not specified'}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Registration Date</p>
          <p className="text-sm text-muted-foreground">{student?.registrationDate || 'Not available'}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Status</p>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              student?.status === 'active' ? 'bg-success' : 'bg-muted'
            }`} />
            <span className="text-sm text-muted-foreground capitalize">{student?.status || 'Active'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-foreground">Event Enrollments</h4>
      {student?.eventEnrollments && student?.eventEnrollments?.length > 0 ? (
        <div className="space-y-3">
          {student?.eventEnrollments?.map((enrollment) => (
            <div key={enrollment?.eventId} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-foreground">{enrollment?.eventName}</h5>
                  <p className="text-sm text-muted-foreground">{enrollment?.eventType}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Registered: {enrollment?.registrationDate}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                    enrollment?.status === 'confirmed' ? 'bg-success/10 text-success' :
                    enrollment?.status === 'waitlisted'? 'bg-warning/10 text-warning' : 'bg-muted/10 text-muted-foreground'
                  }`}>
                    <Icon name={
                      enrollment?.status === 'confirmed' ? 'CheckCircle' :
                      enrollment?.status === 'waitlisted' ? 'Clock' : 'Circle'
                    } size={12} />
                    <span className="capitalize">{enrollment?.status}</span>
                  </div>
                  {enrollment?.attendanceStatus && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Attendance: {enrollment?.attendanceStatus}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No event enrollments found</p>
        </div>
      )}
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-foreground">Activity History</h4>
      <div className="space-y-3">
        {student?.activityHistory?.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
            <div className={`p-2 rounded-full ${
              activity?.type === 'registration' ? 'bg-success/10' :
              activity?.type === 'cancellation'? 'bg-error/10' : 'bg-primary/10'
            }`}>
              <Icon 
                name={
                  activity?.type === 'registration' ? 'UserPlus' :
                  activity?.type === 'cancellation'? 'UserMinus' : 'Activity'
                } 
                size={14} 
                className={
                  activity?.type === 'registration' ? 'text-success' :
                  activity?.type === 'cancellation'? 'text-error' : 'text-primary'
                }
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{activity?.action}</p>
              <p className="text-xs text-muted-foreground">{activity?.details}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity?.timestamp}</p>
            </div>
          </div>
        )) || (
          <div className="text-center py-8">
            <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No activity history available</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Student Profile</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Detailed information and enrollment history
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-0">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'events' && renderEvents()}
          {activeTab === 'history' && renderHistory()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="default"
            onClick={() => onUpdateProfile(student)}
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileModal;