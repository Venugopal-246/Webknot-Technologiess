import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const EventPopularityChart = ({ data, isLoading = false }) => {
  const chartData = [
    { name: 'Tech Conference 2024', registrations: 450, attendance: 380, capacity: 500 },
    { name: 'AI Workshop Series', registrations: 320, attendance: 295, capacity: 350 },
    { name: 'Spring Career Fair', registrations: 680, attendance: 620, capacity: 800 },
    { name: 'Hackathon Weekend', registrations: 280, attendance: 265, capacity: 300 },
    { name: 'Research Symposium', registrations: 150, attendance: 142, capacity: 200 },
    { name: 'Innovation Summit', registrations: 390, attendance: 350, capacity: 400 },
    { name: 'Startup Pitch Day', registrations: 220, attendance: 195, capacity: 250 },
    { name: 'Data Science Bootcamp', registrations: 180, attendance: 168, capacity: 200 }
  ];

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
              <span className="text-popover-foreground">
                {entry?.dataKey === 'registrations' ? 'Registrations' : 
                 entry?.dataKey === 'attendance' ? 'Attendance' : 'Capacity'}: {entry?.value}
              </span>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Attendance Rate: {payload?.[1] && payload?.[0] ? 
                Math.round((payload?.[1]?.value / payload?.[0]?.value) * 100) : 0}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Event Popularity Trends</h3>
          <div className="animate-spin">
            <Icon name="Loader2" size={20} />
          </div>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="text-center">
            <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Loading chart data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Event Popularity Trends</h3>
          <p className="text-sm text-muted-foreground">Registration vs Attendance comparison</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-sm text-muted-foreground">Registrations</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-sm text-muted-foreground">Attendance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-muted rounded-full" />
            <span className="text-sm text-muted-foreground">Capacity</span>
          </div>
        </div>
      </div>
      <div className="h-80" aria-label="Event Popularity Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="capacity" 
              fill="var(--color-muted)" 
              name="Capacity"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="registrations" 
              fill="var(--color-primary)" 
              name="Registrations"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="attendance" 
              fill="var(--color-success)" 
              name="Attendance"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-2xl font-bold text-foreground">
            {chartData?.reduce((sum, item) => sum + item?.registrations, 0)?.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Total Registrations</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-2xl font-bold text-foreground">
            {chartData?.reduce((sum, item) => sum + item?.attendance, 0)?.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Total Attendance</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-2xl font-bold text-foreground">
            {Math.round((chartData?.reduce((sum, item) => sum + item?.attendance, 0) / 
              chartData?.reduce((sum, item) => sum + item?.registrations, 0)) * 100)}%
          </p>
          <p className="text-sm text-muted-foreground">Average Attendance Rate</p>
        </div>
      </div>
    </div>
  );
};

export default EventPopularityChart;