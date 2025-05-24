import axios from 'axios';
import { API_BASE } from '@/config/api';

/**
 * Post interface matching the API response structure for search results
 */
export interface PostSearchResult {
  id: number;
  title: string;
  slug: string;
  category: {
    name: string;
    slug: string;
  };
}

/**
 * API response structure for post search results
 */
export interface PostSearchResponse {
  data: PostSearchResult[];
}

/**
 * Searches for posts by keyword
 * @param keyword The search term to look for in posts
 * @returns Promise containing an array of PostSearchResult objects
 */
export const searchPostsByKeyword = async (keyword: string): Promise<PostSearchResult[]> => {
  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const response = await axios.get<PostSearchResponse>(
      `${API_BASE}/items/articles?fields=id%2C+title%2Ccategory.name%2Ccategory.slug%2Cslug&search=${encodedKeyword}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error; // Re-throw to let the component handle it
  }
};
