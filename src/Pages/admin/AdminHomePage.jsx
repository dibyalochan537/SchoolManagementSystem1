import React, { useState } from 'react';

import "../../PagesCSS/AdminHomePage.css"
import AdminSideBar from "../../Component/AdminSideBar.jsx";
import NavBar from "../../Component/NavBar.jsx"
import AdminDashboard from './AdminDashboard.jsx';
import AdminStudentManagement from './AdminStudentManagement'; 
import AdminAddSingleStudent from './AdminAddSingleStudent.jsx';
import AdminBulkStudentUpload from './AdminBulkStudentUpload.jsx';
import AdminClassManagement from './AdminClassManagement.jsx';
import AdminStaffManagement from './AdminStaffManagement.jsx'
import AdminParentManagement from './AdminParentManagement.jsx';


export default function AdminHomePage(){
    const [activeComponent, setActiveComponent] = useState("1");
    const setName=()=>{
        switch (activeComponent) {
            case "1":
                return "Dashboard";
            case "2":
                return "Student management";
            case "3":
                return "Class management";
            case "4":
                return "Staff management";
            case "5":
                return "Parent management";
            case "6":
                return "Attendance";
            case "7":
                return "Inventory";
            case "8":
                return "Account Management";
            case "8a":
                return "Account Management";
            case "8b":
                return "Account Report";
            case "9":
                return "Setting";
            case "10":
                return "Logout";
            case "11":
                return "Add Single Student";
            case "12":
                return "Add Bulk Student";
            // Add more cases as needed
            default:
                return "Dashboard";
        }
    }
    const renderComponent = () => {
        switch (activeComponent) {
            case "1":
                return <AdminDashboard />;
            case "2":
                return <AdminStudentManagement setActiveComponent={setActiveComponent}/>;
            case "3":
                return <AdminClassManagement />;
            case "4":
                return <AdminStaffManagement />;
            case "5":
                return <AdminParentManagement />;
            case "6":
                return "attendance";
            case "7":
                return "inventory";
            case "8":
                return "Account Management Page";
            case "8a":
                return "Account Management Page";
            case "8b":
                return "Account Report Page";
            case "9":
                return "setting";
            case "10":
                return "logout";
            case "11":
                return <AdminAddSingleStudent setActiveComponent={setActiveComponent}/>;
            // Add more cases as needed
            case "12":
                return <AdminBulkStudentUpload setActiveComponent={setActiveComponent}/>
            default:
                return "dashboard";
        }
    };



    const [sidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = () => {
        setSidebarVisible(prev => !prev);
    };
    return(
        <>
            <div className="admin-home-page" >
                <AdminSideBar 
                    loggedUser={"Administrator"}
                    activeComponent={activeComponent}
                    setActiveComponent={setActiveComponent}
                    sidebarVisible={sidebarVisible}
                    toggleSidebar={toggleSidebar}
                    
                />
                <div className="admin-main-content">
                    <NavBar activeLabel={setName()} toggleSidebar={toggleSidebar}/>
                    <div className='admin-rendered-main'>
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </>
    );
}