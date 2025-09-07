import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onCreateEvent, onManageStudents, onGenerateReport, onViewAnalytics }) => {
  const quickActionItems = [
    {
      title: 'Create New Event',
      description: 'Set up a new campus event with details and registration',
      icon: 'Plus',
      color: 'default',
      action: onCreateEvent
    },
    {
      title: 'Manage Students',
      description: 'Add, edit, or import student information',
      icon: 'Users',
      color: 'outline',
      action: onManageStudents
    },
    {
      title: 'Generate Report',
      description: 'Create detailed analytics and participation reports',
      icon: 'FileText',
      color: 'outline',
      action: onGenerateReport
    },
    {
      title: 'View Analytics',
      description: 'Access comprehensive event and student analytics',
      icon: 'BarChart3',
      color: 'outline',
      action: onViewAnalytics
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActionItems?.map((item, index) => (
          <div
            key={index}
            className="p-4 border border-border rounded-lg hover:shadow-elevation-1 transition-standard cursor-pointer group"
            onClick={item?.action}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-muted rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-standard">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName={item?.icon}
                  className="w-5 h-5 p-0"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-standard">
                  {item?.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {item?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Need help getting started?
          </div>
          <Button variant="ghost" size="sm" iconName="HelpCircle" iconPosition="left">
            View Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;