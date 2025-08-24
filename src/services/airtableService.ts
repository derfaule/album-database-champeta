import { Album } from '../types';
import { getAirtableUrl, getHeaders } from '../config/airtable';

class AirtableService {
  private cache: Album[] | null = null;
  private lastFetch: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  async fetchAlbums(forceRefresh: boolean = false): Promise<Album[]> {
    const now = Date.now();
    
    // Return cached data if it's fresh and not forcing refresh
    if (
      !forceRefresh && 
      this.cache && 
      (now - this.lastFetch) < this.CACHE_DURATION
    ) {
      return this.cache;
    }

    try {
      const url = new URL(getAirtableUrl());
      url.searchParams.append('view', 'Grid view');
      url.searchParams.append('sort[0][field]', 'Release Date');
      url.searchParams.append('sort[0][direction]', 'desc');

      const response = await fetch(url.toString(), {
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.cache = data.records;
      this.lastFetch = now;
      return this.cache;
    } catch (error) {
      console.error('Error fetching albums from Airtable:', error);
      throw new Error('Failed to fetch albums. Please check your Airtable configuration.');
    }
  }

  clearCache(): void {
    this.cache = null;
    this.lastFetch = 0;
  }
}

export const airtableService = new AirtableService();