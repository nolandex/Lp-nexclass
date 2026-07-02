import React from "react";
import { User, LogOut } from "lucide-react";
import { BottomNavbar } from "../components/bottom-navbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Navigasi kembali ke Landing Page ("/")
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col pb-24">
            <div className="flex-grow flex flex-col items-center justify-center p-6 space-y-6">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center border border-border shadow-xl shadow-indigo-500/10">
                    <User className="h-10 w-10 text-indigo-400" />
                </div>
                
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground">Pengguna Tamu</h1>
                    <p className="text-muted-foreground text-sm">user@example.com</p>
                </div>

                <div className="w-full max-w-xs space-y-3">
                    <button 
                        className="w-full flex items-center justify-between bg-card hover:bg-muted p-4 rounded-xl border border-border transition-all text-foreground"
                    >
                        <span className="font-medium">Edit Profil</span>
                        <User size={16} className="text-muted-foreground" />
                    </button>
                    
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 font-bold py-3.5 px-6 rounded-xl transition-all mt-6 border border-red-500/20"
                    >
                        <LogOut size={18} />
                        Keluar ke Halaman Utama
                    </button>
                </div>

                <div className="p-4 rounded-lg text-center max-w-xs w-full">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Versi Aplikasi 1.0.0</p>
                </div>
            </div>
            <BottomNavbar />
        </div>
    );
};

export default Profile;