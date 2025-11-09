import React from "react";
import { Link } from "react-router-dom";
import { Heart, Calendar, MapPin, CheckCircle } from "lucide-react";
import fundraisingEvents from "../data/fundraisingEvents.json";
import { Helmet } from "react-helmet";

const FundraisingPage: React.FC = () => {
  // Separate current and past events
  const currentEvents = fundraisingEvents.filter((event) => !event.completed);
  const pastEvents = fundraisingEvents.filter((event) => event.completed);

  const renderEventCard = (event: any, isPast: boolean = false) => {
    const progress =
      (parseFloat(event.raisedAmount.replace(/[£,]/g, "")) /
        parseFloat(event.targetAmount.replace(/[£,]/g, ""))) *
      100;

    return (
      <div
        key={event.id}
        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          {isPast && (
            <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Completed
            </div>
          )}
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {event.title}
          </h2>
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
              <span className="font-semibold text-gray-800">
                {event.raisedAmount} of {event.targetAmount}
              </span>
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
            {isPast ? "View details" : "Learn more & sponsor"}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Fundraising events - Support my charity challenges</title>
        <meta
          name="description"
          content="Join me in making a difference! Explore my current and past fundraising challenges and help support important causes through charitable donations."
        />
        <meta
          property="og:title"
          content="Fundraising Events - Support My Charity Challenges"
        />
        <meta
          property="og:description"
          content="Join me in making a difference! Explore my current and past fundraising challenges and help support important causes."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Fundraising Events - Support My Charity Challenges"
        />
        <meta
          name="twitter:description"
          content="Join me in making a difference! Explore my current and past fundraising challenges."
        />
        <link rel="canonical" href={window.location.href} />
        <meta
          name="keywords"
          content="fundraising, charity, donations, events, challenges, JustGiving"
        />
      </Helmet>
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
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Fundraising Events
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join me in making a difference! Here are the fundraising
              challenges I'm currently undertaking.
            </p>
          </div>

          {/* Current Events Section */}
          {currentEvents.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Current events
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {currentEvents.map((event) => renderEventCard(event, false))}
              </div>
            </div>
          )}

          {/* Past Events Section */}
          {pastEvents.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Past events
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {pastEvents.map((event) => renderEventCard(event, true))}
              </div>
            </div>
          )}

          {/* No events message */}
          {currentEvents.length === 0 && pastEvents.length === 0 && (
            <div className="text-center text-gray-600 py-12">
              <p>No fundraising events at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FundraisingPage;
