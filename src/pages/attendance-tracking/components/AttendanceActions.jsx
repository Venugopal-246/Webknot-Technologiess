import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AttendanceActions = ({ 
  selectedEvent, 
  attendanceData, 
  onExportReport, 
  onSendReminders, 
  onMarkAllPresent,
  onAddMissingStudent 
}) => {
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    studentId: '',
    email: '',
    college: ''
  });
  const [exportFormat, setExportFormat] = useState('excel');

  const exportOptions = [
    { value: 'excel', label: 'Excel (.xlsx)' },
    { value: 'csv', label: 'CSV (.csv)' },
    { value: 'pdf', label: 'PDF Report' }
  ];

  const handleAddStudent = (e) => {
    e?.preventDefault();
    if (newStudent?.name && newStudent?.studentId) {
      onAddMissingStudent(newStudent);
      setNewStudent({ name: '', studentId: '', email: '', college: '' });
      setShowAddStudent(false);
    }
  };

  const handleExport = () => {
    onExportReport(exportFormat);
  };

  const actionButtons = [
    {
      label: 'Export Report',
      icon: 'Download',
      variant: 'default',
      action: handleExport,
      disabled: !selectedEvent
    },
    {
      label: 'Send Reminders',
      icon: 'Mail',
      variant: 'outline',
      action: onSendReminders,
      disabled: !selectedEvent || attendanceData?.pendingCount === 0
    },
    {
      label: 'Mark All Present',
      icon: 'CheckSquare',
      variant: 'outline',
      action: onMarkAllPresent,
      disabled: !selectedEvent || attendanceData?.pendingCount === 0,
      warning: true
    },
    {
      label: 'Add Missing Student',
      icon: 'UserPlus',
      variant: 'outline',
      action: () => setShowAddStudent(true),
      disabled: !selectedEvent
    }
  ];

  return (
    <div className="space-y-6">
      {/* Primary Actions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Attendance Actions</h3>
          <div className="flex items-center space-x-2">
            <Select
              options={exportOptions}
              value={exportFormat}
              onChange={setExportFormat}
              className="w-40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {actionButtons?.map((button, index) => (
            <Button
              key={index}
              variant={button?.variant}
              onClick={button?.action}
              disabled={button?.disabled}
              iconName={button?.icon}
              iconPosition="left"
              className={`justify-start ${button?.warning ? 'hover:bg-warning/10 hover:border-warning' : ''}`}
            >
              {button?.label}
            </Button>
          ))}
        </div>

        {/* Action Descriptions */}
        <div className="mt-4 p-3 bg-muted/50 rounded-md">
          <p className="text-xs text-muted-foreground">
            <strong>Export Report:</strong> Download attendance data in selected format • 
            <strong>Send Reminders:</strong> Email notifications to pending students • 
            <strong>Mark All Present:</strong> Bulk check-in for remaining students • 
            <strong>Add Missing:</strong> Register walk-in students
          </p>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="font-medium text-foreground mb-3">Quick Actions Summary</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Icon name="Users" size={24} className="mx-auto text-blue-600 mb-2" />
            <p className="text-lg font-bold text-blue-900">{attendanceData?.totalRegistered || 0}</p>
            <p className="text-xs text-blue-700">Total Registered</p>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Icon name="UserCheck" size={24} className="mx-auto text-success mb-2" />
            <p className="text-lg font-bold text-green-900">{attendanceData?.checkedInCount || 0}</p>
            <p className="text-xs text-green-700">Checked In</p>
          </div>
          
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <Icon name="Clock" size={24} className="mx-auto text-warning mb-2" />
            <p className="text-lg font-bold text-yellow-900">{attendanceData?.pendingCount || 0}</p>
            <p className="text-xs text-yellow-700">Pending</p>
          </div>
          
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <Icon name="TrendingUp" size={24} className="mx-auto text-purple-600 mb-2" />
            <p className="text-lg font-bold text-purple-900">
              {attendanceData?.totalRegistered > 0 
                ? Math.round((attendanceData?.checkedInCount / attendanceData?.totalRegistered) * 100)
                : 0}%
            </p>
            <p className="text-xs text-purple-700">Attendance Rate</p>
          </div>
        </div>
      </div>
      {/* Add Missing Student Modal */}
      {showAddStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-foreground">Add Missing Student</h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAddStudent(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4">
              <Input
                label="Student Name"
                type="text"
                placeholder="Enter full name"
                value={newStudent?.name}
                onChange={(e) => setNewStudent(prev => ({ ...prev, name: e?.target?.value }))}
                required
              />

              <Input
                label="Student ID"
                type="text"
                placeholder="Enter student ID"
                value={newStudent?.studentId}
                onChange={(e) => setNewStudent(prev => ({ ...prev, studentId: e?.target?.value }))}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                value={newStudent?.email}
                onChange={(e) => setNewStudent(prev => ({ ...prev, email: e?.target?.value }))}
              />

              <Input
                label="College"
                type="text"
                placeholder="Enter college name"
                value={newStudent?.college}
                onChange={(e) => setNewStudent(prev => ({ ...prev, college: e?.target?.value }))}
              />

              <div className="flex space-x-3 pt-4">
                <Button
                  type="submit"
                  variant="default"
                  className="flex-1"
                  iconName="UserPlus"
                  iconPosition="left"
                >
                  Add & Check In
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddStudent(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceActions;