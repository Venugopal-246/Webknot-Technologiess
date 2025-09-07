import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationFilters = ({
  searchTerm,
  onSearchChange,
  selectedCollege,
  onCollegeChange,
  selectedStatus,
  onStatusChange,
  selectedEvent,
  onEventChange,
  onClearFilters,
  colleges,
  events,
  resultCount
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'registered', label: 'Registered' },
    { value: 'waitlisted', label: 'Waitlisted' },
    { value: 'not_registered', label: 'Not Registered' }
  ];

  const collegeOptions = [
    { value: 'all', label: 'All Colleges' },
    ...colleges?.map(college => ({
      value: college?.id,
      label: college?.name
    }))
  ];

  const eventOptions = [
    { value: 'all', label: 'All Events' },
    ...events?.map(event => ({
      value: event?.id,
      label: event?.name
    }))
  ];

  const hasActiveFilters = searchTerm || selectedCollege !== 'all' || selectedStatus !== 'all' || selectedEvent !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filter Students</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear Filters
          </Button>
        )}
      </div>
      {/* Search Input */}
      <div className="space-y-2">
        <Input
          type="search"
          placeholder="Search by name, ID, email, or phone..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="College"
          options={collegeOptions}
          value={selectedCollege}
          onChange={onCollegeChange}
          searchable
        />

        <Select
          label="Registration Status"
          options={statusOptions}
          value={selectedStatus}
          onChange={onStatusChange}
        />

        <Select
          label="Event Filter"
          options={eventOptions}
          value={selectedEvent}
          onChange={onEventChange}
          searchable
        />
      </div>
      {/* Results Count */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Users" size={16} />
          <span>
            {resultCount} student{resultCount !== 1 ? 's' : ''} found
          </span>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-xs text-muted-foreground">Filters active</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationFilters;