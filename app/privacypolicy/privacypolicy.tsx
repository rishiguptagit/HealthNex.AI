import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="font-sans max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl border-b border-gray-200 pb-2">Privacy Policy</h1>

      <section className="mt-4">
        <h2 className="text-xl mb-2">Introduction</h2>
        <p className="text-base text-gray-700 mb-4">HealthNex.AI ("we", "our", or "us") operates the mobile application HealthNex.AI (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.</p>
      </section>

      <section className="mt-4">
        <h2 className="text-xl mb-2">Information Collection and Use</h2>
        <p className="text-base text-gray-700 mb-4">We collect several different types of information for various purposes to provide and improve our Service to you. Types of Data collected may include your email address, name, and usage data.</p>
      </section>

      <section className="mt-4">
        <h2 className="text-xl mb-2">Use of Data</h2>
        <p className="text-base text-gray-700 mb-4">HealthNex.AI uses the collected data for various purposes: To provide and maintain our Service, To notify you about changes to our Service, To provide customer support, To gather analysis or valuable information so that we can improve our Service.</p>
      </section>

      <section className="mt-4">
        <h2 className="text-xl mb-2">Security of Data</h2>
        <p className="text-base text-gray-700 mb-4">The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
      </section>

      <section className="mt-4">
        <h2 className="text-xl mb-2">Changes to This Privacy Policy</h2>
        <p className="text-base text-gray-700 mb-4">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
      </section>

      <section className="mt-4">
        <h2 className="text-xl mb-2">Contact Us</h2>
        <p className="text-base text-gray-700 mb-4">If you have any questions about this Privacy Policy, please contact us.</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;