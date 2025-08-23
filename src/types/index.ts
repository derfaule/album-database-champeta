export interface Album {
  id: string;
  fields: {
    'Album Title': string;
    Artist: string;
    'Cover Image'?: Array<{
      id: string;
      url: string;
      filename: string;
      size: number;
      type: string;
      thumbnails: {
        small: { url: string; width: number; height: number };
        large: { url: string; width: number; height: number };
        full: { url: string; width: number; height: number };
      };
    }>;
    'Release Date'?: string;
    Genre?: string;
    Notes?: string;
    'Image Attribution'?: string;
    'SoundCloud URL'?: string;
    'Spotify URL'?: string;
    'YouTube URL'?: string;
  };
}

export interface MusicLinks {
  soundcloud?: string;
  spotify?: string;
  youtube?: string;
}

export interface FilterOptions {
  search: string;
  genre: string;
  sortBy: 'title' | 'artist' | 'date' | 'random';
  sortOrder: 'asc' | 'desc';
}