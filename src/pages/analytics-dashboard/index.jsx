import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';

// Import all components
import MetricCard from './components/MetricCard';
import FilterPanel from './components/FilterPanel';
import EventPopularityChart from './components/EventPopularityChart';
import AttendancePatternChart from './components/AttendancePatternChart';
import TopPerformersTable from './components/TopPerformersTable';
import ParticipationAnalytics from './components/ParticipationAnalytics';
import ReportGenerator from './components/ReportGenerator';

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days');
  const [activeTab, setActiveTab] = useState('overview');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const timeframeOptions = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: '6months', label: 'Last 6 months' },
    { value: '1year', label: 'Last year' }
  ];

  const tabOptions = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'events', label: 'Event Analytics', icon: 'Calendar' },
    { id: 'students', label: 'Student Analytics', icon: 'Users' },
    { id: 'reports', label: 'Report Generator', icon: 'FileText' }
  ];

  const keyMetrics = [
    {
      title: 'Total Events',
      value: '156',
      change: '+12.5%',
      changeType: 'increase',
      icon: 'Calendar',
      color: 'primary',
      description: 'Events organized this period'
    },
    {
      title: 'Total Registrations',
      value: '3,547',
      change: '+18.2%',
      changeType: 'increase',
      icon: 'Users',
      color: 'success',
      description: 'Student registrations across all events'
    },
    {
      title: 'Average Attendance',
      value: '87.3%',
      change: '+5.1%',
      changeType: 'increase',
      icon: 'CheckSquare',
      color: 'warning',
      description: 'Average attendance rate'
    },
    {
      title: 'Satisfaction Score',
      value: '4.6/5',
      change: '+0.3',
      changeType: 'increase',
      icon: 'Star',
      color: 'accent',
      description: 'Average event rating from feedback'
    },
    {
      title: 'Active Students',
      value: '2,891',
      change: '+7.8%',
      changeType: 'increase',
      icon: 'UserCheck',
      color: 'success',
      description: 'Students who attended at least one event'
    },
    {
      title: 'Revenue Generated',
      value: '$45,280',
      change: '+15.4%',
      changeType: 'increase',
      icon: 'DollarSign',
      color: 'primary',
      description: 'Total revenue from paid events'
    }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
    // In a real app, this would trigger data refetch
  };

  const handleGenerateReport = (reportConfig) => {
    setIsGeneratingReport(true);
    console.log('Generating report with config:', reportConfig);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      alert('Report generated successfully! Check your downloads folder.');
    }, 3000);
  };

  const handleMetricClick = (metric) => {
    // Navigate to detailed view based on metric
    switch (metric?.title) {
      case 'Total Events': navigate('/event-management');
        break;
      case 'Total Registrations': 
      case 'Active Students': 
        navigate('/student-registration');
        break;
      case 'Average Attendance': navigate('/attendance-tracking');
        break;
      default:
        console.log('Metric clicked:', metric?.title);
    }
  };

  const handleExportData = () => {
    console.log('Exporting dashboard data...');
    // In a real app, this would trigger data export
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin mb-4">
                <Icon name="Loader2" size={48} className="text-primary mx-auto" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Loading Analytics Dashboard</h2>
              <p className="text-muted-foreground">Fetching the latest data and insights...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive insights and performance metrics for campus event management
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select
                options={timeframeOptions}
                value={selectedTimeframe}
                onChange={setSelectedTimeframe}
                className="w-40"
              />
              
              <Button
                variant="outline"
                onClick={handleRefreshData}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh
              </Button>
              
              <Button
                variant="outline"
                onClick={handleExportData}
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            {tabOptions?.map((tab) => (
              <Button
                key={tab?.id}
                variant={activeTab === tab?.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab?.id)}
                iconName={tab?.icon}
                iconPosition="left"
                className="text-sm"
              >
                {tab?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {keyMetrics?.map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  change={metric?.change}
                  changeType={metric?.changeType}
                  icon={metric?.icon}
                  color={metric?.color}
                  description={metric?.description}
                  onClick={() => handleMetricClick(metric)}
                />
              ))}
            </div>

            {/* Filter Panel */}
            <FilterPanel onFiltersChange={handleFiltersChange} />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <EventPopularityChart />
              <AttendancePatternChart />
            </div>

            {/* Participation Analytics */}
            <ParticipationAnalytics />
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-8">
            <FilterPanel onFiltersChange={handleFiltersChange} />
            <EventPopularityChart />
            <TopPerformersTable type="events" />
            <AttendancePatternChart />
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-8">
            <FilterPanel onFiltersChange={handleFiltersChange} />
            <ParticipationAnalytics />
            <TopPerformersTable type="students" />
            
            {/* Student Engagement Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Most Active Student"
                value="Sarah Johnson"
                change="12 events attended"
                changeType="increase"
                icon="Trophy"
                color="warning"
                description="Engineering College"
              />
              <MetricCard
                title="New Student Registrations"
                value="234"
                change="+23.1%"
                changeType="increase"
                icon="UserPlus"
                color="success"
                description="This month"
              />
              <MetricCard
                title="Student Retention Rate"
                value="78.5%"
                change="+4.2%"
                changeType="increase"
                icon="Repeat"
                color="primary"
                description="Students attending multiple events"
              />
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-8">
            <ReportGenerator 
              onGenerateReport={handleGenerateReport}
              isGenerating={isGeneratingReport}
            />
          </div>
        )}

        {/* Quick Actions Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Quick Actions</h3>
              <p className="text-sm text-muted-foreground">
                Navigate to other sections or perform common tasks
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/event-management')}
                iconName="Calendar"
                iconPosition="left"
              >
                Manage Events
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/student-registration')}
                iconName="Users"
                iconPosition="left"
              >
                View Students
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/attendance-tracking')}
                iconName="CheckSquare"
                iconPosition="left"
              >
                Track Attendance
              </Button>
              
              <Button
                variant="default"
                onClick={() => navigate('/admin-dashboard')}
                iconName="LayoutDashboard"
                iconPosition="left"
              >
                Main Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;