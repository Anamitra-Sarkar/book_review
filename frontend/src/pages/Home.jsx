import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeIn">
              📚 Discover Your Next Great Read
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Share your thoughts, explore reviews, and find books that inspire you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/books" className="bg-white text-indigo-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                🔍 Browse Books
              </Link>
              {!isAuthenticated && (
                <Link to="/register" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-bold px-8 py-4 text-lg rounded-lg transition-all duration-300">
                  Get Started Free
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Floating book emojis */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">📖</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-bounce" style={{animationDelay: '1s'}}>📚</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-bounce" style={{animationDelay: '0.5s'}}>✨</div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Why BookReview?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card text-center hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Rate & Review</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Share your honest opinions and help others discover great books through detailed reviews and ratings.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Discover Books</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Search, filter by genre, and sort by ratings to find your next favorite book in seconds.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">See Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400">
                View rating distributions and comprehensive stats to make informed reading choices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="card bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
              What is BookReview?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              <strong>BookReview</strong> is a community-driven platform where book lovers come together to share their reading experiences. 
              Whether you're an avid reader or just starting your literary journey, this is your space to:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-6">
              <li className="flex items-start">
                <span className="text-2xl mr-3">📚</span>
                <span>Add books you've read and want to recommend to others</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✍️</span>
                <span>Write thoughtful reviews and rate books from 1 to 5 stars</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">🌟</span>
                <span>Browse community reviews to find highly-rated books in any genre</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">📈</span>
                <span>Explore rating analytics to see what the community thinks</span>
              </li>
            </ul>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Built for readers, by readers. Join our community and help others discover their next great read! 🚀
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Reading Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of book lovers sharing their favorite reads and discovering new ones every day.
          </p>
          <Link to="/books" className="bg-white text-indigo-600 hover:bg-gray-100 font-bold px-10 py-4 text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 inline-block">
            Explore Books Now →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

