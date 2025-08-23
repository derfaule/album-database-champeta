import React from 'react';
import { Album } from '../types';
import { Calendar, Music } from 'lucide-react';

interface AlbumCardProps {
  album: Album;
  onClick: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick }) => {
  const coverImage = album.fields['Cover Image']?.[0];
  const releaseDate = album.fields['Release Date'];
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).getFullYear().toString();
  };

  return (
    <div 
      className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage.thumbnails?.large?.url || coverImage.url}
            alt={`${album.fields['Album Title']} cover`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <Music className="w-16 h-16 text-gray-500" />
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="bg-green-500 rounded-full p-3 mb-2 mx-auto w-12 h-12 flex items-center justify-center">
              <Music className="w-6 h-6 text-black" />
            </div>
            <p className="text-white font-semibold text-sm">View Details</p>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-1 truncate group-hover:text-green-400 transition-colors">
          {album.fields['Album Title']}
        </h3>
        <p className="text-gray-400 text-sm mb-2 truncate">
          {album.fields.Artist}
        </p>
        
        <div className="flex items-center justify-between text-xs">
          {releaseDate && (
            <div className="flex items-center text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(releaseDate)}
            </div>
          )}
          {album.fields.Genre && (
            <div className="bg-gray-700 px-2 py-1 rounded-full text-gray-300">
              {album.fields.Genre}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;