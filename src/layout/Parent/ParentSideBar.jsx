import React, { useState,useEffect } from 'react';
import "../../layoutCss/ParentSideBar.css"
import schoolLogo from "../../assets/school.png"
import { FaUserCircle } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { RiParentFill } from "react-icons/ri";
import {IoClose  } from "react-icons/io5";
import { FaChild } from "react-icons/fa6";
export default function ParentSideBar({toggleSidebar,loggedUser,activeComponent,setActiveComponent,sidebarVisible }){
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const toggleAccountData = () => {
        setIsAccountOpen(prev => !prev);
        setActiveComponent("8")
    };
    return(
        <>
            <div className={`parent-side-bar ${sidebarVisible ? "visible" : ""}`}>
                <div className='parent-side-bar-top'>
                    <div className="parent-side-header">
                        <img src={schoolLogo} alt="" />
                        <h3>Parent Portal</h3>
                    </div>
                    <div className="parent-sidebar-close-btn" onClick={toggleSidebar}>
                        <IoClose className='i'/>
                    </div>
                </div>
                <div className="parent-pt-name">
                    <FaUserCircle className="parent-profile-circle"/>
                    <div className="parent-pt-nm-h6">
                        <h6>Parent  User</h6>
                        <span>{loggedUser}</span>
                    </div>
                </div>
                <div className="parent-side-list">
                    <li 
                        onClick={() => {setActiveComponent("1");toggleSidebar()}}
                        className={activeComponent === "1" ? "active-li" : ""}
                    >
                        <span className="parent-side-list-icon"><AiFillDashboard /></span>
                        <span className="parent-side-list-item">Dashboard</span>
                    </li>
                    <li
                        onClick={() => {setActiveComponent("2");toggleSidebar()}}
                        className={activeComponent === "2" ? "active-li" : ""}
                    >
                        <span className="parent-side-list-icon"><FaChild /></span>
                        <span className="parent-side-list-item">My Child</span>
                    </li>
                    <li
                        onClick={() => {setActiveComponent("3");toggleSidebar()}}
                        className={activeComponent === "3" ? "active-li" : ""}
                    >
                        <span className="parent-side-list-icon"><RiParentFill /></span>
                        <span className="parent-side-list-item">Logout</span>
                    </li>
                    {/* <div id='google_translate_element'></div> */}
                </div>
            </div>
        </>
    );
}