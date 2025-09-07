import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StudentCard = ({ student, onViewProfile, onEditProfile, onSendMessage }) => {
  const getEngagementColor = (status) => {
    switch (status) {
      case 'High': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'Low': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-standard">
      <div className="flex items-start space-x-4">
        {/* Profile Image */}
        <div className="shrink-0">
          <Image
            src={student?.profileImage}
            alt={`${student?.name} profile`}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>

        {/* Student Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground truncate">
                {student?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {student?.studentId} • {student?.college}
              </p>
              <p className="text-sm text-muted-foreground">
                {student?.email}
              </p>
            </div>

            {/* Engagement Status */}
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(student?.engagementStatus)}`}>
              {student?.engagementStatus}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-6 mt-3">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground font-medium">
                {student?.totalEvents}
              </span>
              <span className="text-sm text-muted-foreground">events</span>
            </div>

            <div className="flex items-center space-x-1">
              <Icon name="CheckSquare" size={16} className="text-muted-foreground" />
              <span className={`text-sm font-medium ${getAttendanceColor(student?.attendanceRate)}`}>
                {student?.attendanceRate}%
              </span>
              <span className="text-sm text-muted-foreground">attendance</span>
            </div>

            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground font-medium">
                {student?.avgFeedback}
              </span>
              <span className="text-sm text-muted-foreground">rating</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewProfile(student)}
              iconName="Eye"
              iconPosition="left"
            >
              View Profile
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditProfile(student)}
              iconName="Edit"
              iconPosition="left"
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSendMessage(student)}
              iconName="MessageSquare"
              iconPosition="left"
            >
              Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;