import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram, Play, Globe, Facebook, Video } from 'lucide-react';
import profileData from '../data/profile.json';
import socialLinks from '../data/socialLinks.json';
import linkGroups from '../data/linkGroups.json';
import { Helmet } from 'react-helmet';

const iconMap: { [key: string]: any } = {
  Linkedin,
  Twitter,
  Instagram,
  Globe,
  Play,
  Facebook,
  Video,
};

const HomePage: React.FC = () => {
  return (
    <>
    <Helmet>
        <title>{profileData.name} - Links & Social Media</title>
        <meta name="description" content={profileData.bio} />
        <meta property="og:title" content={`${profileData.name} - Links & Social Media`} />
        <meta property="og:description" content={profileData.bio} />
        <meta property="og:image" content={profileData.avatar} />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${profileData.name} - Links & Social Media`} />
        <meta name="twitter:description" content={profileData.bio} />
        <meta name="twitter:image" content={profileData.avatar} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <img
            src={profileData.avatar}
            alt={profileData.name}
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {profileData.name}
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            {profileData.bio}
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-10">
          {socialLinks.map((social) => {
            const Icon = iconMap[social.icon];
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-purple-600 hover:shadow-lg transition-all duration-300 hover:scale-110"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

        <div className="space-y-8">
          {linkGroups.map((group, idx) => (
            <div key={idx} className="space-y-3">
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {group.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {group.description}
                </p>
              </div>
              
              <div className="space-y-3">
                {group.links.map((link, linkIdx) => (
                  link.internal ? (
                    <Link
                      key={linkIdx}
                      to={link.url}
                      className="block w-full bg-white rounded-xl p-4 text-center text-gray-800 font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      key={linkIdx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-white rounded-xl p-4 text-center text-gray-800 font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100"
                    >
                      {link.name}
                    </a>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>© 2025 {profileData.name}.</p>
        </div>
      </div>
    </div>
  </>);
};

export default HomePage;