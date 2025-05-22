import axios from 'axios';
import { API_BASE, getAssetUrl } from '@/config/api';

export interface Post {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  thumbnailUrl: string;
  summary: string;
  date_created: string;
  date_updated?: string;
  category: {
    name: string;
    slug: string;
    id: number;
  };
}

export interface Meta {
  total_count: number;
  filter_count: number;
}

export interface PostResponse {
  data: Post[];
  meta?: Meta;
}

// Use the centralized API configuration

export const getPostsByCategorySlug = async (categorySlug: string): Promise<Post[]> => {
  try {
    let allPosts: Post[] = [];
    let page = 1;
    const limit = 100; // Maximum allowed by the API
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get<PostResponse>(
        `${API_BASE}/items/articles`,
        {
          params: {
            'filter[category][slug][_eq]': categorySlug,
            'sort[]': '-date_created',
            'limit': limit,
            'page': page,
            'meta': '*',
            'fields': 'id,title,slug,thumbnail,summary,date_created,date_updated,category.name,category.slug,category.id'
          }
        }
      );

      const { data, meta } = response.data;
      
      // Transform and add posts
      const transformedPosts = data.map(post => ({
        ...post,
        thumbnailUrl: getAssetUrl(post.thumbnail)
      }));

      allPosts = [...allPosts, ...transformedPosts];

      // Check if there are more pages
      if (!meta || page * limit >= meta.total_count) {
        hasMore = false;
      } else {
        page++;
      }
    }


    return allPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; // Re-throw to handle in the component
  }
};