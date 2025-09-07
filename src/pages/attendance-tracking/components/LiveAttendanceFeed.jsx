import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LiveAttendanceFeed = ({ attendanceList, onManualCheckIn, onBulkAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filteredList, setFilteredList] = useState(attendanceList);

  const statusOptions = [
    { value: 'all', label: 'All Students' },
    { value: 'checked-in', label: 'Checked In' },
    { value: 'pending', label: 'Pending Check-in' },
    { value: 'late', label: 'Late Arrivals' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'id', label: 'Student ID' },
    { value: 'status', label: 'Status' }
  ];

  useEffect(() => {
    let filtered = attendanceList?.filter(student => {
      const matchesSearch = student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           student?.studentId?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'checked-in' && student?.status === 'checked-in') ||
                           (statusFilter === 'pending' && student?.status === 'pending') ||
                           (statusFilter === 'late' && student?.isLate);
      
      return matchesSearch && matchesStatus;
    });

    // Sort filtered results
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'id':
          return a?.studentId?.localeCompare(b?.studentId);
        case 'status':
          return a?.status?.localeCompare(b?.status);
        case 'recent':
        default:
          return new Date(b.checkInTime || b.registrationTime) - new Date(a.checkInTime || a.registrationTime);
      }
    });

    setFilteredList(filtered);
  }, [attendanceList, searchTerm, statusFilter, sortBy]);

  const handleSelectAll = () => {
    if (selectedStudents?.length === filteredList?.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredList?.map(student => student?.id));
    }
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev?.includes(studentId) 
        ? prev?.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleBulkCheckIn = () => {
    onBulkAction('check-in', selectedStudents);
    setSelectedStudents([]);
  };

  const getStatusBadge = (student) => {
    if (student?.status === 'checked-in') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <Icon name="Check" size={12} className="mr-1" />
          Checked In
        </span>
      );
    } else if (student?.isLate) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Icon name="Clock" size={12} className="mr-1" />
          Late
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <Icon name="Minus" size={12} className="mr-1" />
          Pending
        </span>
      );
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Live Attendance Feed</h3>
            <p className="text-sm text-muted-foreground">
              Real-time check-in updates • {filteredList?.length} students shown
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span>Live</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search by name or student ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
          
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
          />
          
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
          />
        </div>

        {/* Bulk Actions */}
        {selectedStudents?.length > 0 && (
          <div className="mt-4 flex items-center justify-between p-3 bg-blue-50 rounded-md">
            <span className="text-sm font-medium text-blue-900">
              {selectedStudents?.length} student(s) selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedStudents([])}
              >
                Clear Selection
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleBulkCheckIn}
                iconName="UserCheck"
                iconPosition="left"
              >
                Bulk Check-in
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Attendance List */}
      <div className="max-h-96 overflow-y-auto">
        {/* Select All Header */}
        <div className="sticky top-0 bg-muted/50 border-b border-border p-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedStudents?.length === filteredList?.length && filteredList?.length > 0}
              onChange={handleSelectAll}
              className="rounded border-border"
            />
            <span className="text-sm font-medium text-foreground">
              Select All ({filteredList?.length})
            </span>
          </label>
        </div>

        {/* Student List */}
        <div className="divide-y divide-border">
          {filteredList?.map((student) => (
            <div key={student?.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedStudents?.includes(student?.id)}
                  onChange={() => handleSelectStudent(student?.id)}
                  className="rounded border-border"
                />
                
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                  {student?.name?.charAt(0)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground truncate">
                        {student?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ID: {student?.studentId} • {student?.college}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(student)}
                      
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {student?.status === 'checked-in' ? 'Checked in at' : 'Registered at'}
                        </p>
                        <p className="text-xs font-medium text-foreground">
                          {new Date(student.checkInTime || student.registrationTime)?.toLocaleTimeString()}
                        </p>
                      </div>
                      
                      {student?.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onManualCheckIn(student?.id)}
                          iconName="UserCheck"
                        >
                          Check In
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredList?.length === 0 && (
          <div className="p-8 text-center">
            <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No students match your current filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveAttendanceFeed;