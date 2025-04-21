import React from 'react';
import Link from 'next/link';
import Header from '../(components)/Header';
import Footer from '../(components)/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="">
    <header>
        <Header />
    </header>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-2xl p-8 sm:p-10 border border-gray-700">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-300 mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-400">
            <strong>Effective Date:</strong> April 19, 2025
          </p>
        </div>

        {/* Intro */}
        <div className="mb-10">
          <p className="text-xl text-purple-200">
            At RoomVibe, your privacy is important to us.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-10">
          {/* Section 1 */}
          <div className="border-l-2 border-purple-500 pl-5">
            <h3 className="text-xl font-semibold text-purple-300 mb-3">
              1. What We Collect
            </h3>
            <ul className="list-disc text-gray-300 space-y-2 pl-5">
              <li>Your email (if you sign up for our newsletter)</li>
              <li>Basic analytics data (like page views, country, browser)</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="border-l-2 border-purple-500 pl-5">
            <h3 className="text-xl font-semibold text-purple-300 mb-3">
              2. How We Use It
            </h3>
            <ul className="list-disc text-gray-300 space-y-2 pl-5">
              <li>To send newsletters and updates (only if you opt-in)</li>
              <li>To improve the design and experience of RoomVibe</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="border-l-2 border-purple-500 pl-5">
            <h3 className="text-xl font-semibold text-purple-300 mb-3">
              3. Third-Party Services
            </h3>
            <p className="text-gray-300">
              We may use services like Google Analytics or affiliate platforms (like Amazon or Temu) that may collect data through cookies.
            </p>
          </div>

          {/* Section 4 */}
          <div className="border-l-2 border-purple-500 pl-5">
            <h3 className="text-xl font-semibold text-purple-300 mb-3">
              4. Your Rights
            </h3>
            <p className="text-gray-300">
              You can request to view or delete your personal data at any time by contacting us at <a 
                href="mailto:gpentertainment28@gmail.com" 
                className="text-purple-400 hover:underline"
              >
                gpentertainment28@gmail.com
              </a>.
            </p>
          </div>

          {/* Section 5 */}
          <div className="border-l-2 border-purple-500 pl-5">
            <h3 className="text-xl font-semibold text-purple-300 mb-3">
              5. Cookies
            </h3>
            <p className="text-gray-300">
              We use cookies to understand website traffic and product interactions. You can turn them off in your browser settings.
            </p>
          </div>
        </div>

        {/* Promise */}
        <div className="mt-12 p-6 bg-gray-700 rounded-lg border border-purple-800">
          <p className="text-center text-xl text-purple-300 font-medium">
            RoomVibe does not sell your personal data. Ever.
          </p>
        </div>

        {/* Closing */}
        <p className="text-center text-purple-300 mt-12 text-lg">
          Thank you for trusting us with your vibe <span className="text-purple-400">💜</span>
        </p>

        {/* Navigation */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link href="/" className="px-6 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg text-purple-100 font-medium transition-colors">
            Back Home
          </Link>
          <Link href="/terms" className="px-6 py-2 border border-gray-600 hover:bg-gray-700 rounded-lg text-gray-300 font-medium transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
    <footer>
        <Footer />
    </footer>
    </div>
  );
};

export default PrivacyPolicy;