import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ParticipationAnalytics = ({ isLoading = false }) => {
  const [viewType, setViewType] = useState('college');
  const [chartType, setChartType] = useState('pie');

  const collegeData = [
    { name: 'Engineering', value: 1250, percentage: 35.2, color: 'var(--color-primary)' },
    { name: 'Business', value: 890, percentage: 25.1, color: 'var(--color-success)' },
    { name: 'Arts & Sciences', value: 720, percentage: 20.3, color: 'var(--color-warning)' },
    { name: 'Medicine', value: 450, percentage: 12.7, color: 'var(--color-accent)' },
    { name: 'Law', value: 240, percentage: 6.7, color: 'var(--color-error)' }
  ];

  const eventTypeData = [
    { name: 'Workshops', value: 1420, percentage: 40.0, color: 'var(--color-primary)' },
    { name: 'Seminars', value: 980, percentage: 27.6, color: 'var(--color-success)' },
    { name: 'Conferences', value: 650, percentage: 18.3, color: 'var(--color-warning)' },
    { name: 'Hackathons', value: 320, percentage: 9.0, color: 'var(--color-accent)' },
    { name: 'Festivals', value: 180, percentage: 5.1, color: 'var(--color-error)' }
  ];

  const participationTrends = [
    { month: 'Jan', newStudents: 120, returningStudents: 280, totalEvents: 15 },
    { month: 'Feb', newStudents: 150, returningStudents: 320, totalEvents: 18 },
    { month: 'Mar', newStudents: 180, returningStudents: 380, totalEvents: 22 },
    { month: 'Apr', newStudents: 140, returningStudents: 350, totalEvents: 20 },
    { month: 'May', newStudents: 160, returningStudents: 390, totalEvents: 24 },
    { month: 'Jun', newStudents: 200, returningStudents: 420, totalEvents: 26 }
  ];

  const currentData = viewType === 'college' ? collegeData : eventTypeData;
  const totalParticipants = currentData?.reduce((sum, item) => sum + item?.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-popover-foreground mb-1">{data?.name}</p>
          <p className="text-sm text-popover-foreground">
            Participants: <span className="font-medium">{data?.value?.toLocaleString()}</span>
          </p>
          <p className="text-sm text-popover-foreground">
            Percentage: <span className="font-medium">{data?.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="medium"
      >
        {`${(percent * 100)?.toFixed(0)}%`}
      </text>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Participation Analytics</h3>
          <div className="animate-spin">
            <Icon name="Loader2" size={20} />
          </div>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="text-center">
            <Icon name="PieChart" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Loading participation data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Participation Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Student participation breakdown by {viewType === 'college' ? 'college' : 'event type'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewType === 'college' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('college')}
              className="text-xs"
            >
              By College
            </Button>
            <Button
              variant={viewType === 'eventType' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('eventType')}
              className="text-xs"
            >
              By Event Type
            </Button>
          </div>
          
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={chartType === 'pie' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('pie')}
              iconName="PieChart"
            />
            <Button
              variant={chartType === 'bar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('bar')}
              iconName="BarChart3"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <div className="h-80" aria-label="Participation Analytics Chart">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'pie' ? (
                <PieChart>
                  <Pie
                    data={currentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={CustomLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {currentData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              ) : (
                <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {currentData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Participation Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Participants</span>
                <span className="font-semibold text-foreground">{totalParticipants?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Active {viewType === 'college' ? 'Colleges' : 'Event Types'}</span>
                <span className="font-semibold text-foreground">{currentData?.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Average per Category</span>
                <span className="font-semibold text-foreground">
                  {Math.round(totalParticipants / currentData?.length)?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Breakdown</h4>
            {currentData?.map((item, index) => (
              <div key={item?.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item?.color }}
                  />
                  <span className="text-sm text-foreground">{item?.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{item?.value?.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{item?.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Participation Trends */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-4">Monthly Participation Trends</h4>
        <div className="h-64" aria-label="Monthly Participation Trends">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={participationTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="newStudents" 
                stackId="a" 
                fill="var(--color-primary)" 
                name="New Students"
                radius={[0, 0, 0, 0]}
              />
              <Bar 
                dataKey="returningStudents" 
                stackId="a" 
                fill="var(--color-success)" 
                name="Returning Students"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ParticipationAnalytics;