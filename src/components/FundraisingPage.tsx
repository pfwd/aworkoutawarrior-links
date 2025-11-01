import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, MapPin } from 'lucide-react';
import fundraisingEvents from '../data/fundraisingEvents.json';

const FundraisingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="mb-6 inline-block text-purple-600 hover:text-purple-800 font-medium"
        >
          ← Back to Home
        </Link>

        <div className="text-center mb-12">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Fundraising Events</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join me in making a difference! Here are the fundraising challenges I'm currently undertaking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {fundraisingEvents.map((event) => {
            const progress = (parseFloat(event.raisedAmount.replace(/[£,]/g, '')) / parseFloat(event.targetAmount.replace(/[£,]/g, ''))) * 100;
            
            return (
              <div key={event.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {/* <img src={event.image} alt={event.title} className="w-full h-48 object-cover" /> */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h2>
                  <p className="text-gray-600 mb-4">{event.shortDescription}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-gray-800">{event.raisedAmount} of {event.targetAmount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    to={`/fundraising/${event.id}`}
                    className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all text-center"
                  >
                    Learn More & Sponsor
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FundraisingPage;