import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Layout from "./components/layouts/Layout";
import Dashboard from "./pages/app/home/Dashboard";
import Login from "./pages/auth/login/Login";
import Categories from "./pages/app/masterData/categories/Categories";
import Skills from "./pages/app/masterData/skills/Skills";
import Projects from "./pages/app/demandManagement/projects/Projects";
import ProjectDetails from "./pages/app/demandManagement/projectDetails/ProjectDetails";
import LabourRequirements from "./pages/app/demandManagement/labourRequirements/LabourRequirements";
import MaterialRequirements from "./pages/app/demandManagement/materialRequirements/MaterialRequirements";
import MaterialQuotations from "./pages/app/supplyManagement/materialQuotations/MaterialQuotations";
import LabourSupply from "./pages/app/supplyManagement/labourSupply/LabourSupply";
import Brands from "./pages/app/masterData/brands/Brands";
import Labours from "./pages/app/userManagement/labours/Labours";
import Sellers from "./pages/app/userManagement/sellers/Sellers";
import Contractors from "./pages/app/userManagement/contractors/Contractors";
import DailyReports from "./pages/app/reports/dailyReports/DailyReports";
import MonthlyReports from "./pages/app/reports/monthlyReports/MonthlyReports";
import Profile from "./pages/app/profile/Profile";

function App() {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  console.log(accessToken, "accessToken");
  console.log(refreshToken, "refreshToken");

  return (
    <BrowserRouter>
      <Routes>
        {/* ----------------- PUBLIC ROUTES ------------------ */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* ----------------- PRIVATE ROUTES ------------------ */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            <Route path="/labour-requirements" element={<LabourRequirements />} />
            <Route path="/material-requirements" element={<MaterialRequirements />} />
            <Route path="/material-quotations" element={<MaterialQuotations />} />
            <Route path="/labour-supply" element={<LabourSupply />} />



            <Route path="/labour-management" element={<Labours />} />
            <Route path="/seller-management" element={<Sellers />} />
            <Route path="/contractor-management" element={<Contractors />} />

            <Route path="/daily-reports" element={<DailyReports />} />
            <Route path="/monthly-reports" element={<MonthlyReports />} />
            <Route path="/profile-management" element={<Profile />} />



          </Route>
        </Route>

        <Route path="*" element={<Navigate to={accessToken ? "/home" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;