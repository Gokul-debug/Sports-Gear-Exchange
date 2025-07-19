import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Shield, Zap } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Safe Trading',
      description: 'Secure transactions with buyer protection and verified users'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of sports enthusiasts trading gear worldwide'
    },
    {
      icon: Zap,
      title: 'Fast & Easy',
      description: 'List your gear in minutes and find what you need instantly'
    }
  ];

  const categories = [
    {
      name: 'Basketball',
      image: 'https://images.pexels.com/photos/1544947/pexels-photo-1544947.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      count: '2,341 items'
    },
    {
      name: 'Soccer',
      image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      count: '1,892 items'
    },
    {
      name: 'Tennis',
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      count: '1,456 items'
    },
    {
      name: 'Running',
      image: 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      count: '3,124 items'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Trade Sports Gear
                <span className="text-orange-400"> Safely</span> &
                <span className="text-orange-400"> Affordably</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Join the largest community of sports enthusiasts. Buy, sell, and trade quality sports equipment with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/marketplace"
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center group"
                >
                  Browse Marketplace
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/add-item"
                  className="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
                >
                  List Your Gear
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
                alt="Sports Equipment"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose SportsTrade?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make trading sports gear simple, safe, and affordable for everyone
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Categories
          </h2>
          <p className="text-xl text-gray-600">
            Find gear for your favorite sport
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/marketplace?category=${category.name.toLowerCase()}`}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">50K+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">125K+</div>
              <div className="text-gray-300">Items Listed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">98%</div>
              <div className="text-gray-300">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">4.8</div>
              <div className="text-gray-300 flex items-center justify-center">
                <Star className="w-4 h-4 text-orange-400 mr-1" />
                User Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of sports enthusiasts who are already trading gear on SportsTrade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/marketplace"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Browse Items
            </Link>
            <Link
              to="/add-item"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              List Your Gear
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;