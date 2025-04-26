import React from 'react';
import Link from 'next/link';
import Header from '../(components)/Header';
import Footer from '../(components)/Footer';

const TermsOfService = () => {
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
            Terms of Service
          </h1>
          <p className="text-gray-400">
            <strong>Effective Date:</strong> April 19, 2025
          </p>
        </div>

        {/* Intro */}
        <div className="mb-10">
          <p className="text-xl text-purple-200 mb-6">
            Welcome to RoomVibe!
          </p>
          <p className="text-gray-300">
            By using our website (<span className="text-purple-400">https://roomvibe.vercel.app</span>), you agree to the following terms:
          </p>
        </div>

        {/* Terms List */}
        <div className="space-y-8">
          {/* Term 1 */}
          <div className="border-l-2 border-purple-500 pl-5">
            <h3 className="text-xl font-semibold text-purple-300 mb-3">
              1. Use of the Website
            </h3>
            <p className="text-gray-300">
              You agree to use RoomVibe for personal, non-commercial purposes only. You may not copy or resell our content or images.
            </p>
          </div>

          {/* Term 2 */}
          <div className="border-l-2 border-purple-500 pl-5">
            <h3 className="text-xl font-semibold text-purple-300 mb-3">
              2. Affiliate Products
            </h3>
            <p className="text-gray-300">
              RoomVibe features affiliate links. We are not the seller or manufacturer of the products listed — any issues with purchases should be addressed with the retailer (like Amazon or Temu).
            </p>
          </div>

          {/* Term 3 */}
          <div className="border-l-2 border-purple-500 pl-5">
            <h3 className="text-xl font-semibold text-purple-300 mb-3">
              3. No Guarantees
            </h3>
            <p className="text-gray-300">
              While we strive for accuracy, we cannot guarantee that all product details (price, availability, etc.) are up-to-date.
            </p>
          </div>

          {/* Term 4 */}
          <div className="border-l-2 border-purple-500 pl-5">
            <h3 className="text-xl font-semibold text-purple-300 mb-3">
              4. Intellectual Property
            </h3>
            <p className="text-gray-300">
              All content on RoomVibe (including logos, graphics, and text) is owned by RoomVibe or used with permission and may not be reused without consent.
            </p>
          </div>

          {/* Term 5 */}
          <div className="border-l-2 border-purple-500 pl-5">
            <h3 className="text-xl font-semibold text-purple-300 mb-3">
              5. Termination
            </h3>
            <p className="text-gray-300">
              We reserve the right to restrict access to RoomVibe for any user who violates these terms.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 p-4 bg-gray-700 rounded-lg">
          <p className="text-gray-300">
            For questions, feel free to <a 
              href="mailto:gpentertainment28@gmail.com" 
              className="text-purple-400 hover:underline"
            >
              contact us
            </a>.
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link href="/" className="px-6 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg text-purple-100 font-medium transition-colors">
            Back Home
          </Link>
          <Link href="/privacy" className="px-6 py-2 border border-gray-600 hover:bg-gray-700 rounded-lg text-gray-300 font-medium transition-colors">
            Privacy Policy
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

export default TermsOfService;