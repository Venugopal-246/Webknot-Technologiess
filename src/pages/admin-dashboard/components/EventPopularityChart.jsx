import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const EventPopularityChart = ({ data, onFilterChange }) => {
  const [timeRange, setTimeRange] = useState('7days');
  const [eventType, setEventType] = useState('all');

  const timeRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' }
  ];

  const eventTypeOptions = [
    { value: 'all', label: 'All Events' },
    { value: 'Workshop', label: 'Workshops' },
    { value: 'Seminar', label: 'Seminars' },
    { value: 'Hackathon', label: 'Hackathons' },
    { value: 'Fest', label: 'Fests' }
  ];

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    onFilterChange({ timeRange: value, eventType });
  };

  const handleEventTypeChange = (value) => {
    setEventType(value);
    onFilterChange({ timeRange, eventType: value });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.dataKey}:</span>
              <span className="font-medium text-popover-foreground">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Event Popularity Trends</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="Download">
              Export
            </Button>
            <Button variant="ghost" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select
            label="Time Range"
            options={timeRangeOptions}
            value={timeRange}
            onChange={handleTimeRangeChange}
            className="w-40"
          />
          <Select
            label="Event Type"
            options={eventTypeOptions}
            value={eventType}
            onChange={handleEventTypeChange}
            className="w-40"
          />
        </div>
      </div>
      
      <div className="p-6">
        <div className="w-full h-80" aria-label="Event Popularity Bar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="registrations" 
                name="Registrations"
                fill="var(--color-primary)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="attendance" 
                name="Attendance"
                fill="var(--color-success)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EventPopularityChart;