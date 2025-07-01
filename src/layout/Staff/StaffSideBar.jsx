import React, { useState,useEffect } from 'react';
import "../../layoutCss/StaffSideBar.css"
import schoolLogo from "../../assets/school.png"
import { FaUserCircle } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { RiParentFill } from "react-icons/ri";
import {IoClose  } from "react-icons/io5";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdPayments } from "react-icons/md";
import { MdHolidayVillage } from "react-icons/md";
export default function StaffSideBar({toggleSidebar,loggedUser,activeComponent,setActiveComponent,sidebarVisible }){
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const toggleAccountData = () => {
        setIsAccountOpen(prev => !prev);
        setActiveComponent("8")
    };
    return(
        <>
            <div className={`staff-side-bar ${sidebarVisible ? "visible" : ""}`}>
                <div className='staff-side-bar-top'>
                    <div className="staff-side-header">
                        <img src={schoolLogo} alt="" />
                        <h3>Staff Portal</h3>
                    </div>
                    <div className="staff-sidebar-close-btn" onClick={toggleSidebar}>
                        <IoClose className='i'/>
                    </div>
                </div>
                <div className="staff-pt-name">
                    <FaUserCircle className="staff-profile-circle"/>
                    <div className="staff-pt-nm-h6">
                        <h6>Staff  User</h6>
                        <span>{loggedUser}</span>
                    </div>
                </div>
                <div className="staff-side-list">
                    <li 
                        onClick={() => {setActiveComponent("1");toggleSidebar()}}
                        className={activeComponent === "1" ? "active-li" : ""}
                    >
                        <span className="staff-side-list-icon"><AiFillDashboard /></span>
                        <span className="staff-side-list-item">Dashboard</span>
                    </li>
                    <li
                        onClick={() => {setActiveComponent("2");toggleSidebar()}}
                        className={activeComponent === "2" ? "active-li" : ""}
                    >
                        <span className="staff-side-list-icon"><FcMoneyTransfer /></span>
                        <span className="staff-side-list-item">Manage Salaryslip</span>
                    </li>
                    <li
                        onClick={() => {setActiveComponent("3");toggleSidebar()}}
                        className={activeComponent === "3" ? "active-li" : ""}
                    >
                        <span className="staff-side-list-icon"><MdPayments /></span>
                        <span className="staff-side-list-item">Payments</span>
                    </li>
                    <li
                        onClick={() => {setActiveComponent("4");toggleSidebar()}}
                        className={activeComponent === "4" ? "active-li" : ""}
                    >
                        <span className="staff-side-list-icon"><MdHolidayVillage /></span>
                        <span className="staff-side-list-item">Holidays</span>
                    </li>
                    <li
                        onClick={() => {setActiveComponent("5");toggleSidebar()}}
                        className={activeComponent === "5" ? "active-li" : ""}
                    >
                        <span className="staff-side-list-icon"><RiParentFill /></span>
                        <span className="staff-side-list-item">Logout</span>
                    </li>
                    {/* <div id='google_translate_element'></div> */}
                </div>
            </div>
        </>
    );
}