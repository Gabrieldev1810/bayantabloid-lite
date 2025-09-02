import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import AdminLayout from "./components/admin/AdminLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Officials from "./pages/Officials";
import Committees from "./pages/Committees";
import Documents from "./pages/Documents";
import Hearings from "./pages/Hearings";
import Announcements from "./pages/Announcements";
import Transparency from "./pages/Transparency";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminOfficials from "./pages/admin/AdminOfficials";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminHearings from "./pages/admin/AdminHearings";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/officials" element={<Layout><Officials /></Layout>} />
            <Route path="/committees" element={<Layout><Committees /></Layout>} />
            <Route path="/documents" element={<Layout><Documents /></Layout>} />
            <Route path="/documents/:category" element={<Layout><Documents /></Layout>} />
            <Route path="/hearings" element={<Layout><Hearings /></Layout>} />
            <Route path="/announcements" element={<Layout><Announcements /></Layout>} />
            <Route path="/transparency" element={<Layout><Transparency /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/admin/officials" element={<AdminLayout><AdminOfficials /></AdminLayout>} />
            <Route path="/admin/documents" element={<AdminLayout><AdminDocuments /></AdminLayout>} />
            <Route path="/admin/hearings" element={<AdminLayout><AdminHearings /></AdminLayout>} />
            <Route path="/admin/announcements" element={<AdminLayout><AdminAnnouncements /></AdminLayout>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
