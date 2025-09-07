import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AnalyticsDashboard from './pages/analytics-dashboard';
import AdminDashboard from './pages/admin-dashboard';
import AttendanceTracking from './pages/attendance-tracking';
import StudentProfiles from './pages/student-profiles';
import EventManagement from './pages/event-management';
import StudentRegistration from './pages/student-registration';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/attendance-tracking" element={<AttendanceTracking />} />
        <Route path="/student-profiles" element={<StudentProfiles />} />
        <Route path="/event-management" element={<EventManagement />} />
        <Route path="/student-registration" element={<StudentRegistration />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
