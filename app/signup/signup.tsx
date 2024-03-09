"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFirstName(event.target.value);
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLastName(event.target.value);
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      alert("All fields are required");
      return;
    }

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("primaryKey", email);
      router.push("/signup/profile");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-20 w-auto"
            src="/healthnex.jpg"
            alt="WellNex.AI"
          />
          <h2 className="mt-6 text-center text-2xl font-medium text-gray-900">
            Create an account at HealthNex.AI
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="firstName" className="sr-only">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                className="appearance-none rounded-none relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-navy-500 focus:border-navy-500 focus:z-10 sm:text-lg"
                placeholder="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="given-name"
                required
                className="appearance-none rounded-none relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-navy-500 focus:border-navy-500 focus:z-10 sm:text-lg"
                placeholder="Last Name"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-navy-500 focus:border-navy-500 focus:z-10 sm:text-lg"
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-navy-500 focus:border-navy-500 focus:z-10 sm:text-lg"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500"
            >
              Sign up
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Have an account?{" "}
          <Link
            href="/"
            className="font-medium text-navy-500 hover:text-navy-700"
          >
            Sign in.
          </Link>
        </p>
      </div>
      <div className="absolute bottom-0 text-center text-sm text-gray-600 w-full pb-4 pt-4 bg-gray-300">
        &copy; {new Date().getFullYear()} HealthNex.AI. All rights reserved. |{" "}
        <Link
          href="/privacypolicy"
          className="text-gray-600 hover:text-navy-700"
        >
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link href="/termsofuse" className="text-gray-600 hover:text-navy-700">
          Terms of Use
        </Link>
      </div>
    </div>
  );
}
