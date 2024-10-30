import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Home from "./components/Home";
import Auth from "./components/Auth";
import MapPage from "./components/MapPage";
import TaskBoard from "./components/TasksPage";
import EventsPage from "./components/EventsPage";
import FaQPage from "./components/FaQPage";
import "primereact/resources/themes/saga-blue/theme.css";
import { AuthProvider } from "./components/hooks/AuthContext";

function MainApp() {
  const location = useLocation();

  // Проверяем, находимся ли на странице авторизации
  const isAuthPage = location.pathname === "/auth";

  return (
    <AuthProvider>
    <div className="h-full bg-[#ffff]">
      {/* Скрываем Sidebar, если пользователь находится на странице авторизации */}
      {!isAuthPage && <Sidebar />}
      <div className="">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/" element={<Home />} />{" "}
          {/* Default route leading to Home */}
          <Route path="/tasks" element={<TaskBoard />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faq" element={<FaQPage />} />
        </Routes>
      </div>
    </div>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}
