import React, { useState } from 'react';
import { Star, Edit, MapPin, Calendar, Package, MessageCircle, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('listings');

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-500">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  const userStats = {
    totalListings: 12,
    activeTrades: 3,
    completedTrades: 23,
    memberSince: 'March 2023'
  };

  const listings = [
    {
      id: '1',
      title: 'Nike Air Jordan Basketball Shoes',
      price: 9999,
      condition: 'Like New',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      status: 'active',
      views: 24,
      interested: 3
    },
    {
      id: '2',
      title: 'Wilson Tennis Racket',
      price: 7099,
      condition: 'Good',
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      status: 'sold',
      views: 45,
      interested: 7
    }
  ];

  const trades = [
    {
      id: '1',
      item: 'Adidas Soccer Cleats',
      buyer: 'Priya Sharma',
      status: 'pending',
      date: '2025-01-15'
    },
    {
      id: '2',
      item: 'Basketball Hoop',
      buyer: 'Arjun Patel',
      status: 'completed',
      date: '2025-01-10'
    }
  ];

  const tabs = [
    { id: 'listings', label: 'My Listings', icon: Package },
    { id: 'trades', label: 'Trade History', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              
              <div className="flex items-center justify-center mt-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(user.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {user.rating} ({user.totalTrades} trades)
                  </span>
                </div>
              </div>
              
              <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Mumbai, Maharashtra</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Member since {userStats.memberSince}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{userStats.totalListings}</div>
                <div className="text-sm text-gray-600">Total Listings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{userStats.completedTrades}</div>
                <div className="text-sm text-gray-600">Completed Trades</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {activeTab === 'listings' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">My Listings</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Add New Item
                  </button>
                </div>
                
                <div className="space-y-4">
                  {listings.map((listing) => (
                    <div key={listing.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{listing.title}</h3>
                        <p className="text-sm text-gray-600">{listing.condition}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>{listing.views} views</span>
                          <span>{listing.interested} interested</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">₹{listing.price.toLocaleString('en-IN')}</div>
                        <div className={`text-sm px-2 py-1 rounded-full ${
                          listing.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {listing.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'trades' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Trade History</h2>
                
                <div className="space-y-4">
                  {trades.map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{trade.item}</h3>
                        <p className="text-sm text-gray-600">Buyer: {trade.buyer}</p>
                        <p className="text-sm text-gray-500">Date: {trade.date}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        trade.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {trade.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Notifications
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">New messages</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Trade updates</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-sm text-gray-700">Marketing emails</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Privacy Settings
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Show my profile to other users</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Allow direct messages</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;