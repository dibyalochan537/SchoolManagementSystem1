import React, { useState, useEffect } from 'react';
import "../../PagesCSS/ParentHomePage.css";
import ParentSideBar from "../../layout/Parent/ParentSideBar.jsx";
import NavBar from "../../Component/NavBar.jsx";
import ParentDashboard from "./ParentDashboard.jsx"
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


export default function ParentHomePage() {
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
      case "2": return "My Child";
      case "3": return "Logout";
      default: return "Dashboard";
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "1": return <ParentDashboard />;
      case "2": return "Parent My Child";
      case "3": return "Logout";
      default: return <ParentDashboard />;
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
      <div className="custom-spinner-text">Loading Parent Dashboard...</div>
    </div>
    );
  }

  return (
    <div className="parent-home-page">
      <ParentSideBar
        loggedUser={"PARENTMS"}
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        sidebarVisible={sidebarVisible}
        toggleSidebar={toggleSidebar}
      />
      <div className="parent-main-content">
        <NavBar activeLabel={setName()} toggleSidebar={toggleSidebar} />
        <div className={`parent-rendered-main ${animate ? "slide-in" : ""}`}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}