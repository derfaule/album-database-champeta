import React, { useState, useEffect, useMemo } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Album, FilterOptions } from '../types';
import { airtableService } from '../services/airtableService';
import AlbumCard from './AlbumCard';
import AlbumModal from './AlbumModal';
import SearchFilter from './SearchFilter';
import LoadingSkeleton from './LoadingSkeleton';

const AlbumGrid: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    genre: '',
    sortBy: 'title',
    sortOrder: 'asc'
  });

  const loadAlbums = async (forceRefresh: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      const data = await airtableService.fetchAlbums(forceRefresh);
      setAlbums(data);
    } catch (err) {
      console.error('Album loading error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load albums';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  const genres = useMemo(() => {
    const allGenres = albums
      .map(album => album.fields.Genre)
      .filter(Boolean)
      .filter((genre, index, array) => array.indexOf(genre) === index);
    return allGenres.sort();
  }, [albums]);

  const filteredAndSortedAlbums = useMemo(() => {
    let result = [...albums];

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(album => 
        album.fields['Album Title']?.toLowerCase().includes(searchLower) ||
        album.fields.Artist?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by genre
    if (filters.genre) {
      result = result.filter(album => album.fields.Genre === filters.genre);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'title':
          comparison = (a.fields['Album Title'] || '').localeCompare(b.fields['Album Title'] || '');
          break;
        case 'artist':
          comparison = (a.fields.Artist || '').localeCompare(b.fields.Artist || '');
          break;
        case 'date':
          const dateA = a.fields['Release Date'] ? new Date(a.fields['Release Date']).getTime() : 0;
          const dateB = b.fields['Release Date'] ? new Date(b.fields['Release Date']).getTime() : 0;
          comparison = dateA - dateB;
          break;
        case 'random':
          comparison = Math.random() - 0.5;
          break;
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [albums, filters]);

  const handleRefresh = () => {
    loadAlbums(true);
  };

  const handleRandom = () => {
    if (filteredAndSortedAlbums.length > 0) {
      const randomAlbum = filteredAndSortedAlbums[
        Math.floor(Math.random() * filteredAndSortedAlbums.length)
      ];
      setSelectedAlbum(randomAlbum);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-900 border border-red-700 rounded-lg p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Unable to Load Albums</h2>
            <p className="text-red-200 mb-4">{error}</p>
            <div className="space-y-2 text-sm text-red-300">
              <p>Please check your Airtable configuration:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Verify your Base ID: <code>appVYEMXc3C7Qc32u</code></li>
                <li>Add your Personal Access Token (PAT) in <code>src/config/airtable.ts</code></li>
                <li>Ensure your table name matches the configuration</li>
                <li>Check that your Airtable base is accessible</li>
                <li>Verify your PAT has <code>data.records:read</code> scope</li>
              </ul>
            </div>
            <button
              onClick={handleRefresh}
              className="mt-4 bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors flex items-center mx-auto"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Album Collection
          </h1>
          <p className="text-gray-400 text-lg">
            Discover and explore our curated music collection
          </p>
        </header>

        <SearchFilter
          filters={filters}
          genres={genres}
          onFilterChange={setFilters}
          onRefresh={handleRefresh}
          onRandom={handleRandom}
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <LoadingSkeleton count={8} />
          </div>
        ) : (
          <>
            <div className="mb-6 text-gray-400">
              {filteredAndSortedAlbums.length} album{filteredAndSortedAlbums.length !== 1 ? 's' : ''} found
            </div>
            
            {filteredAndSortedAlbums.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🎵</div>
                <h3 className="text-xl font-semibold mb-2">No albums found</h3>
                <p className="text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedAlbums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    album={album}
                    onClick={() => setSelectedAlbum(album)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        <AlbumModal
          album={selectedAlbum}
          isOpen={!!selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
        />
      </div>
    </div>
  );
};

export default AlbumGrid;