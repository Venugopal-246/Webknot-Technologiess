import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const EventTable = ({ events, onEventSelect, onBulkAction, selectedEvents, onSort, sortConfig }) => {
  const [selectAll, setSelectAll] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'completed':
        return 'bg-secondary text-secondary-foreground';
      case 'cancelled':
        return 'bg-error text-error-foreground';
      case 'draft':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'workshop':
        return 'Wrench';
      case 'seminar':
        return 'Users';
      case 'hackathon':
        return 'Code';
      case 'fest':
        return 'Music';
      case 'conference':
        return 'Mic';
      case 'competition':
        return 'Trophy';
      default:
        return 'Calendar';
    }
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      onEventSelect(events?.map(event => event?.id));
    } else {
      onEventSelect([]);
    }
  };

  const handleEventCheck = (eventId, checked) => {
    if (checked) {
      onEventSelect([...selectedEvents, eventId]);
    } else {
      onEventSelect(selectedEvents?.filter(id => id !== eventId));
      setSelectAll(false);
    }
  };

  const handleSort = (column) => {
    onSort(column);
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCapacityStatus = (registered, capacity) => {
    const percentage = (registered / capacity) * 100;
    if (percentage >= 90) return 'text-error';
    if (percentage >= 70) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header with Bulk Actions */}
      {selectedEvents?.length > 0 && (
        <div className="bg-muted px-6 py-3 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {selectedEvents?.length} event{selectedEvents?.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('activate')}
                iconName="Play"
                iconPosition="left"
              >
                Activate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('cancel')}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('duplicate')}
                iconName="Copy"
                iconPosition="left"
              >
                Duplicate
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="w-12 px-6 py-4">
                <Checkbox
                  checked={selectAll}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Event Name</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('type')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Type</span>
                  <Icon name={getSortIcon('type')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Date & Time</span>
                  <Icon name={getSortIcon('date')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('registrations')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Registrations</span>
                  <Icon name={getSortIcon('registrations')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {events?.map((event) => (
              <tr key={event?.id} className="hover:bg-muted/50">
                <td className="px-6 py-4">
                  <Checkbox
                    checked={selectedEvents?.includes(event?.id)}
                    onChange={(e) => handleEventCheck(event?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-foreground">{event?.name}</div>
                    <div className="text-sm text-muted-foreground">{event?.college}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Icon name={getTypeIcon(event?.type)} size={16} className="text-muted-foreground" />
                    <span className="text-sm capitalize">{event?.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium">{formatDate(event?.date)}</div>
                    <div className="text-sm text-muted-foreground">{formatTime(event?.date)}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className={`text-sm font-medium ${getCapacityStatus(event?.registrations, event?.capacity)}`}>
                      {event?.registrations} / {event?.capacity}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((event?.registrations / event?.capacity) * 100)}% full
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event?.status)}`}>
                    {event?.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => console.log('View event', event?.id)}
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => console.log('Edit event', event?.id)}
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => console.log('More actions', event?.id)}
                    >
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-border">
        {events?.map((event) => (
          <div key={event?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={selectedEvents?.includes(event?.id)}
                  onChange={(e) => handleEventCheck(event?.id, e?.target?.checked)}
                />
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{event?.name}</h4>
                  <p className="text-sm text-muted-foreground">{event?.college}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event?.status)}`}>
                {event?.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name={getTypeIcon(event?.type)} size={14} className="text-muted-foreground" />
                  <span className="text-sm capitalize">{event?.type}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(event?.date)} at {formatTime(event?.date)}
                </div>
              </div>
              <div>
                <div className={`text-sm font-medium ${getCapacityStatus(event?.registrations, event?.capacity)}`}>
                  {event?.registrations} / {event?.capacity}
                </div>
                <div className="text-xs text-muted-foreground">
                  {Math.round((event?.registrations / event?.capacity) * 100)}% capacity
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" iconName="Eye">
                View
              </Button>
              <Button variant="outline" size="sm" iconName="Edit">
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {events?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No events found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your filters or create a new event.</p>
          <Button variant="outline" iconName="Plus">
            Create Event
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventTable;