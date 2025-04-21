import React from 'react';
import Header from '../(components)/Header';
import Footer from '../(components)/Footer';

const ContactSection = () => {
  return (
    <div className="">
        <header>
            <Header />
        </header>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-2xl p-8 sm:p-10 border border-gray-700">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-purple-300 mb-6">
          Got a question, collab idea, or just want to say hi?
        </h2>
        
        <p className="text-lg text-gray-300 mb-8">
          We would love to hear from you.
        </p>

        {/* Email */}
        <div className="mb-10 p-4 bg-gray-700 rounded-lg border-l-4 border-purple-500">
          <p className="text-gray-400 mb-2">📧 Email us anytime at:</p>
          <a 
            href="mailto:gpentertainment28@gmail.com" 
            className="text-purple-400 hover:text-purple-300 text-lg font-medium break-all"
          >
            gpentertainment28@gmail.com
          </a>
        </div>

        {/* Collaboration Options */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-purple-300 mb-4">
            We are open to:
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">—</span>
              <span>Product suggestions</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">—</span>
              <span>Aesthetic partnership ideas</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">—</span>
              <span>Creator collabs</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">—</span>
              <span>Feedback & support</span>
            </li>
          </ul>
        </div>

        {/* Social Media Placeholders */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-purple-300 mb-4">
            Connect with us
          </h3>
          <div className="flex flex-wrap gap-4">
          <a href="https://sk.pinterest.com/tapecode/" className="text-gray-400 hover:text-pinterest-red transition-colors" target="_blank">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387-.12-1.102-.227-2.793.049-3.993.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 0 1 .083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.174.265-.402.159-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.93-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.042-1.002 2.349-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12S18.627 0 12 0z" clipRule="evenodd"/>
            </svg>
          </a>
            
          <a href="https://x.com/tapecodeEnt" className="text-gray-400 hover:text-twitter-blue transition-colors" target="_blank">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
            
            {/* TikTok - Add your SVG here */}
            <a href="https://tiktok.com/@aevintape" className="text-gray-400 hover:text-tiktok-pink transition-colors" target="_blank">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" clipRule="evenodd"/>
            </svg>
          </a>
            
            {/* GitHub - Add your SVG here */}
            <a href="https://github.com/gr1shq" className="text-gray-400 hover:text-white transition-colors" target="_blank">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
            </svg>
          </a>
          </div>
        </div>

        {/* Closing */}
        <p className="text-center text-purple-300 mt-12 text-lg">
          Lets make the internet a more vibey place together ✨
        </p>
      </div>
    </div>
    <footer>
        <Footer />
    </footer>
    </div>
  );
};

export default ContactSection;