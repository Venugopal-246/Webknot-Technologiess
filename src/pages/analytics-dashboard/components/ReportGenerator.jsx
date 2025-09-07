import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ReportGenerator = ({ onGenerateReport, isGenerating = false }) => {
  const [reportConfig, setReportConfig] = useState({
    type: 'comprehensive',
    format: 'pdf',
    dateRange: '30days',
    customStartDate: '',
    customEndDate: '',
    colleges: [],
    eventTypes: [],
    includeCharts: true,
    includeRawData: false,
    includeComparisons: true,
    scheduledDelivery: false,
    deliveryFrequency: 'weekly',
    recipients: ''
  });

  const [savedReports, setSavedReports] = useState([
    {
      id: 1,
      name: 'Monthly Executive Summary',
      type: 'executive',
      lastGenerated: '2024-03-10',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Engineering College Report',
      type: 'college-specific',
      lastGenerated: '2024-03-08',
      status: 'completed'
    },
    {
      id: 3,
      name: 'Workshop Performance Analysis',
      type: 'event-specific',
      lastGenerated: '2024-03-05',
      status: 'processing'
    }
  ]);

  const reportTypeOptions = [
    { value: 'comprehensive', label: 'Comprehensive Analytics Report' },
    { value: 'executive', label: 'Executive Summary' },
    { value: 'attendance', label: 'Attendance Analysis' },
    { value: 'feedback', label: 'Feedback & Ratings Report' },
    { value: 'college-specific', label: 'College-Specific Report' },
    { value: 'event-specific', label: 'Event-Specific Analysis' },
    { value: 'student-participation', label: 'Student Participation Report' },
    { value: 'comparative', label: 'Cross-College Comparison' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV Data Export' },
    { value: 'powerpoint', label: 'PowerPoint Presentation' }
  ];

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: '6months', label: 'Last 6 months' },
    { value: '1year', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const collegeOptions = [
    { value: 'engineering', label: 'College of Engineering' },
    { value: 'business', label: 'Business School' },
    { value: 'arts', label: 'College of Arts & Sciences' },
    { value: 'medicine', label: 'School of Medicine' },
    { value: 'law', label: 'Law School' }
  ];

  const eventTypeOptions = [
    { value: 'workshop', label: 'Workshops' },
    { value: 'seminar', label: 'Seminars' },
    { value: 'hackathon', label: 'Hackathons' },
    { value: 'conference', label: 'Conferences' },
    { value: 'fest', label: 'Festivals' }
  ];

  const deliveryFrequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const handleConfigChange = (key, value) => {
    setReportConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleMultiSelectChange = (key, value) => {
    setReportConfig(prev => ({
      ...prev,
      [key]: Array.isArray(value) ? value : [value]
    }));
  };

  const handleGenerateReport = () => {
    onGenerateReport(reportConfig);
  };

  const handleSaveTemplate = () => {
    const templateName = prompt('Enter a name for this report template:');
    if (templateName) {
      console.log('Saving template:', templateName, reportConfig);
      // In a real app, this would save to backend
    }
  };

  const handleScheduleReport = () => {
    console.log('Scheduling report:', reportConfig);
    // In a real app, this would set up scheduled delivery
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'processing': return 'Clock';
      case 'failed': return 'XCircle';
      default: return 'FileText';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'processing': return 'text-warning';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Report Generator</h3>
          <p className="text-sm text-muted-foreground">Create custom analytics reports and schedule automated delivery</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSaveTemplate}
          iconName="Save"
          iconPosition="left"
        >
          Save Template
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Configuration */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Report Configuration</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Report Type"
                options={reportTypeOptions}
                value={reportConfig?.type}
                onChange={(value) => handleConfigChange('type', value)}
              />
              
              <Select
                label="Output Format"
                options={formatOptions}
                value={reportConfig?.format}
                onChange={(value) => handleConfigChange('format', value)}
              />
            </div>

            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={reportConfig?.dateRange}
              onChange={(value) => handleConfigChange('dateRange', value)}
            />

            {reportConfig?.dateRange === 'custom' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <Input
                  label="Start Date"
                  type="date"
                  value={reportConfig?.customStartDate}
                  onChange={(e) => handleConfigChange('customStartDate', e?.target?.value)}
                />
                <Input
                  label="End Date"
                  type="date"
                  value={reportConfig?.customEndDate}
                  onChange={(e) => handleConfigChange('customEndDate', e?.target?.value)}
                />
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Filters</h4>
            
            <Select
              label="Colleges (Optional)"
              options={collegeOptions}
              value={reportConfig?.colleges}
              onChange={(value) => handleMultiSelectChange('colleges', value)}
              multiple
              placeholder="Select colleges to include"
            />

            <Select
              label="Event Types (Optional)"
              options={eventTypeOptions}
              value={reportConfig?.eventTypes}
              onChange={(value) => handleMultiSelectChange('eventTypes', value)}
              multiple
              placeholder="Select event types to include"
            />
          </div>

          {/* Content Options */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Content Options</h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Include Charts and Visualizations"
                checked={reportConfig?.includeCharts}
                onChange={(e) => handleConfigChange('includeCharts', e?.target?.checked)}
              />
              
              <Checkbox
                label="Include Raw Data Tables"
                checked={reportConfig?.includeRawData}
                onChange={(e) => handleConfigChange('includeRawData', e?.target?.checked)}
              />
              
              <Checkbox
                label="Include Cross-College Comparisons"
                checked={reportConfig?.includeComparisons}
                onChange={(e) => handleConfigChange('includeComparisons', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Scheduled Delivery */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Automated Delivery</h4>
            
            <Checkbox
              label="Enable Scheduled Delivery"
              checked={reportConfig?.scheduledDelivery}
              onChange={(e) => handleConfigChange('scheduledDelivery', e?.target?.checked)}
            />

            {reportConfig?.scheduledDelivery && (
              <div className="space-y-4 p-4 bg-muted rounded-lg">
                <Select
                  label="Delivery Frequency"
                  options={deliveryFrequencyOptions}
                  value={reportConfig?.deliveryFrequency}
                  onChange={(value) => handleConfigChange('deliveryFrequency', value)}
                />
                
                <Input
                  label="Email Recipients"
                  type="email"
                  placeholder="admin@campus.edu, director@campus.edu"
                  value={reportConfig?.recipients}
                  onChange={(e) => handleConfigChange('recipients', e?.target?.value)}
                  description="Separate multiple emails with commas"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 pt-4 border-t border-border">
            <Button
              variant="default"
              onClick={handleGenerateReport}
              loading={isGenerating}
              iconName="FileText"
              iconPosition="left"
            >
              Generate Report
            </Button>
            
            {reportConfig?.scheduledDelivery && (
              <Button
                variant="outline"
                onClick={handleScheduleReport}
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule Delivery
              </Button>
            )}
            
            <Button
              variant="ghost"
              onClick={() => setReportConfig({
                type: 'comprehensive',
                format: 'pdf',
                dateRange: '30days',
                customStartDate: '',
                customEndDate: '',
                colleges: [],
                eventTypes: [],
                includeCharts: true,
                includeRawData: false,
                includeComparisons: true,
                scheduledDelivery: false,
                deliveryFrequency: 'weekly',
                recipients: ''
              })}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Recent Reports</h4>
          
          <div className="space-y-3">
            {savedReports?.map((report) => (
              <div key={report?.id} className="p-3 bg-muted rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-foreground text-sm">{report?.name}</h5>
                  <Icon 
                    name={getStatusIcon(report?.status)} 
                    size={16} 
                    className={getStatusColor(report?.status)}
                  />
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Type: {report?.type?.replace('-', ' ')}
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  Generated: {report?.lastGenerated}
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    className="text-xs"
                    disabled={report?.status !== 'completed'}
                  >
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="RefreshCw"
                    className="text-xs"
                  >
                    Regenerate
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full"
            iconName="History"
            iconPosition="left"
          >
            View All Reports
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;