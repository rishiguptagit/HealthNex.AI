import React from "react";
import Link from "next/link";

export default function ProfilePage() {
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
            Please complete your profile
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="/signin" method="post">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="legalSex" className="sr-only">
                Legal Sex
              </label>
              <select
                id="legalSex"
                name="legalSex"
                required
                className="appearance-none rounded-none relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-navy-500 focus:border-navy-500 focus:z-10 sm:text-lg"
              >
                <option value="" disabled selected>
                  Select Legal Sex
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="genderIdentity" className="sr-only">
                Gender Identity
              </label>
              <select
                id="genderIdentity"
                name="genderIdentity"
                required
                className="appearance-none rounded-none relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-navy-500 focus:border-navy-500 focus:z-10 sm:text-lg"
              >
                <option value="" disabled selected>
                  Select Gender Identity
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="sexualOrientation" className="sr-only">
                Sexual Orientation
              </label>
              <select
                id="sexualOrientation"
                name="sexualOrientation"
                required
                className="appearance-none rounded-none relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-navy-500 focus:border-navy-500 focus:z-10 sm:text-lg"
              >
                <option value="" disabled selected>
                  Select Sexual Orientation
                </option>
                <option value="heterosexual">Heterosexual</option>
                <option value="homosexual">Homosexual</option>
                <option value="bisexual">Bisexual</option>
                <option value="pansexual">Pansexual</option>
                <option value="asexual">Asexual</option>
                <option value="queer">Queer</option>
              </select>
            </div>
            <div>
              <label htmlFor="race" className="sr-only">
                Race
              </label>
              <select
                id="race"
                name="race"
                required
                className="appearance-none rounded-none relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-navy-500 focus:border-navy-500 focus:z-10 sm:text-lg"
              >
                <option value="" disabled selected>
                  Select Race
                </option>
                <option value="americanindian">American Indian</option>
                <option value="eastasian">East Asian</option>
                <option value="southasian">South Asian</option>
                <option value="black">Black / African American</option>
                <option value="white">White / Caucasian</option>
              </select>
            </div>
            <div>
              <label htmlFor="marital" className="sr-only">
                Marital Status
              </label>
              <select
                id="marital"
                name="ramaritalce"
                required
                className="appearance-none rounded-none relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-navy-500 focus:border-navy-500 focus:z-10 sm:text-lg"
              >
                <option value="" disabled selected>
                  Select Marital Status
                </option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500"
            >
              Continue
            </button>
          </div>
        </form>
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
