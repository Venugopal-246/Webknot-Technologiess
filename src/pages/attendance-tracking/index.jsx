import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AttendanceStats from './components/AttendanceStats';
import LiveAttendanceFeed from './components/LiveAttendanceFeed';
import QRCodeScanner from './components/QRCodeScanner';
import EventSelector from './components/EventSelector';
import AttendanceActions from './components/AttendanceActions';

const AttendanceTracking = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState('');
  const [isRealTimeActive, setIsRealTimeActive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock data for events
  const mockEvents = [
    {
      id: 'evt-001',
      name: 'AI & Machine Learning Workshop',
      description: 'Hands-on workshop covering fundamentals of AI and ML with practical exercises',
      type: 'Workshop',
      date: '2025-01-15',
      startTime: '09:00 AM',
      endTime: '05:00 PM',
      venue: 'Tech Hub Auditorium',
      college: 'College of Engineering',
      capacity: 150,
      registrations: 142,
      status: 'active',
      organizer: 'Dr. Sarah Johnson'
    },
    {
      id: 'evt-002',
      name: 'Spring Tech Conference 2025',
      description: 'Annual technology conference featuring industry leaders and innovation showcases',
      type: 'Conference',
      date: '2025-01-20',
      startTime: '08:30 AM',
      endTime: '06:00 PM',
      venue: 'Main Convention Center',
      college: 'All Colleges',
      capacity: 500,
      registrations: 487,
      status: 'upcoming',
      organizer: 'Tech Committee'
    },
    {
      id: 'evt-003',
      name: 'Hackathon 2025: Innovation Challenge',
      description: '48-hour coding competition focused on sustainable technology solutions',
      type: 'Hackathon',
      date: '2025-01-25',
      startTime: '06:00 PM',
      endTime: '06:00 PM',
      venue: 'Innovation Lab Complex',
      college: 'College of Engineering',
      capacity: 200,
      registrations: 156,
      status: 'upcoming',
      organizer: 'Student Tech Society'
    }
  ];

  // Mock attendance data
  const mockAttendanceList = [
    {
      id: 'att-001',
      studentId: 'STU001',
      name: 'Alex Rodriguez',
      college: 'College of Engineering',
      status: 'checked-in',
      checkInTime: '2025-01-15T09:15:00Z',
      registrationTime: '2025-01-10T14:30:00Z',
      isLate: false
    },
    {
      id: 'att-002',
      studentId: 'STU002',
      name: 'Sarah Chen',
      college: 'Business School',
      status: 'checked-in',
      checkInTime: '2025-01-15T09:05:00Z',
      registrationTime: '2025-01-08T16:45:00Z',
      isLate: false
    },
    {
      id: 'att-003',
      studentId: 'STU003',
      name: 'Michael Johnson',
      college: 'College of Arts & Sciences',
      status: 'checked-in',
      checkInTime: '2025-01-15T09:45:00Z',
      registrationTime: '2025-01-12T11:20:00Z',
      isLate: true
    },
    {
      id: 'att-004',
      studentId: 'STU004',
      name: 'Emily Davis',
      college: 'College of Engineering',
      status: 'pending',
      registrationTime: '2025-01-09T13:15:00Z',
      isLate: false
    },
    {
      id: 'att-005',
      studentId: 'STU005',
      name: 'David Wilson',
      college: 'School of Medicine',
      status: 'pending',
      registrationTime: '2025-01-11T10:30:00Z',
      isLate: false
    },
    {
      id: 'att-006',
      studentId: 'STU006',
      name: 'Lisa Thompson',
      college: 'Business School',
      status: 'checked-in',
      checkInTime: '2025-01-15T08:55:00Z',
      registrationTime: '2025-01-07T15:45:00Z',
      isLate: false
    }
  ];

  const [attendanceList, setAttendanceList] = useState(mockAttendanceList);
  
  // Calculate attendance statistics
  const attendanceData = {
    totalRegistered: attendanceList?.length,
    checkedInCount: attendanceList?.filter(student => student?.status === 'checked-in')?.length,
    pendingCount: attendanceList?.filter(student => student?.status === 'pending')?.length,
    lateCount: attendanceList?.filter(student => student?.isLate)?.length
  };

  const currentEvent = mockEvents?.find(event => event?.id === selectedEvent) || mockEvents?.[0];
  const eventData = {
    totalRegistrations: currentEvent?.registrations || 0,
    capacity: currentEvent?.capacity || 0,
    status: currentEvent?.status || 'active'
  };

  // Simulate real-time updates
  useEffect(() => {
    if (!isRealTimeActive) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
      
      // Simulate random check-ins
      if (Math.random() > 0.7) {
        setAttendanceList(prev => {
          const pendingStudents = prev?.filter(s => s?.status === 'pending');
          if (pendingStudents?.length > 0) {
            const randomStudent = pendingStudents?.[Math.floor(Math.random() * pendingStudents?.length)];
            return prev?.map(student => 
              student?.id === randomStudent?.id 
                ? { ...student, status: 'checked-in', checkInTime: new Date()?.toISOString() }
                : student
            );
          }
          return prev;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isRealTimeActive]);

  const handleEventChange = (eventId) => {
    setSelectedEvent(eventId);
  };

  const handleRefreshEvents = () => {
    console.log('Refreshing events...');
    setLastUpdate(new Date());
  };

  const handleManualCheckIn = (studentId) => {
    setAttendanceList(prev => 
      prev?.map(student => 
        student?.studentId === studentId 
          ? { ...student, status: 'checked-in', checkInTime: new Date()?.toISOString() }
          : student
      )
    );
  };

  const handleBulkAction = (action, studentIds) => {
    if (action === 'check-in') {
      setAttendanceList(prev => 
        prev?.map(student => 
          studentIds?.includes(student?.id)
            ? { ...student, status: 'checked-in', checkInTime: new Date()?.toISOString() }
            : student
        )
      );
    }
  };

  const handleQRScanSuccess = (studentId) => {
    handleManualCheckIn(studentId);
    console.log('QR scan successful for:', studentId);
  };

  const handleManualEntry = (studentId) => {
    handleManualCheckIn(studentId);
    console.log('Manual entry for:', studentId);
  };

  const handleExportReport = (format) => {
    console.log(`Exporting attendance report in ${format} format`);
  };

  const handleSendReminders = () => {
    console.log('Sending reminder notifications to pending students');
  };

  const handleMarkAllPresent = () => {
    setAttendanceList(prev => 
      prev?.map(student => 
        student?.status === 'pending'
          ? { ...student, status: 'checked-in', checkInTime: new Date()?.toISOString() }
          : student
      )
    );
  };

  const handleAddMissingStudent = (studentData) => {
    const newStudent = {
      id: `att-${Date.now()}`,
      studentId: studentData?.studentId,
      name: studentData?.name,
      college: studentData?.college || 'Unknown',
      status: 'checked-in',
      checkInTime: new Date()?.toISOString(),
      registrationTime: new Date()?.toISOString(),
      isLate: true
    };
    
    setAttendanceList(prev => [...prev, newStudent]);
  };

  const toggleRealTime = () => {
    setIsRealTimeActive(!isRealTimeActive);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/admin-dashboard')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Attendance Tracking</h1>
                <p className="text-sm text-muted-foreground">
                  Real-time check-in management and attendance monitoring
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isRealTimeActive ? 'bg-success animate-pulse' : 'bg-error'}`} />
                <span className="text-sm text-muted-foreground">
                  {isRealTimeActive ? 'Live Updates' : 'Updates Paused'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleRealTime}
                  iconName={isRealTimeActive ? 'Pause' : 'Play'}
                >
                  {isRealTimeActive ? 'Pause' : 'Resume'}
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/analytics-dashboard')}
                iconName="BarChart3"
                iconPosition="left"
              >
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Selection & Scanner */}
          <div className="space-y-6">
            <EventSelector
              events={mockEvents}
              selectedEvent={selectedEvent}
              onEventChange={handleEventChange}
              onRefresh={handleRefreshEvents}
            />

            <QRCodeScanner
              onScanSuccess={handleQRScanSuccess}
              onManualEntry={handleManualEntry}
              isActive={isRealTimeActive && currentEvent?.status === 'active'}
            />

            <AttendanceActions
              selectedEvent={selectedEvent}
              attendanceData={attendanceData}
              onExportReport={handleExportReport}
              onSendReminders={handleSendReminders}
              onMarkAllPresent={handleMarkAllPresent}
              onAddMissingStudent={handleAddMissingStudent}
            />
          </div>

          {/* Right Column - Stats & Live Feed */}
          <div className="lg:col-span-2 space-y-6">
            <AttendanceStats
              eventData={eventData}
              attendanceData={attendanceData}
            />

            <LiveAttendanceFeed
              attendanceList={attendanceList}
              onManualCheckIn={handleManualCheckIn}
              onBulkAction={handleBulkAction}
            />
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-2">
        <Button
          variant="default"
          size="icon"
          onClick={() => navigate('/student-profiles')}
          className="rounded-full shadow-elevation-3"
          title="Student Profiles"
        >
          <Icon name="UserCircle" size={20} />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/event-management')}
          className="rounded-full shadow-elevation-3 bg-card"
          title="Event Management"
        >
          <Icon name="Calendar" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default AttendanceTracking;