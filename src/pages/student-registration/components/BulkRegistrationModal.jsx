import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkRegistrationModal = ({ isOpen, onClose, selectedStudents, events, onBulkRegister }) => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [sendNotifications, setSendNotifications] = useState(true);
  const [overrideCapacity, setOverrideCapacity] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const eventOptions = events?.map(event => ({
    value: event?.id,
    label: `${event?.name} (${event?.registered}/${event?.capacity})`
  }));

  const handleRegister = async () => {
    if (selectedEvents?.length === 0) return;
    
    setIsProcessing(true);
    try {
      await onBulkRegister({
        studentIds: selectedStudents?.map(s => s?.id),
        eventIds: selectedEvents,
        sendNotifications,
        overrideCapacity
      });
      onClose();
      setSelectedEvents([]);
    } catch (error) {
      console.error('Bulk registration failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Bulk Registration</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Register {selectedStudents?.length} selected student{selectedStudents?.length !== 1 ? 's' : ''} for events
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

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
          {/* Selected Students Preview */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Selected Students</h3>
            <div className="bg-muted rounded-lg p-3 max-h-32 overflow-y-auto">
              <div className="space-y-1">
                {selectedStudents?.slice(0, 5)?.map((student) => (
                  <div key={student?.id} className="flex items-center space-x-2 text-sm">
                    <Icon name="User" size={14} className="text-muted-foreground" />
                    <span className="text-foreground">{student?.name}</span>
                    <span className="text-muted-foreground">({student?.studentId})</span>
                  </div>
                ))}
                {selectedStudents?.length > 5 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    +{selectedStudents?.length - 5} more students
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Event Selection */}
          <div>
            <Select
              label="Select Events"
              description="Choose which events to register students for"
              options={eventOptions}
              value={selectedEvents}
              onChange={setSelectedEvents}
              multiple
              searchable
              required
            />
          </div>

          {/* Options */}
          <div className="space-y-4">
            <Checkbox
              label="Send email notifications"
              description="Send registration confirmation emails to students"
              checked={sendNotifications}
              onChange={(e) => setSendNotifications(e?.target?.checked)}
            />

            <Checkbox
              label="Override capacity limits"
              description="Allow registration even if events are at full capacity (will add to waitlist)"
              checked={overrideCapacity}
              onChange={(e) => setOverrideCapacity(e?.target?.checked)}
            />
          </div>

          {/* Event Capacity Warnings */}
          {selectedEvents?.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Capacity Status</h4>
              {selectedEvents?.map(eventId => {
                const event = events?.find(e => e?.id === eventId);
                if (!event) return null;
                
                const remainingCapacity = event?.capacity - event?.registered;
                const willExceedCapacity = selectedStudents?.length > remainingCapacity;
                
                return (
                  <div key={eventId} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm text-foreground">{event?.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {event?.registered}/{event?.capacity}
                      </span>
                      {willExceedCapacity && (
                        <div className="flex items-center space-x-1">
                          <Icon name="AlertTriangle" size={14} className="text-warning" />
                          <span className="text-xs text-warning">
                            {selectedStudents?.length - remainingCapacity} will be waitlisted
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleRegister}
            loading={isProcessing}
            disabled={selectedEvents?.length === 0}
            iconName="UserPlus"
            iconPosition="left"
            iconSize={16}
          >
            Register Students
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkRegistrationModal;