import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Grid, List, Star, MapPin, Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface Item {
  id: string;
  title: string;
  price: number;
  condition: string;
  category: string;
  location: string;
  image: string;
  seller: {
    name: string;
    rating: number;
  };
}

const Marketplace: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const items: Item[] = [
    {
      id: '1',
      title: 'Nike Air Jordan Basketball Shoes',
      price: 9999,
      condition: 'Like New',
      category: 'Basketball',
      location: 'Mumbai, Maharashtra',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      seller: { name: 'Aakash', rating: 4.9 }
    },
    {
      id: '2',
      title: 'Wilson Tennis Racket Pro Series',
      price: 7099,
      condition: 'Good',
      category: 'Tennis',
      location: 'Delhi, Delhi',
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      seller: { name: 'Sowmiya', rating: 4.7 }
    },
    {
      id: '3',
      title: 'Adidas Soccer Cleats',
      price: 5399,
      condition: 'Fair',
      category: 'Soccer',
      location: 'Bangalore, Karnataka',
      image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      seller: { name: 'Harish', rating: 4.8 }
    },
    {
      id: '4',
      title: 'Under Armour Running Shoes',
      price: 7899,
      condition: 'Like New',
      category: 'Running',
      location: 'Chennai, Tamil Nadu',
      image: 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      seller: { name: 'Gokul', rating: 4.9 }
    },
    {
      id: '5',
      title: 'Spalding Basketball Official Size',
      price: 2899,
      condition: 'Good',
      category: 'Basketball',
      location: 'Pune, Maharashtra',
      image: 'https://images.pexels.com/photos/1544947/pexels-photo-1544947.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      seller: { name: 'Vikram Singh', rating: 4.6 }
    },
    {
      id: '6',
      title: 'Nike Golf Driver Club',
      price: 12499,
      condition: 'Like New',
      category: 'Golf',
      location: 'Hyderabad, Telangana',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      seller: { name: 'Amit Gupta', rating: 4.8 }
    },
    {
       id: '7',
      title: 'Yonex Badminton Racket',
      price: 12499,
      condition: 'Like New',
      category: 'Badminton',
      location: 'Hyderabad, Telangana',
      image: 'https://www.pexels.com/photo/badminton-racket-and-shuttlecocks-on-the-court-8007176/',
      seller: { name: 'Amit Gupta', rating: 4.8 }
    },
    {
      id: '8',
      title: 'Puma Football Boots',
      price: 12499,
      condition: 'Like New',
      category: 'Football',
      location: 'Hyderabad, Telangana',
      image: 'https://images.pexels.com/photos/32574010/pexels-photo-32574010.jpeg',
      seller: { name: 'Amit Gupta', rating: 4.8 }
    },
    {
      id: '9',
      title: 'Decathlon Badminton Net',
      price: 12499,
      condition: 'Like New',
      category: 'Badminton',
      location: 'Hyderabad, Telangana',
      image: 'https://images.pexels.com/photos/33063727/pexels-photo-33063727.jpeg',
      seller: { name: 'Amit Gupta', rating: 4.8 }
    },
    {
      id: '10',
      title: 'Speedo Swim Goggle',
      price: 12499,
      condition: 'Like New',
      category: 'Swwimming',
      location: 'Hyderabad, Telangana',
      image: 'https://images.pexels.com/photos/8028353/pexels-photo-8028353.jpeg',  
      seller: { name: 'Amit Gupta', rating: 4.8 }
    },
  ];

  const categories = ['all', 'Basketball', 'Soccer', 'Tennis', 'Running', 'Golf'];

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item: Item, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
  };

  const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
    if (viewMode === 'list') {
      return (
        <Link
          to={`/item/${item.id}`}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-4 flex items-center space-x-4"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-20 h-20 object-cover rounded-md"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.condition} • {item.category}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <MapPin className="w-3 h-3" />
              <span>{item.location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">₹{item.price.toLocaleString('en-IN')}</div>
            <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
              <Star className="w-3 h-3 fill-current text-yellow-400" />
              <span>{item.seller.rating}</span>
            </div>
            <button
              onClick={(e) => handleAddToCart(item, e)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </Link>
      );
    }

    return (
      <Link
        to={`/item/${item.id}`}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 overflow-hidden hover:-translate-y-1 group"
      >
        <div className="aspect-w-16 aspect-h-12 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
            <span className="text-xl font-bold text-gray-900">₹{item.price.toLocaleString('en-IN')}</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{item.condition} • {item.category}</p>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <MapPin className="w-3 h-3" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-current text-yellow-400" />
              <span className="text-sm text-gray-600">{item.seller.rating}</span>
            </div>
          </div>
          <button
            onClick={(e) => handleAddToCart(item, e)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </Link>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>₹0</span>
                    <span>₹50,000+</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <div className="space-y-2">
                  {['Like New', 'Good', 'Fair'].map(condition => (
                    <label key={condition} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Controls */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                
                <div className="flex border border-gray-300 rounded-md">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-4">
            <p className="text-gray-600">
              Showing {filteredItems.length} of {items.length} items
            </p>
          </div>

          {/* Items Grid/List */}
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
          }`}>
            {filteredItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;