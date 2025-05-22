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
  category: {
    name: string;
    slug: string;
    id: number;
  };
}

export interface PostResponse {
  data: Post[];
}

export const getPostsByCategorySug = async (categorySlug: string, limit: number = 4): Promise<Post[]> => {
  try {
    const response = await axios.get<PostResponse>(
      `${API_BASE}/items/articles`,
      {
        params: {
          'filter[category][slug][_eq]': categorySlug,
          'limit': limit,
          'sort[]': '-date_created',
          fields: 'id,title,slug,thumbnail,summary,date_created,category.name,category.slug,category.id'
        }
      }
    );

    // Transform the response to add thumbnailUrl
    const transformedPosts = response.data.data.map(post => ({
      ...post,
      thumbnailUrl: getAssetUrl(post.thumbnail)
    }));

    return transformedPosts;
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
};
