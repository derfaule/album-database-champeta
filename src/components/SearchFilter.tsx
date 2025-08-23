import React from 'react';
import { Search, Filter, RotateCcw, Shuffle } from 'lucide-react';
import { FilterOptions } from '../types';

interface SearchFilterProps {
  filters: FilterOptions;
  genres: string[];
  onFilterChange: (filters: FilterOptions) => void;
  onRefresh: () => void;
  onRandom: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  filters,
  genres,
  onFilterChange,
  onRefresh,
  onRandom
}) => {
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search albums or artists..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
          />
        </div>

        {/* Genre Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={filters.genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-8 py-2 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors appearance-none cursor-pointer min-w-[150px]"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split('-') as [typeof filters.sortBy, typeof filters.sortOrder];
            onFilterChange({
              ...filters,
              sortBy,
              sortOrder
            });
          }}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors cursor-pointer min-w-[150px]"
        >
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="artist-asc">Artist A-Z</option>
          <option value="artist-desc">Artist Z-A</option>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
        </select>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onRefresh}
            className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-400 hover:text-white hover:border-green-500 transition-colors"
            title="Refresh data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onRandom}
            className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-400 hover:text-white hover:border-green-500 transition-colors"
            title="Random album"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;