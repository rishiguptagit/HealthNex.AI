"use client";
import React, { useState } from "react";

const panelStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "90px",
  width: "100%",
  color: "black",
  fontSize: "250%",
  // borderBottom: "5px solid #1060d3",
  paddingLeft: "25px",
  background: "linear-gradient(to right, white, #1060d3 50%)",
};

const dropDown = {
  alignItems: "center",
  width: "25%",
  padding: "15px",
  paddingTop: "7px",
  paddingBottom: "7px",
  fontSize: "120%",
  border: "5px solid #ccc",
  marginTop: "25px"
};

const options = {
  width: "90%", 
  fontSize: "85%",
  borderBottom: "5px solid #ccc"
};

export default function PatientDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
      <div style={panelStyle}>Patient Dashboard</div>

      <div style={dropDown}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button> Appointments </button>
        {isOpen && (
          <div style={{paddingTop: "5%"}}>
            <button style={options}> View Appointments </button>
            <button style={options}> Make an Appointment </button>
          </div>
        )}
      </div>

      {/* {<div style={dropDown}>
        <select>
          <option value=""> Appointments </option>
          <option value=""> View Appointments </option>
          <option value=""> Make an Appointment </option>
        </select>
      </div>} */}

      <div
        style={{ paddingTop: "50px", paddingLeft: "20px", fontSize: "110%" }}
      >
        <p> First Name: FName </p>
        <p> Last Name: Lname </p>
      </div>
    </div>
  );
}
