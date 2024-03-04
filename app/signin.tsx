"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      localStorage.setItem("primaryKey", email);
      router.push("/dashboard");
    } else {
      const message = await response.text();
      alert(message);
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
            Sign in to HealthNex.AI
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          action="/signin"
          method="post"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
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
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="forgotpassword"
                className="font-medium text-navy-500 hover:text-navy-700"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-navy-500 hover:text-navy-700"
          >
            Create yours now.
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
