import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const StudentCard = ({ student, onRegister, onViewProfile, onRemoveRegistration, selectedEvents }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'registered':
        return 'bg-success text-success-foreground';
      case 'waitlisted':
        return 'bg-warning text-warning-foreground';
      case 'not_registered':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'registered':
        return 'CheckCircle';
      case 'waitlisted':
        return 'Clock';
      case 'not_registered':
        return 'Circle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-standard">
      <div className="flex items-start space-x-4">
        {/* Student Avatar */}
        <div className="shrink-0">
          <Image
            src={student?.avatar}
            alt={`${student?.name} profile`}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>

        {/* Student Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-foreground truncate">
                {student?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                ID: {student?.studentId}
              </p>
              <p className="text-sm text-muted-foreground">
                {student?.college}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Mail" size={12} />
                  <span className="truncate max-w-32">{student?.email}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Phone" size={12} />
                  <span>{student?.phone}</span>
                </div>
              </div>
            </div>

            {/* Registration Status */}
            <div className="shrink-0 ml-4">
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student?.registrationStatus)}`}>
                <Icon name={getStatusIcon(student?.registrationStatus)} size={12} />
                <span className="capitalize">{student?.registrationStatus?.replace('_', ' ')}</span>
              </div>
            </div>
          </div>

          {/* Event Enrollments */}
          {student?.eventEnrollments && student?.eventEnrollments?.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-muted-foreground mb-2">Current Enrollments:</p>
              <div className="flex flex-wrap gap-1">
                {student?.eventEnrollments?.slice(0, 3)?.map((enrollment) => (
                  <span
                    key={enrollment?.eventId}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                  >
                    <span className="truncate max-w-24">{enrollment?.eventName}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      enrollment?.status === 'confirmed' ? 'bg-success' :
                      enrollment?.status === 'waitlisted' ? 'bg-warning' : 'bg-muted'
                    }`} />
                  </span>
                ))}
                {student?.eventEnrollments?.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{student?.eventEnrollments?.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewProfile(student)}
              iconName="User"
              iconPosition="left"
              iconSize={14}
            >
              Profile
            </Button>

            {student?.registrationStatus === 'not_registered' && (
              <Button
                variant="default"
                size="sm"
                onClick={() => onRegister(student)}
                iconName="Plus"
                iconPosition="left"
                iconSize={14}
                disabled={!selectedEvents || selectedEvents?.length === 0}
              >
                Register
              </Button>
            )}

            {student?.registrationStatus === 'registered' && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onRemoveRegistration(student)}
                iconName="X"
                iconPosition="left"
                iconSize={14}
              >
                Remove
              </Button>
            )}

            {student?.registrationStatus === 'waitlisted' && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onRegister(student)}
                iconName="Clock"
                iconPosition="left"
                iconSize={14}
              >
                Manage Waitlist
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;