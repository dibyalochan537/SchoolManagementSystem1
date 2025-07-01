import React, { useState, useEffect } from 'react';
import "../../PagesCSS/StaffHomePage.css";
import StaffSideBar from "../../layout/Staff/StaffSideBar.jsx";
import NavBar from "../../Component/NavBar.jsx";
import StaffManageSalarySlip from "./StaffManageSalarySlip.jsx";
import StaffPayments from "./StaffPayments.jsx";
import StaffHolidays from "./StaffHolidays.jsx";
import StaffDashboard from './StaffDashboard.jsx';
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


export default function StaffHomePage() {
  const [animate, setAnimate] = useState(false);
  const [activeComponent, setActiveComponent] = useState("1");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ loading state

  // Simulate backend fetch (you can replace this with actual fetch call)
  useEffect(() => {
    setAnimate(true);
    setTimeout(() => {
      setLoading(false); // ✅ data is "fetched"
    }, 1500); // Simulate network delay
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  const setName = () => {
    switch (activeComponent) {
      case "1": return "Dashboard";
      case "2": return "Manage Salaryslip";
      case "3": return "Payments";
      case "4": return "Holidays";
      case "5": return "Logout";
      default: return "Dashboard";
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "1": return <StaffDashboard />;
      case "2": return <StaffManageSalarySlip />;
      case "3": return <StaffPayments />;
      case "4": return <StaffHolidays />;
      case "5": return "Logout";
      default: return <StaffDashboard />;
    }
  };

  if (loading) {
    // ✅ Show full-screen spinner while loading
    return (
      <div className="custom-spinner-container">
      <div className="custom-spinner">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="custom-spinner-text">Loading Staff Dashboard...</div>
    </div>
    );
  }

  return (
    <div className="staff-home-page">
      <StaffSideBar
        loggedUser={"Staff"}
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        sidebarVisible={sidebarVisible}
        toggleSidebar={toggleSidebar}
      />
      <div className="staff-main-content">
        <NavBar activeLabel={setName()} toggleSidebar={toggleSidebar} />
        <div className={`staff-rendered-main ${animate ? "slide-in" : ""}`}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}