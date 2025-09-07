import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const EventFilters = ({ onFiltersChange, onClearFilters }) => {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: '',
    college: '',
    dateFrom: '',
    dateTo: ''
  });

  const eventTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'hackathon', label: 'Hackathon' },
    { value: 'fest', label: 'Fest' },
    { value: 'conference', label: 'Conference' },
    { value: 'competition', label: 'Competition' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'draft', label: 'Draft' }
  ];

  const collegeOptions = [
    { value: '', label: 'All Colleges' },
    { value: 'engineering', label: 'College of Engineering' },
    { value: 'business', label: 'Business School' },
    { value: 'arts', label: 'College of Arts & Sciences' },
    { value: 'medicine', label: 'School of Medicine' },
    { value: 'law', label: 'School of Law' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      search: '',
      type: '',
      status: '',
      college: '',
      dateFrom: '',
      dateTo: ''
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filter Events</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Search */}
        <div className="xl:col-span-2">
          <Input
            type="search"
            placeholder="Search events..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Event Type */}
        <Select
          options={eventTypeOptions}
          value={filters?.type}
          onChange={(value) => handleFilterChange('type', value)}
          placeholder="Event Type"
        />

        {/* Status */}
        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Status"
        />

        {/* College */}
        <Select
          options={collegeOptions}
          value={filters?.college}
          onChange={(value) => handleFilterChange('college', value)}
          placeholder="College"
        />

        {/* Date Range */}
        <div className="flex space-x-2">
          <Input
            type="date"
            value={filters?.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
            placeholder="From Date"
            className="flex-1"
          />
          <Input
            type="date"
            value={filters?.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
            placeholder="To Date"
            className="flex-1"
          />
        </div>
      </div>
      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground mr-2">Quick filters:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleFilterChange('status', 'active')}
          className="text-xs"
        >
          Active Events
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleFilterChange('type', 'hackathon')}
          className="text-xs"
        >
          Hackathons
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const today = new Date()?.toISOString()?.split('T')?.[0];
            handleFilterChange('dateFrom', today);
          }}
          className="text-xs"
        >
          Today's Events
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const nextWeek = new Date();
            nextWeek?.setDate(nextWeek?.getDate() + 7);
            handleFilterChange('dateTo', nextWeek?.toISOString()?.split('T')?.[0]);
          }}
          className="text-xs"
        >
          Next 7 Days
        </Button>
      </div>
    </div>
  );
};

export default EventFilters;