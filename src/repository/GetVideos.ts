import axios from 'axios';
import { API_BASE } from '@/config/api';

/**
 * Video interface matching the API response structure
 */
export interface Video {
  id?: number; // ID is not in the fields but we might add it manually
  title: string;
  link: string;
  thumbnail: string | null;
  description: string | null;
  category: {
    name: string;
  };
}

/**
 * Metadata interface for pagination
 */
export interface Meta {
  total_count: number;
  filter_count: number;
}

/**
 * API response structure for video collections
 */
export interface VideoResponse {
  data: Video[];
  meta?: Meta;
}

/**
 * API response structure for a single video
 */
export interface SingleVideoResponse {
  data: Video;
}

/**
 * Fetches videos from the API
 * @param categoryName Optional category name to filter videos by category
 * @returns Promise containing an array of Video objects
 */
export const getVideos = async (categoryName?: string): Promise<Video[]> => {
  try {
    let allVideos: Video[] = [];
    let page = 1;
    const limit = 100; // Maximum allowed by the API
    let hasMore = true;

    // Build filter parameters
    const filterParams: Record<string, any> = {};
    
    // Add category filter if provided
    if (categoryName) {
      filterParams['filter[category][name][_eq]'] = categoryName;
    }

    while (hasMore) {
      const response = await axios.get<VideoResponse>(
        `${API_BASE}/items/videos`,
        {
          params: {
            ...filterParams,
            'sort[]': '-id', // Sort by newest first (assuming ID is still used for sorting)
            'limit': limit,
            'page': page,
            'meta': '*',
            'fields': 'title,link,thumbnail,description,category.name'
          }
        }
      );

      const { data, meta } = response.data;
      
      // Generate unique IDs for videos if needed for React keys
      const videosWithIds = data.map((video, index) => ({
        ...video,
        id: index + (page - 1) * limit + 1 // Generate sequential IDs starting from 1
      }));
      
      // Add videos to our collection
      allVideos = [...allVideos, ...videosWithIds];

      // Check if there are more pages
      if (!meta || page * limit >= meta.total_count) {
        hasMore = false;
      } else {
        page++;
      }
    }

    return allVideos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error; // Re-throw to handle in the component
  }
};

/**
 * Fetches a single video by its YouTube link
 * @param youtubeLink The YouTube link of the video to fetch
 * @returns Promise containing a Video object or null if not found
 */
export const getVideoByLink = async (youtubeLink: string): Promise<Video | null> => {
  try {
    const response = await axios.get<VideoResponse>(
      `${API_BASE}/items/videos`,
      {
        params: {
          'filter[link][_eq]': youtubeLink,
          'fields': 'title,link,thumbnail,description,category.name'
        }
      }
    );

    const { data } = response.data;
    
    if (data && data.length > 0) {
      // Add an ID for the video if needed
      return {
        ...data[0],
        id: 1 // Arbitrary ID for reference
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching video with link ${youtubeLink}:`, error);
    throw error;
  }
};

/**
 * Fetches videos by category name
 * @param categoryName The name of the category to filter by
 * @returns Promise containing an array of Video objects
 */
export const getVideosByCategory = async (categoryName: string): Promise<Video[]> => {
  return getVideos(categoryName);
};
