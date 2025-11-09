import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface VideoGalleryProps {
  milestones: {
    day: string;
    description: string;
    videoId: string;
  }[];
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ milestones }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % milestones.length);
  };

  const prevVideo = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + milestones.length) % milestones.length
    );
  };

  return (
    <div className="w-full">
      {/* Mobile Carousel */}
      <div className="md:hidden">
        <div className="relative">
          <div className="aspect-[9/16] w-full">
            <iframe
              src={`https://www.youtube.com/embed/${milestones[currentIndex].videoId}`}
              title={`Day ${currentIndex + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
          <button
            onClick={prevVideo}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextVideo}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-bold">{milestones[currentIndex].day}</h3>
          <p className="text-gray-600">
            {milestones[currentIndex].description}
          </p>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
        {milestones.map((milestone, index) => (
          <div key={index} className="space-y-2">
            <div className="aspect-[9/16]">
              <iframe
                src={`https://www.youtube.com/embed/${milestone.videoId}`}
                title={milestone.day}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              />
            </div>
            <h3 className="font-bold">{milestone.day}</h3>
            <p className="text-gray-600">{milestone.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
