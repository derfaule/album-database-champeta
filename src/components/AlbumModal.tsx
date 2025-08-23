import React, { useEffect } from 'react';
import { X, Calendar, Tag, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { Album, MusicLinks } from '../types';
import MusicPlayer from './MusicPlayer';

interface AlbumModalProps {
  album: Album | null;
  isOpen: boolean;
  onClose: () => void;
}

const AlbumModal: React.FC<AlbumModalProps> = ({ album, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !album) return null;

  const coverImage = album.fields['Cover Image']?.[0];
  const releaseDate = album.fields['Release Date'];
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const musicLinks: MusicLinks = {
    soundcloud: album.fields['SoundCloud URL'],
    spotify: album.fields['Spotify URL'],
    youtube: album.fields['YouTube URL']
  };

  const hasAnyLinks = Object.values(musicLinks).some(Boolean);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-modal-enter">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-colors"
        >
          <X className="w-6 h-6 text-gray-300" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Left Column - Album Cover */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-800 shadow-2xl">
              {coverImage ? (
                <img
                  src={coverImage.url}
                  alt={`${album.fields['Album Title']} cover`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <ImageIcon className="w-24 h-24 text-gray-500" />
                </div>
              )}
            </div>

            {/* Image Attribution */}
            {album.fields['Image Attribution'] && (
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Image Attribution
                </div>
                <p className="text-gray-300 text-sm">
                  {album.fields['Image Attribution']}
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {album.fields['Album Title']}
              </h1>
              <h2 className="text-2xl text-gray-300 mb-4">
                {album.fields.Artist}
              </h2>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 text-sm">
                {releaseDate && (
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(releaseDate)}
                  </div>
                )}
                {album.fields.Genre && (
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="bg-green-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
                      {album.fields.Genre}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Description/Notes */}
            {album.fields.Notes && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">About</h3>
                <p className="text-gray-300 leading-relaxed">
                  {album.fields.Notes}
                </p>
              </div>
            )}

            {/* Music Player */}
            <MusicPlayer links={musicLinks} albumTitle={album.fields['Album Title']} />

            {/* External Links */}
            {hasAnyLinks && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  External Links
                </h3>
                <div className="flex flex-wrap gap-2">
                  {musicLinks.spotify && (
                    <a
                      href={musicLinks.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-400 transition-colors"
                    >
                      Spotify
                    </a>
                  )}
                  {musicLinks.soundcloud && (
                    <a
                      href={musicLinks.soundcloud}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-400 transition-colors"
                    >
                      SoundCloud
                    </a>
                  )}
                  {musicLinks.youtube && (
                    <a
                      href={musicLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-400 transition-colors"
                    >
                      YouTube
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumModal;