import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TopPerformersTable = ({ type = 'events', isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const topEvents = [
    {
      id: 1,
      name: 'Spring Career Fair 2024',
      type: 'Career Fair',
      college: 'All Colleges',
      registrations: 680,
      attendance: 620,
      attendanceRate: 91.2,
      avgRating: 4.8,
      totalRatings: 456,
      date: '2024-03-15'
    },
    {
      id: 2,
      name: 'Tech Conference 2024',
      type: 'Conference',
      college: 'Engineering',
      registrations: 450,
      attendance: 380,
      attendanceRate: 84.4,
      avgRating: 4.6,
      totalRatings: 298,
      date: '2024-02-28'
    },
    {
      id: 3,
      name: 'Innovation Summit',
      type: 'Summit',
      college: 'Business',
      registrations: 390,
      attendance: 350,
      attendanceRate: 89.7,
      avgRating: 4.7,
      totalRatings: 267,
      date: '2024-03-10'
    },
    {
      id: 4,
      name: 'AI Workshop Series',
      type: 'Workshop',
      college: 'Engineering',
      registrations: 320,
      attendance: 295,
      attendanceRate: 92.2,
      avgRating: 4.9,
      totalRatings: 201,
      date: '2024-02-20'
    },
    {
      id: 5,
      name: 'Hackathon Weekend',
      type: 'Hackathon',
      college: 'Engineering',
      registrations: 280,
      attendance: 265,
      attendanceRate: 94.6,
      avgRating: 4.5,
      totalRatings: 189,
      date: '2024-03-05'
    }
  ];

  const topStudents = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@campus.edu',
      college: 'Engineering',
      eventsAttended: 12,
      totalRegistrations: 15,
      attendanceRate: 80.0,
      avgRating: 4.8,
      lastActive: '2024-03-15'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@campus.edu',
      college: 'Business',
      eventsAttended: 11,
      totalRegistrations: 13,
      attendanceRate: 84.6,
      avgRating: 4.6,
      lastActive: '2024-03-14'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@campus.edu',
      college: 'Arts & Sciences',
      eventsAttended: 10,
      totalRegistrations: 12,
      attendanceRate: 83.3,
      avgRating: 4.9,
      lastActive: '2024-03-13'
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.k@campus.edu',
      college: 'Engineering',
      eventsAttended: 9,
      totalRegistrations: 11,
      attendanceRate: 81.8,
      avgRating: 4.7,
      lastActive: '2024-03-12'
    },
    {
      id: 5,
      name: 'Jessica Brown',
      email: 'jessica.b@campus.edu',
      college: 'Medicine',
      eventsAttended: 8,
      totalRegistrations: 10,
      attendanceRate: 80.0,
      avgRating: 4.8,
      lastActive: '2024-03-11'
    }
  ];

  const currentData = type === 'events' ? topEvents : topStudents;

  const filteredData = currentData?.filter(item =>
    item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    (item?.college && item?.college?.toLowerCase()?.includes(searchTerm?.toLowerCase())) ||
    (item?.type && item?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
  );

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredData]?.sort((a, b) => {
    if (!sortConfig?.key) return 0;
    
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];
    
    if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars?.push(<Icon key={i} name="Star" size={14} className="text-warning fill-current" />);
    }
    
    if (hasHalfStar) {
      stars?.push(<Icon key="half" name="StarHalf" size={14} className="text-warning fill-current" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(<Icon key={`empty-${i}`} name="Star" size={14} className="text-muted-foreground" />);
    }
    
    return stars;
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            Top Performing {type === 'events' ? 'Events' : 'Students'}
          </h3>
          <div className="animate-spin">
            <Icon name="Loader2" size={20} />
          </div>
        </div>
        <div className="space-y-4">
          {[...Array(5)]?.map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Top Performing {type === 'events' ? 'Events' : 'Students'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {type === 'events' ? 'Highest rated and most attended events' : 'Most active and engaged students'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Input
            type="search"
            placeholder={`Search ${type}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-64"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('name')}
                  className="font-medium text-foreground"
                  iconName={getSortIcon('name')}
                  iconPosition="right"
                >
                  {type === 'events' ? 'Event Name' : 'Student Name'}
                </Button>
              </th>
              <th className="text-left py-3 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort(type === 'events' ? 'type' : 'college')}
                  className="font-medium text-foreground"
                  iconName={getSortIcon(type === 'events' ? 'type' : 'college')}
                  iconPosition="right"
                >
                  {type === 'events' ? 'Type' : 'College'}
                </Button>
              </th>
              <th className="text-left py-3 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort(type === 'events' ? 'registrations' : 'eventsAttended')}
                  className="font-medium text-foreground"
                  iconName={getSortIcon(type === 'events' ? 'registrations' : 'eventsAttended')}
                  iconPosition="right"
                >
                  {type === 'events' ? 'Registrations' : 'Events Attended'}
                </Button>
              </th>
              <th className="text-left py-3 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('attendanceRate')}
                  className="font-medium text-foreground"
                  iconName={getSortIcon('attendanceRate')}
                  iconPosition="right"
                >
                  Attendance Rate
                </Button>
              </th>
              <th className="text-left py-3 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('avgRating')}
                  className="font-medium text-foreground"
                  iconName={getSortIcon('avgRating')}
                  iconPosition="right"
                >
                  Rating
                </Button>
              </th>
              <th className="text-right py-3 px-4">
                <span className="font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((item, index) => (
              <tr key={item?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                      index === 0 ? 'bg-warning' : 
                      index === 1 ? 'bg-muted-foreground' : 
                      index === 2 ? 'bg-accent' : 'bg-primary'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item?.name}</p>
                      {type === 'students' && (
                        <p className="text-sm text-muted-foreground">{item?.email}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    {type === 'events' ? item?.type : item?.college}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm">
                    <p className="font-medium text-foreground">
                      {type === 'events' ? item?.registrations?.toLocaleString() : item?.eventsAttended}
                    </p>
                    {type === 'events' && (
                      <p className="text-muted-foreground">{item?.attendance} attended</p>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 bg-muted rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full" 
                        style={{ width: `${item?.attendanceRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {item?.attendanceRate}%
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {getRatingStars(item?.avgRating)}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {item?.avgRating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({type === 'events' ? item?.totalRatings : item?.eventsAttended})
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => console.log('View details', item?.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                      onClick={() => console.log('More actions', item?.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedData?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No {type} found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default TopPerformersTable;