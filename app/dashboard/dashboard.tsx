import React from 'react';

export default function PatientDashboard({ patient }) {
  return (
    <div>
      <h1>Patient Dashboard</h1>
      <h2>{patient.name}</h2>
      <p>Age: {patient.age}</p>
      <p>Email: {patient.email}</p>
      <h2>Appointments</h2>
      {patient.appointments.map((appointment, index) => (
        <div key={index}>
          <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
          <p>Doctor: {appointment.doctor}</p>
        </div>
      ))}
    </div>
  );
}