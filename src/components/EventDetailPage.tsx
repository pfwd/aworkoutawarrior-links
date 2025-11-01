import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, Calendar, MapPin, Target, TrendingUp } from 'lucide-react';
import eventDetails from '../data/eventDetails.json';

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = eventDetails[eventId as keyof typeof eventDetails];

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h1>
          <Link
            to="/fundraising"
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            ← Back to Fundraising Events
          </Link>
        </div>
      </div>
    );
  }

  const progress = (parseFloat(event.raisedAmount.replace(/[£,]/g, '')) / parseFloat(event.targetAmount.replace(/[£,]/g, ''))) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/fundraising"
          className="mb-6 inline-block text-purple-600 hover:text-purple-800 font-medium"
        >
          ← Back to Fundraising Events
        </Link>

        <div className="bg-white rounded-xl overflow-hidden shadow-xl">
          {/* <img src={event.image} alt={event.title} className="w-full h-64 md:h-96 object-cover" /> */}
          
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{event.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{event.description}</p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-purple-50 p-4 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600 mb-2" />
                <div className="text-sm text-gray-600">Date</div>
                <div className="font-semibold text-gray-800">{event.date}</div>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <MapPin className="w-6 h-6 text-pink-600 mb-2" />
                <div className="text-sm text-gray-600">Location</div>
                <div className="font-semibold text-gray-800">{event.location}</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <Target className="w-6 h-6 text-blue-600 mb-2" />
                <div className="text-sm text-gray-600">Target</div>
                <div className="font-semibold text-gray-800">{event.targetAmount}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl mb-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800">Fundraising Progress</h3>
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  {Math.round(progress)}%
                </div>
              </div>
              <div className="w-full bg-white rounded-full h-4 mb-3">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-4 rounded-full transition-all"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <span>{event.raisedAmount} raised</span>
                <span>{event.targetAmount} goal</span>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Challenge</h2>
              {event.fullDescription.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 mb-4">{paragraph}</p>
              ))}
            </div>

            {event.milestones && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">The Journey</h2>
                <div className="space-y-3">
                  {event.milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-start bg-gray-50 p-4 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-800">{milestone.day}</div>
                        <div className="text-gray-600">{milestone.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Why I'm Doing This</h3>
              <p className="text-gray-700">{event.whyImDoing}</p>
            </div>

            <a
              href={event.justGivingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-bold text-center text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Heart className="inline-block w-6 h-6 mr-2" />
              Sponsor Me on JustGiving
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;