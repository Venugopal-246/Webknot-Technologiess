import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import EventFilters from './components/EventFilters';
import EventTable from './components/EventTable';
import EventDetailsPanel from './components/EventDetailsPanel';
import CreateEventModal from './components/CreateEventModal';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);

  // Mock data for events
  const mockEvents = [
    {
      id: 1,
      name: "AI & Machine Learning Workshop",
      type: "workshop",
      college: "College of Engineering",
      description: `Join us for an intensive workshop on Artificial Intelligence and Machine Learning fundamentals.\n\nThis hands-on session will cover:\n• Introduction to AI/ML concepts\n• Python programming for data science\n• Building your first neural network\n• Real-world applications and case studies\n\nPerfect for beginners and intermediate learners looking to dive into the exciting world of AI.`,
      date: "2025-01-15T14:00:00",
      venue: "Tech Hub Auditorium",
      location: "Engineering Building, Floor 3",
      capacity: 150,
      registrations: 127,
      waitlist: 15,
      status: "active",
      organizer: "Dr. Sarah Chen",
      contact: "sarah.chen@college.edu",
      fee: 25,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Spring Tech Conference 2025",
      type: "conference",
      college: "College of Engineering",
      description: `The premier technology conference bringing together industry leaders, researchers, and students.\n\nFeaturing:\n• Keynote speakers from top tech companies\n• Panel discussions on emerging technologies\n• Networking opportunities\n• Student project showcases\n• Career fair with leading employers\n\nDon't miss this opportunity to connect with the tech community and explore future career paths.`,
      date: "2025-02-20T09:00:00",
      venue: "Main Convention Center",
      location: "Campus Center, Hall A",
      capacity: 500,
      registrations: 342,
      waitlist: 28,
      status: "active",
      organizer: "Tech Conference Committee",
      contact: "techconf@college.edu",
      fee: 0,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Entrepreneurship Bootcamp",
      type: "workshop",
      college: "Business School",
      description: `Intensive 3-day bootcamp for aspiring entrepreneurs and startup enthusiasts.\n\nProgram includes:\n• Business model development\n• Pitch deck creation\n• Funding strategies and investor relations\n• Legal aspects of starting a business\n• Mentorship sessions with successful entrepreneurs\n\nLearn from industry experts and develop your business idea into a viable venture.`,
      date: "2025-01-25T10:00:00",
      venue: "Business Innovation Lab",
      location: "Business School, Room 201",
      capacity: 80,
      registrations: 73,
      waitlist: 12,
      status: "active",
      organizer: "Prof. Michael Johnson",
      contact: "m.johnson@business.edu",
      fee: 50,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Annual Coding Hackathon",
      type: "hackathon",
      college: "College of Engineering",
      description: `48-hour coding marathon where teams compete to build innovative solutions.\n\nEvent highlights:\n• Theme: Sustainable Technology Solutions\n• Team formation and mentorship\n• Industry sponsor challenges\n• Prizes worth $10,000+\n• Networking with tech professionals\n• Free meals and swag\n\nBring your creativity and coding skills to solve real-world problems!`,
      date: "2025-03-15T18:00:00",
      venue: "Engineering Labs Complex",
      location: "Multiple Labs, Engineering Building",
      capacity: 200,
      registrations: 156,
      waitlist: 24,
      status: "active",
      organizer: "Coding Club",
      contact: "hackathon@college.edu",
      fee: 0,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop"
    },
    {
      id: 5,
      name: "Digital Marketing Seminar",
      type: "seminar",
      college: "Business School",
      description: `Learn the latest trends and strategies in digital marketing from industry experts.\n\nTopics covered:\n• Social media marketing strategies\n• Search engine optimization (SEO)\n• Content marketing and storytelling\n• Analytics and performance measurement\n• Influencer marketing trends\n\nPerfect for marketing students and professionals looking to stay current with digital trends.`,
      date: "2025-01-30T15:30:00",
      venue: "Business Lecture Hall",
      location: "Business School, Ground Floor",
      capacity: 120,
      registrations: 89,
      waitlist: 8,
      status: "active",
      organizer: "Marketing Department",
      contact: "marketing@business.edu",
      fee: 15,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop"
    },
    {
      id: 6,
      name: "Cultural Arts Festival",
      type: "fest",
      college: "College of Arts & Sciences",
      description: `Celebrate diversity and creativity at our annual cultural arts festival.\n\nFestival features:\n• Student art exhibitions\n• Live music and dance performances\n• Poetry and spoken word sessions\n• International food vendors\n• Cultural workshops and activities\n• Community art projects\n\nJoin us for a day of artistic expression and cultural celebration!`,
      date: "2025-04-10T12:00:00",
      venue: "Arts Quad",
      location: "Central Campus Quadrangle",
      capacity: 1000,
      registrations: 456,
      waitlist: 0,
      status: "active",
      organizer: "Arts & Culture Committee",
      contact: "arts@college.edu",
      fee: 0,
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop"
    },
    {
      id: 7,
      name: "Medical Research Symposium",
      type: "conference",
      college: "School of Medicine",
      description: `Annual symposium showcasing cutting-edge medical research and innovations.\n\nProgram includes:\n• Research paper presentations\n• Poster sessions\n• Panel discussions on medical ethics\n• Networking with healthcare professionals\n• Student research awards\n• Continuing education credits available\n\nOpen to medical students, residents, and healthcare professionals.`,
      date: "2025-02-28T08:00:00",
      venue: "Medical Center Auditorium",
      location: "Medical School, Main Building",
      capacity: 300,
      registrations: 234,
      waitlist: 18,
      status: "active",
      organizer: "Medical Research Committee",
      contact: "research@med.edu",
      fee: 30,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop"
    },
    {
      id: 8,
      name: "Innovation Challenge 2024",
      type: "competition",
      college: "College of Engineering",
      description: `Annual innovation competition where students present solutions to real-world challenges.\n\nCompetition details:\n• Theme: Smart City Solutions\n• Team-based competition (3-5 members)\n• Mentorship from industry experts\n• Prototype development phase\n• Final pitch presentations\n• Prizes and internship opportunities\n\nShowcase your innovative thinking and problem-solving skills!`,
      date: "2024-12-15T10:00:00",
      venue: "Innovation Center",
      location: "Research Park, Building C",
      capacity: 100,
      registrations: 100,
      waitlist: 0,
      status: "completed",
      organizer: "Innovation Lab",
      contact: "innovation@college.edu",
      fee: 0,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop"
    }
  ];

  useEffect(() => {
    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
  }, []);

  const handleFiltersChange = (filters) => {
    let filtered = [...events];

    // Apply search filter
    if (filters?.search) {
      filtered = filtered?.filter(event =>
        event?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        event?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        event?.organizer?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    // Apply type filter
    if (filters?.type) {
      filtered = filtered?.filter(event => event?.type === filters?.type);
    }

    // Apply status filter
    if (filters?.status) {
      filtered = filtered?.filter(event => event?.status === filters?.status);
    }

    // Apply college filter
    if (filters?.college) {
      filtered = filtered?.filter(event => event?.college?.toLowerCase()?.includes(filters?.college));
    }

    // Apply date range filter
    if (filters?.dateFrom) {
      filtered = filtered?.filter(event => new Date(event.date) >= new Date(filters.dateFrom));
    }
    if (filters?.dateTo) {
      filtered = filtered?.filter(event => new Date(event.date) <= new Date(filters.dateTo));
    }

    setFilteredEvents(filtered);
  };

  const handleClearFilters = () => {
    setFilteredEvents(events);
  };

  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig?.key === column && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...filteredEvents]?.sort((a, b) => {
      let aValue = a?.[column];
      let bValue = b?.[column];

      if (column === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredEvents(sorted);
    setSortConfig({ key: column, direction });
  };

  const handleEventSelect = (eventIds) => {
    setSelectedEvents(eventIds);
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on events:`, selectedEvents);
    // Implement bulk actions here
    setSelectedEvents([]);
  };

  const handleCreateEvent = (eventData) => {
    const newEvent = {
      id: events?.length + 1,
      ...eventData,
      date: `${eventData?.date}T${eventData?.time}:00`,
      registrations: 0,
      waitlist: 0,
      status: 'draft'
    };
    
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
    console.log('New event created:', newEvent);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowDetailsPanel(true);
  };

  const handleCloseDetailsPanel = () => {
    setShowDetailsPanel(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Event Management</h1>
              <p className="text-sm text-muted-foreground">Create, manage, and track campus events</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={() => console.log('Export events')}
              >
                Export
              </Button>
              <Button
                iconName="Plus"
                iconPosition="left"
                onClick={() => setShowCreateModal(true)}
              >
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid gap-8 ${showDetailsPanel ? 'lg:grid-cols-3' : 'lg:grid-cols-1'}`}>
          {/* Events List */}
          <div className={showDetailsPanel ? 'lg:col-span-2' : 'lg:col-span-1'}>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Icon name="Calendar" size={24} className="text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                    <p className="text-2xl font-bold text-foreground">{events?.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg">
                    <Icon name="CheckCircle" size={24} className="text-success" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Active Events</p>
                    <p className="text-2xl font-bold text-foreground">
                      {events?.filter(e => e?.status === 'active')?.length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
                    <Icon name="Users" size={24} className="text-accent" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Registrations</p>
                    <p className="text-2xl font-bold text-foreground">
                      {events?.reduce((sum, event) => sum + event?.registrations, 0)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-lg">
                    <Icon name="Clock" size={24} className="text-warning" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Upcoming Events</p>
                    <p className="text-2xl font-bold text-foreground">
                      {events?.filter(e => new Date(e.date) > new Date() && e?.status === 'active')?.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <EventFilters
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />

            {/* Events Table */}
            <EventTable
              events={filteredEvents}
              onEventSelect={handleEventSelect}
              onBulkAction={handleBulkAction}
              selectedEvents={selectedEvents}
              onSort={handleSort}
              sortConfig={sortConfig}
              onEventClick={handleEventClick}
            />
          </div>

          {/* Event Details Panel */}
          {showDetailsPanel && (
            <div className="lg:col-span-1">
              <EventDetailsPanel
                event={selectedEvent}
                onClose={handleCloseDetailsPanel}
              />
            </div>
          )}
        </div>
      </div>
      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateEvent}
      />
    </div>
  );
};

export default EventManagement;