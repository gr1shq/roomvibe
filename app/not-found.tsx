// app/not-found.tsx
import Link from 'next/link';
import Header from '@/app/(components)/Header';
import Footer from '@/app/(components)/Footer';

export const metadata = {
  title: 'Page Not Found | RoomVibe Aesthetic Decor',
  description: 'Oops! The page you’re looking for doesn’t exist. Explore our aesthetic decor collections to find your vibe.',
  keywords: '404, page not found, aesthetic decor, RoomVibe',
  alternates: {
    canonical: 'https://www.roomvibe.vercel.app/404',
  },
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <div className="max-w-2xl mx-auto">
            {/* Decorative Image */}
            <img
              src="/img/404-error.jpg"
              alt="404 Neon Heart"
              className="w-48 h-48 mx-auto mb-6 object-cover"
            />

            {/* Error Message */}
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              The page you’re looking for doesn’t exist or has been moved. Let’s get you back to finding your perfect aesthetic vibe!
            </p>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/"
                className="inline-block px-6 py-3 text-base font-medium text-white bg-pink-600 rounded-md hover:bg-pink-500 transition-all duration-300"
              >
                Back to Homepage
              </Link>
              <Link
                href="/categories"
                className="inline-block px-6 py-3 text-base font-medium text-pink-600 border border-pink-600 rounded-md hover:bg-pink-50 transition-all duration-300"
              >
                Explore Categories
              </Link>
              <Link
                href="/vibefeed"
                className="inline-block px-6 py-3 text-base font-medium text-pink-600 border border-pink-600 rounded-md hover:bg-pink-50 transition-all duration-300"
              >
                Read Vibefeed
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}