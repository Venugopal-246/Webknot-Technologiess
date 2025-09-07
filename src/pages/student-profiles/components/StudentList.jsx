import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StudentCard from './StudentCard';

const StudentList = ({ 
  students, 
  loading, 
  sortBy, 
  sortOrder, 
  onSort, 
  onViewProfile, 
  onEditProfile, 
  onSendMessage,
  currentPage,
  totalPages,
  onPageChange
}) => {
  const sortableColumns = [
    { key: 'name', label: 'Name' },
    { key: 'college', label: 'College' },
    { key: 'totalEvents', label: 'Events' },
    { key: 'attendanceRate', label: 'Attendance' },
    { key: 'engagementStatus', label: 'Engagement' },
  ];

  const getSortIcon = (column) => {
    if (sortBy !== column) return 'ArrowUpDown';
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-muted-foreground">Loading students...</span>
        </div>
      </div>
    );
  }

  if (students?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No Students Found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header with Sort Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Students ({students?.length})
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            {sortableColumns?.map((column) => (
              <Button
                key={column?.key}
                variant="ghost"
                size="sm"
                onClick={() => onSort(column?.key)}
                className="flex items-center space-x-1"
              >
                <span>{column?.label}</span>
                <Icon name={getSortIcon(column?.key)} size={14} />
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Student List */}
      <div className="p-4 space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
        {students?.map((student) => (
          <StudentCard
            key={student?.id}
            student={student}
            onViewProfile={onViewProfile}
            onEditProfile={onEditProfile}
            onSendMessage={onSendMessage}
          />
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;