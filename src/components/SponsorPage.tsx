import React, { useEffect } from 'react';
import { Heart } from 'lucide-react';
import justGivingConfig from '../data/justGivingConfig.json';

const SponsorPage: React.FC = () => {
  useEffect(() => {
    window.location.href = justGivingConfig.defaultUrl;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Redirecting to JustGiving...</h1>
        <p className="text-gray-600">Thank you for your support!</p>
      </div>
    </div>
  );
};

export default SponsorPage;