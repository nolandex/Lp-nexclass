import React from "react";
import { Newspaper } from "lucide-react";
import { BottomNavbar } from "../components/bottom-navbar";

const Blog = () => (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center pb-20">
        <div className="text-center p-4">
            <Newspaper className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold">Blog</h1>
            <p className="text-muted-foreground">Halaman ini sedang dalam pengembangan.</p>
        </div>
        <BottomNavbar />
    </div>
);

export default Blog;
