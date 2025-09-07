import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const StudentProfilePanel = ({ student, onClose, onSave, onGenerateReport }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(student || {});

  if (!student) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="UserCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No Student Selected</h3>
        <p className="text-muted-foreground">Select a student from the list to view their profile</p>
      </div>
    );
  }

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(student);
    setIsEditing(false);
  };

  const getEventStatusColor = (status) => {
    switch (status) {
      case 'Attended': return 'text-success bg-success/10';
      case 'Registered': return 'text-warning bg-warning/10';
      case 'Missed': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const collegeOptions = [
    { value: 'engineering', label: 'College of Engineering' },
    { value: 'business', label: 'Business School' },
    { value: 'arts', label: 'College of Arts & Sciences' },
    { value: 'medicine', label: 'School of Medicine' },
    { value: 'law', label: 'School of Law' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'graduated', label: 'Graduated' },
    { value: 'transferred', label: 'Transferred' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Student Profile</h2>
        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                iconName="Edit"
                iconPosition="left"
              >
                Edit Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onGenerateReport(student)}
                iconName="FileText"
                iconPosition="left"
              >
                Generate Report
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
                iconName="Save"
                iconPosition="left"
              >
                Save Changes
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
      </div>
      <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Basic Information */}
        <div className="mb-8">
          <div className="flex items-start space-x-6 mb-6">
            <div className="shrink-0">
              <Image
                src={student?.profileImage}
                alt={`${student?.name} profile`}
                className="w-24 h-24 rounded-full object-cover"
              />
              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-24"
                  iconName="Camera"
                >
                  Change
                </Button>
              )}
            </div>

            <div className="flex-1 space-y-4">
              {isEditing ? (
                <>
                  <Input
                    label="Full Name"
                    value={editData?.name}
                    onChange={(e) => setEditData({...editData, name: e?.target?.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Student ID"
                      value={editData?.studentId}
                      onChange={(e) => setEditData({...editData, studentId: e?.target?.value})}
                    />
                    <Select
                      label="College"
                      options={collegeOptions}
                      value={editData?.college}
                      onChange={(value) => setEditData({...editData, college: value})}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{student?.name}</h3>
                    <p className="text-muted-foreground">{student?.studentId}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">College:</span>
                    <span className="text-sm font-medium text-foreground">{student?.college}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isEditing ? (
              <>
                <Input
                  label="Email Address"
                  type="email"
                  value={editData?.email}
                  onChange={(e) => setEditData({...editData, email: e?.target?.value})}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={editData?.phone}
                  onChange={(e) => setEditData({...editData, phone: e?.target?.value})}
                />
                <Input
                  label="Academic Year"
                  value={editData?.academicYear}
                  onChange={(e) => setEditData({...editData, academicYear: e?.target?.value})}
                />
                <Select
                  label="Status"
                  options={statusOptions}
                  value={editData?.status}
                  onChange={(value) => setEditData({...editData, status: value})}
                />
              </>
            ) : (
              <>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground">{student?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-foreground">{student?.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Academic Year</label>
                  <p className="text-foreground">{student?.academicYear}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <p className="text-foreground capitalize">{student?.status}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-foreground mb-4">Participation Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{student?.totalEvents}</div>
              <div className="text-sm text-muted-foreground">Total Events</div>
            </div>
            <div className="bg-muted rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-success">{student?.attendanceRate}%</div>
              <div className="text-sm text-muted-foreground">Attendance Rate</div>
            </div>
            <div className="bg-muted rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-warning">{student?.avgFeedback}</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
            <div className="bg-muted rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-accent">{student?.feedbackCount}</div>
              <div className="text-sm text-muted-foreground">Feedback Given</div>
            </div>
          </div>
        </div>

        {/* Event History */}
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-4">Event Participation History</h4>
          <div className="space-y-3">
            {student?.eventHistory?.map((event) => (
              <div key={event?.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">{event?.name}</h5>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-muted-foreground">{event?.date}</span>
                    <span className="text-sm text-muted-foreground">{event?.type}</span>
                    {event?.feedback && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-warning" />
                        <span className="text-sm text-foreground">{event?.feedback}</span>
                      </div>
                    )}
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEventStatusColor(event?.status)}`}>
                  {event?.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePanel;