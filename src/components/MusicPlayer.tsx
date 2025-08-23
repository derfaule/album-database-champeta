import React from 'react';
import { MusicLinks } from '../types';

interface MusicPlayerProps {
  links: MusicLinks;
  albumTitle: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ links, albumTitle }) => {
  const getSpotifyEmbedId = (url: string): string | null => {
    const patterns = [
      /spotify\.com\/album\/([a-zA-Z0-9]+)/,
      /spotify\.com\/track\/([a-zA-Z0-9]+)/,
      /open\.spotify\.com\/album\/([a-zA-Z0-9]+)/,
      /open\.spotify\.com\/track\/([a-zA-Z0-9]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const getSoundCloudEmbedUrl = (url: string): string => {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
  };

  const getYouTubeEmbedId = (url: string): string | null => {
    const patterns = [
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
      /youtu\.be\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  // Priority: Spotify > SoundCloud > YouTube
  if (links.spotify) {
    const spotifyId = getSpotifyEmbedId(links.spotify);
    if (spotifyId) {
      const type = links.spotify.includes('/track/') ? 'track' : 'album';
      return (
        <div className="music-player">
          <h4 className="text-lg font-semibold mb-3 text-green-400">
            🎵 Listen on Spotify
          </h4>
          <iframe
            src={`https://open.spotify.com/embed/${type}/${spotifyId}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>
      );
    }
  }

  if (links.soundcloud) {
    return (
      <div className="music-player">
        <h4 className="text-lg font-semibold mb-3 text-orange-400">
          🎵 Listen on SoundCloud
        </h4>
        <iframe
          width="100%"
          height="300"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={getSoundCloudEmbedUrl(links.soundcloud)}
          className="rounded-lg"
        ></iframe>
      </div>
    );
  }

  if (links.youtube) {
    const youtubeId = getYouTubeEmbedId(links.youtube);
    if (youtubeId) {
      return (
        <div className="music-player">
          <h4 className="text-lg font-semibold mb-3 text-red-400">
            🎵 Watch on YouTube
          </h4>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={`${albumTitle} - YouTube`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      );
    }
  }

  return (
    <div className="music-player">
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <div className="text-gray-400 text-4xl mb-3">🎵</div>
        <p className="text-gray-400">No preview available</p>
        <p className="text-sm text-gray-500 mt-2">
          Music links may be added in the future
        </p>
      </div>
    </div>
  );
};

export default MusicPlayer;