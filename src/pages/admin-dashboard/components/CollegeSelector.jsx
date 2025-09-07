import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CollegeSelector = ({ selectedCollege, onCollegeChange, colleges, isLoading = false }) => {
  const collegeOptions = [
    { value: 'all', label: 'All Colleges', description: 'View data across all institutions' },
    ...colleges?.map(college => ({
      value: college?.id,
      label: college?.name,
      description: `${college?.studentCount} students • ${college?.activeEvents} active events`
    }))
  ];

  const selectedCollegeData = colleges?.find(c => c?.id === selectedCollege) || null;

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">College Context</h2>
        {isLoading && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="RefreshCw" size={14} className="animate-spin" />
            <span>Updating...</span>
          </div>
        )}
      </div>
      <Select
        label="Select College"
        description="Choose a college to view specific data or select all for comprehensive overview"
        options={collegeOptions}
        value={selectedCollege}
        onChange={onCollegeChange}
        searchable
        className="mb-4"
      />
      {selectedCollegeData && selectedCollege !== 'all' && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-primary rounded-lg">
              <Icon name="Building" size={16} color="white" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">{selectedCollegeData?.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedCollegeData?.location}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Users" size={14} />
                <span className="text-muted-foreground">Total Students</span>
              </div>
              <p className="font-semibold text-foreground">{selectedCollegeData?.studentCount?.toLocaleString()}</p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Calendar" size={14} />
                <span className="text-muted-foreground">Active Events</span>
              </div>
              <p className="font-semibold text-foreground">{selectedCollegeData?.activeEvents}</p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="TrendingUp" size={14} />
                <span className="text-muted-foreground">Avg Attendance</span>
              </div>
              <p className="font-semibold text-foreground">{selectedCollegeData?.avgAttendance}%</p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Star" size={14} />
                <span className="text-muted-foreground">Avg Rating</span>
              </div>
              <p className="font-semibold text-foreground">{selectedCollegeData?.avgRating}/5</p>
            </div>
          </div>
        </div>
      )}
      {selectedCollege === 'all' && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Globe" size={16} />
            <h3 className="font-medium text-foreground">Multi-College Overview</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Viewing aggregated data across all {colleges?.length} colleges in your network.
          </p>
        </div>
      )}
    </div>
  );
};

export default CollegeSelector;