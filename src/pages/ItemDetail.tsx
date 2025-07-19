import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Calendar, MessageCircle, Heart, Share2, Flag, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface Item {
  id: string;
  title: string;
  price: number;
  condition: string;
  category: string;
  location: string;
  description: string;
  images: string[];
  seller: {
    name: string;
    avatar: string;
    rating: number;
    totalTrades: number;
    responseTime: string;
    memberSince: string;
  };
  specifications: Record<string, string>;
  postedDate: string;
  views: number;
  interested: number;
}

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/items/${id}`);
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = () => {
    if (!item) return;
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      condition: item.condition,
      category: item.category,
      location: item.location,
      image: item.images[0],
      seller: {
        name: item.seller.name,
        rating: item.seller.rating
      }
    });
    alert('Item added to cart!');
  };

  const handleContactSeller = () => alert('Contact seller functionality would be implemented here');
  const handleMakeOffer = () => alert('Make offer functionality would be implemented here');

  if (!item) {
    return <div className="text-center py-10">Loading item details...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              <div className="aspect-w-16 aspect-h-12 overflow-hidden rounded-lg">
                <img src={item.images[selectedImage]} alt={item.title} className="w-full h-96 object-cover" />
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'}`}
                  >
                    <img src={image} alt={`${item.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{item.location}</span>
                  <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />Posted {item.postedDate}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => setIsFavorited(!isFavorited)} className={`p-2 rounded-full ${isFavorited ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'} hover:bg-red-50`}>
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"><Share2 className="w-5 h-5" /></button>
                <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"><Flag className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Price</div>
                <div className="text-xl font-bold text-gray-900">₹{item.price.toLocaleString('en-IN')}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Condition</div>
                <div className="text-lg font-semibold text-gray-900">{item.condition}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Category</div>
                <div className="text-lg font-semibold text-gray-900">{item.category}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Views</div>
                <div className="text-lg font-semibold text-gray-900">{item.views}</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Description</h3>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(item.specifications).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-sm text-gray-600 capitalize">{key}</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
            <div className="flex items-center space-x-3 mb-4">
              <img src={item.seller.avatar} alt={item.seller.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-medium text-gray-900">{item.seller.name}</h4>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{item.seller.rating} ({item.seller.totalTrades} trades)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Response time:</span>
                <span>{item.seller.responseTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Member since:</span>
                <span>{item.seller.memberSince}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button onClick={handleAddToCart} className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
              </button>
              <button onClick={handleContactSeller} className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                <MessageCircle className="w-4 h-4 mr-2" /> Contact Seller
              </button>
              <button onClick={handleMakeOffer} className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
                Make an Offer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
