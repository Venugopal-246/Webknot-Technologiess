import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendancePatternChart = ({ isLoading = false }) => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('weekly');

  const weeklyData = [
    { period: 'Week 1', workshops: 85, seminars: 92, hackathons: 78, fests: 95 },
    { period: 'Week 2', workshops: 88, seminars: 89, hackathons: 82, fests: 91 },
    { period: 'Week 3', workshops: 92, seminars: 94, hackathons: 85, fests: 88 },
    { period: 'Week 4', workshops: 87, seminars: 91, hackathons: 79, fests: 93 },
    { period: 'Week 5', workshops: 90, seminars: 88, hackathons: 88, fests: 89 },
    { period: 'Week 6', workshops: 93, seminars: 95, hackathons: 91, fests: 92 },
    { period: 'Week 7', workshops: 89, seminars: 87, hackathons: 86, fests: 94 },
    { period: 'Week 8', workshops: 91, seminars: 93, hackathons: 89, fests: 90 }
  ];

  const monthlyData = [
    { period: 'Jan', workshops: 88, seminars: 91, hackathons: 83, fests: 92 },
    { period: 'Feb', workshops: 92, seminars: 89, hackathons: 87, fests: 94 },
    { period: 'Mar', workshops: 87, seminars: 93, hackathons: 85, fests: 89 },
    { period: 'Apr', workshops: 90, seminars: 88, hackathons: 91, fests: 93 },
    { period: 'May', workshops: 94, seminars: 92, hackathons: 89, fests: 91 },
    { period: 'Jun', workshops: 89, seminars: 90, hackathons: 86, fests: 88 }
  ];

  const currentData = timeRange === 'weekly' ? weeklyData : monthlyData;

  const eventTypes = [
    { key: 'workshops', name: 'Workshops', color: 'var(--color-primary)' },
    { key: 'seminars', name: 'Seminars', color: 'var(--color-success)' },
    { key: 'hackathons', name: 'Hackathons', color: 'var(--color-warning)' },
    { key: 'fests', name: 'Festivals', color: 'var(--color-accent)' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-popover-foreground">{entry?.name}</span>
              </div>
              <span className="font-medium text-popover-foreground">{entry?.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Attendance Patterns</h3>
          <div className="animate-spin">
            <Icon name="Loader2" size={20} />
          </div>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="text-center">
            <Icon name="TrendingUp" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Loading attendance data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Attendance Patterns</h3>
          <p className="text-sm text-muted-foreground">Attendance percentage trends by event type</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={timeRange === 'weekly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange('weekly')}
              className="text-xs"
            >
              Weekly
            </Button>
            <Button
              variant={timeRange === 'monthly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange('monthly')}
              className="text-xs"
            >
              Monthly
            </Button>
          </div>
          
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={chartType === 'line' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('line')}
              iconName="TrendingUp"
            />
            <Button
              variant={chartType === 'area' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('area')}
              iconName="AreaChart"
            />
          </div>
        </div>
      </div>
      <div className="h-80" aria-label="Attendance Pattern Chart">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="period" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis 
                stroke="var(--color-muted-foreground)" 
                fontSize={12}
                domain={['dataMin - 5', 'dataMax + 5']}
                label={{ value: 'Attendance %', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {eventTypes?.map((type) => (
                <Line
                  key={type?.key}
                  type="monotone"
                  dataKey={type?.key}
                  stroke={type?.color}
                  strokeWidth={2}
                  dot={{ fill: type?.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: type?.color, strokeWidth: 2 }}
                  name={type?.name}
                />
              ))}
            </LineChart>
          ) : (
            <AreaChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="period" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis 
                stroke="var(--color-muted-foreground)" 
                fontSize={12}
                domain={['dataMin - 5', 'dataMax + 5']}
                label={{ value: 'Attendance %', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {eventTypes?.map((type, index) => (
                <Area
                  key={type?.key}
                  type="monotone"
                  dataKey={type?.key}
                  stackId={index}
                  stroke={type?.color}
                  fill={type?.color}
                  fillOpacity={0.3}
                  name={type?.name}
                />
              ))}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Summary Statistics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {eventTypes?.map((type) => {
          const avgAttendance = Math.round(
            currentData?.reduce((sum, item) => sum + item?.[type?.key], 0) / currentData?.length
          );
          return (
            <div key={type?.key} className="text-center p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: type?.color }}
                />
                <p className="text-sm font-medium text-foreground">{type?.name}</p>
              </div>
              <p className="text-xl font-bold text-foreground">{avgAttendance}%</p>
              <p className="text-xs text-muted-foreground">Avg Attendance</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendancePatternChart;