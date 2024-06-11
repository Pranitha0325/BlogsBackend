import React from 'react';
import './sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <a href="/home" className="sidebar-link" style={{marginBottom:"10px"}}>
        <h2>Home</h2>
    </a>
    <hr/>
    <a href="/blogs" className="sidebar-link" style={{marginBottom:"10px"}}>
      <h2>Blog Page</h2>
      </a>
      <hr/>
    <a href="/dashboard" className="sidebar-link" style={{marginBottom:"10px"}}>
      <h2>Dashboard</h2>
      </a>
      <hr/>
       <a href="/myProfile" className="sidebar-link" style={{marginBottom:"10px"}}>
      <h2>View Profile</h2>
      </a>
      <hr/>
      
    </div>
  );
}

export default Sidebar;
