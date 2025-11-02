import React, { useEffect } from 'react';
import { Heart } from 'lucide-react';
import justGivingConfig from '../data/justGivingConfig.json';
import { Helmet } from 'react-helmet';

const SponsorPage: React.FC = () => {
  useEffect(() => {
    window.location.href = justGivingConfig.defaultUrl;
  }, []);

  return (
        <>
      <Helmet>
        <title>Sponsor - Support My Fundraising</title>
        <meta name="description" content="Support my fundraising efforts by making a donation on JustGiving. Every contribution helps make a difference." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={justGivingConfig.defaultUrl} />
      </Helmet>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Redirecting to JustGiving...</h1>
        <p className="text-gray-600">Thank you for your support!</p>
      </div>
    </div>
  </>);
};

export default SponsorPage;