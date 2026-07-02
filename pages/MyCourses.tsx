import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CourseCard } from "../components/course-card";
import { BottomNavbar } from "../components/bottom-navbar";
import { type Course } from "../lib/data";
import React from "react";

const MyCourses = () => {
  const navigate = useNavigate();
  const [myCourses, setMyCourses] = useState<Course[]>([]);

  useEffect(() => {
    loadMyCourses();
  }, []);

  const loadMyCourses = () => {
    try {
      const savedCourses = JSON.parse(localStorage.getItem("myCourses") || "[]");
      setMyCourses(savedCourses);
    } catch (error) {
      console.error("Error loading courses:", error);
      setMyCourses([]);
    }
  };

  const handleRemoveCourse = (courseId: string) => {
    const updatedCourses = myCourses.filter(course => course.id !== courseId);
    try {
      localStorage.setItem("myCourses", JSON.stringify(updatedCourses));
    } catch (error) {}
    setMyCourses(updatedCourses);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <main className="flex-grow">
        <div className="p-6 max-w-4xl mx-auto w-full h-full flex flex-col">
          <header className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-muted rounded-2xl border border-border">
              <BookOpen className="h-8 w-8 text-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Kelas Saya</h1>
              <p className="text-muted-foreground text-sm font-medium">Lanjutkan progres belajarmu hari ini.</p>
            </div>
          </header>

          {myCourses.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {myCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  source="my-courses"
                  onRemove={handleRemoveCourse}
                />
              ))}
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center">
              <div className="text-center py-16 px-6 flex flex-col items-center justify-center">
                <div className="relative w-28 h-28 mb-8">
                  <div className="absolute top-0 left-0 w-24 h-24 bg-card border-2 border-border rounded-2xl transform -rotate-6 transition-transform group-hover:rotate-[-8deg]"></div>
                  <div className="absolute top-0 left-0 w-24 h-24 bg-card border-2 border-border rounded-2xl transform rotate-6 transition-transform group-hover:rotate-[8deg]"></div>
                  <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/30">
                      <BookOpen className="h-10 w-10 text-white" />
                  </div>
                </div>

                <h2 className="text-xl font-bold text-foreground mb-2">
                    Kelas Anda Masih Kosong
                </h2>
                <p className="text-muted-foreground mb-8 text-sm max-w-xs mx-auto">
                    Jelajahi kelas investasi kami dan mulailah perjalanan finansial Anda.
                </p>
                <button
                    onClick={() => navigate("/courses")}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40"
                >
                    Jelajahi Kursus
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNavbar />
    </div>
  );
};

export default MyCourses;