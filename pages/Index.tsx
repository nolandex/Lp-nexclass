import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CourseGrid } from "../components/course-grid";
import { BottomNavbar } from "../components/bottom-navbar";
import { ChevronRight, Lock, ChevronLeft } from "lucide-react";
import React from "react";

const Index = () => {
  const navigate = useNavigate();
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthAndStatus();
  }, []);

  const checkAuthAndStatus = async () => {
    setIsLoading(true);
    const premiumStatus = localStorage.getItem("isPremium") === "true";
    setIsPremium(premiumStatus);
    setIsLoading(false);
  };

  const handlePayment = () => {
    setIsLoading(true);
    setTimeout(() => {
        localStorage.setItem("isPremium", "true");
        setIsPremium(true);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000); 
  };

  if (isLoading) {
     return (
       <div className="min-h-screen bg-background">
         <div className="mx-4 mt-5 mb-6">
           <div className="w-full aspect-video rounded-2xl bg-muted animate-pulse" />
         </div>
         <div className="w-full overflow-x-hidden px-4 mb-6">
           <div className="flex space-x-2">
             {[...Array(4)].map((_, i) => (
               <div key={i} className="h-10 w-24 rounded-full bg-muted animate-pulse" />
             ))}
           </div>
         </div>
         <div className="px-4 space-y-6">
           {[...Array(2)].map((_, i) => (
             <div key={i}>
               <div className="mb-3 h-6 w-1/2 rounded-md bg-muted animate-pulse" />
               <div className="flex gap-3 overflow-x-hidden">
                 {[...Array(2)].map((_, j) => (
                   <div key={j} className="w-52 flex-shrink-0">
                     <div className="bg-card rounded-2xl overflow-hidden">
                       <div className="h-32 bg-muted animate-pulse" />
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           ))}
         </div>
       </div>
     );
  }
  
  return (
    <div className={`min-h-screen bg-background text-foreground flex flex-col ${isPremium ? 'pb-20' : 'pb-[320px]'}`}>
      <main className="flex-grow">
        <div className="mx-4 mt-5 mb-6">
          <div className="relative w-full aspect-video overflow-hidden rounded-2xl group">
            <button 
                onClick={() => navigate('/')}
                className="absolute top-4 left-4 z-30 p-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-black/60 transition-all active:scale-95"
                aria-label="Kembali ke Landing Page"
            >
                <ChevronLeft size={20} />
            </button>

            <img
              src="https://images.unsplash.com/photo-1516245834210-c4c1427873ab?w=1200&q=80"
              alt="Banner"
              className={`w-full h-full object-cover ${!isPremium ? 'grayscale-[50%]' : ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col items-start">
              <h3 className="text-white font-extrabold text-xl leading-tight line-clamp-2 drop-shadow-md tracking-tight">
                {isPremium ? "Selamat Belajar, Investor Muda!" : "Buka Potensi Investasimu"}
              </h3>
            </div>
            
            {!isPremium && (
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                        <Lock size={14} className="text-white" />
                        <span className="text-xs font-bold text-white">Konten Terkunci</span>
                    </div>
                </div>
            )}
          </div>
        </div>

        <CourseGrid selectedCategory="popular" isLocked={!isPremium} />
      </main>

      {isPremium ? (
        <BottomNavbar />
      ) : (
        <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-md border-t border-border z-50 rounded-t-3xl shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.2)] dark:shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.9)] p-6 pb-8 animate-in slide-in-from-bottom duration-500">
            <div className="max-w-md mx-auto flex flex-col gap-4">
              <div className="flex items-center justify-between mb-1">
                  <div>
                    <h3 className="font-bold text-lg text-foreground">Akses Semua Materi</h3>
                    <p className="text-xs text-muted-foreground">Satu kali bayar, akses selamanya.</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-red-400 line-through">Rp 999.000</span>
                    <span className="text-sm bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-3 py-1 rounded-full font-bold">Rp 99.000</span>
                  </div>
              </div>
                 
              <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Alamat Email" 
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground transition-all"
                  />
                  <input 
                    type="password" 
                    placeholder="Buat Password" 
                    className="w-full bg-muted border border-border rounded-xl px-4 py-3.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground transition-all"
                  />
              </div>

              <button 
                onClick={handlePayment}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Bayar Sekarang & Buka Akses</span>
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>
         </div>
      )}
    </div>
  );
};

export default Index;