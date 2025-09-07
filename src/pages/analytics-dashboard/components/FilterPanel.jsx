import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const FilterPanel = ({ onFiltersChange, isLoading = false }) => {
  const [filters, setFilters] = useState({
    dateRange: '30days',
    eventType: 'all',
    college: 'all',
    status: 'all',
    customStartDate: '',
    customEndDate: ''
  });

  const [showCustomDate, setShowCustomDate] = useState(false);
  const [savedFilters, setSavedFilters] = useState([
    { id: 1, name: 'Monthly Report', filters: { dateRange: '30days', eventType: 'all' } },
    { id: 2, name: 'Workshop Analytics', filters: { dateRange: '90days', eventType: 'workshop' } },
    { id: 3, name: 'Engineering Events', filters: { college: 'engineering', eventType: 'all' } }
  ]);

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: '6months', label: 'Last 6 months' },
    { value: '1year', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const eventTypeOptions = [
    { value: 'all', label: 'All Events' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'seminar', label: 'Seminars' },
    { value: 'hackathon', label: 'Hackathons' },
    { value: 'fest', label: 'Festivals' },
    { value: 'conference', label: 'Conferences' }
  ];

  const collegeOptions = [
    { value: 'all', label: 'All Colleges' },
    { value: 'engineering', label: 'College of Engineering' },
    { value: 'business', label: 'Business School' },
    { value: 'arts', label: 'College of Arts & Sciences' },
    { value: 'medicine', label: 'School of Medicine' },
    { value: 'law', label: 'Law School' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'upcoming', label: 'Upcoming' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    
    if (key === 'dateRange') {
      setShowCustomDate(value === 'custom');
      if (value !== 'custom') {
        newFilters.customStartDate = '';
        newFilters.customEndDate = '';
      }
    }
    
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      dateRange: '30days',
      eventType: 'all',
      college: 'all',
      status: 'all',
      customStartDate: '',
      customEndDate: ''
    };
    setFilters(resetFilters);
    setShowCustomDate(false);
    onFiltersChange(resetFilters);
  };

  const handleSaveFilter = () => {
    const filterName = prompt('Enter a name for this filter preset:');
    if (filterName) {
      const newFilter = {
        id: Date.now(),
        name: filterName,
        filters: { ...filters }
      };
      setSavedFilters([...savedFilters, newFilter]);
    }
  };

  const handleLoadFilter = (savedFilter) => {
    setFilters(savedFilter?.filters);
    setShowCustomDate(savedFilter?.filters?.dateRange === 'custom');
    onFiltersChange(savedFilter?.filters);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Filters & Controls</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveFilter}
            iconName="Save"
            iconPosition="left"
          >
            Save Preset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset
          </Button>
        </div>
      </div>
      {/* Saved Filter Presets */}
      {savedFilters?.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Quick Presets</h4>
          <div className="flex flex-wrap gap-2">
            {savedFilters?.map((preset) => (
              <Button
                key={preset?.id}
                variant="outline"
                size="sm"
                onClick={() => handleLoadFilter(preset)}
                className="text-xs"
              >
                {preset?.name}
              </Button>
            ))}
          </div>
        </div>
      )}
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />

        <Select
          label="Event Type"
          options={eventTypeOptions}
          value={filters?.eventType}
          onChange={(value) => handleFilterChange('eventType', value)}
        />

        <Select
          label="College"
          options={collegeOptions}
          value={filters?.college}
          onChange={(value) => handleFilterChange('college', value)}
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />
      </div>
      {/* Custom Date Range */}
      {showCustomDate && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-muted rounded-lg">
          <Input
            label="Start Date"
            type="date"
            value={filters?.customStartDate}
            onChange={(e) => handleFilterChange('customStartDate', e?.target?.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={filters?.customEndDate}
            onChange={(e) => handleFilterChange('customEndDate', e?.target?.value)}
          />
        </div>
      )}
      {/* Apply Filters Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleApplyFilters}
          loading={isLoading}
          iconName="Filter"
          iconPosition="left"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;