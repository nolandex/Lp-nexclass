import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import MyCourses from "./pages/MyCourses";
import CourseDetail from "./pages/CourseDetail";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import { ThemeProvider } from "./contexts/theme-provider";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-ui-theme">
      <HashRouter>
        <Routes>
          {/* Halaman Utama adalah Landing Page */}
          <Route path="/" element={<Landing />} />
          
          {/* Halaman List Kursus (Dashboard) */}
          <Route path="/courses" element={<Index />} />
          
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Redirect auth ke courses (atau bisa ke /profile) */}
          <Route path="/auth" element={<Navigate to="/courses" replace />} />
          
          {/* Fallback ke Landing Page jika route tidak ditemukan */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};
