import React, { useState, useEffect, useMemo } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import StudentCard from './components/StudentCard';
import RegistrationFilters from './components/RegistrationFilters';
import RegistrationStats from './components/RegistrationStats';
import BulkRegistrationModal from './components/BulkRegistrationModal';
import StudentProfileModal from './components/StudentProfileModal';

const StudentRegistration = () => {
  // State management
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedStudentProfile, setSelectedStudentProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const mockStudents = [
    {
      id: 1,
      name: "Sarah Johnson",
      studentId: "CS2021001",
      email: "sarah.johnson@college.edu",
      phone: "+1 (555) 123-4567",
      college: "College of Engineering",
      department: "Computer Science",
      academicYear: "Senior",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      registrationStatus: "registered",
      status: "active",
      registrationDate: "2024-01-15",
      eventEnrollments: [
        { eventId: 1, eventName: "Tech Conference 2024", eventType: "Conference", status: "confirmed", registrationDate: "2024-01-15", attendanceStatus: "present" },
        { eventId: 2, eventName: "AI Workshop", eventType: "Workshop", status: "confirmed", registrationDate: "2024-01-20" }
      ],
      activityHistory: [
        { type: "registration", action: "Registered for Tech Conference 2024", details: "Successfully registered for the annual tech conference", timestamp: "2024-01-15 10:30 AM" },
        { type: "registration", action: "Registered for AI Workshop", details: "Enrolled in artificial intelligence workshop", timestamp: "2024-01-20 02:15 PM" }
      ]
    },
    {
      id: 2,
      name: "Michael Chen",
      studentId: "BU2021002",
      email: "michael.chen@college.edu",
      phone: "+1 (555) 234-5678",
      college: "Business School",
      department: "Business Administration",
      academicYear: "Junior",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      registrationStatus: "waitlisted",
      status: "active",
      registrationDate: "2024-01-10",
      eventEnrollments: [
        { eventId: 3, eventName: "Business Summit", eventType: "Summit", status: "waitlisted", registrationDate: "2024-01-25" }
      ],
      activityHistory: [
        { type: "registration", action: "Added to waitlist for Business Summit", details: "Event reached capacity, added to waiting list", timestamp: "2024-01-25 11:45 AM" }
      ]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      studentId: "AS2021003",
      email: "emily.rodriguez@college.edu",
      phone: "+1 (555) 345-6789",
      college: "College of Arts & Sciences",
      department: "Psychology",
      academicYear: "Sophomore",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      registrationStatus: "not_registered",
      status: "active",
      registrationDate: "2024-01-05",
      eventEnrollments: [],
      activityHistory: [
        { type: "profile", action: "Profile created", details: "Student profile was created in the system", timestamp: "2024-01-05 09:00 AM" }
      ]
    },
    {
      id: 4,
      name: "David Thompson",
      studentId: "EN2021004",
      email: "david.thompson@college.edu",
      phone: "+1 (555) 456-7890",
      college: "College of Engineering",
      department: "Mechanical Engineering",
      academicYear: "Senior",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      registrationStatus: "registered",
      status: "active",
      registrationDate: "2024-01-12",
      eventEnrollments: [
        { eventId: 4, eventName: "Engineering Expo", eventType: "Expo", status: "confirmed", registrationDate: "2024-01-28", attendanceStatus: "present" }
      ],
      activityHistory: [
        { type: "registration", action: "Registered for Engineering Expo", details: "Successfully registered for the engineering exhibition", timestamp: "2024-01-28 03:20 PM" }
      ]
    },
    {
      id: 5,
      name: "Jessica Wang",
      studentId: "MD2021005",
      email: "jessica.wang@college.edu",
      phone: "+1 (555) 567-8901",
      college: "School of Medicine",
      department: "Pre-Med",
      academicYear: "Junior",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      registrationStatus: "registered",
      status: "active",
      registrationDate: "2024-01-08",
      eventEnrollments: [
        { eventId: 5, eventName: "Medical Symposium", eventType: "Symposium", status: "confirmed", registrationDate: "2024-02-01" },
        { eventId: 6, eventName: "Health Workshop", eventType: "Workshop", status: "confirmed", registrationDate: "2024-02-05" }
      ],
      activityHistory: [
        { type: "registration", action: "Registered for Medical Symposium", details: "Enrolled in the annual medical symposium", timestamp: "2024-02-01 01:10 PM" },
        { type: "registration", action: "Registered for Health Workshop", details: "Signed up for health and wellness workshop", timestamp: "2024-02-05 10:30 AM" }
      ]
    },
    {
      id: 6,
      name: "Alex Kumar",
      studentId: "CS2021006",
      email: "alex.kumar@college.edu",
      phone: "+1 (555) 678-9012",
      college: "College of Engineering",
      department: "Computer Science",
      academicYear: "Freshman",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      registrationStatus: "waitlisted",
      status: "active",
      registrationDate: "2024-01-18",
      eventEnrollments: [
        { eventId: 1, eventName: "Tech Conference 2024", eventType: "Conference", status: "waitlisted", registrationDate: "2024-02-10" }
      ],
      activityHistory: [
        { type: "registration", action: "Added to waitlist for Tech Conference 2024", details: "Conference reached maximum capacity", timestamp: "2024-02-10 04:45 PM" }
      ]
    }
  ];

  const mockColleges = [
    { id: 'engineering', name: 'College of Engineering' },
    { id: 'business', name: 'Business School' },
    { id: 'arts', name: 'College of Arts & Sciences' },
    { id: 'medicine', name: 'School of Medicine' }
  ];

  const mockEvents = [
    { id: 1, name: 'Tech Conference 2024', capacity: 500, registered: 485 },
    { id: 2, name: 'AI Workshop', capacity: 50, registered: 35 },
    { id: 3, name: 'Business Summit', capacity: 200, registered: 200 },
    { id: 4, name: 'Engineering Expo', capacity: 300, registered: 150 },
    { id: 5, name: 'Medical Symposium', capacity: 100, registered: 75 },
    { id: 6, name: 'Health Workshop', capacity: 40, registered: 25 }
  ];

  // Initialize data
  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(mockStudents);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtered students based on search and filters
  const filteredStudents = useMemo(() => {
    return students?.filter(student => {
      const matchesSearch = !searchTerm || 
        student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        student?.studentId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        student?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        student?.phone?.includes(searchTerm);

      const matchesCollege = selectedCollege === 'all' || 
        student?.college?.toLowerCase()?.includes(selectedCollege?.toLowerCase());

      const matchesStatus = selectedStatus === 'all' || 
        student?.registrationStatus === selectedStatus;

      const matchesEvent = selectedEvent === 'all' || 
        student?.eventEnrollments?.some(enrollment => enrollment?.eventId?.toString() === selectedEvent);

      return matchesSearch && matchesCollege && matchesStatus && matchesEvent;
    });
  }, [students, searchTerm, selectedCollege, selectedStatus, selectedEvent]);

  // Statistics calculation
  const stats = useMemo(() => {
    const totalStudents = students?.length;
    const registeredStudents = students?.filter(s => s?.registrationStatus === 'registered')?.length;
    const waitlistedStudents = students?.filter(s => s?.registrationStatus === 'waitlisted')?.length;
    const notRegisteredStudents = students?.filter(s => s?.registrationStatus === 'not_registered')?.length;

    return {
      totalStudents,
      registeredStudents,
      waitlistedStudents,
      notRegisteredStudents,
      eventCapacity: mockEvents
    };
  }, [students]);

  // Event handlers
  const handleStudentSelect = (student, isSelected) => {
    if (isSelected) {
      setSelectedStudents(prev => [...prev, student]);
    } else {
      setSelectedStudents(prev => prev?.filter(s => s?.id !== student?.id));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedStudents(filteredStudents);
    } else {
      setSelectedStudents([]);
    }
  };

  const handleRegisterStudent = (student) => {
    console.log('Register student:', student);
    // Update student status
    setStudents(prev => prev?.map(s => 
      s?.id === student?.id 
        ? { ...s, registrationStatus: 'registered' }
        : s
    ));
  };

  const handleRemoveRegistration = (student) => {
    console.log('Remove registration for student:', student);
    setStudents(prev => prev?.map(s => 
      s?.id === student?.id 
        ? { ...s, registrationStatus: 'not_registered', eventEnrollments: [] }
        : s
    ));
  };

  const handleViewProfile = (student) => {
    setSelectedStudentProfile(student);
    setShowProfileModal(true);
  };

  const handleBulkRegister = async (data) => {
    console.log('Bulk register:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update students
    setStudents(prev => prev?.map(student => 
      data?.studentIds?.includes(student?.id)
        ? { ...student, registrationStatus: 'registered' }
        : student
    ));
    
    setSelectedStudents([]);
  };

  const handleBulkImport = () => {
    console.log('Bulk import students');
  };

  const handleBulkExport = () => {
    console.log('Bulk export data');
  };

  const handleManageWaitlist = () => {
    console.log('Manage waitlist');
  };

  const handleUpdateProfile = (student) => {
    console.log('Update profile:', student);
    setShowProfileModal(false);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCollege('all');
    setSelectedStatus('all');
    setSelectedEvent('all');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading student data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Student Registration</h1>
              <p className="text-muted-foreground mt-1">
                Manage student enrollments and event registrations
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleBulkImport}
                iconName="Upload"
                iconPosition="left"
                iconSize={16}
              >
                Import Students
              </Button>
              <Button
                variant="default"
                onClick={() => setShowBulkModal(true)}
                disabled={selectedStudents?.length === 0}
                iconName="UserPlus"
                iconPosition="left"
                iconSize={16}
              >
                Bulk Register ({selectedStudents?.length})
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filters */}
            <RegistrationFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCollege={selectedCollege}
              onCollegeChange={setSelectedCollege}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              selectedEvent={selectedEvent}
              onEventChange={setSelectedEvent}
              onClearFilters={handleClearFilters}
              colleges={mockColleges}
              events={mockEvents}
              resultCount={filteredStudents?.length}
            />

            {/* Bulk Selection Controls */}
            {filteredStudents?.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedStudents?.length === filteredStudents?.length && filteredStudents?.length > 0}
                      onChange={(e) => handleSelectAll(e?.target?.checked)}
                      label={`Select all ${filteredStudents?.length} students`}
                    />
                  </div>
                  {selectedStudents?.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {selectedStudents?.length} selected
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedStudents([])}
                        iconName="X"
                        iconPosition="left"
                        iconSize={14}
                      >
                        Clear Selection
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Student List */}
            <div className="space-y-4">
              {filteredStudents?.length > 0 ? (
                filteredStudents?.map((student) => (
                  <div key={student?.id} className="flex items-start space-x-3">
                    <div className="pt-4">
                      <Checkbox
                        checked={selectedStudents?.some(s => s?.id === student?.id)}
                        onChange={(e) => handleStudentSelect(student, e?.target?.checked)}
                      />
                    </div>
                    <div className="flex-1">
                      <StudentCard
                        student={student}
                        onRegister={handleRegisterStudent}
                        onViewProfile={handleViewProfile}
                        onRemoveRegistration={handleRemoveRegistration}
                        selectedEvents={[selectedEvent]}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-card border border-border rounded-lg p-12 text-center">
                  <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    iconName="RotateCcw"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <RegistrationStats
              stats={stats}
              onBulkImport={handleBulkImport}
              onBulkExport={handleBulkExport}
              onManageWaitlist={handleManageWaitlist}
            />
          </div>
        </div>
      </div>
      {/* Modals */}
      <BulkRegistrationModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        selectedStudents={selectedStudents}
        events={mockEvents}
        onBulkRegister={handleBulkRegister}
      />
      <StudentProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        student={selectedStudentProfile}
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
};

export default StudentRegistration;