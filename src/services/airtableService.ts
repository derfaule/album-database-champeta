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
      
      // Add parameters for better data retrieval
      url.searchParams.append('maxRecords', '100');
      url.searchParams.append('view', 'Grid view');

      const response = await fetch(url.toString(), {
        headers: getHeaders(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Airtable API Error:', response.status, errorText);
        throw new Error(`Airtable API error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      
      if (!data.records) {
        throw new Error('Invalid response format from Airtable');
      }

      this.cache = data.records;
      this.lastFetch = now;
      return this.cache;
    } catch (error) {
      console.error('Error fetching albums from Airtable:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to Airtable. Please check your internet connection.');
      }
      
      throw error instanceof Error ? error : new Error('Failed to fetch albums from Airtable');
    }
  }

  clearCache(): void {
    this.cache = null;
    this.lastFetch = 0;
  }
}

export const airtableService = new AirtableService();