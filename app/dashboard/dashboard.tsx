import React from "react";

export default function PatientDashboard() {
  return (
    <div className="min-h-screen flex items-start justify-start bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl text-gray-900">
            Patient Dashboard
          </h2>
        </div>
        <div>
          <p className="mt-6 text-left text-gray-900">Name: Aayush Joshi</p>
          <p className="mt-6 text-left text-gray-900">Age: 20</p>
        </div>
      </div>
    </div>
  );
}
