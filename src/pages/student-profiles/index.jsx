import React, { useState, useEffect } from 'react';

import Button from '../../components/ui/Button';
import StudentFilters from './components/StudentFilters';
import StudentList from './components/StudentList';
import StudentProfilePanel from './components/StudentProfilePanel';
import BulkActionsModal from './components/BulkActionsModal';

const StudentProfiles = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const studentsPerPage = 10;

  const [filters, setFilters] = useState({
    search: '',
    college: 'all',
    engagement: 'all',
    attendance: 'all',
    participation: 'all',
    academicYear: 'all'
  });

  // Mock student data
  const mockStudents = [
    {
      id: 1,
      name: "Sarah Johnson",
      studentId: "ENG2021001",
      email: "sarah.johnson@campus.edu",
      phone: "+1 (555) 123-4567",
      college: "College of Engineering",
      academicYear: "2024-25",
      status: "active",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      totalEvents: 15,
      attendanceRate: 87,
      avgFeedback: 4.5,
      feedbackCount: 12,
      engagementStatus: "High",
      eventHistory: [
        {
          id: 1,
          name: "Tech Innovation Summit",
          date: "2024-12-15",
          type: "Conference",
          status: "Attended",
          feedback: 5
        },
        {
          id: 2,
          name: "AI Workshop Series",
          date: "2024-12-10",
          type: "Workshop",
          status: "Attended",
          feedback: 4
        },
        {
          id: 3,
          name: "Career Fair 2024",
          date: "2024-12-05",
          type: "Fair",
          status: "Registered",
          feedback: null
        }
      ]
    },
    {
      id: 2,
      name: "Michael Chen",
      studentId: "BUS2022045",
      email: "michael.chen@campus.edu",
      phone: "+1 (555) 234-5678",
      college: "Business School",
      academicYear: "2023-24",
      status: "active",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      totalEvents: 8,
      attendanceRate: 75,
      avgFeedback: 4.2,
      feedbackCount: 6,
      engagementStatus: "Medium",
      eventHistory: [
        {
          id: 4,
          name: "Entrepreneurship Bootcamp",
          date: "2024-12-12",
          type: "Workshop",
          status: "Attended",
          feedback: 4
        },
        {
          id: 5,
          name: "Business Ethics Seminar",
          date: "2024-12-08",
          type: "Seminar",
          status: "Missed",
          feedback: null
        }
      ]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      studentId: "ART2023012",
      email: "emily.rodriguez@campus.edu",
      phone: "+1 (555) 345-6789",
      college: "College of Arts & Sciences",
      academicYear: "2024-25",
      status: "active",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      totalEvents: 22,
      attendanceRate: 95,
      avgFeedback: 4.8,
      feedbackCount: 20,
      engagementStatus: "High",
      eventHistory: [
        {
          id: 6,
          name: "Digital Art Exhibition",
          date: "2024-12-14",
          type: "Exhibition",
          status: "Attended",
          feedback: 5
        },
        {
          id: 7,
          name: "Creative Writing Workshop",
          date: "2024-12-11",
          type: "Workshop",
          status: "Attended",
          feedback: 5
        }
      ]
    },
    {
      id: 4,
      name: "David Thompson",
      studentId: "MED2021078",
      email: "david.thompson@campus.edu",
      phone: "+1 (555) 456-7890",
      college: "School of Medicine",
      academicYear: "2022-23",
      status: "active",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      totalEvents: 12,
      attendanceRate: 83,
      avgFeedback: 4.3,
      feedbackCount: 10,
      engagementStatus: "High",
      eventHistory: [
        {
          id: 8,
          name: "Medical Research Symposium",
          date: "2024-12-13",
          type: "Symposium",
          status: "Attended",
          feedback: 4
        }
      ]
    },
    {
      id: 5,
      name: "Jessica Wang",
      studentId: "LAW2022033",
      email: "jessica.wang@campus.edu",
      phone: "+1 (555) 567-8901",
      college: "School of Law",
      academicYear: "2023-24",
      status: "active",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      totalEvents: 6,
      attendanceRate: 50,
      avgFeedback: 3.8,
      feedbackCount: 3,
      engagementStatus: "Low",
      eventHistory: [
        {
          id: 9,
          name: "Constitutional Law Debate",
          date: "2024-12-09",
          type: "Debate",
          status: "Attended",
          feedback: 4
        }
      ]
    },
    {
      id: 6,
      name: "Alex Kumar",
      studentId: "ENG2023067",
      email: "alex.kumar@campus.edu",
      phone: "+1 (555) 678-9012",
      college: "College of Engineering",
      academicYear: "2024-25",
      status: "active",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      totalEvents: 18,
      attendanceRate: 89,
      avgFeedback: 4.6,
      feedbackCount: 16,
      engagementStatus: "High",
      eventHistory: [
        {
          id: 10,
          name: "Robotics Competition",
          date: "2024-12-16",
          type: "Competition",
          status: "Registered",
          feedback: null
        }
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, students, sortBy, sortOrder]);

  const applyFilters = () => {
    let filtered = [...students];

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(student =>
        student?.name?.toLowerCase()?.includes(searchTerm) ||
        student?.studentId?.toLowerCase()?.includes(searchTerm) ||
        student?.email?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply college filter
    if (filters?.college !== 'all') {
      filtered = filtered?.filter(student =>
        student?.college?.toLowerCase()?.includes(filters?.college)
      );
    }

    // Apply engagement filter
    if (filters?.engagement !== 'all') {
      filtered = filtered?.filter(student =>
        student?.engagementStatus?.toLowerCase() === filters?.engagement
      );
    }

    // Apply attendance filter
    if (filters?.attendance !== 'all') {
      filtered = filtered?.filter(student => {
        const rate = student?.attendanceRate;
        switch (filters?.attendance) {
          case '80+': return rate >= 80;
          case '60-79': return rate >= 60 && rate < 80;
          case '40-59': return rate >= 40 && rate < 60;
          case '<40': return rate < 40;
          default: return true;
        }
      });
    }

    // Apply participation filter
    if (filters?.participation !== 'all') {
      filtered = filtered?.filter(student => {
        const events = student?.totalEvents;
        switch (filters?.participation) {
          case '10+': return events >= 10;
          case '5-9': return events >= 5 && events < 10;
          case '1-4': return events >= 1 && events < 5;
          case '0': return events === 0;
          default: return true;
        }
      });
    }

    // Apply academic year filter
    if (filters?.academicYear !== 'all') {
      filtered = filtered?.filter(student =>
        student?.academicYear === filters?.academicYear
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredStudents(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      college: 'all',
      engagement: 'all',
      attendance: 'all',
      participation: 'all',
      academicYear: 'all'
    });
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
  };

  const handleEditProfile = (student) => {
    setSelectedStudent(student);
  };

  const handleSendMessage = (student) => {
    console.log('Send message to:', student?.name);
    // Implement message functionality
  };

  const handleSaveProfile = (updatedStudent) => {
    setStudents(prev =>
      prev?.map(student =>
        student?.id === updatedStudent?.id ? updatedStudent : student
      )
    );
    setSelectedStudent(updatedStudent);
  };

  const handleGenerateReport = (student) => {
    console.log('Generate report for:', student?.name);
    // Implement report generation
  };

  const handleBulkImport = () => {
    console.log('Bulk import students');
    // Implement bulk import functionality
  };

  const handleBulkExport = () => {
    console.log('Bulk export students');
    // Implement bulk export functionality
  };

  const handleBulkAction = (actionData) => {
    console.log('Bulk action:', actionData);
    // Implement bulk action functionality
    setSelectedStudents([]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Pagination
  const totalPages = Math.ceil(filteredStudents?.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const paginatedStudents = filteredStudents?.slice(startIndex, startIndex + studentsPerPage);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Student Profiles</h1>
              <p className="text-muted-foreground mt-1">
                Manage student information and track participation across campus events
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {selectedStudents?.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setShowBulkModal(true)}
                  iconName="Settings"
                  iconPosition="left"
                >
                  Bulk Actions ({selectedStudents?.length})
                </Button>
              )}
              <Button
                variant="default"
                onClick={() => console.log('Add new student')}
                iconName="Plus"
                iconPosition="left"
              >
                Add Student
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Filters and Student List */}
          <div className="lg:col-span-2 space-y-6">
            <StudentFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              onBulkImport={handleBulkImport}
              onBulkExport={handleBulkExport}
            />

            <StudentList
              students={paginatedStudents}
              loading={loading}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
              onViewProfile={handleViewProfile}
              onEditProfile={handleEditProfile}
              onSendMessage={handleSendMessage}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Right Column - Student Profile Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <StudentProfilePanel
                student={selectedStudent}
                onClose={() => setSelectedStudent(null)}
                onSave={handleSaveProfile}
                onGenerateReport={handleGenerateReport}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Bulk Actions Modal */}
      <BulkActionsModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        selectedStudents={selectedStudents}
        onBulkAction={handleBulkAction}
      />
    </div>
  );
};

export default StudentProfiles;