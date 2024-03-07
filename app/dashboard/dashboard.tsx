import React from "react";
import Link from "next/link";

const panelStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItens: "center",
  height: "100%",
  width: "100vw",
  color: "#000066",
  fontSize: "200%",
};

const button = {
  display: "flex",
  justifyContent: "space-between",
  alignItens: "center",
  fontWeight: "bold",
  color: "black",
  fontSize: "50%",
  height: "70%",
  alignItems: "center",
  border: "3px solid",
  borderRadius: "10px",
  padding: "7px",
};

export default function PatientDashboard() {
  return (
    <div
      className="min-h-screen bg-white text-black py-5"
      style={{ boxSizing: "border-box" }}
    >
      {/* Title */}
      <div style={panelStyle}>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "25px" }}
        >
          <img
            style={{ width: "50px", height: "auto" }}
            src="/healthnex.jpg"
            alt="WellNex.AI"
          />
          <h1
            style={{
              fontWeight: "bold",
              paddingLeft: "10px",
              alignItems: "left",
            }}
          >
            HealthNex.AI
          </h1>
        </div>

        {/* Log out */}
        <Link href="/">
          <button>
            <div style={{ ...button, marginRight: "30px" }}>
              <img
                style={{ width: "20px", height: "auto", marginRight: "6px" }}
                src="/logout.jpg"
                alt="WellNex.AI"
              />
              <p>Log out</p>
            </div>
          </button>
        </Link>
      </div>

      {/* Additional Functionality */}
      <div
        style={{ ...panelStyle, marginTop: "20px", backgroundColor: "#d8d8d8" }}
      >
        <button style={{ marginLeft: "40px" }}>
          <div style={button}>
            <img
              style={{
                width: "30px",
                height: "auto",
              }}
              src="/Appointment.jpg"
              alt="WellNex.AI"
            />

            <p>Appointments and Visits</p>
          </div>
        </button>
      </div>

      {/* Body */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#1060d3",
          width: "100vw",
          height: "calc(100vh - 180px)",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            backgroundColor: "#e1e1e1",
            width: "85%",
            height: "100%",
          }}
        >
          {printWelcome()}
          {personalInformation()}
        </div>

        {/* Bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            textAlign: "center",
            fontSize: "0.875rem",
            color: "#4A5568",
            width: "100%",
            paddingBottom: "1rem",
            paddingTop: "1rem",
            backgroundColor: "#EDF2F7",
            height: "50px",
          }}
        >
          &copy; {new Date().getFullYear()} HealthNex.AI. All rights reserved. |{" "}
          <Link
            href="/privacypolicy"
            className="text-gray-600 hover:text-navy-700"
          >
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link
            href="/termsofuse"
            className="text-gray-600 hover:text-navy-700"
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </div>
  );
}

function printWelcome() {
  return (
    <h1
      style={{
        paddingLeft: "20px",
        paddingTop: "20px",
        fontSize: "120%",
        fontWeight: "bold",
      }}
    >
      {" Welcome *patient.name*! "}
    </h1>
  );
}

const div1 = {
  backgroundColor: "#f2f2f2",
  display: "flex",
  justifyContent: "space-between",
  padding: "5px",
};

const div2 = {
  backgroundColor: "#e5e5e5",
  display: "flex",
  justifyContent: "space-between",
  padding: "5px",
};

function personalInformation() {
  return (
    <div
      style={{
        width: "90%",
        marginTop: "25px",
        marginLeft: "30px",
        padding: "10px",
      }}
    >
      <div style={div1}>
        <p>Name: </p>
        <p>First Last</p>
      </div>

      <div style={div2}>
        <p>Sex: </p>
        <p>*something*</p>
      </div>

      <div style={div1}>
        <p>Email: </p>
        <p>*something*</p>
      </div>

      <div style={div2}>
        <p>Race: </p>
        <p>*something*</p>
      </div>

      <div style={div1}>
        <p>Marital: </p>
        <p>*something*</p>
      </div>
    </div>
  );
}
