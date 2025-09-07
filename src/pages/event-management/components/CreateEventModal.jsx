import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const CreateEventModal = ({ isOpen, onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    college: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    location: '',
    capacity: '',
    fee: '',
    organizer: '',
    contact: '',
    image: '',
    tags: [],
    notifications: {
      registration: true,
      reminder: true,
      updates: true
    },
    settings: {
      allowWaitlist: true,
      requireApproval: false,
      publicEvent: true
    }
  });

  const eventTypeOptions = [
    { value: 'workshop', label: 'Workshop' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'hackathon', label: 'Hackathon' },
    { value: 'fest', label: 'Fest' },
    { value: 'conference', label: 'Conference' },
    { value: 'competition', label: 'Competition' }
  ];

  const collegeOptions = [
    { value: 'engineering', label: 'College of Engineering' },
    { value: 'business', label: 'Business School' },
    { value: 'arts', label: 'College of Arts & Sciences' },
    { value: 'medicine', label: 'School of Medicine' },
    { value: 'law', label: 'School of Law' }
  ];

  const tagOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'arts', label: 'Arts' },
    { value: 'science', label: 'Science' },
    { value: 'sports', label: 'Sports' },
    { value: 'cultural', label: 'Cultural' }
  ];

  const steps = [
    { id: 1, title: 'Basic Info', icon: 'Info' },
    { id: 2, title: 'Details', icon: 'FileText' },
    { id: 3, title: 'Settings', icon: 'Settings' },
    { id: 4, title: 'Review', icon: 'CheckCircle' }
  ];

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev?.[parent],
        [field]: value
      }
    }));
  };

  const handleTagChange = (tag, checked) => {
    setFormData(prev => ({
      ...prev,
      tags: checked 
        ? [...prev?.tags, tag]
        : prev?.tags?.filter(t => t !== tag)
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
    setCurrentStep(1);
    setFormData({
      name: '',
      type: '',
      college: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      location: '',
      capacity: '',
      fee: '',
      organizer: '',
      contact: '',
      image: '',
      tags: [],
      notifications: {
        registration: true,
        reminder: true,
        updates: true
      },
      settings: {
        allowWaitlist: true,
        requireApproval: false,
        publicEvent: true
      }
    });
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {steps?.map((step, index) => (
        <div key={step?.id} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
            currentStep >= step?.id 
              ? 'bg-primary border-primary text-primary-foreground' 
              : 'border-border text-muted-foreground'
          }`}>
            <Icon name={step?.icon} size={16} />
          </div>
          <div className="ml-3 hidden sm:block">
            <div className={`text-sm font-medium ${
              currentStep >= step?.id ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {step?.title}
            </div>
          </div>
          {index < steps?.length - 1 && (
            <div className={`w-12 h-0.5 mx-4 ${
              currentStep > step?.id ? 'bg-primary' : 'bg-border'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Event Name"
          type="text"
          placeholder="Enter event name"
          value={formData?.name}
          onChange={(e) => handleInputChange('name', e?.target?.value)}
          required
        />
        <Select
          label="Event Type"
          options={eventTypeOptions}
          value={formData?.type}
          onChange={(value) => handleInputChange('type', value)}
          placeholder="Select event type"
          required
        />
      </div>
      
      <Select
        label="College"
        options={collegeOptions}
        value={formData?.college}
        onChange={(value) => handleInputChange('college', value)}
        placeholder="Select college"
        required
      />

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Description
        </label>
        <textarea
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          rows={4}
          placeholder="Describe your event..."
          value={formData?.description}
          onChange={(e) => handleInputChange('description', e?.target?.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Event Date"
          type="date"
          value={formData?.date}
          onChange={(e) => handleInputChange('date', e?.target?.value)}
          required
        />
        <Input
          label="Event Time"
          type="time"
          value={formData?.time}
          onChange={(e) => handleInputChange('time', e?.target?.value)}
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Venue"
          type="text"
          placeholder="e.g., Main Auditorium"
          value={formData?.venue}
          onChange={(e) => handleInputChange('venue', e?.target?.value)}
          required
        />
        <Input
          label="Location"
          type="text"
          placeholder="e.g., Building A, Floor 2"
          value={formData?.location}
          onChange={(e) => handleInputChange('location', e?.target?.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Capacity"
          type="number"
          placeholder="Maximum attendees"
          value={formData?.capacity}
          onChange={(e) => handleInputChange('capacity', e?.target?.value)}
          required
        />
        <Input
          label="Registration Fee"
          type="number"
          placeholder="0 for free events"
          value={formData?.fee}
          onChange={(e) => handleInputChange('fee', e?.target?.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Organizer Name"
          type="text"
          placeholder="Event organizer"
          value={formData?.organizer}
          onChange={(e) => handleInputChange('organizer', e?.target?.value)}
          required
        />
        <Input
          label="Contact Email"
          type="email"
          placeholder="contact@college.edu"
          value={formData?.contact}
          onChange={(e) => handleInputChange('contact', e?.target?.value)}
          required
        />
      </div>

      <Input
        label="Event Image URL"
        type="url"
        placeholder="https://example.com/image.jpg"
        value={formData?.image}
        onChange={(e) => handleInputChange('image', e?.target?.value)}
      />

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Event Tags
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {tagOptions?.map((tag) => (
            <Checkbox
              key={tag?.value}
              label={tag?.label}
              checked={formData?.tags?.includes(tag?.value)}
              onChange={(e) => handleTagChange(tag?.value, e?.target?.checked)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-foreground mb-4">Notification Settings</h4>
        <div className="space-y-3">
          <Checkbox
            label="Registration Confirmations"
            description="Send confirmation emails when students register"
            checked={formData?.notifications?.registration}
            onChange={(e) => handleNestedChange('notifications', 'registration', e?.target?.checked)}
          />
          <Checkbox
            label="Event Reminders"
            description="Send reminder notifications before the event"
            checked={formData?.notifications?.reminder}
            onChange={(e) => handleNestedChange('notifications', 'reminder', e?.target?.checked)}
          />
          <Checkbox
            label="Event Updates"
            description="Notify attendees of any event changes"
            checked={formData?.notifications?.updates}
            onChange={(e) => handleNestedChange('notifications', 'updates', e?.target?.checked)}
          />
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-foreground mb-4">Event Settings</h4>
        <div className="space-y-3">
          <Checkbox
            label="Allow Waitlist"
            description="Enable waitlist when event reaches capacity"
            checked={formData?.settings?.allowWaitlist}
            onChange={(e) => handleNestedChange('settings', 'allowWaitlist', e?.target?.checked)}
          />
          <Checkbox
            label="Require Approval"
            description="Manually approve each registration"
            checked={formData?.settings?.requireApproval}
            onChange={(e) => handleNestedChange('settings', 'requireApproval', e?.target?.checked)}
          />
          <Checkbox
            label="Public Event"
            description="Make event visible to all students"
            checked={formData?.settings?.publicEvent}
            onChange={(e) => handleNestedChange('settings', 'publicEvent', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="bg-muted rounded-lg p-6">
        <h4 className="text-lg font-medium text-foreground mb-4">Event Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Name:</span>
            <span className="ml-2 font-medium">{formData?.name}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Type:</span>
            <span className="ml-2 font-medium capitalize">{formData?.type}</span>
          </div>
          <div>
            <span className="text-muted-foreground">College:</span>
            <span className="ml-2 font-medium">{collegeOptions?.find(c => c?.value === formData?.college)?.label}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Date:</span>
            <span className="ml-2 font-medium">{formData?.date} at {formData?.time}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Venue:</span>
            <span className="ml-2 font-medium">{formData?.venue}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Capacity:</span>
            <span className="ml-2 font-medium">{formData?.capacity} attendees</span>
          </div>
          <div>
            <span className="text-muted-foreground">Fee:</span>
            <span className="ml-2 font-medium">{formData?.fee ? `$${formData?.fee}` : 'Free'}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Organizer:</span>
            <span className="ml-2 font-medium">{formData?.organizer}</span>
          </div>
        </div>
        {formData?.description && (
          <div className="mt-4">
            <span className="text-muted-foreground">Description:</span>
            <p className="mt-1 text-sm">{formData?.description}</p>
          </div>
        )}
        {formData?.tags?.length > 0 && (
          <div className="mt-4">
            <span className="text-muted-foreground">Tags:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {formData?.tags?.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                  {tagOptions?.find(t => t?.value === tag)?.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Create New Event</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {renderStepIndicator()}
          {renderCurrentStep()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                iconName="Check"
                iconPosition="left"
              >
                Create Event
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;