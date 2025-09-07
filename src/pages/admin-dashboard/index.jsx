import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MetricCard from './components/MetricCard';
import UpcomingEventsList from './components/UpcomingEventsList';
import RecentActivityFeed from './components/RecentActivityFeed';
import EventPopularityChart from './components/EventPopularityChart';
import QuickActions from './components/QuickActions';
import CollegeSelector from './components/CollegeSelector';
import NotificationCenter from './components/NotificationCenter';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for metrics
  const metrics = [
    {
      title: 'Active Events',
      value: '24',
      change: '+12%',
      changeType: 'increase',
      icon: 'Calendar',
      color: 'primary'
    },
    {
      title: 'Total Registrations',
      value: '1,847',
      change: '+8.2%',
      changeType: 'increase',
      icon: 'Users',
      color: 'success'
    },
    {
      title: 'Average Attendance',
      value: '78.5%',
      change: '-2.1%',
      changeType: 'decrease',
      icon: 'CheckSquare',
      color: 'warning'
    },
    {
      title: 'Average Rating',
      value: '4.3/5',
      change: '+0.2',
      changeType: 'increase',
      icon: 'Star',
      color: 'accent'
    }
  ];

  // Mock data for colleges
  const colleges = [
    {
      id: 'engineering',
      name: 'College of Engineering',
      location: 'North Campus',
      studentCount: 2500,
      activeEvents: 8,
      avgAttendance: 82,
      avgRating: 4.4
    },
    {
      id: 'business',
      name: 'Business School',
      location: 'South Campus',
      studentCount: 1800,
      activeEvents: 6,
      avgAttendance: 75,
      avgRating: 4.2
    },
    {
      id: 'arts',
      name: 'College of Arts & Sciences',
      location: 'Central Campus',
      studentCount: 3200,
      activeEvents: 10,
      avgAttendance: 79,
      avgRating: 4.3
    }
  ];

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 'evt001',
      title: 'AI & Machine Learning Workshop',
      type: 'Workshop',
      date: '2025-01-15T14:00:00Z',
      location: 'Tech Center Hall A',
      registrations: 145,
      capacity: 200
    },
    {
      id: 'evt002',
      title: 'Spring Career Fair',
      type: 'Fest',
      date: '2025-01-18T09:00:00Z',
      location: 'Main Auditorium',
      registrations: 380,
      capacity: 500
    },
    {
      id: 'evt003',
      title: 'Cybersecurity Seminar',
      type: 'Seminar',
      date: '2025-01-20T16:00:00Z',
      location: 'Conference Room B',
      registrations: 67,
      capacity: 100
    },
    {
      id: 'evt004',
      title: 'Code Challenge Hackathon',
      type: 'Hackathon',
      date: '2025-01-25T10:00:00Z',
      location: 'Innovation Lab',
      registrations: 89,
      capacity: 120
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 'act001',
      type: 'registration',
      title: 'New Registration',
      description: 'Sarah Johnson registered for AI Workshop',
      timestamp: new Date(Date.now() - 300000),
      metadata: {
        event: 'AI & Machine Learning Workshop',
        student: 'Sarah Johnson',
        college: 'Engineering'
      }
    },
    {
      id: 'act002',
      type: 'checkin',
      title: 'Student Check-in',
      description: 'Michael Chen checked in to Career Fair',
      timestamp: new Date(Date.now() - 600000),
      metadata: {
        event: 'Spring Career Fair',
        student: 'Michael Chen',
        college: 'Business'
      }
    },
    {
      id: 'act003',
      type: 'feedback',
      title: 'Feedback Submitted',
      description: 'Emma Davis rated Cybersecurity Seminar (5 stars)',
      timestamp: new Date(Date.now() - 900000),
      metadata: {
        event: 'Cybersecurity Seminar',
        student: 'Emma Davis',
        college: 'Arts & Sciences'
      }
    },
    {
      id: 'act004',
      type: 'event_created',
      title: 'Event Created',
      description: 'New event "Data Science Bootcamp" was created',
      timestamp: new Date(Date.now() - 1800000),
      metadata: {
        event: 'Data Science Bootcamp',
        college: 'Engineering'
      }
    }
  ];

  // Mock data for chart
  const chartData = [
    { name: 'AI Workshop', registrations: 145, attendance: 118 },
    { name: 'Career Fair', registrations: 380, attendance: 298 },
    { name: 'Cyber Seminar', registrations: 67, attendance: 52 },
    { name: 'Hackathon', registrations: 89, attendance: 71 },
    { name: 'Design Thinking', registrations: 156, attendance: 134 },
    { name: 'Startup Pitch', registrations: 203, attendance: 167 }
  ];

  // Mock data for notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'not001',
      type: 'warning',
      title: 'Event Registration Deadline',
      message: 'AI Workshop registration closes in 2 days. Currently at 72% capacity.',
      timestamp: new Date(Date.now() - 7200000),
      isRead: false,
      actionRequired: true,
      actionText: 'Extend Deadline'
    },
    {
      id: 'not002',
      type: 'success',
      title: 'High Attendance Rate',
      message: 'Career Fair achieved 78% attendance rate, exceeding target.',
      timestamp: new Date(Date.now() - 14400000),
      isRead: false
    },
    {
      id: 'not003',
      type: 'alert',
      title: 'Low Registration Alert',
      message: 'Cybersecurity Seminar has only 67 registrations. Consider promotion.',
      timestamp: new Date(Date.now() - 21600000),
      isRead: true,
      actionRequired: true,
      actionText: 'Promote Event'
    },
    {
      id: 'not004',
      type: 'info',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on Jan 12, 2025 from 2:00 AM - 4:00 AM EST.',
      timestamp: new Date(Date.now() - 86400000),
      isRead: true
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Event handlers
  const handleCollegeChange = (collegeId) => {
    setIsLoading(true);
    setSelectedCollege(collegeId);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleViewEvent = (eventId) => {
    navigate(`/event-management?event=${eventId}`);
  };

  const handleEditEvent = (eventId) => {
    navigate(`/event-management?edit=${eventId}`);
  };

  const handleCreateEvent = () => {
    navigate('/event-management?action=create');
  };

  const handleManageStudents = () => {
    navigate('/student-registration');
  };

  const handleGenerateReport = () => {
    navigate('/analytics-dashboard?action=generate');
  };

  const handleViewAnalytics = () => {
    navigate('/analytics-dashboard');
  };

  const handleChartFilterChange = (filters) => {
    console.log('Chart filters changed:', filters);
    // In real app, this would trigger API call to fetch filtered data
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev?.map(n => n?.id === notificationId ? { ...n, isRead: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev?.map(n => ({ ...n, isRead: true })));
  };

  const handleViewAllNotifications = () => {
    console.log('View all notifications');
    // In real app, navigate to notifications page
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's what's happening with your campus events.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            Last updated: {lastUpdated?.toLocaleTimeString()}
          </div>
        </div>

        {/* College Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CollegeSelector
              selectedCollege={selectedCollege}
              onCollegeChange={handleCollegeChange}
              colleges={colleges}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-2">
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onViewAll={handleViewAllNotifications}
            />
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics?.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric?.title}
              value={metric?.value}
              change={metric?.change}
              changeType={metric?.changeType}
              icon={metric?.icon}
              color={metric?.color}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <UpcomingEventsList
            events={upcomingEvents}
            onViewEvent={handleViewEvent}
            onEditEvent={handleEditEvent}
          />

          {/* Recent Activity */}
          <RecentActivityFeed activities={recentActivities} />
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <EventPopularityChart
              data={chartData}
              onFilterChange={handleChartFilterChange}
            />
          </div>
          <div className="xl:col-span-1">
            <QuickActions
              onCreateEvent={handleCreateEvent}
              onManageStudents={handleManageStudents}
              onGenerateReport={handleGenerateReport}
              onViewAnalytics={handleViewAnalytics}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;