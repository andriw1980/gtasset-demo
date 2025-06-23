import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import AssetDetail from "./pages/AssetDetail";
import AddAsset from "./pages/AddAsset";
import Users from "./pages/Users";
import Vendors from "./pages/Vendors";
import Buildings from "./pages/Buildings";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import AssetRequest from "./pages/AssetRequest";
import LossReport from "./pages/LossReport";
import Insurance from "./pages/Insurance";
import AssetDepreciation from "./pages/AssetDepreciation";
import DepreciationDetail from "./pages/DepreciationDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/assets" element={
              <ProtectedRoute>
                <Assets />
              </ProtectedRoute>
            } />
            <Route path="/assets/:id" element={
              <ProtectedRoute>
                <AssetDetail />
              </ProtectedRoute>
            } />
            <Route path="/assets/new" element={
              <ProtectedRoute requiredRole="admin">
                <AddAsset />
              </ProtectedRoute>
            } />
            <Route path="/asset-depreciation" element={
              <ProtectedRoute>
                <AssetDepreciation />
              </ProtectedRoute>
            } />
            <Route path="/asset-depreciation/:id" element={
              <ProtectedRoute>
                <DepreciationDetail />
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute requiredRole="admin">
                <Users />
              </ProtectedRoute>
            } />
            <Route path="/vendors" element={
              <ProtectedRoute>
                <Vendors />
              </ProtectedRoute>
            } />
            <Route path="/buildings" element={
              <ProtectedRoute>
                <Buildings />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/asset-request" element={
              <ProtectedRoute>
                <AssetRequest />
              </ProtectedRoute>
            } />
            <Route path="/loss-report" element={
              <ProtectedRoute>
                <LossReport />
              </ProtectedRoute>
            } />
            <Route path="/insurance" element={
              <ProtectedRoute>
                <Insurance />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
