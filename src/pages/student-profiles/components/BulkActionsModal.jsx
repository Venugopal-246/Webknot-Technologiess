import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkActionsModal = ({ isOpen, onClose, selectedStudents, onBulkAction }) => {
  const [actionType, setActionType] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [statusUpdate, setStatusUpdate] = useState('');
  const [includeEmail, setIncludeEmail] = useState(true);
  const [includeSMS, setIncludeSMS] = useState(false);

  if (!isOpen) return null;

  const actionOptions = [
    { value: '', label: 'Select an action...' },
    { value: 'send_message', label: 'Send Message' },
    { value: 'update_status', label: 'Update Status' },
    { value: 'export_data', label: 'Export Selected Data' },
    { value: 'generate_reports', label: 'Generate Reports' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'graduated', label: 'Graduated' },
    { value: 'transferred', label: 'Transferred' },
  ];

  const handleSubmit = () => {
    const actionData = {
      type: actionType,
      students: selectedStudents,
      data: {}
    };

    switch (actionType) {
      case 'send_message':
        actionData.data = {
          subject: emailSubject,
          message: messageContent,
          includeEmail,
          includeSMS
        };
        break;
      case 'update_status':
        actionData.data = { status: statusUpdate };
        break;
      default:
        break;
    }

    onBulkAction(actionData);
    onClose();
  };

  const isFormValid = () => {
    if (!actionType) return false;
    
    switch (actionType) {
      case 'send_message':
        return emailSubject?.trim() && messageContent?.trim();
      case 'update_status':
        return statusUpdate;
      default:
        return true;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            Bulk Actions ({selectedStudents?.length} students)
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Action Selection */}
          <Select
            label="Select Action"
            options={actionOptions}
            value={actionType}
            onChange={setActionType}
            required
          />

          {/* Send Message Form */}
          {actionType === 'send_message' && (
            <div className="space-y-4">
              <Input
                label="Email Subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e?.target?.value)}
                placeholder="Enter email subject..."
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message Content
                </label>
                <textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e?.target?.value)}
                  placeholder="Enter your message..."
                  rows={6}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <Checkbox
                  label="Send via Email"
                  checked={includeEmail}
                  onChange={(e) => setIncludeEmail(e?.target?.checked)}
                />
                <Checkbox
                  label="Send via SMS"
                  checked={includeSMS}
                  onChange={(e) => setIncludeSMS(e?.target?.checked)}
                />
              </div>
            </div>
          )}

          {/* Update Status Form */}
          {actionType === 'update_status' && (
            <Select
              label="New Status"
              options={statusOptions}
              value={statusUpdate}
              onChange={setStatusUpdate}
              required
            />
          )}

          {/* Export/Report Actions */}
          {(actionType === 'export_data' || actionType === 'generate_reports') && (
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground">
                    {actionType === 'export_data' ? 'Export Data' : 'Generate Reports'}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {actionType === 'export_data' 
                      ? 'Student data will be exported to CSV format including profile information and participation history.' :'Individual participation reports will be generated for each selected student.'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Selected Students Preview */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Selected Students</h4>
            <div className="max-h-40 overflow-y-auto border border-border rounded-md">
              {selectedStudents?.map((student) => (
                <div key={student?.id} className="flex items-center space-x-3 p-3 border-b border-border last:border-b-0">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-foreground">
                      {student?.name?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{student?.name}</p>
                    <p className="text-xs text-muted-foreground">{student?.studentId} • {student?.college}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            disabled={!isFormValid()}
            iconName="Send"
            iconPosition="left"
          >
            Execute Action
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsModal;