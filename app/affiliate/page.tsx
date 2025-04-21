import React from 'react';
import Footer from '../(components)/Footer';
import Header from '../(components)/Header';

const AffiliateDisclosure = () => {
  return (
    <div className="">
        <header>
            <Header />
        </header>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-2xl p-8 sm:p-10 border border-gray-700">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-purple-300 mb-8 text-center">
          Our Affiliate Promise
        </h2>
        
        {/* Content */}
        <div className="space-y-6 text-gray-300">
          <p className="text-lg leading-relaxed">
            RoomVibe is a participant in various affiliate marketing programs, including Amazon Associates and others. 
            This means we may earn a small commission when you click on product links and make a purchase — at no extra cost to you.
          </p>
          
          <div className="p-4 bg-gray-700 rounded-lg border-l-4 border-purple-500">
            <p className="font-medium text-purple-300 mb-2">Our curation promise:</p>
            <p>
              We only feature products that we believe align with our aesthetic vision and could genuinely add value to your space.
            </p>
          </div>
          
          <p className="text-lg leading-relaxed">
            These affiliate commissions help us maintain and grow RoomVibe, so thank you for supporting the vibe <span className="text-purple-400">💜</span>
          </p>
          
          <p className="text-lg font-medium text-center text-purple-300 mt-8">
            Transparency matters — and your trust means everything to us.
          </p>
        </div>

        {/* Optional: Back button */}
        <div className="mt-12 text-center">
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-purple-700 hover:bg-purple-600 rounded-lg text-purple-100 font-medium transition-colors"
          >
            Back to Vibe
          </a>
        </div>
      </div>
    </div>
    <footer>
    <Footer />
</footer>
    </div>
  );
};

export default AffiliateDisclosure;