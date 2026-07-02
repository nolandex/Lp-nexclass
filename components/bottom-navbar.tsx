import { Home, BookOpen, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import React from "react";

export const BottomNavbar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-50 border-t border-white/5">
      {/* Container with reduced padding for a smaller, neater look */}
      <div className="flex justify-around items-center max-w-md mx-auto py-3">
        <Link
          to="/courses"
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
            path === "/courses" 
              ? "text-primary scale-105" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Home className="h-5 w-5" strokeWidth={path === "/courses" ? 2.5 : 2} />
          <span className="text-[10px] font-medium tracking-wide">Beranda</span>
        </Link>
        
        <Link
          to="/my-courses"
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
            path === "/my-courses" 
              ? "text-primary scale-105" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="h-5 w-5" strokeWidth={path === "/my-courses" ? 2.5 : 2} />
          <span className="text-[10px] font-medium tracking-wide">Kelas Saya</span>
        </Link>

        <Link
          to="/profile"
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
            path === "/profile" 
              ? "text-primary scale-105" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="h-5 w-5" strokeWidth={path === "/profile" ? 2.5 : 2} />
          <span className="text-[10px] font-medium tracking-wide">Akun</span>
        </Link>
      </div>
    </div>
  );
};