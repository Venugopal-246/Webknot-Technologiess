import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StudentFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onBulkImport, 
  onBulkExport 
}) => {
  const collegeOptions = [
    { value: 'all', label: 'All Colleges' },
    { value: 'engineering', label: 'College of Engineering' },
    { value: 'business', label: 'Business School' },
    { value: 'arts', label: 'College of Arts & Sciences' },
    { value: 'medicine', label: 'School of Medicine' },
    { value: 'law', label: 'School of Law' },
  ];

  const engagementOptions = [
    { value: 'all', label: 'All Engagement Levels' },
    { value: 'high', label: 'High Engagement' },
    { value: 'medium', label: 'Medium Engagement' },
    { value: 'low', label: 'Low Engagement' },
  ];

  const attendanceOptions = [
    { value: 'all', label: 'All Attendance Rates' },
    { value: '80+', label: '80% and above' },
    { value: '60-79', label: '60% - 79%' },
    { value: '40-59', label: '40% - 59%' },
    { value: '<40', label: 'Below 40%' },
  ];

  const participationOptions = [
    { value: 'all', label: 'All Participation Levels' },
    { value: '10+', label: '10+ Events' },
    { value: '5-9', label: '5-9 Events' },
    { value: '1-4', label: '1-4 Events' },
    { value: '0', label: 'No Events' },
  ];

  const academicYearOptions = [
    { value: 'all', label: 'All Academic Years' },
    { value: '2024-25', label: '2024-25' },
    { value: '2023-24', label: '2023-24' },
    { value: '2022-23', label: '2022-23' },
    { value: '2021-22', label: '2021-22' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Filter Students</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkImport}
            iconName="Upload"
            iconPosition="left"
          >
            Import Students
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onBulkExport}
            iconName="Download"
            iconPosition="left"
          >
            Export Data
          </Button>
        </div>
      </div>
      {/* Search */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search by name, student ID, or email..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Select
          label="College"
          options={collegeOptions}
          value={filters?.college}
          onChange={(value) => onFilterChange('college', value)}
        />

        <Select
          label="Engagement Level"
          options={engagementOptions}
          value={filters?.engagement}
          onChange={(value) => onFilterChange('engagement', value)}
        />

        <Select
          label="Attendance Rate"
          options={attendanceOptions}
          value={filters?.attendance}
          onChange={(value) => onFilterChange('attendance', value)}
        />

        <Select
          label="Participation Level"
          options={participationOptions}
          value={filters?.participation}
          onChange={(value) => onFilterChange('participation', value)}
        />

        <Select
          label="Academic Year"
          options={academicYearOptions}
          value={filters?.academicYear}
          onChange={(value) => onFilterChange('academicYear', value)}
        />

        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
      </div>
      {/* Active Filters */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(filters)?.map(([key, value]) => {
          if (value && value !== 'all' && key !== 'search') {
            return (
              <span
                key={key}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {key}: {value}
                <button
                  onClick={() => onFilterChange(key, 'all')}
                  className="ml-2 hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            );
          }
          return null;
        })}
        {filters?.search && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Search: {filters?.search}
            <button
              onClick={() => onFilterChange('search', '')}
              className="ml-2 hover:text-primary/80"
            >
              <Icon name="X" size={12} />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default StudentFilters;